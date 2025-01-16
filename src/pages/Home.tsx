import React, { useState, useEffect } from 'react'
import GameCanvas from '@/components/GameCanvas'
import MainMenu from '@/components/MainMenu'
import useAuthStore from '@/store/authStore'
import useGameStore, { useMessageStore } from '@/store/store'
import PlayerInfoModal from '@/modals/PlayerInfoModal'

function App() {
  const [gameStarted, setGameStarted] = useState(false) // 게임 시작 상태
  const [showModal, setShowModal] = useState(false) // 모달 표시 상태
  const { message, fetchMessage } = useMessageStore()
  const { username } = useAuthStore()
  const {
    clearTime,
    coinsCollected,
    experience,
    level,
    monstersDefeated,
    getUserStats,
  } = useGameStore()

  useEffect(() => {
    if (!message) {
      fetchMessage()
    }
  }, [message])

  useEffect(() => {
    if (username) {
      getUserStats(username)
    }
  }, [username])

  const handleStartGame = () => {
    setGameStarted(true) // 게임 시작
  }

  const handleSettings = () => {
    alert(message)
  }

  const handleExit = () => {
    alert('Exiting game...')
  }

  const handlePlayerInfo = () => {
    setShowModal(true) // 모달 열기
  }

  const handleExitGame = () => {
    setGameStarted(false) // 메인 화면으로 돌아가기
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!gameStarted ? (
        <MainMenu
          onStartGame={handleStartGame}
          onSettings={handleSettings}
          onExit={handleExit}
          onPlayerInfo={handlePlayerInfo}
        />
      ) : (
        <GameCanvas onExit={handleExitGame} />
      )}

      {/* 모달 컴포넌트 */}
      <PlayerInfoModal
        title="플레이어 정보"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <ul className="space-y-2">
          <li>
            <strong>최소 클리어 타임:</strong> {clearTime || 'N/A'}
          </li>
          <li>
            <strong>누적 코인 갯수:</strong> {coinsCollected || 'N/A'}
          </li>
          <li>
            <strong>누적 경험치량:</strong> {experience || 'N/A'}
          </li>
          <li>
            <strong>레벨:</strong> {level || 'N/A'}
          </li>
          <li>
            <strong>누적 몬스터 처치 수:</strong> {monstersDefeated || 'N/A'}
          </li>
        </ul>
      </PlayerInfoModal>
    </div>
  )
}

export default App
