'use client';

import { motion } from 'framer-motion';

export default function GitHubStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6"
    >
      <h2 className="text-xl font-bold mb-4">GitHub Stats</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Repositories</span>
          <span className="text-lg font-mono">20</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Contributions</span>
          <span className="text-lg font-mono">1,234</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Stars</span>
          <span className="text-lg font-mono">56</span>
        </div>
      </div>
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-4 text-sm text-gray-400 hover:text-white transition-colors"
      >
        View Profile →
      </a>
    </motion.div>
  );
} 