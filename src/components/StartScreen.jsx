import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function StartScreen({ onStart }) {
  const [questionCount, setQuestionCount] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(questionCount);
  };

  return (
    <motion.div 
      className="p-8 bg-white shadow-2xl dark:bg-gray-800 rounded-2xl"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8 text-center">
        <h1 className="mb-3 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          Web Dev Quiz
        </h1>
        <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
          Test your web development knowledge
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            Number of Questions: {questionCount}
          </label>
          <input
            type="range"
            min="5"
            max="20"
            value={questionCount}
            onChange={(e) => setQuestionCount(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-indigo-600"
          />
          <div className="flex justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
          </div>
        </div>

        <motion.button
          type="submit"
          className="w-full py-3.5 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center"
          whileHover={{ y: -2, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Quiz
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </motion.button>
      </form>
    </motion.div>
  );
}