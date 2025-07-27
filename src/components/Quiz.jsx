import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Timer from './Timer'

export default function Quiz({ question, questionNumber, totalQuestions, selectedOption, timeLeft, onAnswer }) {
  // Reset local state when question changes
  useEffect(() => {
    // This ensures each question starts fresh
  }, [question])

  const getOptionClasses = (option) => {
    let base = 'flex items-start w-full p-4 mb-3 rounded-xl border-2 text-left transition-all duration-200 '
    
    if (selectedOption !== null) {
      if (option === question.correctAnswer) {
        base += 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-inner shadow-emerald-200/50 '
      } else if (option === selectedOption) {
        base += 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 shadow-inner shadow-rose-200/50 '
      } else {
        base += 'border-gray-200 dark:border-gray-600 opacity-70 '
      }
    } else {
      base += 'border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-700 '
    }
    
    return base
  }

  return (
    <motion.div 
      className="overflow-hidden bg-white shadow-xl dark:bg-gray-800 rounded-2xl"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 text-xs font-bold text-white bg-indigo-600 rounded-full">
              {question.category}
            </span>
            <span className="px-2 py-1 text-xs bg-gray-100 rounded-md dark:bg-gray-700">
              {question.difficulty}
            </span>
          </div>
          <Timer timeLeft={timeLeft} />
        </div>
        
        <div className="w-full h-2 mb-6 bg-gray-200 rounded-full dark:bg-gray-700">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
        
        <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-gray-100">
          {question.text}
        </h2>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              className={getOptionClasses(option)}
              onClick={() => selectedOption === null && onAnswer(option)}
              disabled={selectedOption !== null}
              whileHover={selectedOption === null ? { y: -2 } : {}}
              whileTap={selectedOption === null ? { scale: 0.98 } : {}}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <span className="mr-3 font-bold text-indigo-600 dark:text-indigo-400">
                {String.fromCharCode(65 + index)}.
              </span>
              <span>{option}</span>
            </motion.button>
          ))}
        </div>
      </div>
      
      {selectedOption !== null && (
        <motion.div 
          className="p-4 border-t border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="mb-1 font-bold text-blue-800 dark:text-blue-200">Explanation:</h3>
          <p className="text-blue-700 dark:text-blue-300">{question.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  )
}