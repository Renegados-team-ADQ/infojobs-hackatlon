/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import fetcherWithAuth from '@/services/fecherWithAuth'
// import { getApplications } from '@/services/getApplications'
import { useSession, signIn, signOut } from 'next-auth/react'

export function SignInOut () {
  const { data: session } = useSession()

  if (session != null) {
    return (
      <div>
        <h1>PERO ESTO QUE ES????</h1>
        <h1>estas logueado</h1>
        <p>testing tests</p>
        <p>{session.user?.name}</p>
        <button onClick={async () => await fetcherWithAuth('https://api.infojobs.net/api/5/application')}>Get Applications mirar consola</button>
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
