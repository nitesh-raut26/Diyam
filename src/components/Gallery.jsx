import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import { galleryImages } from '../data/products'

function LightIcon({ color }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" width="48" height="48">
      <circle cx="24" cy="18" r="10" fill={color} opacity="0.65" />
      <circle cx="24" cy="18" r="5" fill="white" opacity="0.35" />
      <path d="M17 30 Q15 38 24 39 Q33 38 31 30 Q28 28 24 28 Q20 28 17 30Z" fill={color} opacity="0.4" />
      <ellipse cx="24" cy="29" rx="7" ry="2.5" fill={color} opacity="0.3" />
      <rect x="22" y="39" width="4" height="5" rx="2" fill={color} opacity="0.25" />
    </svg>
  )
}

export default function Gallery({ limit = 9 }) {
  const [lightbox, setLightbox] = useState(null)
  const images = galleryImages.slice(0, limit)

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none glow-center opacity-30" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="section-label mb-4">Project Showcase</p>
            <h2 className="heading-luxury text-gray-900 mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Light in <span className="text-shimmer">Every Frame</span>
            </h2>
            <p className="font-inter text-gray-500 max-w-xl mx-auto leading-relaxed">
              A curated visual journey through our finest LED lighting installations and products.
            </p>
            <div className="mt-6 h-px max-w-sm mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #2563EB, transparent)' }} />
          </div>
        </ScrollReveal>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <ScrollReveal key={img.id} delay={i * 0.05}>
              <GalleryItem img={img} onClick={() => setLightbox(img)} />
            </ScrollReveal>
          ))}
        </div>

        {/* View All */}
        {limit < galleryImages.length && (
          <ScrollReveal delay={0.2}>
            <div className="text-center mt-14">
              <Link
                to="/gallery"
                className="border-2 border-brand-500 text-brand-600 font-cinzel font-semibold text-sm tracking-widest inline-flex items-center gap-3 px-10 py-4 rounded-full hover:bg-brand-500 hover:text-white transition-all duration-300 shadow-sm"
              >
                <span>View Full Gallery</span>
                <span>→</span>
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative max-w-3xl max-h-[85vh] overflow-hidden rounded-3xl shadow-2xl border border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.url ? (
                <img
                  src={lightbox.url}
                  alt={lightbox.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-80 flex items-center justify-center"
                  style={{ background: `linear-gradient(145deg, ${lightbox.from}, ${lightbox.to})` }}
                >
                  <div className="text-center">
                    <LightIcon color={lightbox.accent || '#2563EB'} />
                    <p className="font-cinzel text-sm tracking-widest uppercase mt-4 opacity-60" style={{ color: lightbox.accent || '#06B6D4' }}>
                      {lightbox.alt}
                    </p>
                  </div>
                </div>
              )}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/50 rounded-full flex items-center justify-center text-white text-lg transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent">
                <p className="font-playfair text-white text-lg capitalize">{lightbox.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function GalleryItem({ img, onClick }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const defaultAccent = img.accent && img.accent.startsWith('#F5') ? '#2563EB' : (img.accent || '#2563EB')
  const defaultGlow = img.glow && img.glow.includes('rgba(245') ? 'rgba(37,99,235,0.4)' : (img.glow || 'rgba(37,99,235,0.4)')

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl cursor-pointer group break-inside-avoid mb-4 block shadow-sm border border-slate-100/50"
    >
      {/* Real image */}
      {img.url && !error ? (
        <>
          {!loaded && <div className={`w-full ${img.height || 'h-48'} bg-slate-100 animate-pulse rounded-2xl`} />}
          <img
            src={img.url}
            alt={img.alt}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            className={`w-full object-cover rounded-2xl transition-all duration-700 group-hover:brightness-110 ${loaded ? 'block' : 'hidden'}`}
          />
        </>
      ) : (
        /* Gradient art tile with SVG icon */
        <div
          className={`w-full ${img.height || 'h-52'} rounded-2xl relative overflow-hidden flex flex-col items-center justify-center`}
          style={{ background: `linear-gradient(145deg, ${img.from || '#0F172A'}, ${img.to || '#1E293B'})` }}
        >
          {/* Radial glow center */}
          <div
            className="absolute inset-0"
            style={{ background: `radial-gradient(ellipse at 50% 60%, ${defaultGlow} 0%, transparent 65%)` }}
          />
          {/* Decorative rings */}
          <div className="absolute w-28 h-28 rounded-full border opacity-15" style={{ borderColor: defaultAccent }} />
          <div className="absolute w-44 h-44 rounded-full border opacity-[0.08]" style={{ borderColor: defaultAccent }} />
          {/* Scatter sparkles */}
          {(img.dots || ['✦', '✧']).map((dot, i) => (
            <span
              key={i}
              className="absolute text-[10px] opacity-35 select-none"
              style={{
                color: defaultAccent,
                top: `${20 + (i * 17) % 60}%`,
                left: `${10 + (i * 23) % 80}%`,
              }}
            >
              {dot}
            </span>
          ))}
          {/* Grid texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 24px, ${defaultAccent} 24px, ${defaultAccent} 25px),
                                repeating-linear-gradient(90deg, transparent, transparent 24px, ${defaultAccent} 24px, ${defaultAccent} 25px)`,
            }}
          />
          {/* Central icon */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="relative z-10 text-center"
          >
            <div style={{ filter: `drop-shadow(0 0 16px ${defaultGlow})` }}>
              <LightIcon color={defaultAccent} />
            </div>
            <div className="font-cinzel text-[9px] tracking-[0.3em] uppercase opacity-60 mt-2" style={{ color: defaultAccent }}>
              {img.alt}
            </div>
          </motion.div>
          {/* Bottom label */}
          <div
            className="absolute bottom-0 left-0 right-0 h-12"
            style={{ background: `linear-gradient(to top, ${img.from || '#0F172A'}, transparent)` }}
          />
        </div>
      )}

      {/* Hover overlay */}
      <div className="absolute inset-0 rounded-2xl bg-slate-900/0 group-hover:bg-slate-900/35 transition-all duration-500 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm border border-slate-200/50 rounded-full px-4 py-2 text-brand-600 text-xs font-inter font-bold shadow-md">
          View Full ↗
        </div>
      </div>

      {/* Brand border on hover */}
      <div
        className="absolute inset-0 rounded-2xl border opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
        style={{ borderColor: `${defaultAccent}40` }}
      />
    </motion.div>
  )
}
