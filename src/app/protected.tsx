import { useSession, signIn, signOut } from 'next-auth/react'

export default function Protected () {
  const { data: session } = useSession()

  if (session != null) {
    return (
      <div>
        <h1>estas logueado</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )
  }

  return (
    <div>
      <h1>No estas logueado</h1>
      <button onClick={() => signIn()}>Sign In</button>
    </div>
  )
}
