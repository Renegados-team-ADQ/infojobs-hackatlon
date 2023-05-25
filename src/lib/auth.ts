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
          response_type: 'code'
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
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60 // 24 hours
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30
  },
  callbacks: {
    async signIn ({ user, account, profile, email, credentials }) {
      console.log('user', user, account, profile)
      return true
    }, /*
    async redirect ({ url, baseUrl }) {
      return baseUrl
    }, */
    async session ({ session, token, user }) {
      return session
    }/* ,
    async jwt ({ token, user, account, profile, isNewUser }) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      return token
    } */
  }/* ,
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  } */
}
