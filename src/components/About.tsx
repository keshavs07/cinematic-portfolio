import React from 'react'
import { motion } from 'framer-motion'

const timeline = [
  'Concept & Scripting',
  'Rough Cut & Storyboard',
  'Color Grading & FX',
  'Final Delivery',
]

const About: React.FC = () => {
  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          <div>
            <h2 className="section-title text-glow">About Me</h2>
            <p className="mt-6 text-zinc-300 leading-relaxed">
              I craft cinematic edits, motion graphics  focused on
              storytelling and impact. Available for freelance and commercial
              projects.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-8 text-glow">Creative Workflow</h3>

            <div className="space-y-6">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-5"
                >
                  <div className="w-4 h-4 rounded-full bg-red-800" />
                  <div className="text-zinc-200">{item}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default About