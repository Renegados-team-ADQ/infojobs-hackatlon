import { Session } from 'next-auth'

export interface APIResultApplications {
  totalFound: number
  htmlApplicationsEnabled: boolean
  applications: Application[]
}

export interface Application {
  rejected: boolean
  offerRemoved: boolean
  processClosed: boolean
  code: string
  date: string
  lastEvent: Event
  cvReceivedEvent: Event
  eventsReadPending: number
  jobOffer: JobOffer
  cvReadEvent?: Event
  notPreselectedCandidateEvent?: Event
}

export interface Event {
  tipoId: number
  date: string
  description: string
  initializer: boolean
  finisher: boolean
  rejectedReasons: string[]
}

export interface JobOffer {
  code: string
  title: string
  company: string
  city: string
  logoUrl: string
}
export async function getApplications (session: Session) {
  const BASE_URL = 'https://api.infojobs.net'
  const APPLICATION_ENDPOINT = `${BASE_URL}/api/5/application`
  const CLIENT_ID = process.env.INFOJOBS_ID ?? ''
  const CLIENT_SECRET = process.env.INFOJOBS_SECRET ?? ''
  const BASIC_TOKEN = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    'base64'
  )
  const { accessToken } = session
  const resListCurriculums = await fetch(APPLICATION_ENDPOINT, {
    headers: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      Authorization: `Basic ${BASIC_TOKEN},Bearer ${accessToken}`
    }
  })
  const data = await resListCurriculums.json()
  console.log('papa')
  return data
}
