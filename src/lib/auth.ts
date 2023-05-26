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
        url: 'https://www.infojobs.net/oauth/authorize',
        async request ({ params }) {
          const tokenUrl = new URL('https://www.infojobs.net/oauth/authorize' ?? '')
          tokenUrl.searchParams.append('grant_type', 'authorization_code')
          tokenUrl.searchParams.append('code', params.code ?? '')
          tokenUrl.searchParams.append('redirect_uri', 'https://infojobs-hackatlon-gww.vercel.app/api/auth/callback/infojobs' ?? '')
          tokenUrl.searchParams.append('client_id', process.env.INFOJOBS_ID ?? '')
          tokenUrl.searchParams.append('client_secret', process.env.INFOJOBS_SECRET ?? '')
          const response = await fetch(tokenUrl.toString(), {
            method: 'POST'
          })
          const tokens = await response.json()
          return {
            tokens
          }
        }
        // params: {
        //   grant_type: 'authorization_code',
        //   clientId: process.env.INFOJOBS_ID,
        //   clientSecret: process.env.INFOJOBS_SECRET
        // }
      },
      userinfo: {
        async request ({ tokens }) {
          const basicToken = `Basic ${Buffer.from(`${process.env.INFOJOBS_ID ?? ''}:${process.env.INFOJOBS_SECRET ?? ''}`).toString('base64')}`
          const bearerToken = `Bearer ${tokens.access_token ?? ''}`
          const response = await fetch('https://api.infojobs.net/api/6/candidate', {
            headers: {
              Authorization: `${basicToken},${bearerToken}`
            }
          })
          const profile = await response.json()
          return {
            id: profile.id,
            email: profile.email,
            image: profile.photo,
            name: profile.name,
            sub: profile.id
          }
        }
      },
      profileUrl: 'https://api.infojobs.net/api/6/candidate',
      profile (profile) {
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
