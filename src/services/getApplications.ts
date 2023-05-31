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
  const basicToken = `Basic ${Buffer.from(`${process.env.INFOJOBS_ID ?? ''}:${process.env.INFOJOBS_SECRET ?? ''}`).toString('base64')}`
  const bearerToken = `Bearer ${session?.accessToken ?? ''}`
  const res = await fetch('https://api.infojobs.net/api/5/application', {
    headers: {
      Authorization: `${basicToken},${bearerToken}`
    }
  })
  const { item }: { item: APIResultApplications } = await res.json()
  const listOfApplications = item.applications.map(item => {
    const { jobOffer, rejected, date } = item
    const { title, code, city } = jobOffer
    return {
      title,
      code,
      city,
      rejected,
      date

    }
  })
  console.log(listOfApplications)
  return listOfApplications
}
