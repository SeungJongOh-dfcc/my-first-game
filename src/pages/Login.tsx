import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userHandlers } from '@/api/apiHandlers' // 로그인 API 호출 함수
// import useAuthStore from '@/store/authStore'

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  // const { checkAuth } = useAuthStore()

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const success = await userHandlers.loginUser({ username, password })

      if (success) {
        setError(null)
        // console.log(success)
        // await checkAuth()
        await navigate('/') // 메인 메뉴로 이동
      } else {
        setError('Invalid username or password')
      }
    } catch (err) {
      setError('An error occurred during login')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-6">로그인</h1>
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-lg w-1/3"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
        >
          로그인
        </button>
      </form>
      <div className="mt-4 flex space-x-4">
        <button
          onClick={() => navigate('/')}
          className="text-blue-500 hover:underline"
        >
          메인 메뉴로 돌아가기
        </button>
        <button
          onClick={() => navigate('/register')}
          className="text-blue-500 hover:underline"
        >
          회원가입
        </button>
      </div>
    </div>
  )
}

export default LoginPage
