import { useRef } from 'react'
import useGameLogic from '../hooks/useGameLogic'
import GameClearModal from '@/modals/GameClearModal'
import { EXPERIENCE_PER_LEVEL } from '@/constants/settings'

interface GameCanvasProps {
  onExit: () => void // 메인 화면으로 돌아가기 콜백
}

const GameCanvas: React.FC<GameCanvasProps> = ({ onExit }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const {
    gameOver,
    gameCleared,
    clearTime,
    coinsCollected,
    monstersDefeated,
    experience,
    level,
    levelUpMessage,
    isLevelUp,
    restartGame,
  } = useGameLogic(canvasRef)

  // 현재 레벨의 최대 경험치 계산
  const maxExperience = EXPERIENCE_PER_LEVEL[level] || 0
  const currentExperiencePercentage = (experience / maxExperience) * 100

  return (
    <div className="relative">
      {/* 레벨 업 메시지 */}
      {levelUpMessage && (
        <div className="absolute top-0 left-0 right-0 text-center text-white bg-green-500 p-2">
          {levelUpMessage}
        </div>
      )}

      {/* 경험치바 */}
      <div className="absolute bottom-6 left-6 w-64 h-6 bg-gray-300 rounded">
        <div
          className="h-full bg-blue-500 rounded"
          style={{
            width: `${
              currentExperiencePercentage > 100
                ? 100
                : currentExperiencePercentage
            }%`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs text-white">
          {`${experience} / ${maxExperience} 경험치`}
        </div>
      </div>
      {gameOver && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-75">
          <h1 className="text-white text-4xl font-bold mb-4">Game Over</h1>
          <button
            onClick={restartGame}
            className="px-4 py-2 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-gray-300"
          >
            Restart
          </button>
        </div>
      )}
      {gameCleared && (
        <GameClearModal
          clearTime={clearTime}
          coinsCollected={coinsCollected}
          monstersDefeated={monstersDefeated}
          experience={experience}
          level={level}
          isLevelUp={isLevelUp}
          onClose={onExit}
        />
      )}
      <div className="absolute bottom-4 right-4">
        <button
          onClick={onExit}
          className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-600"
        >
          Exit
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        className="bg-blue-200 border-2 border-black"
      />
    </div>
  )
}

export default GameCanvas
