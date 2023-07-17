// src/hooks/useAuth.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { isUserLoggedIn } from 'src/helpers'

const useAuth = (redirectTo = '/') => {
  const router = useRouter()

  useEffect(() => {
    if (!isUserLoggedIn()) {
      router.push(redirectTo)
    }
  }, [router, redirectTo])
}

export default useAuth
