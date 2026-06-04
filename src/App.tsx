import { useEffect } from 'react'
import Lenis from 'lenis'

import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Portfolio from './components/Portfolio'
import Reels from './components/Reels'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import BackgroundEffects from './components/BackgroundEffects'

function App() {

  useEffect(() => {

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

  }, [])

  return (
    <>
      <div className="noise" />

      <Loader />

      <BackgroundEffects />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Reels />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App