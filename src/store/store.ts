import { apiHandlers, helloMessage } from '@/api/apiHandlers'
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
