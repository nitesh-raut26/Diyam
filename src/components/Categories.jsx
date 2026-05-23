import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal'
import { categories } from '../data/products'

function DownlightSVG({ size = 36 }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
      <rect x="16" y="5" width="16" height="6" rx="2" fill="currentColor" opacity="0.5" />
      <path d="M14 11 L10 22 L38 22 L34 11 Z" fill="currentColor" opacity="0.55" />
      <ellipse cx="24" cy="22" rx="14" ry="4" fill="currentColor" />
      <ellipse cx="24" cy="22" rx="7" ry="2" fill="white" opacity="0.35" />
      <path d="M10 25 L5 46 L43 46 L38 25 Z" fill="currentColor" opacity="0.1" />
    </svg>
  )
}

function TrackSVG({ size = 36 }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
      <rect x="5" y="8" width="38" height="5" rx="2.5" fill="currentColor" opacity="0.5" />
      <rect x="21" y="12" width="6" height="7" rx="1.5" fill="currentColor" opacity="0.65" />
      <circle cx="24" cy="25" r="10" fill="currentColor" opacity="0.65" />
      <circle cx="24" cy="25" r="5" fill="white" opacity="0.3" />
      <path d="M15 33 L10 46 L38 46 L33 33 Z" fill="currentColor" opacity="0.1" />
    </svg>
  )
}

function FloodSVG({ size = 36 }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
      <rect x="5" y="8" width="8" height="34" rx="2" fill="currentColor" opacity="0.25" />
      <rect x="13" y="12" width="10" height="8" rx="2" fill="currentColor" opacity="0.65" />
      <rect x="13" y="20" width="4" height="16" rx="1" fill="currentColor" opacity="0.45" />
      <path d="M17 14 L44 8 L44 44 L17 38 Z" fill="currentColor" opacity="0.08" />
      <ellipse cx="32" cy="26" rx="16" ry="12" fill="currentColor" opacity="0.05" />
    </svg>
  )
}

function StripSVG({ size = 36 }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
      <rect x="5" y="20" width="38" height="10" rx="5" fill="currentColor" opacity="0.5" />
      {[9, 17, 24, 31, 39].map((x, i) => (
        <circle key={i} cx={x} cy="25" r="2.5" fill="white" opacity="0.45" />
      ))}
      <rect x="5" y="11" width="38" height="7" rx="2" fill="currentColor" opacity="0.1" />
      <rect x="5" y="30" width="38" height="7" rx="2" fill="currentColor" opacity="0.1" />
    </svg>
  )
}

function OutdoorSVG({ size = 36 }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
      <rect x="21" y="38" width="6" height="8" rx="1" fill="currentColor" opacity="0.45" />
      <rect x="17" y="32" width="14" height="7" rx="3" fill="currentColor" opacity="0.6" />
      <path d="M15 20 Q15 10 24 8 Q33 10 33 20 L31 32 L17 32 Z" fill="currentColor" opacity="0.7" />
      <circle cx="24" cy="20" r="7" fill="white" opacity="0.2" />
      <path d="M17 32 L12 46 L36 46 L31 32 Z" fill="currentColor" opacity="0.08" />
    </svg>
  )
}

function SpecialtySVG({ size = 36 }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
      <rect x="8" y="8" width="32" height="32" rx="5" fill="currentColor" opacity="0.2" />
      <rect x="14" y="14" width="20" height="20" rx="3" fill="currentColor" opacity="0.4" />
      <rect x="18" y="18" width="12" height="12" rx="2" fill="currentColor" opacity="0.6" />
      <ellipse cx="24" cy="24" rx="5" ry="5" fill="white" opacity="0.3" />
      <path d="M8 42 L5 48 L43 48 L40 42 Z" fill="currentColor" opacity="0.08" />
    </svg>
  )
}

const iconComponents = {
  downlight: DownlightSVG,
  track: TrackSVG,
  flood: FloodSVG,
  strip: StripSVG,
  outdoor: OutdoorSVG,
  specialty: SpecialtySVG,
}

export default function Categories() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-[#0A0E1A]">
      {/* Premium custom generated background image */}
      <div 
        className="absolute inset-0 opacity-[0.22] bg-cover bg-center pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: 'url("/category_bg.png")',
        }}
      />
      {/* Radial overlay for luxury glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="section-label mb-4 text-cyan-400">Browse By</p>
            <h2 className="heading-luxury mb-4"
              style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Shop by <span className="text-shimmer">Category</span>
            </h2>
            <p className="font-inter text-slate-400 max-w-xl mx-auto">
              Find the perfect LED solution for every space — from precision downlights to landscape installations.
            </p>
            <div className="mt-6 h-px max-w-sm mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #06B6D4, transparent)' }} />
          </div>
        </ScrollReveal>

        {/* Featured large categories — first 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {categories.slice(0, 2).map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 0.15} direction="scale">
              <CategoryCard cat={cat} large />
            </ScrollReveal>
          ))}
        </div>

        {/* All remaining categories */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.slice(2).map((cat, i) => (
            <ScrollReveal key={cat.id} delay={i * 0.07} direction="up">
              <CategoryCard cat={cat} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ cat, large = false }) {
  const [imgError, setImgError] = useState(false)
  const IconComponent = iconComponents[cat.iconKey] || DownlightSVG

  return (
    <Link to="/categories">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={`relative img-zoom rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-shadow ${large ? 'h-80' : 'h-52'}`}
      >
        {/* Faint placeholder background with icon */}
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 flex items-center justify-center opacity-10 text-white select-none">
            <IconComponent size={large ? 120 : 90} />
          </div>
        </div>

        {/* Real background image on top if available */}
        {cat.image && !imgError && (
          <img
            src={cat.image}
            alt={cat.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        )}

        {/* Subtle, premium gradient overlay for text readability */}
        <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`} />

        {/* Content overlaid on the image */}
        <div className={`absolute inset-0 flex flex-col justify-end ${large ? 'p-6' : 'p-3 sm:p-5'}`}>
          <div className={`flex items-center mb-2 ${large ? 'gap-3' : 'gap-2 sm:gap-3'}`}>
            <span className={`text-cyan-400 flex-shrink-0 ${large ? 'w-9 h-9' : 'w-6 h-6 sm:w-7 sm:h-7'}`}>
              <IconComponent size={large ? 36 : 24} />
            </span>
            <div className="min-w-0">
              <h3 className={`font-cinzel font-bold text-white leading-tight line-clamp-2 ${large ? 'text-xl' : 'text-[11px] sm:text-sm'}`}>
                {cat.name}
              </h3>
              <p className="font-inter text-white/70 text-[10px] sm:text-xs mt-0.5">{cat.description}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-inter text-cyan-400/90 text-[10px] font-semibold tracking-widest uppercase">
              {cat.count}
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white text-sm transition-all duration-300">
              →
            </div>
          </div>
        </div>

        {/* Brand border overlay on hover */}
        <div className="absolute inset-0 rounded-2xl border border-brand-500/0 hover:border-brand-500/30 transition-all duration-500 pointer-events-none" />
      </motion.div>
    </Link>
  )
}
