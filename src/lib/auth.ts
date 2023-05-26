import { NextAuthOptions } from 'next-auth'
import InfojobsProvider from 'infojobs-next-auth-provider'

export const authOptions: NextAuthOptions = {
  providers: [
    InfojobsProvider({
      clientId: process.env.INFOJOBS_CLIENT_ID ?? '',
      clientSecret: process.env.INFOJOBS_SECRET ?? '',
      redirect_uri: 'https://infojobs-hackatlon-gww.vercel.app/api/callback',
      infojobs_scopes:
        'CANDIDATE_PROFILE_WITH_EMAIL,CV,CANDIDATE_READ_CURRICULUM_EXPERIENCE,MY_APPLICATION'
    })
  ],
  callbacks: {
    async jwt ({ token, account }) {
      if (account != null) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    }/*,
    async session ({ session, token }) {
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    } ,
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  } */
  }
}
