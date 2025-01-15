// import { userHandlers } from '@/api/apiHandlers'
// import useLoadingStore from '@/store/loadingStore'
// import { useState } from 'react'

// // 로컬 스토리지에서 사용자 정보를 확인하여 로그인 상태 유지
// const useAuth = () => {
//   const [error, setError] = useState<string | null>(null)
//   const setLoading = useLoadingStore((state) => state.setLoading)

//   // 로그인 상태 확인
//   const checkAuth = async () => {
//     // try {
//     //   setLoading(true)
//     //   const { isAuthenticated } = await userHandlers.loginCheck()
//     //   setIsLogin(isAuthenticated)
//     // } catch (err) {
//     //   setIsLogin(false)
//     //   setError('Authentication failed')
//     // } finally {
//     //   setLoading(false)
//     // }
//   }

//   const logout = async () => {
//     // try {
//     //   setLoading(true)
//     //   await userHandlers.loginCheck()
//     //   setIsLogin(false)
//     // } catch (err) {
//     //   setError('Logout failed')
//     // } finally {
//     //   setLoading(false)
//     // }
//   }

//   return { error, setError, logout, checkAuth }
// }

// export default useAuth
