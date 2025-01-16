import { userHandlers } from '@/api/apiHandlers'
import useAuthStore from '@/store/authStore'
import React from 'react'

interface ModalProps {
  clearTime: string // 클리어 타임
  coinsCollected: number // 획득한 동전 수
  monstersDefeated: number // 처치한 몬스터 수
  experience: number // 경험치량
  level: number
  isLevelUp: boolean
  onClose: () => void // 모달 닫기
}

const GameClearModal: React.FC<ModalProps> = ({
  clearTime,
  coinsCollected,
  monstersDefeated,
  experience,
  level,
  isLevelUp,
  onClose,
}) => {
  const { username } = useAuthStore()

  const handleConfirm = async () => {
    try {
      const seconds = parseFloat(clearTime.replace('초', ''))
      await userHandlers.gameResults({
        clearTime: seconds,
        coinsCollected,
        monstersDefeated,
        level,
        experience,
        username,
      })
      onClose()
    } catch (error) {
      console.error('게임 결과 저장 실패:', error)
      alert('결과 저장 중 오류가 발생했습니다.')
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">🎉 클리어 성공! 🎉</h2>
        <p className="mb-2">클리어 타임: {clearTime}</p>
        <p className="mb-2">획득한 동전: {coinsCollected}</p>
        <p className="mb-4">처치한 몬스터: {monstersDefeated}</p>
        {isLevelUp && <p className="mb-4">LEVEL UP🎉</p>}
        <button
          onClick={handleConfirm}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          확인
        </button>
      </div>
    </div>
  )
}

export default GameClearModal
