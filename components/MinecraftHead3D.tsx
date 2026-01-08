'use client'

import { useState } from 'react'

interface MinecraftHead3DProps {
  username: string
  size?: number
}

const MinecraftHead3D = ({ username, size = 56 }: MinecraftHead3DProps) => {
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0)
  
  // Используем несколько источников для получения головы
  const headUrls = [
    `https://mc-heads.net/head/${username}/${size * 2}`,
    `https://crafatar.com/renders/head/${username}?size=${size * 2}&overlay&default=MHF_Steve`,
    `https://crafatar.com/avatars/${username}?size=${size * 2}&overlay`,
    `https://visage.surgeplay.com/head/${size}/${username}`
  ]

  const handleError = () => {
    if (currentUrlIndex < headUrls.length - 1) {
      setCurrentUrlIndex(currentUrlIndex + 1)
    }
  }

  return (
    <div className="relative rounded-full overflow-hidden mt-2 hover:opacity-90 hover:cursor-grab hover:scale-110 smooth active:opacity-80 active:scale-120 active:cursor-grabbing flex items-center justify-center" style={{ width: `${size}px`, height: `${size}px` }}>
      <img
        key={currentUrlIndex}
        src={headUrls[currentUrlIndex]}
        alt={`3D Minecraft head of ${username}`}
        className="w-full h-full object-cover rounded-full"
        onError={handleError}
        loading="eager"
      />
    </div>
  )
}

export default MinecraftHead3D
