'use client'

import { useEffect, useRef, useState } from 'react'
import { SkinViewer, WalkingAnimation } from 'skinview3d'

interface MinecraftSkin3DProps {
  username: string
  size?: number
}

const MinecraftSkin3D = ({ username, size = 600 }: MinecraftSkin3DProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState(false)
  const skinViewerRef = useRef<any>(null)

  useEffect(() => {
    const initSkinViewer = async () => {
      if (!canvasRef.current) return

      try {
        // Библиотека уже импортирована через npm

        const canvas = canvasRef.current
        const height = Math.round(size * 1.33) // 276x368 соотношение

        // Подавляем предупреждения WebGL о текстурах (не критичные ошибки)
        const originalError = console.error
        console.error = (...args: any[]) => {
          if (args[0]?.includes?.('GL_INVALID_OPERATION') && args[0]?.includes?.('glTexStorage2D')) {
            // Игнорируем это предупреждение - оно не критично
            return
          }
          originalError.apply(console, args)
        }

        // Создаем экземпляр SkinViewer
        const viewer = new SkinViewer({
          canvas: canvas,
          width: size,
          height: height,
          skin: `https://mc-heads.net/skin/${username}`,
        })

        // Восстанавливаем оригинальный console.error после инициализации
        setTimeout(() => {
          console.error = originalError
        }, 1000)

        // Настройки камеры для фронтального вида
        // Устанавливаем камеру спереди скина
        viewer.camera.position.set(0, 0, 60)
        
        // Настройки контролов для интерактивного вращения (как на NameMC)
        // В skinview3d контролы уже включены по умолчанию
        viewer.controls.enableRotate = true
        viewer.controls.enableZoom = false
        viewer.controls.enablePan = false
        
        // Ограничения углов вращения для более естественного вращения
        viewer.controls.minPolarAngle = Math.PI / 6 // Минимальный угол (30 градусов)
        viewer.controls.maxPolarAngle = Math.PI / 1.5 // Максимальный угол (120 градусов)
        
        // Начальные углы обзора - фронтальный вид (смотрит вперед)
        // phi = 90 градусов (прямо перед скином), theta = 0 (без горизонтального поворота)
        viewer.camera.position.setFromSphericalCoords(
          60, // радиус
          Math.PI / 2, // phi = 90 градусов (прямо перед скином)
          0  // theta = 0 градусов (без поворота)
        )
        viewer.controls.update()
        
        // Настройка чувствительности вращения (как на NameMC)
        viewer.controls.rotateSpeed = 1.0
        
        // Включаем анимацию ходьбы для более живого вида
        viewer.animation = new WalkingAnimation()
        viewer.animation.speed = 0.5
        
        // Обновляем рендер при изменении контролов
        const updateRender = () => {
          viewer.render()
        }
        viewer.controls.addEventListener('change', updateRender)
        
        // Запускаем цикл рендеринга
        const animate = () => {
          requestAnimationFrame(animate)
          viewer.render()
        }
        animate()

        skinViewerRef.current = viewer
      } catch (error) {
        console.error('Error initializing skin viewer:', error)
        setError(true)
      }
    }

    initSkinViewer()

    return () => {
      if (skinViewerRef.current) {
        skinViewerRef.current.dispose()
      }
    }
  }, [username, size])

  if (error) {
    return (
      <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-lg bg-gray-800 flex items-center justify-center">
        <div className="text-gray-500 text-sm text-center">Ошибка загрузки</div>
      </div>
    )
  }

  const height = Math.round(size * 1.33)

  return (
    <div ref={containerRef} className="relative w-full">
      <canvas
        ref={canvasRef}
        className="skin-3d drop-shadow auto-size align-top"
        width={size}
        height={height}
        style={{ 
          cursor: 'move',
          width: '100%',
          height: 'auto',
          maxWidth: '100%',
          display: 'block'
        }}
        data-id={username}
        data-model="classic"
        data-flip="false"
        data-theta="0"
        data-phi="90"
      />
    </div>
  )
}

export default MinecraftSkin3D

