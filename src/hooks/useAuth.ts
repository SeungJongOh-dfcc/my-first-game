import { useState, useEffect } from 'react'

// 로컬 스토리지에서 사용자 정보를 확인하여 로그인 상태 유지
const useAuth = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 사용자 정보를 확인
    const storedUserToken = localStorage.getItem('userToken')

    if (storedUserToken) {
      // 저장된 토큰이 있다면 로그인 상태로 설정
      setIsLogin(true)
    }
  }, [])

  const logout = () => {
    // 로그아웃 시 로컬 스토리지에서 토큰 삭제
    localStorage.removeItem('userToken')
    setIsLogin(false)
  }

  return { isLogin, setIsLogin, error, setError, logout }
}

export default useAuth
