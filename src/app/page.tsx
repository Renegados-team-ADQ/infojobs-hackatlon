/* eslint-disable @typescript-eslint/no-misused-promises */
'use client'
import { useSession, signIn, signOut } from 'next-auth/react'

export default function Home () {
  const { data: session } = useSession()

  if (session != null) {
    return (
      <div>
        <h1>PERO ESTO QUE ES????</h1>
        <h1>estas logueado</h1>
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
      <button onClick={async () => await signIn('infojobs', { callbackUrl: '/' })}>
        Sign in
      </button>
    </div>
  )
}
