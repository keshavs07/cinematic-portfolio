import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
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
    <section id="portfolio" className="min-h-screen py-10">
      <div className="h-full max-w-7xl mx-auto px-6">
        <motion.h2 className="text-white text-center text-5xl font-semibold mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Portfolio
        </motion.h2>

        <div className="grid gap-8 lg:grid-cols-1">
          {portfolioVideos.map((project, idx) => (
              <motion.div
                key={`${project.src}-${idx}`}
                className="relative overflow-hidden rounded-[2rem] bg-black h-[75vh]"
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
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                >
                  <source src={project.src} type={project.type} />
                  Your browser does not support video previews.
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
                <div className="absolute left-8 bottom-8 text-white">
                  <h3 className="text-4xl font-semibold tracking-tight">{project.title}</h3>
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
