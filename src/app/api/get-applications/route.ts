import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = 'https://api.infojobs.net'
const APPLICATION_ENDPOINT = `${BASE_URL}api/5/application`
const CLIENT_ID = process.env.INFOJOBS_ID ?? ''
const CLIENT_SECRET = process.env.INFOJOBS_SECRET ?? ''
const BASIC_TOKEN = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
  'base64'
)
export async function GET (req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  if (session == null) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  const { accessToken } = session
  const applicationsResults = await fetch(APPLICATION_ENDPOINT, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      Authorization: `Basic ${BASIC_TOKEN},Bearer ${accessToken}`
    }
  })
  const data = await applicationsResults.json()

  return NextResponse.json(data)
}
