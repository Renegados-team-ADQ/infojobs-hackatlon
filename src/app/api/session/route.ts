import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET (request: Request) {
  const session = await getServerSession(authOptions)
  const basicToken = `Basic ${Buffer.from(`${process.env.INFOJOBS_ID ?? ''}:${process.env.INFOJOBS_SECRET ?? ''}`).toString('base64')}`
  const bearerToken = `Bearer ${session?.accessToken ?? ''}`

  let data
  let json
  try {
    data = await fetch('https://api.infojobs.net/api/5/application', {
      headers: {
        'Content-type': 'application/json',
        Authorization: `${basicToken},${bearerToken}`
      }
    })
    json = await data.json()
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    console.log(json)
  }
  return NextResponse.json({
    authenticated: !(session == null),
    session,
    ...data
  })
}
