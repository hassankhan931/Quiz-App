// src/components/Timer.jsx
export default function Timer({ timeLeft }) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (timeLeft / 15) * circumference

  const getColor = () => {
    if (timeLeft <= 5) return 'text-rose-500'
    if (timeLeft <= 10) return 'text-amber-500'
    return 'text-emerald-500'
  }

  return (
    <div className="relative w-14 h-14">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className="text-gray-200 dark:text-gray-700"
          strokeDasharray={circumference}
        />
        <circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="none"
          className={`${getColor()} transition-all duration-1000 ease-linear`}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className={`absolute inset-0 flex items-center justify-center font-mono font-bold ${getColor()} ${
        timeLeft <= 5 ? 'animate-pulse' : ''
      }`}>
        {timeLeft}
      </div>
    </div>
  )
}