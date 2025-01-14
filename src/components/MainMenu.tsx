import React, { useState } from 'react'
import mainBackground from '@/assets/mainBackground/mainBackground.webp'
import useIndexedDB from '@/hooks/useIndexedDB'
import useAuth from '@/hooks/useAuth'

interface MainMenuProps {
  onStartGame: () => void // 게임 시작 콜백
  onSettings: () => void // 설정 메뉴 콜백
  onExit: () => void // 게임 종료 콜백
}

const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onSettings,
  onExit,
}) => {
  const { add, login, error: dbError } = useIndexedDB() // useIndexedDB 훅 사용
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUpMode, setIsSignUpMode] = useState(false)
  const { isLogin, setIsLogin, logout, error, setError } = useAuth()
  // const [, setDb] = useState<IDBDatabase | null>(null)

  const handleLogin = async (event: React.FormEvent) => {
    try {
      event.preventDefault() // form 액션의 기본 동작(리다이렉션) 방지

      const user = await login({ username, password })
      console.log(user)

      if (user) {
        setIsLogin(true)
        setError(null)
        console.log('login successful')
        // 로그인 성공 시 로컬스토리지에 토큰 저장
        localStorage.setItem('userToken', JSON.stringify(user))
      } else {
        setError('Invalid username or password')
      }
    } catch (err) {
      setError('An error occurred during login')
    }
  }

  const handleLogout = () => {
    logout() // 로그아웃 시 로컬 스토리지에서 토큰 삭제
    setIsLogin(false) // 로그인 상태 초기화
  }

  const handleSignUp = async () => {
    try {
      if (!username || !password) {
        setError('모든 필드를 입력해주세요.')
        return
      }

      // 회원가입 데이터
      const playerData = { username, password }

      // 데이터 추가
      await add(playerData)
      setIsSignUpMode(false) // 회원가입 모드 종료 후 로그인 화면으로 돌아가기
      setUsername('')
      setPassword('')
      setError(null) // 오류 초기화

      // 성공적으로 회원가입이 끝났으면, 로그인 모드로 전환할 수 있음
    } catch (error) {
      setError('회원가입에 실패했습니다.')
      console.error(dbError)
      console.error(error)
    }
  }

  return (
    <div
      className="main-menu flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${mainBackground})`,
      }}
    >
      {/* 게임 제목 */}
      <h1 className="text-7xl font-extrabold text-white drop-shadow-lg mb-6">
        🐾 캣히어로: 집사를 찾아서 🐾
      </h1>

      {/* 메인 메뉴 */}
      <h2 className="text-5xl font-extrabold text-white mb-4">
        🎮 메인 메뉴 🎮
      </h2>

      {/* 게임 설명 */}
      <div className="bg-gray-100 bg-opacity-80 rounded-lg shadow-lg p-6 w-4/5">
        <h2 className="text-2xl font-bold mb-2 text-blue-600">게임 설명</h2>
        <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
          <li>
            <span className="font-semibold text-gray-800">점프:</span> C 키
          </li>
          <li>
            <span className="font-semibold text-gray-800">움직임:</span> 좌우
            방향키
          </li>
          <li>
            <span className="font-semibold text-gray-800">날개 먹으면?</span> -
            무적 5초 & 점프키 비활성화
            <br />
            대신 상하좌우 방향키로 날아다닐 수 있음! 🚀
          </li>
        </ul>
      </div>

      {/* 버튼들 */}
      <div className="flex flex-col space-y-4 mt-6">
        {isLogin ? (
          <>
            <button
              className="px-8 py-4 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition"
              onClick={onStartGame}
            >
              ▶ 게임시작
            </button>
            <button
              className="px-8 py-4 bg-gray-500 text-white font-bold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </>
        ) : isSignUpMode ? (
          <div>
            <form onSubmit={handleSignUp} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-4 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              >
                회원가입
              </button>
            </form>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </div>
        ) : (
          <div>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username" // 사용자 이름에 autocomplete 추가
                className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password" // 비밀번호에 autocomplete 추가
                className="w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full py-4 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
              >
                로그인
              </button>
            </form>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              onClick={() => setIsSignUpMode(true)}
              className="w-full py-4 bg-gray-500 text-white font-bold rounded-lg shadow-md hover:bg-gray-600 transition duration-300"
            >
              회원가입
            </button>
          </div>
        )}
        <button
          className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={onSettings}
        >
          ⚙️ 설정 (준비 중)
        </button>
        <button
          className="px-8 py-4 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition"
          onClick={onExit}
        >
          ❌ 나가기
        </button>
      </div>
    </div>
  )
}

export default MainMenu
