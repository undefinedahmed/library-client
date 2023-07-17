export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('library-token')
  }
  return null
}

export const isUserLoggedIn = () => {
  const token = getAuthToken()
  return !!token // Return true if token exists, false otherwise
}
