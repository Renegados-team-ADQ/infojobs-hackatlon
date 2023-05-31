'use client'
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { getApplications } from '@/services/getApplications'

export default function ListOfApplications () {
  const [data, setData] = useState<Array<{
    title: string
    code: string
    city: string
    rejected: boolean
    date: string
  }>>([])
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    async function fetchDataOnMount () {
      try {
        const session = await getSession()
        if (session != null) {
          const data = await getApplications(session)
          setData(data)
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
      }
    }

    void fetchDataOnMount()
  }, [])

  // Use the data here
  return (
    <div>
      {(error != null)
        ? <p>An error occurred: {error}</p>
        : (
          <div>

            <p>{data[0].title}</p>

          </div>
          )}
    </div>
  )
}
