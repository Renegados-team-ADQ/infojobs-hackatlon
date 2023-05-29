import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

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
export async function getApplications () {
  const res = await fetch('/api/get-applications', {
    headers: {
      'Content-type': 'application/json'
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
