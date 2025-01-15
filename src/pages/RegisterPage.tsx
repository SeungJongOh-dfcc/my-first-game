import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userHandlers } from '@/api/apiHandlers' // 회원가입 API 호출 함수
import useLoadingStore from '@/store/loadingStore'

const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const navigate = useNavigate()
  const setLoading = useLoadingStore((state) => state.setLoading)

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      setLoading(true)
      const response = await userHandlers.registerUser({ username, password })

      if (response) {
        console.log(response)
        setError(null)
        setSuccess('회원가입에 성공했습니다. 로그인 페이지로 이동하세요.')
        navigate('/')
      } else {
        setError('회원가입에 실패했습니다.')
      }
    } catch (err) {
      setError('An error occurred during registration')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-6">회원가입</h1>
      <form
        onSubmit={handleRegister}
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
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <button
          type="submit"
          className="w-full bg-green-500 text-white font-bold py-2 rounded-lg hover:bg-green-600"
        >
          회원가입
        </button>
      </form>
      <button
        onClick={() => navigate('/login')}
        className="mt-4 text-blue-500 hover:underline"
      >
        로그인 페이지로 돌아가기
      </button>
    </div>
  )
}

export default RegisterPage
