import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5000/'
})

const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('library-token')
  }

  return null
}

api.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    config.headers['Authorization'] = token
  }

  return config
})

export default api
