import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET (request: Request) {
  const session = await getServerSession(authOptions)
  const basicToken = `Basic ${Buffer.from(`${process.env.INFOJOBS_ID ?? ''}:${process.env.INFOJOBS_SECRET ?? ''}`).toString('base64')}`
  const bearerToken = `Bearer ${session?.accessToken ?? ''}`
  const data = await fetch('https://api.infojobs.net/api/5/application', {
    headers: {
      Authorization: `${basicToken},${bearerToken}`
    }
  })
  return NextResponse.json({
    authenticated: !(session == null),
    session,
    data
  })
}
