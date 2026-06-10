import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { getDownloadURL, listAll, ref as storageRef } from 'firebase/storage'
import { storage } from '../firebase'
import VideoUpload from './VideoUpload'

type PortfolioVideo = {
  title: string
  src: string
  type: string
}

const defaultPortfolioVideos: PortfolioVideo[] = [
  {
    title: 'Commercial Editing',
    src: '/videos/cinematic/IMG_6018.mp4',
    type: 'video/mp4',
  },
  {
    title: 'Cinematic Editing',
    src: '/videos/cinematic/IMG_7730.mp4',
    type: 'video/mp4',
  },
]

const Portfolio: React.FC = () => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [portfolioVideos, setPortfolioVideos] = useState<PortfolioVideo[]>(defaultPortfolioVideos)
  const [showUploader, setShowUploader] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminKey = import.meta.env.VITE_ADMIN_UPLOAD_KEY
      const queryKey = new URLSearchParams(window.location.search).get('admin')
      setShowUploader(!!adminKey && adminKey === queryKey)
    }

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

  const handleUploadComplete = (url: string, name: string, type: string) => {
    setPortfolioVideos((prev) => [
      {
        title: name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
        src: url,
        type: type || 'video/mp4',
      },
      ...prev,
    ])
  }

  return (
    <section id="portfolio" className="min-h-screen py-10">
      <div className="h-full max-w-7xl mx-auto px-6">
        <motion.h2 className="text-white text-center text-5xl font-semibold mb-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          Portfolio
        </motion.h2>

        <div className={`grid gap-8 ${showUploader ? 'lg:grid-cols-[1.4fr_0.6fr]' : 'lg:grid-cols-1'}`}>
          <div className="grid gap-8">
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

          {showUploader && (
            <div className="sticky top-28 h-fit">
              <VideoUpload folder="portfolio" label="Upload Portfolio Video" onUploadComplete={handleUploadComplete} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
