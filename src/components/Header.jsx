import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'

export default function Header({ theme, toggleTheme }) {
  return (
    <header className="container px-4 pt-6 mx-auto">
      <div className="flex items-center justify-between">
        <motion.h1 
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          DevQuiz Pro
        </motion.h1>
        
        <motion.button
          onClick={toggleTheme}
          className="p-2 transition-all rounded-full shadow-sm bg-white/20 backdrop-blur-sm dark:bg-gray-700/50 hover:bg-white/30 dark:hover:bg-gray-600/50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === 'light' ? (
            <MoonIcon className="w-6 h-6 text-gray-700" />
          ) : (
            <SunIcon className="w-6 h-6 text-yellow-300" />
          )}
        </motion.button>
      </div>
      
      <motion.div 
        className="h-px my-4 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8 }}
      />
    </header>
  )
}
