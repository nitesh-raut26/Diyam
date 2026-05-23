import { useState } from 'react'
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
  { icon: '🚚', label: 'Pan-India Supply' },
]

const focusLightThemes = [
  {
    id: 1, name: 'FB Delta Spot Light', image: '/products/FBDeltaSpotLight.jpeg',
    gradient: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 40%, #06B6D4 70%, #22D3EE 100%)',
    bgGlows: [
      'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(37,99,235,0.12) 0%, transparent 60%)',
      'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)',
    ],
    accentColor: '#2563EB', glowRgb: '37,99,235',
    tagline: 'Precision anti-glare ceiling spotlight',
  },
  {
    id: 2, name: 'FB Track Light', image: '/products/FbTrack.jpeg',
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 40%, #818CF8 70%, #C7D2FE 100%)',
    bgGlows: [
      'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(99,102,241,0.12) 0%, transparent 60%)',
      'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(129,140,248,0.12) 0%, transparent 70%)',
    ],
    accentColor: '#6366F1', glowRgb: '99,102,241',
    tagline: 'High-intensity directional display spotlight',
  },
  {
    id: 3, name: 'Diyam Focus Light', image: '/products/FocusLight.jpeg',
    gradient: 'linear-gradient(135deg, #15803D 0%, #16A34A 40%, #4ADE80 70%, #DCFCE7 100%)',
    bgGlows: [
      'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(22,163,74,0.12) 0%, transparent 60%)',
      'radial-gradient(circle, rgba(21,128,61,0.15) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(74,222,128,0.12) 0%, transparent 70%)',
    ],
    accentColor: '#16A34A', glowRgb: '22,163,74',
    tagline: 'Heavy-duty weatherproof facade & garden focus',
  },
  {
    id: 4, name: 'Glaza Premium Spotlight', image: '/products/Glaza.jpeg',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 40%, #A78BFA 70%, #DDD6FE 100%)',
    bgGlows: [
      'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(139,92,246,0.12) 0%, transparent 60%)',
      'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)',
    ],
    accentColor: '#8B5CF6', glowRgb: '139,92,246',
    tagline: 'Architectural-grade minimalist spotlighting',
  },
  {
    id: 5, name: 'Glaza Ellipse Downlight', image: '/products/Glaza12wellipse.jpeg',
    gradient: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 40%, #22D3EE 70%, #ECFEFF 100%)',
    bgGlows: [
      'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(6,182,212,0.12) 0%, transparent 60%)',
      'radial-gradient(circle, rgba(8,145,178,0.15) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)',
    ],
    accentColor: '#06B6D4', glowRgb: '6,182,212',
    tagline: 'Elegant elliptical contour recessed lighting',
  },
  {
    id: 6, name: 'Gloria Track Light', image: '/products/GloriaTracklight.jpeg',
    gradient: 'linear-gradient(135deg, #475569 0%, #64748B 40%, #94A3B8 70%, #CBD5E1 100%)',
    bgGlows: [
      'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(100,116,139,0.12) 0%, transparent 60%)',
      'radial-gradient(circle, rgba(71,85,105,0.15) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(148,163,184,0.12) 0%, transparent 70%)',
    ],
    accentColor: '#94A3B8', glowRgb: '148,163,184',
    tagline: 'Luxury high-efficiency showroom styling track',
  },
  {
    id: 7, name: 'Pesto Laser Spotlight', image: '/products/PestoLaser.jpeg',
    gradient: 'linear-gradient(135deg, #B45309 0%, #D97706 40%, #F59E0B 70%, #FEF3C7 100%)',
    bgGlows: [
      'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(217,119,6,0.12) 0%, transparent 60%)',
      'radial-gradient(circle, rgba(180,83,9,0.15) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
    ],
    accentColor: '#D97706', glowRgb: '217,119,6',
    tagline: 'Ultra-narrow point-focus laser spotlighting',
  },
  {
    id: 8, name: 'Diyam Track Light', image: '/products/Tracklight.jpeg',
    gradient: 'linear-gradient(135deg, #BE123C 0%, #E11D48 40%, #F43F5E 70%, #FFE4E6 100%)',
    bgGlows: [
      'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(225,29,72,0.12) 0%, transparent 60%)',
      'radial-gradient(circle, rgba(190,18,60,0.15) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)',
    ],
    accentColor: '#E11D48', glowRgb: '225,29,72',
    tagline: 'Heavy-duty commercial exhibition track spotlight',
  },
  {
    id: 9, name: 'Tricolor Ring Downlight', image: '/products/tricolorring.jpeg',
    gradient: 'linear-gradient(135deg, #0D9488 0%, #14B8A6 40%, #2DD4BF 70%, #F0FDFA 100%)',
    bgGlows: [
      'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(20,184,166,0.12) 0%, transparent 60%)',
      'radial-gradient(circle, rgba(13,148,136,0.15) 0%, transparent 70%)',
      'radial-gradient(circle, rgba(45,212,191,0.12) 0%, transparent 70%)',
    ],
    accentColor: '#14B8A6', glowRgb: '20,184,166',
    tagline: '3-in-1 smart tunable color-shifting ceiling downlight',
  },
]

