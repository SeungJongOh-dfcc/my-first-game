import useLoadingStore from '@/store/loadingStore'

const Loading: React.FC = () => {
  const isLoading = useLoadingStore((state) => state.isLoading)

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
        <p className="text-white text-lg font-semibold">로딩 중...</p>
      </div>
    </div>
  )
}

export default Loading
