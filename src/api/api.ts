import axios from 'axios'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // timeout: 5000, // 요청 제한 시간 (ms)
  withCredentials: true, // 쿠키 포함 설정
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
})
