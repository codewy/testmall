import axios from 'axios'

export function homeadd() {
  const inadd = axios({
    baseURL: 'http://127.0.0.1:3000',
    timeout: 5000
  })
  return inadd
}
