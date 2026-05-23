import Gallery from '../components/Gallery'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

export default function GalleryPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-4 px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 glow-center opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label mb-4">
            Visual Journey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-luxury text-shimmer mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-inter text-gray-500 max-w-xl mx-auto"
          >
            A curated gallery of our finest lighting installations, festival setups, and home decor moments.
          </motion.p>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }} className="mt-6 h-px max-w-sm mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #2563EB, transparent)' }} />
        </div>
      </section>

      <Gallery limit={100} compact />
      <Footer />
    </>
  )
}