/* Reusable fixture ellipse — no stick */
function SpotlightFixture({ glowRgb, side }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`absolute top-[4%] z-20 ${side === 'left' ? 'left-[5%]' : 'right-[5%]'}`}
    >
      <div
        className="w-12 h-8 rounded-full border border-slate-400/50"
        style={{
          background: 'linear-gradient(145deg, #b0bec5 0%, #546e7a 55%, #1a2634 100%)',
          boxShadow: `0 0 28px rgba(${glowRgb},0.65), 0 0 10px rgba(255,255,255,0.3), inset 0 2px 5px rgba(255,255,255,0.28)`,
        }}
      />
    </motion.div>
  )
}

/* Reusable spotlight cone */
function SpotlightCone({ glowRgb, side }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0.22, 0.38, 0.22], scaleX: [1, 1.04, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: side === 'right' ? 2 : 0 }}
      className={`absolute top-[9%] z-10 w-[320px] sm:w-[600px] h-[900px] ${side === 'left' ? 'left-[6%] origin-top-left' : 'right-[6%] origin-top-right'}`}
      style={{
        transform: `rotate(${side === 'left' ? '24deg' : '-24deg'})`,
        background: side === 'left'
          ? `linear-gradient(135deg, rgba(${glowRgb},0.18) 0%, rgba(255,255,255,0.06) 38%, transparent 72%)`
          : `linear-gradient(225deg, rgba(${glowRgb},0.18) 0%, rgba(255,255,255,0.06) 38%, transparent 72%)`,
        clipPath: side === 'left'
          ? 'polygon(0% 0%, 10% 0%, 100% 100%, 0% 100%)'
          : 'polygon(100% 0%, 90% 0%, 100% 100%, 0% 100%)',
        filter: 'blur(14px)',
      }}
    />
  )
}

