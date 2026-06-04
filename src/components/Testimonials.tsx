import React from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    name: 'Creative Brand Agency',
    role: 'Commercial Client',
    text: 'Absolutely cinematic editing quality. Every frame feels premium and engaging.',
  },
  {
    name: 'YouTube Creator',
    role: 'Content Creator',
    text: 'Retention and storytelling improved massively. The edits look world-class.',
  },
  {
    name: 'Startup Founder',
    role: 'Business Reel Client',
    text: 'Professional motion graphics and cinematic visuals helped elevate our brand presence.',
  },
]

const Testimonials: React.FC = () => {
  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="section-title text-glow">Client Testimonials</h2>
          <p className="mt-6 text-zinc-400 max-w-3xl mx-auto text-lg">Trusted by creators, businesses and brands for cinematic editing and visual storytelling.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
          {testimonials.map((item, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.12 }} viewport={{ once: true }} className="glass rounded-2xl p-8">
              <div className="text-6xl text-red-700 mb-6">“</div>
              <p className="text-zinc-300 leading-relaxed text-lg">{item.text}</p>
              <div className="mt-8 border-t border-zinc-700 pt-6">
                <h3 className="text-2xl font-bold">{item.name}</h3>
                <p className="text-red-500 mt-2">{item.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials