import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'infojobs',
      name: 'infojobs',
      type: 'oauth',
      authorization: {
        url: 'https://www.infojobs.net/api/oauth/user-authorize/index.xhtml',
        params: {
          scope: 'MY_APPLICATIONS,CANDIDATE_PROFILE_WITH_EMAIL',
          response_type: 'code',
          state: process.env.NEXTAUTH_SECRET
        }
      },
      token: {
        url: 'https://www.infojobs.net/oauth/authorize'
        // params: {
        //   grant_type: 'authorization_code',
        //   clientId: process.env.INFOJOBS_ID,
        //   clientSecret: process.env.INFOJOBS_SECRET
        // }
      },
      idToken: true,
      clientId: process.env.INFOJOBS_ID,
      clientSecret: process.env.INFOJOBS_SECRET,
      profileUrl: 'https://api.infojobs.net/api/6/candidate',
      profile (profile, tokens) {
        console.log('profile ', profile)
        return {
          id: profile.id,
          name: profile?.name,
          email: profile.email
        }
      }
    }
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
