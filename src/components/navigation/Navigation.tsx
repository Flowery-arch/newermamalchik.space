'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Home, FolderOpen, User, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  onSearchChange?: (query: string) => void
  showSearch?: boolean
}

export default function Navigation({ onSearchChange, showSearch = false }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const { t, language } = useLanguage()
  const pathname = usePathname()

  const navItems = [
    {
      href: '/',
      icon: Home,
      label: t('nav.home') || 'Home',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      href: '/projects',
      icon: FolderOpen,
      label: t('nav.projects') || 'Projects',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      href: '/about',
      icon: User,
      label: t('nav.about') || 'About',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      href: '/contact',
      icon: MessageCircle,
      label: t('nav.contact') || 'Contact',
      gradient: 'from-orange-500 to-red-500',
    },
  ]

  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query)
      onSearchChange?.(query)
    },
    [onSearchChange],
  )

  const toggleMenu = () => setIsOpen(!isOpen)

  const closeMenu = () => setIsOpen(false)

  // Close menu on route change
  useEffect(() => {
    closeMenu()
  }, [pathname])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu()
        setIsSearchFocused(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      {/* Desktop Navigation */}
      <nav className='fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border-b border-neutral-200/50 dark:border-neutral-800/50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/* Logo */}
            <motion.div
              className='flex items-center'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href='/' className='flex items-center gap-2'>
                <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center'>
                  <span className='text-white font-bold text-sm'>N</span>
                </div>
                <span className='text-xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent'>
                  newermamalchik
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation Items */}
            <div className='hidden md:flex items-center gap-1'>
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'text-white shadow-lg'
                          : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId='activeTab'
                          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.gradient}`}
                          initial={false}
                          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <Icon className='w-4 h-4 relative z-10' />
                      <span className='text-sm font-medium relative z-10'>{item.label}</span>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            {/* Search Bar */}
            {showSearch && (
              <motion.div
                className='hidden md:flex items-center'
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className='relative'>
                  <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4' />
                  <input
                    type='text'
                    placeholder={t('nav.search') || 'Search...'}
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`pl-10 pr-4 py-2 rounded-xl border transition-all duration-300 ${
                      isSearchFocused
                        ? 'border-blue-500 ring-2 ring-blue-500/20 bg-white dark:bg-neutral-800'
                        : 'border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800/50'
                    } text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none`}
                  />
                </div>
              </motion.div>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={toggleMenu}
              className='md:hidden p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode='wait'>
                {isOpen ? (
                  <motion.div
                    key='close'
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className='w-5 h-5' />
                  </motion.div>
                ) : (
                  <motion.div
                    key='menu'
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className='w-5 h-5' />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 z-40 md:hidden'
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute inset-0 bg-black/50 backdrop-blur-sm'
              onClick={closeMenu}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className='absolute right-0 top-0 h-full w-80 bg-white dark:bg-neutral-900 shadow-2xl'
            >
              <div className='p-6 pt-20'>
                {/* Mobile Search */}
                {showSearch && (
                  <div className='relative mb-6'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4' />
                    <input
                      type='text'
                      placeholder={t('nav.search') || 'Search...'}
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className='w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                    />
                  </div>
                )}

                {/* Mobile Navigation Items */}
                <div className='space-y-3'>
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                            isActive
                              ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                              : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                          }`}
                        >
                          <Icon className='w-5 h-5' />
                          <span className='font-medium'>{item.label}</span>
                        </Link>
                      </motion.div>
                    )
                  })}
                </div>

                {/* Mobile Social Links */}
                <div className='mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-700'>
                  <div className='flex gap-3'>
                    <motion.a
                      href='https://t.me/mkphotoss'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex-1 p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center font-medium shadow-lg'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Telegram
                    </motion.a>
                    <motion.a
                      href='https://discord.com/users/660534347429969931'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex-1 p-3 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center font-medium shadow-lg'
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Discord
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navigation */}
      <div className='h-16' />
    </>
  )
}
