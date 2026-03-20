import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        host: 'smtp.resend.com',
        port: 465,
        auth: {
          user: 'resend',
          pass: process.env.RESEND_API_KEY!,
        },
      },
      from: 'Valorys <noreply@valorys.fr>',
    }),
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/login?verify=true',
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        const subscription = await prisma.userSubscription.findUnique({
          where: { userId: user.id },
          include: { plan: true },
        })
        session.user.plan = subscription?.plan.type ?? 'DECOUVERTE'
        session.user.stripeCustomerId = user.stripeCustomerId ?? undefined
      }
      return session
    },
    async signIn({ user }) {
      const existing = await prisma.userSubscription.findUnique({
        where: { userId: user.id! },
      })
      if (!existing) {
        const freePlan = await prisma.plan.findUnique({
          where: { type: 'DECOUVERTE' },
        })
        if (freePlan) {
          await prisma.userSubscription.create({
            data: { userId: user.id!, planId: freePlan.id },
          })
        }
      }
      return true
    },
  },
  session: { strategy: 'database' },
  secret: process.env.NEXTAUTH_SECRET,
}
