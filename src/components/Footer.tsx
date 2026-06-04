import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 border-t border-zinc-800 overflow-hidden">

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center"
      >

        <h2 className="text-4xl md:text-6xl font-black uppercase text-glow mb-6">
          Cinematic Vision
        </h2>

        <p className="text-zinc-500 text-lg">
          Professional Video Editing • Motion Graphics • 3D Animation
        </p>

        <div className="mt-10 h-[1px] w-full bg-gradient-to-r from-transparent via-red-900 to-transparent" />

        <p className="mt-10 text-zinc-600">
          © 2026 Cinematic Portfolio — Designed With Motion & Storytelling.
        </p>

      </motion.div>

    </footer>
  )
}

export default Footer