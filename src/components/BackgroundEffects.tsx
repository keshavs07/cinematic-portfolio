import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const circles = [...Array(8)]

const BackgroundEffects = () => {

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {

    const move = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', move)

    return () => {
      window.removeEventListener('mousemove', move)
    }

  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

      {/* Mouse Glow */}
      <motion.div
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 120,
        }}
        className="absolute w-[400px] h-[400px] rounded-full bg-red-900/20 blur-[120px]"
      />

      {/* Floating Circles */}
      {circles.map((_, index) => (
        <motion.div
          key={index}
          animate={{
            y: [0, -60, 0],
            x: [0, 40, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10 + index,
            repeat: Infinity,
          }}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${200 + index * 40}px`,
            height: `${200 + index * 40}px`,
            background: 'rgba(139,0,0,0.12)',
            top: `${index * 10}%`,
            left: `${index * 12}%`,
          }}
        />
      ))}

    </div>
  )
}

export default BackgroundEffects