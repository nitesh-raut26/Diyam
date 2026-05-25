import SEO from '../components/SEO'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import About from '../components/About'
import WhyDiyam from '../components/WhyDiyam'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import { WHATSAPP_URL } from '../data/products'

function TargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function LightbulbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" />
      <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
    </svg>
  )
}

const milestones = [
  { year: '2015', event: 'DIYAM Founded', desc: 'Mohan Kumar established Lightsbazar in Gurugram, Haryana, with a focus on quality LED products.' },
  { year: '2017', event: 'First Major Projects', desc: 'Supplied LED lighting for commercial offices and residential complexes across the NCR region.' },
  { year: '2019', event: 'Expanded Product Range', desc: 'Grew to 300+ LED products including track lights, COB downlights, and outdoor landscape lighting.' },
  { year: '2021', event: 'Pan-NCR Reach', desc: 'Partnered with 50+ architects and contractors. Launched 2-year replacement warranty on all products.' },
  { year: '2024', event: '5000+ Projects Delivered', desc: 'Celebrated 5,000+ successful installations and launched diyam.co.in to serve customers nationwide.' },
]

export default function AboutPage() {
  return (
    <>
      <SEO 
        title="About Us - Luxury LED Lighting Experts since 2015"
        description="Learn about DIYAM (diyam.in / diyam.co.in) – India's premium LED lighting manufacturer. Discover our journey, from our founding in Gurugram to serving thousands of premium architectural projects with Focus Lights, spotlights, and smart downlights."
        keywords="about diyam, led lighting manufacturer, diyam lighting NCR, premium led supplier India, diyam lights story"
        path="/about"
      />
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 glow-center opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label mb-4">
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-luxury text-shimmer mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            About DIYAM
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-inter text-gray-500 max-w-2xl mx-auto leading-relaxed text-lg"
          >
            Premium LED lighting specialists serving architects, designers, and homeowners across India since 2015.
          </motion.p>
          <div className="mt-6 h-px max-w-sm mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #2563EB, transparent)' }} />
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                IconComponent: TargetIcon,
                title: 'Our Mission',
                text: 'To supply premium LED lighting that enhances every space — with expert guidance, certified quality, and honest service.',
              },
              {
                IconComponent: StarIcon,
                title: 'Our Vision',
                text: 'To be India\'s most trusted LED lighting partner for architects, contractors, and discerning homeowners.',
              },
              {
                IconComponent: LightbulbIcon,
                title: 'Our Promise',
                text: 'CE and IS certified products, a 2-year replacement warranty, and dedicated support at every stage of your project.',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.12}>
                <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-8 text-center h-full hover:border-brand-200 hover:shadow-md transition-all duration-300">
                  <div className="flex justify-center text-brand-500 mb-5">
                    <item.IconComponent />
                  </div>
                  <h3 className="font-cinzel font-bold text-brand-600 text-lg mb-4">{item.title}</h3>
                  <p className="font-inter text-gray-600 text-sm leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-6 bg-white relative overflow-hidden">
        <div className="absolute inset-0 glow-center opacity-20 pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="section-label mb-4">Our Journey</p>
              <h2 className="heading-luxury text-gray-900 text-3xl md:text-4xl">
                A Decade of <span className="text-shimmer">Excellence</span>
              </h2>
              <div className="mt-4 h-px max-w-xs mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #2563EB, transparent)' }} />
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-100 hidden md:block" />

            <div className="space-y-10">
              {milestones.map((m, i) => (
                <ScrollReveal key={m.year} delay={i * 0.1} direction={i % 2 === 0 ? 'right' : 'left'}>
                  <div className={`flex flex-col md:flex-row items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Content card */}
                    <div className="flex-1">
                      <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 hover:border-brand-200 hover:shadow-md transition-all duration-300">
                        <div className="font-cinzel font-black text-brand-500/60 text-xs tracking-widest mb-2">{m.year}</div>
                        <h3 className="font-cinzel font-bold text-gray-900 text-lg mb-2">{m.event}</h3>
                        <p className="font-inter text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                      </div>
                    </div>
                    {/* Center dot */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-sm shadow-brand-500/10 z-10 hidden md:flex">
                      <span className="text-white text-xs font-cinzel font-bold">{i + 1}</span>
                    </div>
                    {/* Spacer */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <About />
      <WhyDiyam />
      <Testimonials />

      {/* CTA Banner */}
      <section className="py-20 px-6 bg-slate-50 relative overflow-hidden">
        <div className="absolute inset-0 glow-center opacity-40 pointer-events-none" />
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center bg-white border border-slate-100 shadow-sm rounded-3xl p-12">
            <div className="flex justify-center mb-6">
              <svg viewBox="0 0 60 60" fill="none" width="60" height="60" className="animate-float text-brand-500">
                <circle cx="30" cy="22" r="14" fill="currentColor" opacity="0.15" />
                <circle cx="30" cy="22" r="7" fill="currentColor" opacity="0.3" />
                <circle cx="30" cy="22" r="3" fill="white" opacity="0.7" />
                <path d="M22 38 Q20 46 30 48 Q40 46 38 38 Q35 36 30 36 Q25 36 22 38Z" fill="currentColor" opacity="0.2" />
              </svg>
            </div>
            <h2 className="heading-luxury text-gray-900 text-3xl md:text-4xl mb-4">
              Ready to <span className="text-shimmer">Illuminate</span> Your Project?
            </h2>
            <p className="font-inter text-gray-500 mb-8 leading-relaxed">
              Explore our LED collection or connect with us on WhatsApp for a personalized quote and lighting consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center font-inter font-bold text-sm tracking-widest">
              <Link
                to="/products"
                className="bg-gradient-to-r from-brand-600 to-cyan-500 hover:from-brand-700 hover:to-cyan-600 px-8 py-4 rounded-full text-white transition-all duration-300 shadow-sm shadow-brand-500/10"
              >
                Explore Products
              </Link>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-sm"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <Footer />
    </>
  )
}
