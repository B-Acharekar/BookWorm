import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2 rounded-full border border-border bg-surface text-text hover:bg-bg transition-colors shadow-sm"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} className="text-warning" />}
    </motion.button>
  );
};

export default ThemeToggle;
