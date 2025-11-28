'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  containerClassName?: string
  animated?: boolean
  hoverEffect?: boolean
  rounded?: boolean
  shadow?: boolean
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="20%" />
      <stop stop-color="#edeef1" offset="50%" />
      <stop stop-color="#f6f7f8" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str)

export default function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 75,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  containerClassName,
  animated = true,
  hoverEffect = true,
  rounded = true,
  shadow = true,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoading(false)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }, [onError])

  const imageClassName = cn(
    'transition-all duration-500 ease-in-out',
    {
      'opacity-0': isLoading,
      'opacity-100': !isLoading,
      'rounded-lg': rounded,
      'shadow-lg': shadow,
      'hover:scale-105 hover:shadow-xl': hoverEffect,
    },
    className
  )

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  const ImageComponent = (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      quality={quality}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={
        blurDataURL || `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`
      }
      onLoad={handleLoad}
      onError={handleError}
      className={imageClassName}
    />
  )

  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400',
          {
            'rounded-lg': rounded,
            'shadow-lg': shadow,
          },
          containerClassName
        )}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-sm">Failed to load image</p>
        </div>
      </div>
    )
  }

  if (animated) {
    return (
      <motion.div
        className={cn('relative overflow-hidden', containerClassName)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        whileHover={hoverEffect ? { scale: 1.02 } : undefined}
        transition={{ duration: 0.3 }}
      >
        {isLoading && (
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 animate-pulse',
              {
                'rounded-lg': rounded,
              }
            )}
          >
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}
        {ImageComponent}
      </motion.div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {isLoading && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 animate-pulse',
            {
              'rounded-lg': rounded,
            }
          )}
        >
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-neutral-300 dark:bg-neutral-600 rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
      {ImageComponent}
    </div>
  )
}
