import axios from 'axios'
import storageService from '@/service/storageService'
const service = axios.create({
  baseURL: 'http://localhost:1016',
  timeout: 1000 * 5
  // headers: { Authorization: `Bearer ${storageService.get(storageService.USER_TOKEN)}` }
})

// Add a request interceptor
service.interceptors.request.use((config) => {
  // Do something before request is sent
  Object.assign(config.headers, { Authorization: `Bearer ${storageService.get(storageService.USER_TOKEN)}` })
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})
export default service
