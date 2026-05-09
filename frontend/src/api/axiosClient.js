import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 12000,
})

export default axiosClient
