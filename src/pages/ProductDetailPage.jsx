import { useParams, Link } from 'react-router-dom'
import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import SEO from '../components/SEO'

const specLabels = {
  brand: 'Brand',
  model: 'Model',
  wattage: 'Wattage',
  current: 'Current',
  outputCurrent: 'Output Current',
  inputVoltage: 'Input Voltage',
  outputVoltage: 'Output Voltage',
  color: 'Light Color',
  colorTemp: 'Color Temperature',
  material: 'Body Material',
  shape: 'Shape',
  warranty: 'Warranty',
  origin: 'Origin',
  wireMaterial: 'Wiring Material',
  frequency: 'Frequency',
  spec: 'Specifications',
  powerFactor: 'Power Factor',
  output: 'Output Power',
  moq: 'Minimum Order Quantity',
  ipRating: 'IP Rating',
  usage: 'Usage',
  lumens: 'Luminous Flux',
  cri: 'Color Rendering Index (CRI)',
}

const categoryColors = {
  'Led Light':                { accent: '#2563EB', light: '#EFF6FF', badge: 'bg-blue-100 text-blue-700' },
  'Philips Certa Driver':     { accent: '#4F46E5', light: '#EEF2FF', badge: 'bg-indigo-100 text-indigo-700' },
  'LED Downlight':            { accent: '#0891B2', light: '#ECFEFF', badge: 'bg-cyan-100 text-cyan-700' },
  'LED COB Light':            { accent: '#0284C7', light: '#F0F9FF', badge: 'bg-sky-100 text-sky-700' },
  'Led Driver':               { accent: '#0D9488', light: '#F0FDFA', badge: 'bg-teal-100 text-teal-700' },
  'Philips Led Driver':       { accent: '#7C3AED', light: '#F5F3FF', badge: 'bg-violet-100 text-violet-700' },
  'LED Panel Light':          { accent: '#0369A1', light: '#F0F9FF', badge: 'bg-sky-100 text-sky-700' },
  'LED Track Light':          { accent: '#475569', light: '#F8FAFC', badge: 'bg-slate-100 text-slate-700' },
  'LED Chip':                 { accent: '#6D28D9', light: '#F5F3FF', badge: 'bg-violet-100 text-violet-700' },
  'LED Linear Light':         { accent: '#15803D', light: '#F0FDF4', badge: 'bg-green-100 text-green-700' },
  'LED Recessed Downlight':   { accent: '#C2410C', light: '#FFF7ED', badge: 'bg-orange-100 text-orange-700' },
  'LED Focus Light':          { accent: '#16A34A', light: '#F0FDF4', badge: 'bg-green-100 text-green-700' },
  'LED Flood Light':          { accent: '#1D4ED8', light: '#EFF6FF', badge: 'bg-blue-100 text-blue-700' },
  'Spotlight Bulb':           { accent: '#BE123C', light: '#FFF1F2', badge: 'bg-rose-100 text-rose-700' },
  'Led Spot Lights':          { accent: '#B45309', light: '#FFFBEB', badge: 'bg-amber-100 text-amber-700' },
  'Led Edge Lit Panel Light': { accent: '#92400E', light: '#FFFBEB', badge: 'bg-amber-100 text-amber-700' },
}

