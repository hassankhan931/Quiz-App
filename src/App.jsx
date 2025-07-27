import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { questions } from './data/questions'
import Header from './components/Header'
import StartScreen from './components/StartScreen'
import Quiz from './components/Quiz'
import Result from './components/Result'
import Confetti from 'react-confetti'

export default function App() {
  const [quizState, setQuizState] = useState('start')
  const [questionCount, setQuestionCount] = useState(10)
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(
    () => parseInt(localStorage.getItem('highScore')) || 0
  )
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [timeLeft, setTimeLeft] = useState(15)
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  )
  const [showConfetti, setShowConfetti] = useState(false)

  // Theme handling
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Prepare quiz questions
  const startQuiz = (count) => {
    // Reset all quiz-related states
    setCurrentQuestionIndex(0)
    setSelectedOption(null)
    setScore(0)
    setAnsweredQuestions([])
    setTimeLeft(15)
    setShowConfetti(false)

    // Shuffle all questions and take the requested count
    const shuffled = [...questions].sort(() => 0.5 - Math.random())
    const selectedQuestions = shuffled.slice(0, count)
    
    setFilteredQuestions(selectedQuestions)
    setQuestionCount(count)
    setQuizState('quiz')
  }

  // Timer logic
  useEffect(() => {
    let timer
    if (quizState === 'quiz' && timeLeft > 0 && filteredQuestions.length > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (timeLeft === 0 && quizState === 'quiz' && filteredQuestions.length > 0) {
      handleAnswer(null)
    }
    return () => clearTimeout(timer)
  }, [timeLeft, quizState, filteredQuestions])

  const handleAnswer = (option) => {
    // Prevent answering if already answered
    if (selectedOption !== null) return
    
    const isCorrect = option === filteredQuestions[currentQuestionIndex]?.correctAnswer
    const newScore = isCorrect ? score + 1 : score
    
    setAnsweredQuestions([...answeredQuestions, {
      ...filteredQuestions[currentQuestionIndex],
      userAnswer: option,
      isCorrect,
      timeSpent: 15 - timeLeft
    }])
    
    setScore(newScore)
    setSelectedOption(option)
    
    if (newScore > highScore) {
      setHighScore(newScore)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
      localStorage.setItem('highScore', newScore)
    }

    setTimeout(() => {
      if (currentQuestionIndex < filteredQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedOption(null)
        setTimeLeft(15)
      } else {
        setQuizState('results')
      }
    }, 1500)
  }

  const restartQuiz = () => {
    setQuizState('start')
    setShowConfetti(false)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'light' 
        ? 'bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50' 
        : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    }`}>
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}
      
      <Header theme={theme} toggleTheme={toggleTheme} />
      
      <div className="container max-w-3xl px-4 py-8 mx-auto">
        <AnimatePresence mode="wait">
          {quizState === 'start' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <StartScreen onStart={startQuiz} />
            </motion.div>
          )}
          
          {quizState === 'quiz' && filteredQuestions.length > 0 && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Quiz
                question={filteredQuestions[currentQuestionIndex]}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={filteredQuestions.length}
                selectedOption={selectedOption}
                timeLeft={timeLeft}
                onAnswer={handleAnswer}
              />
            </motion.div>
          )}
          
          {quizState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Result
                score={score}
                highScore={highScore}
                totalQuestions={filteredQuestions.length}
                answeredQuestions={answeredQuestions}
                onRestart={restartQuiz}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
            {/* Animated signature footer */}
      <motion.footer 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring' }}
        className="py-6 text-center"
      >
        <div className="inline-flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Crafted with
          </span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-lg text-red-500"
          >
            ♥
          </motion.span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            by
          </span>
          <span className="font-medium text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text">
            Hassan Khan
          </span>
        </div>
      </motion.footer>
    </div>
  )
}