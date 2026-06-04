import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({
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
    <motion.div
      animate={{
        x: position.x - 60,
        y: position.y - 40,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 200,
      }}
      className="fixed top-0 left-0 w-32 h-20 rounded-2xl overflow-hidden pointer-events-none z-50 border border-red-900 red-glow hidden md:block"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      >
        <source src="/videos/cursor-preview.mp4" type="video/mp4" />
      </video>
    </motion.div>
  )
}

export default CursorFollower