import React, { useEffect } from 'react'
import mainBackground from '@/assets/mainBackground/mainBackground.webp'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/store/authStore'

interface MainMenuProps {
  onStartGame: () => void // 게임 시작 콜백
  onSettings: () => void // 설정 메뉴 콜백
  onExit: () => void // 게임 종료 콜백
  onPlayerInfo: () => void
}

const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  onSettings,
  onExit,
  onPlayerInfo,
}) => {
  const navigate = useNavigate()
  const { isLogin, logout, error, checkAuth, username } = useAuthStore()

  useEffect(() => {
    const fetchAuth = async () => {
      await checkAuth()
    }

    fetchAuth()
  }, [isLogin])

  const handleLogout = async () => {
    await logout() // 로그아웃 시 jwt 클리어
    await checkAuth()
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
            <p className="text-white font-bold text-center">
              {username}님 안녕하세요!
            </p>
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
        ) : (
          <>
            <button
              className="px-8 py-4 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-600 transition"
              onClick={() => navigate('/login')}
            >
              로그인
            </button>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </>
        )}
        <button
          className="px-8 py-4 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={onPlayerInfo}
        >
          플레이어 정보
        </button>
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
