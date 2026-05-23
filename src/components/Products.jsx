import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ProductCard from './ProductCard'
import ScrollReveal from './ScrollReveal'
import { products } from '../data/products'

const categoryFilters = [
  'All',
  'Led Light',
  'Philips Certa Driver',
  'LED Downlight',
  'LED COB Light',
  'Led Driver',
  'Philips Led Driver',
  'LED Panel Light',
  'LED Track Light',
  'LED Chip',
  'LED Linear Light',
  'LED Recessed Downlight',
  'LED Focus Light',
  'LED Flood Light',
  'Spotlight Bulb',
  'Led Spot Lights',
  'Led Edge Lit Panel Light',
]

export default function Products({ limit = 8 }) {
  const [active, setActive] = useState('All')

  const filtered = (active === 'All' ? products : products.filter((p) => p.category === active)).slice(0, limit)

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="section-label mb-3">Our Collection</p>
            <h2 className="heading-luxury text-gray-900 mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Premium <span className="text-shimmer">Lighting</span> Products
            </h2>
            <p className="font-inter text-gray-500 max-w-xl mx-auto leading-relaxed">
              Explore our full range of LED lights, drivers, downlights, COB lights, panels, and more — exactly as listed on IndiaMart.
            </p>
            <div className="mt-6 h-px max-w-sm mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #2563EB, transparent)' }} />
          </div>
        </ScrollReveal>

        {/* Category Filters — scrollable on mobile */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap gap-2 justify-center mb-10 max-h-32 overflow-y-auto font-inter">
            {categoryFilters.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 border ${
                  active === cat
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-400 hover:text-brand-600'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* View All CTA */}
        {limit < products.length && (
          <ScrollReveal delay={0.2}>
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center gap-3 px-10 py-4 rounded-full border-2 border-brand-500 text-brand-600 font-cinzel font-semibold text-sm tracking-widest hover:bg-brand-600 hover:text-white transition-all duration-300 shadow-sm"
              >
                <span>View All {products.length} Products</span>
                <span>→</span>
              </Link>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
