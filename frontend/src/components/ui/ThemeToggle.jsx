import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05, x: -2, y: -2 }}
      whileTap={{ scale: 0.95, x: 0, y: 0 }}
      onClick={toggleTheme}
      className={`
        p-2 d-flex align-items-center justify-content-center
        border border-2 border-dark 
        ${theme === 'light' ? 'bg-white text-dark' : 'bg-dark text-warning'}
        transition-all
      `}
      style={{ 
        boxShadow: '4px 4px 0px 0px #000', // The "Brutal" hard shadow
        borderRadius: '4px', // Slightly rounded but still blocky
        cursor: 'pointer'
      }}
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {theme === 'light' ? (
            <FaMoon size={20} />
          ) : (
            <FaSun size={20} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;