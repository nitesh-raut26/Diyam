import SEO from '../components/SEO'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import { products } from '../data/products'

const allCategories = ['All', ...new Set(products.map((p) => p.category))]

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function NoResultsIcon() {
  return (
    <svg viewBox="0 0 60 60" fill="none" width="60" height="60" className="mx-auto">
      <circle cx="30" cy="22" r="14" fill="#F59E0B" opacity="0.2" />
      <circle cx="30" cy="22" r="7" fill="#F59E0B" opacity="0.15" />
      <path d="M22 36 Q20 44 30 45 Q40 44 38 36 Q35 34 30 34 Q25 34 22 36Z" fill="#F59E0B" opacity="0.12" />
      <line x1="20" y1="48" x2="40" y2="48" stroke="#F59E0B" strokeWidth="1" opacity="0.2" />
    </svg>
  )
}

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let result = [...products]
    if (activeCategory !== 'All') result = result.filter((p) => p.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }
    return result
  }, [activeCategory, search])

  return (
    <>
      <SEO 
        title="Premium LED & Focus Lights Catalog"
        description="Browse the complete catalog of DIYAM (diyam.co.in / diyam.in) Premium Lighting. Discover 38+ premium products across 16 categories including waterproof LED Focus Lights, spotlights, downlights, linear systems, and high-volt drivers."
        keywords="diyam products, focus light catalog, led track lights price, buy cob downlight, waterproof led drivers"
        path="/products"
      />
      {/* Page Hero */}
      <section className="relative pt-24 pb-2 px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 glow-center opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label mb-1 text-[10px]"
          >
            Our Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-luxury text-shimmer mb-1"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)' }}
          >
            All Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-inter text-gray-500 text-xs md:text-sm max-w-xl mx-auto"
          >
            Browse our complete LED lighting range — 38 products across 16 categories.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 py-2 bg-white sticky top-20 z-30 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto">
          {/* Search and stats row */}
          <div className="flex items-center justify-between gap-4 mb-2">
            <div className="relative flex-1 max-w-xs">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search LED products..."
                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-gray-900 placeholder-gray-400 font-inter text-xs focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30 transition-all"
              />
            </div>
            <p className="font-inter text-gray-400 text-xs font-medium">
              {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {/* Category filters (Horizontally Scrollable Chips) */}
          <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1.5 -mx-6 px-6 scroll-smooth">
            {allCategories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wide transition-all duration-300 border flex-shrink-0 ${
                  activeCategory === cat
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-brand-400 hover:text-brand-600'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-4 px-6 bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <NoResultsIcon />
              <h3 className="font-cinzel text-brand-600 text-lg mt-4 mb-2">No products found</h3>
              <p className="font-inter text-gray-500 text-sm">Try a different search term or category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  )
}
