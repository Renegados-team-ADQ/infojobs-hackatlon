import NextAuth from 'next-auth/next'

const handler = NextAuth({
  providers: [
    {
      id: 'infojobs',
      name: 'infojobs',
      type: 'oauth',
      authorization: {
        url: 'http://www.infojobs.net/core/oauth2vc/index.xhtml',
        params: { scope: 'MY_APPLICATIONS' }
      },
      token: 'https://www.infojobs.net/login/oauth/access_token',
      userinfo: 'https://api.infojobs.net/candidate',
      clientId: process.env.INFOJOBS_ID,
      clientSecret: process.env.INFOJOBS_SECRET,
      profile (profile) {
        console.log('profile ', profile)
        return {
          id: profile.id,
          name: profile?.name
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
    },
    async redirect ({ url, baseUrl }) {
      return baseUrl
    },
    async session ({ session, token, user }) {
      return session
    },
    async jwt ({ token, user, account, profile, isNewUser }) {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (account?.accessToken) {
        token.accessToken = account.accessToken
      }
      return token
    }
  }
})

export {
  handler as GET, handler as POST
}
