import GameCanvas from '@/components/GameCanvas'
import MainMenu from '@/components/MainMenu'
// import usePrevious from '@/hooks/usePrevious'
import { useMessageStore } from '@/store/store'
import { useEffect, useState } from 'react'

function App() {
  const [gameStarted, setGameStarted] = useState(false) // 게임 시작 상태
  const { message, fetchMessage } = useMessageStore()

  useEffect(() => {
    if (!message) {
      fetchMessage()
    }
  }, [message])

  const handleStartGame = () => {
    setGameStarted(true) // 게임 시작
  }

  const handleSettings = () => {
    alert(message)
  }

  const handleExit = () => {
    alert('Exiting game...')
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
        />
      ) : (
        <GameCanvas onExit={handleExitGame} />
      )}
    </div>
  )
}

export default App
