import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      plan: 'DECOUVERTE' | 'INVESTISSEUR' | 'MARCHAND' | 'PRO'
      stripeCustomerId?: string
    }
  }
  interface User {
    stripeCustomerId?: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    plan: 'DECOUVERTE' | 'INVESTISSEUR' | 'MARCHAND' | 'PRO'
  }
}