function generateFAQs(product) {
  const faqs = []
  const name = product.name
  const cat = product.category
  const watt = product.wattage

  faqs.push({
    q: `What is the ${name} used for?`,
    a: `The ${name} is a premium ${cat} designed for ${product.usage || 'professional lighting applications'}. ${product.description}`,
  })

  if (watt) {
    faqs.push({
      q: `How much power does the ${name} consume?`,
      a: `The ${name} is a ${watt} LED fixture. It is highly energy-efficient — consuming up to 80% less electricity than traditional lighting while delivering superior lumen output.`,
    })
  }

  if (product.colorTemp) {
    faqs.push({
      q: `What color temperature does the ${name} offer?`,
      a: `The ${name} is available in ${product.colorTemp} color temperature${product.colorTemp.includes('/') ? 's' : ''}, making it suitable for a wide range of environments from warm and cozy residential spaces to crisp, professional commercial settings.`,
    })
  }

  if (product.warranty) {
    faqs.push({
      q: `Does the ${name} come with a warranty?`,
      a: `Yes. DIYAM provides a ${product.warranty} warranty on the ${name}, covering manufacturing defects. Our after-sales team is reachable via WhatsApp for hassle-free support across India.`,
    })
  }

  faqs.push({
    q: `How can I order the ${name} in India?`,
    a: `You can enquire and order the ${name} directly via WhatsApp at +91 95993 01369. DIYAM supplies pan-India to architects, interior designers, contractors, and direct customers. Bulk orders are welcome with competitive pricing.`,
  })

  if (product.moq) {
    faqs.push({
      q: `What is the minimum order quantity for the ${name}?`,
      a: `The minimum order quantity (MOQ) for the ${name} is ${product.moq}. For larger commercial or project orders, please contact us for bulk pricing and special project discounts.`,
    })
  }

  faqs.push({
    q: `Is the ${name} suitable for commercial use in India?`,
    a: `Absolutely. The ${name} is engineered to meet the demands of commercial applications across India including retail showrooms, hotels, office buildings, and hospitality spaces. DIYAM has delivered lighting solutions for 5,000+ projects across 50+ cities.`,
  })

  return faqs
}

