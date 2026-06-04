import React, { useRef } from 'react'
import { motion } from 'framer-motion'

const Reels: React.FC = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  const items = [
    {
      title: 'Cinematic Reel',
      desc: 'Viral Editing Style',
      src: '/videos/reels/Video-314.mp4',
      type: 'video/mp4',
    },
    {
      title: 'VFX Reel',
      desc: 'Compositing & FX',
      src: '/videos/reels/Video-418.mp4',
      type: 'video/mp4',
    },
    {
      title: '3D Reel',
      desc: 'Animation & Motion',
      src: '/videos/reels/IMG_0550.mp4',
      type: 'video/mp4',
    },
  ]

  const handleMouseEnter = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      void video.play().catch(() => {})
    }
  }

  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index]
    if (video) {
      video.pause()
      video.currentTime = 0
    }
  }

  return (
    <section className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6 h-full">
        <motion.h2
          className="section-title text-glow text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Reels
        </motion.h2>

        <div className="flex gap-6 overflow-x-auto pb-6 snap-x hide-scrollbar min-h-[70vh]">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="min-w-[320px] h-[70vh] rounded-3xl glass p-6 snap-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="relative overflow-hidden rounded-3xl h-full bg-zinc-900">
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el
                  }}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                >
                  <source src={item.src} type={item.type} />
                  Your browser does not support video previews.
                </video>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              <div className="mt-5 px-2">
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-zinc-400 mt-2">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 overflow-hidden border-y border-red-900/30 py-6">
          <motion.div
            animate={{ x: ['0%', '-100%'] }}
            transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
            className="flex whitespace-nowrap gap-16 text-4xl font-black uppercase text-red-800/40"
          >
            <span>Cinematic Editing</span>
            <span>Commercial Reels</span>
            <span>Visual Storytelling</span>
            <span>Viral Shorts</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Reels