import { getSession } from 'next-auth/react'

const CLIENT_ID = process.env.NEXT_PUBLIC_INFOJOBS_ID ?? ''
const CLIENT_SECRET = process.env.NEXT_PUBLIC_INFOJOBS_SECRET ?? ''
// Generate basic token base64 encoded
const BASIC_TOKEN = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  'base64'
)
export const fetcherWithAuth = async (url: string): Promise<JSON> => {
  const session = await getSession()

  if ((session?.accessToken) == null) {
    throw new Error('No access token')
  }

  const headers = {
    Authorization: `Basic ${BASIC_TOKEN},Bearer ${session?.accessToken}`,
    'Content-Type': 'application/json'
  }

  const response = await fetch(url, {
    headers
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return await response.json()
}

export default fetcherWithAuth
