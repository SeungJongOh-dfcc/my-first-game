import { apiHandlers, userHandlers } from '@/api/apiHandlers'
import { create } from 'zustand'

interface CounterState {
  count: number
  increase: () => void
  decrease: () => void
}

interface MessageState {
  message: string
  fetchMessage: () => Promise<void>
}

interface GameState {
  level: number
  experience: number
  monstersDefeated: number
  coinsCollected: number
  clearTime: number
  getUserStats: (username: string) => Promise<void>
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
  decrease: () => set((state) => ({ count: state.count - 1 })),
}))

export const useMessageStore = create<MessageState>((set) => ({
  message: '',
  fetchMessage: async () => {
    try {
      const data = await apiHandlers.getHello()
      set({ message: data })
    } catch (error) {
      console.error('API 호출 실패:', error)
    }
  },
}))

const useGameStore = create<GameState>((set) => ({
  experience: 0,
  level: 1,
  clearTime: 0,
  coinsCollected: 0,
  monstersDefeated: 0,
  getUserStats: async (username: string) => {
    try {
      const { experience, level, clearTime, coinsCollected, monstersDefeated } =
        await userHandlers.getUserStats(username)

      set({ experience, level, clearTime, coinsCollected, monstersDefeated })
    } catch (error) {
      console.error('유저 레벨, 경험치 불러오기 실패', error)
    }
  },
}))
export default useGameStore
