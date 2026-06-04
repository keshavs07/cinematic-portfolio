import React from 'react'
import { motion } from 'framer-motion'

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center px-6">

      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/60 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative z-10 text-center max-w-5xl"
      >
        <motion.h1
          initial={{ letterSpacing: '20px', opacity: 0 }}
          animate={{ letterSpacing: '4px', opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="text-5xl md:text-7xl font-black uppercase leading-none text-glow"
        >
          Video Editor
          <br />
          <span className="text-red-700">& 3D Animator</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-zinc-300 text-lg md:text-xl max-w-3xl mx-auto"
        >
          Creating cinematic edits, immersive motion graphics and 3D visuals
          that elevate storytelling.
        </motion.p>

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <a href="#portfolio" className="px-8 py-4 rounded-full red-gradient font-semibold hover:scale-105 transition-all duration-300 red-glow">
            View Portfolio
          </a>

          <a href="#contact" className="px-8 py-4 rounded-full border border-red-900 hover:bg-red-900/20">
            Contact
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero