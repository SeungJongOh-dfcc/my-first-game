import { apiClient } from './api'

export type helloMessage = string

export interface LoginProps {
  username: string
  password: string
}

export const apiHandlers = {
  // GET 요청: SAY HELLO
  getHello: async (): Promise<helloMessage> => {
    const response = await apiClient.get('/basic/hello')
    return response.data
  },

  // GET 요청: AnotherData
  getAnotherData: async (): Promise<any> => {
    const response = await apiClient.get('/another-endpoint')
    return response.data
  },
}

export const userHandlers = {
  baseUrl: '/users',
  // login
  loginUser: async (user: LoginProps): Promise<string> => {
    const response = await apiClient.post('/users/login', user)
    return response.data
  },
  // register
  registerUser: async (user: LoginProps): Promise<LoginProps> => {
    const response = await apiClient.post('/users/register', user)
    return response.data
  },

  //logincheck
  loginCheck: async (): Promise<any> => {
    const response = await apiClient.get('/auth/check', {
      withCredentials: true,
    })
    return response.data
  },

  //logout
  logoutUser: async (): Promise<any> => {
    return await apiClient.post('/auth/logout', {}, { withCredentials: true })
  },
}