export default function ProductDetailPage() {
  const { idOrSlug } = useParams()
  const [imgError, setImgError] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    setImgError(false)
    setOpenFaq(null)
  }, [idOrSlug])

  const product = useMemo(() => {
    const asNum = parseInt(idOrSlug, 10)
    if (!isNaN(asNum)) return products.find((p) => p.id === asNum)
    return products.find((p) => p.slug === idOrSlug)
  }, [idOrSlug])

  const cv = useMemo(() => {
    if (!product) return { accent: '#2563EB', light: '#EFF6FF', badge: 'bg-blue-100 text-blue-700' }
    return categoryColors[product.category] || { accent: '#2563EB', light: '#EFF6FF', badge: 'bg-blue-100 text-blue-700' }
  }, [product])

  const specs = useMemo(() => {
    if (!product) return []
    return Object.keys(product)
      .filter((key) => specLabels[key] && product[key])
      .map((key) => ({ key, label: specLabels[key], value: product[key] }))
  }, [product])

  const related = useMemo(() => {
    if (!product) return []
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4)
  }, [product])

  const faqs = useMemo(() => product ? generateFAQs(product) : [], [product])

  const canonicalSlug = product?.slug || idOrSlug
  const canonicalPath = `/product/${canonicalSlug}`

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <div className="text-center">
          <svg viewBox="0 0 60 60" fill="none" width="80" height="80" className="mx-auto text-brand-400">
            <circle cx="30" cy="30" r="26" stroke="currentColor" strokeWidth="2" opacity="0.3" />
            <path d="M22 24 L38 40 M38 24 L22 40" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
          <h2 className="font-cinzel font-bold text-slate-800 text-2xl mt-6 mb-2">Product Not Found</h2>
          <p className="font-inter text-slate-500 text-sm max-w-sm mx-auto mb-8">
            The product you are looking for does not exist or has been relocated.
          </p>
          <Link to="/products" className="px-8 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-inter font-bold text-sm tracking-wide shadow-md transition-all duration-300">
            ← Back to All Products
          </Link>
        </div>
      </div>
    )
  }

  const waUrl = `https://wa.me/919599301369?text=${encodeURIComponent(product.inquiry)}`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://diyam.in/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Products', 'item': 'https://diyam.in/products' },
      { '@type': 'ListItem', 'position': 3, 'name': product.category, 'item': `https://diyam.in/products?category=${encodeURIComponent(product.category)}` },
      { '@type': 'ListItem', 'position': 4, 'name': product.name, 'item': `https://diyam.in${canonicalPath}` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map((f) => ({
      '@type': 'Question',
      'name': f.q,
      'acceptedAnswer': { '@type': 'Answer', 'text': f.a },
    })),
  }

  return (
    <>
      <SEO
        title={`${product.name} – ${product.wattage ? product.wattage + ' ' : ''}${product.category} | Buy Online India`}
        description={`Buy ${product.name} (${product.wattage || ''} ${product.category}) online in India. ${product.description} Contact DIYAM for best price, bulk orders & pan-India delivery.`}
        keywords={`${product.name}, ${product.category}, buy ${product.category} India, ${product.tags.join(', ')}, LED lighting India, DIYAM lighting`}
        image={product.image}
        path={canonicalPath}
        productSchema={product}
        breadcrumbSchema={breadcrumbSchema}
        faqSchema={faqSchema}
      />

      <div className="bg-white min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-2 text-xs font-inter text-slate-400 mb-8 overflow-x-auto whitespace-nowrap py-1">
            <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-brand-600 transition-colors">Products</Link>
            <span>/</span>
            <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-600 transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">{product.name}</span>
          </nav>

          {/* Product main section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">

            {/* Left Image column */}
            <div className="lg:col-span-6">
              <div className="sticky top-28">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative aspect-square rounded-3xl overflow-hidden shadow-md flex items-center justify-center p-8 group border border-slate-100"
                  style={{ background: `radial-gradient(circle at center, #FFFFFF 30%, ${cv.light} 100%)` }}
                >
                  {product.image && !imgError ? (
                    <img
                      src={product.image}
                      alt={`${product.name} – ${product.wattage || ''} ${product.category} – DIYAM India`}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 mix-blend-multiply"
                      loading="eager"
                      width="600"
                      height="600"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                      <svg viewBox="0 0 64 64" fill="none" width="120" height="120">
                        <circle cx="32" cy="24" r="14" fill={cv.accent} opacity="0.08" />
                        <circle cx="32" cy="24" r="8"  fill={cv.accent} opacity="0.15" />
                        <path d="M24 40 Q22 50 32 52 Q42 50 40 40 Q36 38 32 38 Q28 38 24 40Z" fill={cv.accent} opacity="0.1" />
                      </svg>
                      <span className="text-xs font-inter text-slate-400 mt-4">Premium LED Illumination</span>
                    </div>
                  )}

                  {/* Badge */}
                  <div className={`absolute top-6 left-6 ${cv.badge} text-xs font-inter font-bold tracking-wide uppercase px-3.5 py-1.5 rounded-full shadow-sm`}>
                    {product.badge}
                  </div>
                </motion.div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { icon: '🛡️', title: '2-Year Warranty', desc: '100% replacement' },
                    { icon: '⚡', title: 'Energy Efficient', desc: 'Saves up to 80%' },
                    { icon: '🚚', title: 'Pan-India Supply', desc: 'Quick safe delivery' },
                  ].map((tb) => (
                    <div key={tb.title} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                      <span className="text-xl block mb-1" role="img" aria-label={tb.title}>{tb.icon}</span>
                      <div className="font-cinzel font-bold text-slate-800 text-[10px] uppercase tracking-wider">{tb.title}</div>
                      <div className="font-inter text-slate-400 text-[9px] mt-0.5">{tb.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right details column */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Category badge */}
                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-inter font-bold text-[10px] tracking-widest uppercase mb-4">
                  {product.category}
                </span>

                {/* H1 */}
                <h1 className="font-inter font-extrabold text-slate-900 leading-tight mb-4" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
                  {product.name}
                  {product.wattage && (
                    <span className="block text-base font-semibold text-slate-500 mt-1">{product.wattage} | {product.category}</span>
                  )}
                </h1>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.tags.map((tag) => (
                    <span key={tag} className="text-xs font-inter px-3 py-1 rounded-full border border-slate-200 text-slate-500 bg-white">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price block */}
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 mb-8 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-inter text-slate-400 uppercase tracking-widest mb-1">Price (incl. GST)</div>
                    <span className="font-inter font-extrabold text-slate-900 text-2xl">{product.price}</span>
                  </div>
                  {product.moq && (
                    <div className="text-right">
                      <div className="text-xs font-inter text-slate-400 uppercase tracking-widest mb-1">Min. Order Qty</div>
                      <span className="font-inter font-bold text-slate-800 text-base">{product.moq}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="font-inter font-bold text-slate-800 text-sm uppercase tracking-wider mb-3">Product Description</h2>
                  <p className="font-inter text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                    {product.description}
                  </p>
                  <p className="font-inter text-slate-500 text-sm leading-relaxed mt-3">
                    Sourced and quality-tested by <strong>DIYAM</strong> — India's trusted LED lighting brand since 2015.
                    Serving architects, interior designers, contractors, and homeowners across 50+ cities in India.
                    All products backed by a 2-year warranty and fast pan-India delivery.
                  </p>
                </div>

                {/* Specifications table */}
                {specs.length > 0 && (
                  <div className="mb-8">
                    <h2 className="font-inter font-bold text-slate-800 text-sm uppercase tracking-wider mb-3">Technical Specifications</h2>
                    <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm bg-white">
                      <table className="w-full text-left font-inter text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="px-5 py-3.5 font-semibold text-slate-500 uppercase tracking-wider w-1/3">Parameter</th>
                            <th className="px-5 py-3.5 font-semibold text-slate-500 uppercase tracking-wider">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {specs.map((spec, index) => (
                            <tr key={spec.key} className={index % 2 === 0 ? 'bg-white border-b border-slate-100' : 'bg-slate-50/30 border-b border-slate-100 last:border-b-0'}>
                              <td className="px-5 py-3 font-bold text-slate-600">{spec.label}</td>
                              <td className="px-5 py-3 text-slate-700">{spec.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-slate-100 space-y-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl text-white font-inter font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-brand-500/10"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #06B6D4)' }}
                  aria-label={`Enquire about ${product.name} on WhatsApp`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Enquire on WhatsApp</span>
                </a>
                <Link
                  to="/products"
                  className="w-full py-3.5 rounded-2xl border border-slate-200 text-slate-500 font-inter font-bold text-xs tracking-wide flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-all duration-300"
                >
                  <span>← Back to All Products</span>
                </Link>
              </div>
            </div>

          </div>

          {/* FAQ Section — for AI SEO + Rich Snippets */}
          <ScrollReveal>
            <div className="border-t border-slate-100 pt-16 mb-16">
              <h2 className="font-cinzel font-bold text-slate-800 text-xl tracking-wide mb-2 text-center">
                Frequently Asked Questions
              </h2>
              <p className="font-inter text-slate-500 text-xs text-center mb-10">
                Everything you need to know about the {product.name}
              </p>
              <div className="max-w-3xl mx-auto space-y-3">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm"
                  >
                    <button
                      className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-slate-50 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span className="font-inter font-semibold text-slate-800 text-sm pr-4">{faq.q}</span>
                      <span className="text-brand-500 flex-shrink-0 text-lg font-bold">{openFaq === i ? '−' : '+'}</span>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-5 pt-1 bg-white border-t border-slate-100">
                        <p className="font-inter text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Related Products */}
          {related.length > 0 && (
            <ScrollReveal>
              <div className="border-t border-slate-100 pt-16">
                <h2 className="font-cinzel font-bold text-slate-800 text-xl tracking-wide mb-2 text-center">
                  Related Products
                </h2>
                <p className="font-inter text-slate-500 text-xs text-center mb-10">
                  More high-performance {product.category} products from DIYAM
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {related.map((prod, i) => (
                    <ProductCard key={prod.id} product={prod} index={i} />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

        </div>
      </div>
      <Footer />
    </>
  )
}
