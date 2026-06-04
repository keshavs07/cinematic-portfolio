import React from 'react'
import { motion } from 'framer-motion'
import { SiBlender } from 'react-icons/si'
import { TbBrandAdobePremier, TbBrandAdobeAfterEffect } from 'react-icons/tb'
import { AiOutlineAudio } from 'react-icons/ai'

const tools = [
  { name: 'Editing', detail: 'Premiere Pro / FCPX', icon: <TbBrandAdobePremier /> },
  { name: 'Motion', detail: 'After Effects / Motion', icon: <TbBrandAdobeAfterEffect /> },
  { name: '3D', detail: 'Blender / Cinema4D', icon: <SiBlender /> },
  { name: 'Sound', detail: 'Mixing & Design', icon: <AiOutlineAudio /> },
]

const Skills: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
          <h2 className="section-title text-glow">Creative Expertise</h2>
          <p className="mt-6 text-zinc-400 max-w-3xl mx-auto text-lg">Editing, motion, 3D and sound production crafted to elevate cinematic storytelling, social reels, and immersive visuals.</p>
        </motion.div>

<div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {tools.map((tool, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }} className="glass rounded-2xl p-8 text-center">
              <div className="text-5xl text-red-700 mb-4">{tool.icon}</div>
              <h3 className="text-xl font-bold text-zinc-200 mb-2">{tool.name}</h3>
              <p className="text-zinc-400">{tool.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="glass rounded-2xl p-8">
            <h3 className="text-3xl font-black text-glow mb-4">What I Create</h3>
            <div className="space-y-6">
              <div className="border-l-4 border-red-700 pl-5">
                <h4 className="text-2xl font-bold mb-2">Cinematic Edits</h4>
                <p className="text-zinc-400">High-energy storytelling with cinematic transitions and emotional pacing.</p>
              </div>
              <div className="border-l-4 border-red-700 pl-5">
                <h4 className="text-2xl font-bold mb-2">Viral Social Media Reels</h4>
                <p className="text-zinc-400">Fast-paced edits optimized for retention, engagement and audience growth.</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="glass rounded-2xl p-8">
            <h3 className="text-3xl font-black text-glow mb-4">Approach</h3>
            <p className="text-zinc-400">I combine strong editing fundamentals with motion design and 3D to create memorable visuals tailored for each platform.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills
         