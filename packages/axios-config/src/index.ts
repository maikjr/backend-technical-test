import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:1526'
})

export { api }