export default function Hero() {
  const [activeThemeIndex, setActiveThemeIndex] = useState(0)
  const [isIlluminated, setIsIlluminated] = useState(false)
  const activeTheme = focusLightThemes[activeThemeIndex]
  const rgb = activeTheme.glowRgb

  const handleThemeClick = (i) => {
    if (i === activeThemeIndex) {
      setIsIlluminated(prev => !prev)
    } else {
      setActiveThemeIndex(i)
      setIsIlluminated(true)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">

      {/* ── Dark Illuminated Scene (any theme, toggleable) ──────────── */}
      {isIlluminated && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
          {/* Deep dark canvas — not pure black, has depth */}
          <div className="absolute inset-0" style={{ background: '#03080F' }} />

          {/* Ambient glows from each fixture */}
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 52% 26% at 24% 4%, rgba(${rgb},0.24) 0%, transparent 60%)` }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 52% 26% at 76% 4%, rgba(${rgb},0.24) 0%, transparent 60%)` }} />
          {/* Floor pooled light */}
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 36% 12% at 50% 97%, rgba(${rgb},0.18) 0%, transparent 58%)` }} />
          {/* Centre ambient */}
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, rgba(${rgb},0.1) 0%, transparent 48%)` }} />

          <SpotlightFixture glowRgb={rgb} side="left" />
          <SpotlightCone   glowRgb={rgb} side="left" />
          <SpotlightFixture glowRgb={rgb} side="right" />
          <SpotlightCone   glowRgb={rgb} side="right" />
        </div>
      )}

      {/* ── Animated ambient background (always visible) ─────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 transition-all duration-700" style={{ background: activeTheme.bgGlows[0] }} />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
          style={{ background: activeTheme.bgGlows[1] }}
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full"
          style={{ background: activeTheme.bgGlows[2] }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(37,99,235,1) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <ParticleField count={20} />

      {/* Floating orbs */}
      {[
        { top: '12%', left: '7%',  delay: 0,   size: 10, color: 'rgba(37,99,235,0.5)' },
        { top: '72%', left: '6%',  delay: 1.2, size: 7,  color: 'rgba(6,182,212,0.5)' },
        { top: '35%', left: '93%', delay: 2,   size: 9,  color: 'rgba(79,70,229,0.5)' },
        { top: '18%', left: '87%', delay: 0.6, size: 12, color: 'rgba(37,99,235,0.4)' },
        { top: '82%', left: '88%', delay: 1.8, size: 7,  color: 'rgba(6,182,212,0.4)' },
      ].map((orb, i) => (
        <motion.div key={i} className="absolute pointer-events-none" style={{ top: orb.top, left: orb.left }}
          animate={{ y: [0, -20, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: orb.delay, ease: 'easeInOut' }}
        >
          <div className="rounded-full blur-sm" style={{ width: orb.size * 2, height: orb.size * 2, background: orb.color, boxShadow: `0 0 ${orb.size * 3}px ${orb.color}` }} />
        </motion.div>
      ))}

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
          className="inline-flex items-center gap-3 rounded-full px-5 py-2 mb-8 shadow-sm"
          style={isIlluminated
            ? { background: `rgba(${rgb},0.14)`, border: `1px solid rgba(${rgb},0.35)`, backdropFilter: 'blur(8px)' }
            : { background: 'rgb(239,246,255)', border: '1px solid rgb(191,219,254)' }
          }
        >
          <span className="w-2 h-2 rounded-full animate-pulse"
            style={{ backgroundColor: isIlluminated ? `rgba(${rgb},1)` : '#2563EB' }} />
          <span className="section-label text-[11px]" style={{ color: isIlluminated ? 'rgba(255,255,255,0.9)' : '' }}>
            Premium LED Lighting — Est. 2015
          </span>
          <span className="w-2 h-2 rounded-full animate-pulse"
            style={{ animationDelay: '0.5s', backgroundColor: isIlluminated ? `rgba(${rgb},0.8)` : '#06B6D4' }} />
        </motion.div>

        {/* Brand name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.9, ease: 'easeOut' }}
          className="mb-5 flex flex-col items-center relative"
        >
          {isIlluminated && (
            <div className="absolute -top-4 -bottom-6 -left-12 -right-12 blur-xl rounded-3xl border z-[-1] animate-pulse"
              style={{
                background: `linear-gradient(to right, rgba(${rgb},0.07), rgba(${rgb},0.2), rgba(${rgb},0.07))`,
                borderColor: `rgba(${rgb},0.22)`,
                boxShadow: `0 0 40px rgba(${rgb},0.15)`,
              }}
            />
          )}
          <span className="text-sm tracking-[0.45em] uppercase font-bold mb-1 sm:mb-2 block"
            style={{
              color: isIlluminated ? activeTheme.accentColor : '#2563EB',
              filter: isIlluminated ? `drop-shadow(0 0 8px rgba(${rgb},0.9))` : 'none',
            }}
          >
            Premium Lights
          </span>
          <h1
            className="font-cinzel font-black tracking-[0.2em] transition-all duration-700"
            style={{
              fontSize: 'clamp(4rem, 14vw, 9.5rem)',
              lineHeight: 1,
              ...(isIlluminated ? {
                color: '#ffffff',
                WebkitTextFillColor: '#ffffff',
                textShadow: `0 0 35px rgba(${rgb},0.95), 0 0 70px rgba(${rgb},0.55), 0 0 110px rgba(${rgb},0.25)`,
                filter: 'drop-shadow(0 0 18px rgba(255,255,255,0.55))',
              } : {
                background: activeTheme.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }),
            }}
          >
            DIYAM
          </h1>
        </motion.div>

        {/* Main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.8 }}
          className="font-playfair mb-6"
          style={{ fontSize: 'clamp(1.6rem, 4.5vw, 3.2rem)', fontWeight: 400, lineHeight: 1.25, color: isIlluminated ? '#ffffff' : '#1e293b' }}
        >
          <em>Illuminate</em> Every{' '}
          <span className="font-semibold text-shimmer">Space</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.72, duration: 0.7 }}
          className="font-inter mb-8 max-w-2xl mx-auto leading-relaxed"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: isIlluminated ? '#cbd5e1' : '#64748b' }}
        >
          Premium LED lighting solutions for homes, offices, retail, and hospitality.
          From COB downlights to track systems — crafted for excellence.
        </motion.p>

        {/* Theme Selector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6 mb-10 max-w-4xl mx-auto"
        >
          <p className="text-[10px] font-inter uppercase tracking-[0.25em] mb-4"
            style={{ color: isIlluminated ? 'rgba(255,255,255,0.45)' : '#94a3b8' }}>
            ✦ Click to Illuminate — Click Same to Toggle Off ✦
          </p>
          <div className="flex flex-wrap justify-center gap-3.5 px-4">
            {focusLightThemes.map((theme, i) => {
              const isActive = activeThemeIndex === i
              return (
                <motion.button
                  key={theme.id}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleThemeClick(i)}
                  className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 transition-all p-1 flex items-center justify-center cursor-pointer"
                  style={{
                    background: isIlluminated ? 'rgba(10,18,28,0.7)' : (isActive ? '#ffffff' : '#f8fafc'),
                    borderColor: isActive ? theme.accentColor : (isIlluminated ? 'rgba(255,255,255,0.1)' : '#e2e8f0'),
                    boxShadow: isActive
                      ? (isIlluminated
                          ? `0 0 22px rgba(${theme.glowRgb},0.7), 0 8px 20px rgba(${theme.glowRgb},0.3)`
                          : `0 10px 25px ${theme.accentColor}28`)
                      : 'none',
                    transform: isActive ? 'scale(1.06)' : 'scale(1)',
                  }}
                >
                  <img
                    src={theme.image} alt={theme.name}
                    className="w-full h-full object-contain p-0.5"
                    style={{ mixBlendMode: isIlluminated ? 'normal' : 'multiply' }}
                  />
                  {isActive && (
                    <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: theme.accentColor, boxShadow: isIlluminated ? `0 0 8px ${theme.accentColor}` : 'none' }}
                    />
                  )}
                  {isActive && isIlluminated && (
                    <div className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{ boxShadow: `inset 0 0 14px rgba(${theme.glowRgb},0.4)` }} />
                  )}
                </motion.button>
              )
            })}
          </div>

          {/* Active tagline */}
          <div className="h-6 mt-4 flex items-center justify-center">
            <motion.span
              key={`${activeThemeIndex}-${isIlluminated}`}
              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
              className="text-xs font-semibold font-inter tracking-wider"
              style={{
                color: activeTheme.accentColor,
                textShadow: isIlluminated ? `0 0 12px rgba(${rgb},0.85)` : 'none',
              }}
            >
              {isIlluminated ? '💡' : '✦'} {activeTheme.name} — {activeTheme.tagline} {isIlluminated ? '💡' : '✦'}
            </motion.span>
          </div>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {features.map((f) => (
            <span key={f.label}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-inter font-medium shadow-sm"
              style={isIlluminated
                ? { background: `rgba(${rgb},0.13)`, border: `1px solid rgba(${rgb},0.3)`, color: 'rgba(255,255,255,0.88)' }
                : { background: '#ffffff', border: '1px solid #e2e8f0', color: '#475569' }
              }
            >
              <span>{f.icon}</span> {f.label}
            </span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/products" className="btn-primary px-9 py-4 rounded-full font-inter font-bold text-base tracking-wide inline-flex items-center gap-2 shadow-lg">
            <span>Explore Products</span>
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>→</motion.span>
          </Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="px-9 py-4 rounded-full font-inter font-semibold text-base tracking-wide inline-flex items-center gap-2"
            style={isIlluminated
              ? { border: '1px solid rgba(255,255,255,0.3)', color: '#ffffff' }
              : { border: '2px solid #2563EB', color: '#2563EB' }
            }
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>WhatsApp Order</span>
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.3, duration: 1.2 }}
          className="mt-16 h-px max-w-xs mx-auto"
          style={{ background: isIlluminated ? `rgba(${rgb},0.45)` : 'linear-gradient(90deg, transparent, #2563EB, #06B6D4, transparent)' }}
        />

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-10"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-cinzel font-black text-2xl"
                style={isIlluminated ? {
                  color: '#ffffff',
                  WebkitTextFillColor: '#ffffff',
                  textShadow: `0 0 14px rgba(${rgb},0.9), 0 0 30px rgba(${rgb},0.5)`,
                } : {
                  background: 'linear-gradient(135deg, #2563EB, #06B6D4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {s.num}
              </div>
              <div className="font-inter text-xs tracking-widest uppercase mt-1"
                style={{ color: isIlluminated ? 'rgba(148,163,184,0.85)' : '#94a3b8' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: isIlluminated ? 'linear-gradient(to top, #03080F 0%, transparent 100%)' : 'linear-gradient(to top, #FFFFFF 0%, transparent 100%)' }}
      />
    </section>
  )
}
