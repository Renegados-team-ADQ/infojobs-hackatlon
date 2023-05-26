/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import { useSession, signIn, signOut } from 'next-auth/react'

const getApplications = async (session: any) => {
  const data = await fetch('https://api.infojobs.net/api/5/application', {
    headers: {
      Authoritzation: session.accessToken
    }
  })
  const applications = await data.json()
  return applications
}

export default function Home () {
  const { data: session } = useSession()

  if (session != null) {
    const applications = getApplications(session)
    console.log(applications)

    return (
      <div>
        <h1>PERO ESTO QUE ES????</h1>
        <h1>estas logueado</h1>
        <p>{session.user?.name}</p>
        <button onClick={async () => await signOut()}>
          Sign Out
        </button>
      </div>
    )
  }

  return (
    <div>
      <p>Mas test de los collons</p>
      <h1>PERO ESTO QUE ES???? v2.0</h1>
      <h1>No estas logueado</h1>
      <p>hola</p>
      <button onClick={async () => await signIn('infojobs', { redirect: false })}>
        Sign in
      </button>
    </div>
  )
}
