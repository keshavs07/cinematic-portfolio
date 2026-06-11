import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import { storage } from '../firebase'

type VideoItem = {
  title: string
  desc: string
  src: string
  type: string
}

const defaultReels: VideoItem[] = [
  // These URLs should be replaced with actual Firebase Storage download URLs
  // After uploading reel videos to Firebase Storage
  // Format: https://firebasestorage.googleapis.com/v0/b/YOUR_BUCKET/o/reels%2FIMG_0550.mp4?alt=media&token=YOUR_TOKEN
  // For now, using public path as fallback
  {
    title: 'Cinematic Reel',
    desc: 'Viral Editing Style',
    src: 'https://res.cloudinary.com/duahogwco/video/upload/v1781069174/Video-418_geekic.mp4',
    type: 'video/mp4',
  },
  {
    title: 'VFX Reel',
    desc: 'Compositing & FX',
    src: 'https://res.cloudinary.com/duahogwco/video/upload/v1781069188/Video-314_fdjoev.mp4',
    type: 'video/mp4',
  },
  {
    title: '3D Reel',
    desc: 'Animation & Motion',
    src: 'https://res.cloudinary.com/duahogwco/video/upload/v1781069211/IMG_0550_yxhewh.mp4',
    type: 'video/mp4',
  },
]

const Reels: React.FC = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [items, setItems] = useState<VideoItem[]>(defaultReels)

  useEffect(() => {

    const loadReels = async () => {
      try {
        const listRef = storageRef(storage, 'reels')
        const result = await listAll(listRef)
        const remoteItems = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item)
            return {
              title: item.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
              desc: 'Uploaded reel from Firebase Storage',
              src: url,
              type: 'video/mp4',
            }
          })
        )

        if (remoteItems.length > 0) {
          setItems(remoteItems)
        }
      } catch (error) {
        console.error('Could not load remote reels:', error)
      }
    }

    void loadReels()
  }, [])

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

        <div className="grid gap-8 lg:grid-cols-1">
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x hide-scrollbar h-[70vh]">
            {items.map((item, index) => (
              <motion.div
                key={`${item.src}-${index}`}
                className="min-w-[320px] h-full rounded-3xl glass p-6 snap-center"
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
                    controls
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
