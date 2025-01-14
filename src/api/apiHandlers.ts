import { apiClient } from './api'

export type helloMessage = string

export const apiHandlers = {
  // GET 요청: SAY HELLO
  getHello: async (): Promise<helloMessage> => {
    const response = await apiClient.get('/hello')
    return response.data
  },

  // GET 요청: AnotherData
  getAnotherData: async (): Promise<any> => {
    const response = await apiClient.get('/another-endpoint')
    return response.data
  },
}
