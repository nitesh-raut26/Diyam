import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

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

function WAIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export default function ProductCard({ product, index = 0 }) {
  const [imgError, setImgError] = useState(false)
  const cv      = categoryColors[product.category] || { accent: '#2563EB', light: '#EFF6FF', badge: 'bg-blue-100 text-blue-700' }
  const waUrl   = `https://wa.me/919599301369?text=${encodeURIComponent(product.inquiry)}`
  const hasImage = product.image && !imgError

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.07 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm cursor-pointer"
      style={{ transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${cv.accent}40`
        e.currentTarget.style.boxShadow = `0 12px 40px ${cv.accent}18, 0 4px 12px rgba(0,0,0,0.06)`
        e.currentTarget.style.transform = 'translateY(-5px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#E2E8F0'
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'
        e.currentTarget.style.transform = 'translateY(0)'
      }}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* ── Product Image ─────────────────────────────── */}
        <div className="relative h-52 overflow-hidden flex items-center justify-center" style={{ background: cv.light }}>
          {hasImage ? (
            <img
              src={product.image}
              alt={product.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-108 mix-blend-multiply"
              loading="lazy"
              style={{ transition: 'transform 0.5s ease' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center" style={{ background: cv.light }}>
              <svg viewBox="0 0 64 64" fill="none" width="64" height="64">
                <circle cx="32" cy="24" r="14" fill={cv.accent} opacity="0.15" />
                <circle cx="32" cy="24" r="8"  fill={cv.accent} opacity="0.3" />
                <path d="M24 40 Q22 50 32 52 Q42 50 40 40 Q36 38 32 38 Q28 38 24 40Z" fill={cv.accent} opacity="0.2" />
              </svg>
            </div>
          )}

          {/* Badge */}
          <div className={`absolute top-3 left-3 ${cv.badge} text-[10px] font-inter font-bold tracking-wide uppercase px-2.5 py-1 rounded-full z-10`}>
            {product.badge}
          </div>

          {/* View Detail overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            style={{ background: `${cv.accent}12` }}
          >
            <span
              className="bg-white/95 backdrop-blur text-xs font-inter font-semibold px-4 py-2 rounded-full shadow-md flex items-center gap-1.5"
              style={{ color: cv.accent, border: `1px solid ${cv.accent}30` }}
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              View Details
            </span>
          </div>
        </div>

        {/* ── Card Content ───────────────────────────────── */}
        <div className="p-4">
          {/* Category + tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            <span className="text-[10px] font-inter px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
              {product.category}
            </span>
            {product.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-inter px-2 py-0.5 rounded-full border"
                style={{ color: cv.accent, borderColor: `${cv.accent}25`, background: `${cv.accent}08` }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Name */}
          <h3
            className="font-inter font-semibold text-slate-800 text-sm leading-tight mb-1.5 transition-colors duration-300"
            style={{ '--hover-color': cv.accent }}
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="font-inter text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <span className="font-inter font-bold text-slate-900 text-sm">{product.price}</span>
              {product.moq && (
                <div className="text-[10px] text-slate-400 font-inter">MOQ: {product.moq}</div>
              )}
            </div>
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="px-3.5 py-2 rounded-xl text-white font-inter font-bold text-xs tracking-wide flex items-center gap-1.5 shadow-sm"
              style={{ background: `linear-gradient(135deg, ${cv.accent}, #06B6D4)` }}
            >
              <WAIcon />
              <span>Enquire</span>
            </motion.a>
          </div>
        </div>
      </Link>

      {/* ── Bottom accent line on hover ───────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ background: `linear-gradient(90deg, ${cv.accent}, #06B6D4, transparent)` }}
      />
    </motion.div>
  )
}
