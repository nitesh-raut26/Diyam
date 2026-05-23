import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ParticleField from './ParticleField'
import { WHATSAPP_URL } from '../data/products'

const stats = [
  { num: '500+',  label: 'LED Products' },
  { num: '5000+', label: 'Projects Delivered' },
  { num: '50+',   label: 'Cities Served' },
]

const features = [
  { icon: '⚡', label: 'Energy Efficient' },
  { icon: '🛡️', label: '2-Year Warranty' },
  { icon: '✅', label: 'CE & IS Certified' },
]

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">

      {/* ── Animated ambient background ─────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main gradient orb */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 10%, rgba(37,99,235,0.07) 0%, transparent 60%),
              radial-gradient(ellipse 50% 50% at 10% 80%, rgba(6,182,212,0.06) 0%, transparent 50%),
              radial-gradient(ellipse 50% 50% at 90% 20%, rgba(79,70,229,0.05) 0%, transparent 50%)
            `,
          }}
        />

        {/* Animated pulsing orbs */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)' }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)' }}
        />

        {/* Light grid lines - subtle tech pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(37,99,235,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* ── Floating particles ───────────────────────────── */}
      <ParticleField count={20} />

      {/* ── Floating light orbs ──────────────────────────── */}
      {[
        { top: '12%', left: '7%',  delay: 0,   size: 10, color: 'rgba(37,99,235,0.5)' },
        { top: '72%', left: '6%',  delay: 1.2, size: 7,  color: 'rgba(6,182,212,0.5)' },
        { top: '35%', left: '93%', delay: 2,   size: 9,  color: 'rgba(79,70,229,0.5)' },
        { top: '18%', left: '87%', delay: 0.6, size: 12, color: 'rgba(37,99,235,0.4)' },
        { top: '82%', left: '88%', delay: 1.8, size: 7,  color: 'rgba(6,182,212,0.4)' },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ top: orb.top, left: orb.left }}
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
        >
          <div
            className="rounded-full blur-sm"
            style={{
              width: orb.size * 2,
              height: orb.size * 2,
              background: orb.color,
              boxShadow: `0 0 ${orb.size * 3}px ${orb.color}`,
            }}
          />
        </motion.div>
      ))}

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Pre-heading badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="inline-flex items-center gap-3 bg-brand-50 border border-brand-200 rounded-full px-5 py-2 mb-8 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
          <span className="section-label text-[11px]">Premium LED Lighting — Est. 2015</span>
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: 'easeOut' }}
          className="mb-5 flex flex-col items-center"
        >
          <span className="text-sm tracking-[0.45em] uppercase text-brand-500 font-bold mb-1 sm:mb-2 block">
            Premium Lights
          </span>
          <h1
            className="font-cinzel font-black tracking-[0.2em]"
            style={{
              fontSize: 'clamp(4rem, 14vw, 9.5rem)',
              lineHeight: 1,
              background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 40%, #06B6D4 70%, #22D3EE 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            DIYAM
          </h1>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="font-playfair text-slate-800 mb-6"
          style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)', fontWeight: 400, lineHeight: 1.25 }}
        >
          <em>Illuminate</em> Every{' '}
          <span className="font-semibold text-shimmer">Space</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.7 }}
          className="font-inter text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)' }}
        >
          Premium LED lighting solutions for homes, offices, retail, and hospitality.
          From COB downlights to track systems — crafted for excellence.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {features.map((f) => (
            <span
              key={f.label}
              className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full text-slate-600 text-xs font-inter font-medium shadow-sm"
            >
              <span>{f.icon}</span> {f.label}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/products"
            className="btn-primary px-9 py-4 rounded-full font-inter font-bold text-base tracking-wide inline-flex items-center gap-2 shadow-lg"
          >
            <span>Explore Products</span>
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>→</motion.span>
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline px-9 py-4 rounded-full font-inter font-semibold text-base tracking-wide inline-flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="#2563EB" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp Order</span>
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.3, duration: 1.2 }}
          className="mt-16 h-px blue-line max-w-xs mx-auto"
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-10"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="font-cinzel font-black text-2xl"
                style={{
                  background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {s.num}
              </div>
              <div className="font-inter text-slate-400 text-xs tracking-widest uppercase mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Bottom fade ───────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #FFFFFF 0%, transparent 100%)' }}
      />
    </section>
  )
}
