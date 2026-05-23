import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import ProductCard from '../components/ProductCard'
import { categories, products } from '../data/products'

function DownlightSVG({ size = 28 }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
      <rect x="16" y="5" width="16" height="6" rx="2" fill="currentColor" opacity="0.5" />
      <path d="M14 11 L10 22 L38 22 L34 11 Z" fill="currentColor" opacity="0.6" />
      <ellipse cx="24" cy="22" rx="14" ry="4" fill="currentColor" />
      <ellipse cx="24" cy="22" rx="7" ry="2" fill="white" opacity="0.35" />
      <path d="M10 25 L5 46 L43 46 L38 25 Z" fill="currentColor" opacity="0.1" />
    </svg>
  )
}

function TrackSVG({ size = 28 }) {
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

function FloodSVG({ size = 28 }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
      <rect x="5" y="8" width="8" height="34" rx="2" fill="currentColor" opacity="0.25" />
      <rect x="13" y="12" width="10" height="8" rx="2" fill="currentColor" opacity="0.65" />
      <rect x="13" y="20" width="4" height="16" rx="1" fill="currentColor" opacity="0.45" />
      <path d="M17 14 L44 8 L44 44 L17 38 Z" fill="currentColor" opacity="0.08" />
    </svg>
  )
}

function StripSVG({ size = 28 }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
      <rect x="5" y="20" width="38" height="10" rx="5" fill="currentColor" opacity="0.5" />
      {[9, 17, 24, 31, 39].map((x, i) => (
        <circle key={i} cx={x} cy="25" r="2.5" fill="white" opacity="0.45" />
      ))}
    </svg>
  )
}

function OutdoorSVG({ size = 28 }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
      <rect x="21" y="38" width="6" height="8" rx="1" fill="currentColor" opacity="0.45" />
      <rect x="17" y="32" width="14" height="7" rx="3" fill="currentColor" opacity="0.6" />
      <path d="M15 20 Q15 10 24 8 Q33 10 33 20 L31 32 L17 32 Z" fill="currentColor" opacity="0.7" />
      <circle cx="24" cy="20" r="7" fill="white" opacity="0.2" />
    </svg>
  )
}

function SpecialtySVG({ size = 28 }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" width={size} height={size}>
      <rect x="8" y="8" width="32" height="32" rx="5" fill="currentColor" opacity="0.2" />
      <rect x="14" y="14" width="20" height="20" rx="3" fill="currentColor" opacity="0.4" />
      <rect x="18" y="18" width="12" height="12" rx="2" fill="currentColor" opacity="0.6" />
      <ellipse cx="24" cy="24" rx="5" ry="5" fill="white" opacity="0.3" />
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

export default function CategoriesPage() {
  const [activeCategory, setActiveCategory] = useState(null)

  const filteredProducts = activeCategory
    ? products.filter((p) => p.category === activeCategory.name)
    : []

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-24 pb-2 px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 glow-center opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label mb-1 text-[10px]">
            Explore
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-luxury text-shimmer mb-1"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
          >
            Categories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-inter text-gray-500 text-xs md:text-sm max-w-xl mx-auto"
          >
            Browse our 16 LED categories to find the perfect lighting for every space and application.
          </motion.p>
        </div>
      </section>
 
      {/* Categories Grid */}
      <section className="py-4 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.id} delay={i * 0.1}>
                <CategoryDetailCard
                  cat={cat}
                  active={activeCategory?.id === cat.id}
                  onClick={() => setActiveCategory(activeCategory?.id === cat.id ? null : cat)}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Products for selected category */}
          {activeCategory && filteredProducts.length > 0 && (
            <div className="mt-16">
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-brand-500">
                    {(() => {
                      const Icon = iconComponents[activeCategory.iconKey] || DownlightSVG
                      return <Icon size={32} />
                    })()}
                  </span>
                  <div>
                    <h2 className="font-cinzel font-bold text-gray-900 text-2xl">{activeCategory.name}</h2>
                    <p className="font-inter text-gray-500 text-sm">{filteredProducts.length} products</p>
                  </div>
                  <div className="ml-auto h-px flex-1 max-w-xs" style={{ background: 'linear-gradient(90deg, #2563EB, transparent)' }} />
                </div>
              </ScrollReveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <ScrollReveal delay={0.2}>
            <div className="text-center mt-16">
              <Link
                to="/products"
                className="bg-gradient-to-r from-brand-600 to-cyan-500 hover:from-brand-700 hover:to-cyan-600 px-10 py-4 rounded-full text-white font-cinzel font-bold tracking-widest text-sm inline-flex items-center gap-3 transition-all duration-300 shadow-sm shadow-brand-500/10 animate-pulse-subtle"
              >
                <span>View All Products</span>
                <span>→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  )
}

function CategoryDetailCard({ cat, active, onClick }) {
  const [imgError, setImgError] = useState(false)
  const IconComponent = iconComponents[cat.iconKey] || DownlightSVG

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 h-64 shadow-sm hover:shadow-md ${
        active ? 'ring-2 ring-brand-500 shadow-lg shadow-brand-500/10' : ''
      }`}
    >
      {/* Always-visible gradient background */}
      <div className="absolute inset-0 bg-slate-900">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 text-white select-none">
          <IconComponent size={100} />
        </div>
      </div>
      {cat.image && !imgError && (
        <img
          src={cat.image}
          alt={cat.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          onError={() => setImgError(true)}
          loading="lazy"
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-t ${cat.gradient}`} />
      <div className="absolute inset-0 flex flex-col justify-end p-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-cyan-400 w-8 h-8 flex-shrink-0">
            <IconComponent size={28} />
          </span>
          <div>
            <h3 className="font-cinzel font-bold text-white text-lg">{cat.name}</h3>
            <p className="font-inter text-white/70 text-xs">{cat.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-between font-inter">
          <span className="text-cyan-400/90 text-xs font-semibold tracking-widest uppercase">{cat.count}</span>
          <div className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
            active ? 'bg-brand-600 text-white shadow-sm' : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 text-white'
          }`}>
            {active ? 'Selected ✓' : 'Explore →'}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
