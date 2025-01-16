import { userHandlers } from '@/api/apiHandlers'
import { create } from 'zustand'

interface AuthState {
  isLogin: boolean
  setIsLogin: (isLogin: boolean) => void
  checkAuth: () => Promise<void>
  logout: () => void
  error: string
  username: string
}

const useAuthStore = create<AuthState>((set) => ({
  isLogin: false,
  error: '',
  username: '',
  setIsLogin: (isLogin) => set(() => ({ isLogin })),
  checkAuth: async () => {
    try {
      const { isAuthenticated, username } = await userHandlers.loginCheck() // 서버에서 인증 상태 확인
      set({ isLogin: isAuthenticated, username })
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ isLogin: false, error: err.message }) // 에러 메시지 사용
      } else {
        set({ isLogin: false, error: 'An unknown error occurred' }) // 알 수 없는 에러 처리
      }
    }
  },
  logout: async () => {
    try {
      await userHandlers.logoutUser()
      set({ isLogin: false })
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message }) // 에러 메시지 사용
      } else {
        set({ error: 'An unknown error occurred' }) // 알 수 없는 에러 처리
      }
    }
  },
}))

export default useAuthStore
