'use client'

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6"
    >
      <div className="flex items-center gap-4">
        <Image
          src="/avatar.jpg"
          alt="Profile"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">Mikhail</h1>
          <div className="flex items-center gap-2">
            <span className="status-dot online"></span>
            <span className="text-sm text-gray-400">Available for hire</span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-300">
        Full-stack developer passionate about creating beautiful and functional web applications.
      </p>
      <div className="mt-4 flex gap-4">
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition-colors"
        >
          LinkedIn
        </a>
      </div>
    </motion.div>
  );
} 