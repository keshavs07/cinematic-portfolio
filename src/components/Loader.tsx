import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black pointer-events-none"
    >
      <motion.h1
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="text-5xl md:text-7xl font-black uppercase tracking-[10px] text-glow"
      >
        Cinematic
      </motion.h1>
    </motion.div>
  )
}

export default Loader