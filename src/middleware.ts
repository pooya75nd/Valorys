import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default withAuth(
  function middleware(req: NextRequest) {
    const token = (req as any).nextauth?.token
    const plan = token?.plan ?? 'DECOUVERTE'
    const pathname = req.nextUrl.pathname

    const premiumRoutes = ['/dashboard/historique', '/api/annonces/export']
    const proRoutes = ['/api/ai-agent', '/api/private']

    if (premiumRoutes.some(r => pathname.startsWith(r))) {
      if (plan === 'DECOUVERTE') {
        return NextResponse.redirect(new URL('/pricing?upgrade=investisseur', req.url))
      }
    }

    if (proRoutes.some(r => pathname.startsWith(r))) {
      if (plan !== 'PRO') {
        return NextResponse.redirect(new URL('/pricing?upgrade=pro', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname

        const publicRoutes = ['/', '/pricing', '/login', '/legal']
        if (publicRoutes.some(r => pathname.startsWith(r))) return true

        if (pathname.startsWith('/api/annonces') && req.method === 'GET') return true
        if (pathname.startsWith('/api/auth')) return true
        if (pathname.startsWith('/api/stripe/webhook')) return true
        if (pathname.startsWith('/api/cron')) return true

        return !!token
      },
    },
  }
)

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public).*)'],
}
