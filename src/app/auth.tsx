// pages/auth.js
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Auth () {
  const router = useRouter()

  useEffect(() => {
    // Cuando esta página se carga después de la redirección de InfoJobs,
    // el código de verificación estará disponible como un parámetro de consulta
    const code = router.query.code

    if (code) {
      // Aquí puedes enviar el código de verificación al backend para intercambiarlo por un token de acceso
      // Esto se podría hacer llamando a una función API de Next.js
      fetch('/api/exchangeCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      })
    }
  }, [router.query])

  return <div>Autenticando...</div>
}
