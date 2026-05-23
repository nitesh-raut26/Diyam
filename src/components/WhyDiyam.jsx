import ScrollReveal from './ScrollReveal'
import { motion } from 'framer-motion'
import { features } from '../data/products'

function AwardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

// Spark / Zap
function ZapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

// Layout / Grid
function LayoutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
    </svg>
  )
}

// Shield / Warranty
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

// Truck / Delivery
function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

// Message / Support
function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )
}

const iconMap = {
  quality: <AwardIcon />,
  energy: <ZapIcon />,
  design: <LayoutIcon />,
  warranty: <ShieldIcon />,
  delivery: <TruckIcon />,
  support: <MessageIcon />,
}

export default function WhyDiyam() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-slate-50">
      {/* Glow top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.4) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="section-label mb-4">The DIYAM Difference</p>
            <h2 className="heading-luxury text-gray-900 mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Why Choose <span className="text-shimmer">DIYAM</span>?
            </h2>
            <p className="font-inter text-gray-500 max-w-xl mx-auto leading-relaxed">
              Every light we supply carries a promise — of quality, performance, and an experience that lasts.
            </p>
            <div className="mt-6 h-px max-w-sm mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #2563EB, transparent)' }} />
          </div>
        </ScrollReveal>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <ScrollReveal key={feat.title} delay={i * 0.1} direction="up">
              <FeatureCard feat={feat} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ feat }) {
  const icon = iconMap[feat.iconKey]

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-slate-100 shadow-sm rounded-2xl p-7 group relative overflow-hidden hover:border-brand-200 hover:shadow-md transition-all duration-300"
    >
      {/* Ambient glow behind icon */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 70%)' }}
      />

      {/* Icon container */}
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative text-brand-500 shadow-sm border border-slate-100"
        style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(37,99,235,0.03))' }}>
        {icon}
      </div>

      {/* Text */}
      <h3 className="font-cinzel font-bold text-gray-900 text-base mb-3 group-hover:text-brand-600 transition-colors duration-300">
        {feat.title}
      </h3>
      <p className="font-inter text-gray-500 text-sm leading-relaxed">
        {feat.description}
      </p>

      {/* Bottom accent brand line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" 
        style={{ background: 'linear-gradient(90deg, #2563EB, #06B6D4)' }}
      />
    </motion.div>
  )
}
