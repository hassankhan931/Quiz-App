export default function ProgressBar({ current, total, color = 'bg-blue-500' }) {
  const progress = (current / total) * 100

  return (
    <div className="w-full bg-gray-200 dark:bg-grayR-700 rounded-full h-2.5 mb-4">
      <div 
        className={`h-2.5 rounded-full ${color}`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}
