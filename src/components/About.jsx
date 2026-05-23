import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import DiyamLogo from './DiyamLogo'
import { stats } from '../data/products'

function CounterNumber({ value, suffix, inView }) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {inView ? value : 0}
      {suffix}
    </motion.span>
  )
}

export default function About() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-slate-50">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,0.02) 0%, transparent 70%)`,
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Visual */}
          <ScrollReveal direction="right">
            <div className="relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-full animate-spin-slow opacity-30"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent 0deg, rgba(37,99,235,0.3) 90deg, transparent 180deg, rgba(6,182,212,0.15) 270deg, transparent 360deg)',
                  }}
                />

                {/* Center card */}
                <div className="absolute inset-8 bg-white border border-slate-100 shadow-md rounded-3xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <motion.div
                      animate={{ scale: [1, 1.04, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="flex justify-center mb-4"
                    >
                      <DiyamLogo size={96} />
                    </motion.div>
                    <div className="font-cinzel font-bold text-shimmer text-3xl tracking-widest">DIYAM</div>
                    <div className="font-inter text-gray-400 text-xs tracking-widest uppercase mt-2">Est. 2015 — Gurugram</div>
                  </div>
                </div>

                {/* Orbiting decorative elements */}
                {['✦', '✧', '◈', '✦'].map((sym, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-brand-400/60 text-xl"
                    style={{
                      top: `${50 + 42 * Math.sin((i * Math.PI) / 2)}%`,
                      left: `${50 + 42 * Math.cos((i * Math.PI) / 2)}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10 + i * 3, repeat: Infinity, ease: 'linear', delay: i }}
                  >
                    {sym}
                  </motion.div>
                ))}

                {/* Corner light icons */}
                {[
                  { top: '5%', left: '60%' },
                  { top: '60%', left: '5%' },
                  { bottom: '8%', right: '10%' },
                ].map((pos, i) => (
                  <motion.div
                    key={i}
                    className="absolute animate-float text-brand-500/60"
                    style={{ ...pos, animationDelay: `${i * 1.5}s` }}
                  >
                    <svg viewBox="0 0 20 28" fill="currentColor" width="24" height="24">
                      <path d="M10 1 Q5 8 7 15 Q9 20 10 22 Q11 20 13 15 Q15 8 10 1Z" opacity="0.7" />
                      <path d="M10 8 Q7.5 13 8.5 17 Q9 19 10 20 Q11 19 11.5 17 Q12.5 13 10 8Z" fill="white" opacity="0.4" />
                    </svg>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right — Content */}
          <div>
            <ScrollReveal>
              <p className="section-label mb-4">Our Story</p>
              <h2 className="heading-luxury text-gray-900 mb-6"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>
                Where <span className="text-shimmer">Precision</span> Meets
                <br />
                <em className="font-playfair font-normal text-brand-600">Modern LED Excellence</em>
              </h2>
              <div className="mt-4 h-px max-w-sm mb-8" style={{ background: 'linear-gradient(90deg, #2563EB, transparent)' }} />
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="font-inter text-gray-600 leading-relaxed mb-6 text-base">
                Founded in 2015 in Gurugram, Haryana, DIYAM (Lightsbazar) was born from a passion for
                superior LED lighting. We supply premium downlights, track lights, COB lights, LED drivers,
                and panel lights to architects, interior designers, and contractors across India.
              </p>
              <p className="font-inter text-gray-600 leading-relaxed mb-8 text-base">
                Under the leadership of Mohan Kumar, we have grown from a local supplier to a trusted
                name in professional LED lighting — known for product quality, expert guidance, and
                an industry-leading 2-year replacement warranty.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="flex flex-wrap gap-4 mb-10">
                {['2-Year Warranty', 'Pan-India Supply', 'Expert Guidance'].map((tag) => (
                  <span key={tag} className="bg-white border border-slate-200/80 px-4 py-2 rounded-full text-brand-600 text-sm font-inter font-medium shadow-sm">
                    ✦ {tag}
                  </span>
                ))}
              </div>
            </ScrollReveal>

            {/* Stats grid */}
            <div ref={statsRef} className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <ScrollReveal key={s.label} delay={0.1 * i}>
                  <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 text-center hover:border-brand-200 hover:shadow-md transition-all duration-300">
                    <div className="font-cinzel font-black text-brand-600 text-3xl mb-1">
                      <CounterNumber value={s.value.toLocaleString()} suffix={s.suffix} inView={statsInView} />
                    </div>
                    <div className="font-inter text-gray-500 text-xs tracking-widest uppercase">{s.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
