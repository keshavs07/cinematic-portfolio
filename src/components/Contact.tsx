import React from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaInstagram } from 'react-icons/fa'

const socials = [
  {
    title: 'Email',
    value: 'Kambojbhavya1@gmail.com',
    link: 'mailto:Kambojbhavya1@gmail.com',
    icon: <FaEnvelope />,
  },
  {
    title: 'Phone',
    value: '+91 7015512421',
    link: 'tel:+917015512421',
    icon: <FaPhone />,
  },
  {
    title: 'Instagram',
    value: '@itsbhavyak',
    link: 'https://www.instagram.com/itsbhavyak?igsh=d2JyMDhyZ2diM3Jz',
    appLink: 'instagram://user?username=itsbhavyak',
    icon: <FaInstagram />,
  },
]

const Contact: React.FC = () => {
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>, item: any) => {
    if (!item?.appLink) return
    const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    if (!isMobile) return
    e.preventDefault()
    try {
      window.location.href = item.appLink
    } catch (_) {
      /* ignore */
    }
    setTimeout(() => {
      window.open(item.link, '_blank', 'noopener,noreferrer')
    }, 800)
  }
  return (
    <section id="contact" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="section-title text-center text-glow mb-12"
        >
          Contact
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {socials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass rounded-2xl p-8 text-center"
            >
              <div className="text-4xl text-red-700 mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
              {item.link ? (
                <a
                  href={item.link}
                  target={item.link?.startsWith('mailto:') || item.link?.startsWith('tel:') ? undefined : '_blank'}
                  rel={item.link?.startsWith('mailto:') || item.link?.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                  onClick={(e) => handleContactClick(e, item)}
                  className="text-zinc-400 hover:underline"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-zinc-400">{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-3xl font-bold text-glow mb-4">Ready To Create?</h3>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            Send a message and let’s discuss your next cinematic project.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact