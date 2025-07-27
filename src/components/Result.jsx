// src/components/Result.jsx
import { motion } from 'framer-motion'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'

export default function Result({ score, totalQuestions, highScore, answeredQuestions, onRestart }) {
  const percentage = Math.round((score / totalQuestions) * 100)
  
  const getResultColor = () => {
    if (percentage >= 80) return 'from-emerald-500 to-emerald-600'
    if (percentage >= 50) return 'from-amber-500 to-amber-600'
    return 'from-rose-500 to-rose-600'
  }

  return (
    <motion.div 
      className="overflow-hidden bg-white shadow-xl dark:bg-gray-800 rounded-2xl"
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-800 dark:text-gray-100">
            Quiz Completed!
          </h2>
          <div className={`text-5xl font-bold bg-gradient-to-r ${getResultColor()} bg-clip-text text-transparent mb-2`}>
            {percentage}%
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            You scored {score} out of {totalQuestions}
          </p>
          {score === highScore ? (
            <p className="mt-2 font-medium text-emerald-600 dark:text-emerald-400">
              New High Score! 🎉
            </p>
          ) : (
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Your best: {highScore}/{totalQuestions}
            </p>
          )}
        </div>
        
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-gray-100">
            Question Review
          </h3>
          <div className="space-y-4">
            {answeredQuestions.map((q, index) => (
              <div 
                key={index}
                className="p-4 border border-gray-200 rounded-lg dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-gray-800 dark:text-gray-200">
                    {q.text}
                  </p>
                  {q.isCorrect ? (
                    <CheckIcon className="flex-shrink-0 w-5 h-5 text-emerald-500" />
                  ) : (
                    <XMarkIcon className="flex-shrink-0 w-5 h-5 text-rose-500" />
                  )}
                </div>
                <p className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Correct:</span> {q.correctAnswer}
                </p>
                {!q.isCorrect && (
                  <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium">Your answer:</span> {q.userAnswer || 'Skipped'}
                  </p>
                )}
                <p className="text-sm italic text-gray-500 dark:text-gray-400">
                  Time taken: {q.timeSpent}s • Difficulty: {q.difficulty}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={onRestart}
          className="w-full py-3 font-bold text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          Start New Quiz
        </button>
      </div>
    </motion.div>
  )
}