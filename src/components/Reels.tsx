import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import { FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa'
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
    src: 'https://res.cloudinary.com/duahogwco/video/upload/q_auto/f_auto/v1781069211/IMG_0550_yxhewh.mp4',
    type: 'video/mp4',
  },
]

const Reels: React.FC = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [items, setItems] = useState<VideoItem[]>(defaultReels)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [volume, setVolume] = useState<number>(0)

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
      setPlayingIndex(index)
    }
  }

  const handleMouseLeave = (index: number) => {
    const video = videoRefs.current[index]
    if (video && !document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      video.pause()
      setPlayingIndex((prev) => (prev === index ? null : prev))
    }
  }

  const handleFullscreen = (index: number) => {
    const video = videoRefs.current[index]
    const container = video?.parentElement as any
    if (!container || !video) return

    if (!document.fullscreenElement && !(document as any).webkitFullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch((err: any) => console.error(err))
      } else if ((video as any).webkitEnterFullscreen) {
        (video as any).webkitEnterFullscreen() // iOS Safari fallback
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen()
      }
    }
  }

  useEffect(() => {
    if (playingIndex === null) return
    const videoElement = videoRefs.current[playingIndex]
    const onEnded = () => setPlayingIndex(null)
    videoElement?.addEventListener('ended', onEnded)
    return () => {
      videoElement?.removeEventListener('ended', onEnded)
    }
  }, [playingIndex])

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.volume = volume
        video.muted = volume === 0
      }
    })
  }, [volume])

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

        <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 snap-x hide-scrollbar h-[65vh] md:h-[70vh]">
          {items.map((item, index) => (
            <motion.div
              key={`${item.src}-${index}`}
              className="w-[80vw] md:w-[320px] group flex-shrink-0 h-full rounded-3xl glass p-4 md:p-6 snap-center relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
              viewport={{ once: true }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="relative overflow-hidden rounded-2xl md:rounded-3xl h-full bg-zinc-900">
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el
                  }}
                  className="w-full h-full object-cover"
                  playsInline
                  preload="metadata"
                >
                  <source src={item.src} type={item.type} />
                  Your browser does not support video previews.
                </video>

                <div 
                  className="absolute right-3 bottom-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => setVolume(volume === 0 ? 1 : 0)} className="text-white hover:text-red-500 transition-colors">
                    {volume === 0 ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-16 md:w-20 accent-red-700 cursor-pointer"
                  />
                  <button onClick={() => handleFullscreen(index)} className="text-white hover:text-red-500 transition-colors ml-2">
                    <FaExpand size={16} />
                  </button>
                </div>

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>

              <div className="mt-4 md:mt-5 px-2">
                <h3 className="text-xl md:text-2xl font-bold text-white">{item.title}</h3>
                <p className="text-zinc-400 mt-1 md:mt-2 text-sm md:text-base">{item.desc}</p>
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
