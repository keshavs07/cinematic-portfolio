import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import { FaVolumeUp, FaVolumeMute, FaExpand } from 'react-icons/fa'
import { storage } from '../firebase'

type PortfolioVideo = {
  title: string
  src: string
  type: string
}

const defaultPortfolioVideos: PortfolioVideo[] = [
  // These URLs should be replaced with actual Firebase Storage download URLs
  // After uploading portfolio videos to Firebase Storage
  // Format: https://firebasestorage.googleapis.com/v0/b/YOUR_BUCKET/o/portfolio%2FIMG_6018.mp4?alt=media&token=YOUR_TOKEN
  // For now, using public path as fallback
  {
    title: 'Commercial Editing',
    src: 'https://res.cloudinary.com/duahogwco/video/upload/v1781165952/IMG_6018-compressed_ma2mpa.mp4',
    type: 'video/mp4',
  },
  {
    title: 'Cinematic Editing',
    src: 'https://res.cloudinary.com/duahogwco/video/upload/v1781166412/IMG_7730-compressed_qntiee.mp4',
    type: 'video/mp4',
  },
]

const Portfolio: React.FC = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [portfolioVideos, setPortfolioVideos] = useState<PortfolioVideo[]>(defaultPortfolioVideos)
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)
  const [volume, setVolume] = useState<number>(0)

  useEffect(() => {

    const loadPortfolioVideos = async () => {
      try {
        const listRef = storageRef(storage, 'portfolio')
        const result = await listAll(listRef)
        const remoteVideos = await Promise.all(
          result.items.map(async (item) => {
            const url = await getDownloadURL(item)
            return {
              title: item.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
              src: url,
              type: 'video/mp4',
            }
          })
        )

        if (remoteVideos.length > 0) {
          setPortfolioVideos(remoteVideos)
        }
      } catch (error) {
        console.error('Could not load remote portfolio videos:', error)
      }
    }

    void loadPortfolioVideos()
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
    <section id="portfolio" className="min-h-screen py-12 md:py-20">
      <div className="h-full max-w-7xl mx-auto px-4 md:px-6">
        <motion.h2 className="text-white text-center text-4xl md:text-5xl font-semibold mb-8 md:mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Portfolio
        </motion.h2>

        <div className="grid gap-6 md:gap-8 grid-cols-1">
          {portfolioVideos.map((project, idx) => (
              <motion.div
                key={`${project.src}-${idx}`}
                className="relative group overflow-hidden rounded-2xl md:rounded-[2rem] bg-black h-[35vh] sm:h-[50vh] md:h-[60vh] lg:h-[75vh]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                viewport={{ once: true }}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={() => handleMouseLeave(idx)}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el
                  }}
                  className="w-full h-full object-cover"
                  playsInline
                  preload="metadata"
                >
                  <source src={project.src} type={project.type} />
                  Your browser does not support video previews.
                </video>

                <div 
                  className="absolute right-4 bottom-4 md:right-8 md:bottom-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button onClick={() => setVolume(volume === 0 ? 1 : 0)} className="text-white hover:text-red-500 transition-colors">
                    {volume === 0 ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-20 md:w-24 accent-red-700 cursor-pointer"
                  />
                  <button onClick={() => handleFullscreen(idx)} className="text-white hover:text-red-500 transition-colors ml-2 md:ml-3">
                    <FaExpand size={18} />
                  </button>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute left-4 bottom-4 md:left-8 md:bottom-8 text-white pointer-events-none">
                  <h3 className="text-xl sm:text-2xl md:text-4xl font-semibold tracking-tight">{project.title}</h3>
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
