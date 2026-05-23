import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import { testimonials } from '../data/products'

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-sm ${i < rating ? 'text-amber-400' : 'text-slate-200'}`}>★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-slate-50">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(37,99,235,0.03) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="section-label mb-4">Customer Love</p>
            <h2 className="heading-luxury text-gray-900 mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              What Our <span className="text-shimmer">Customers</span> Say
            </h2>
            <p className="font-inter text-gray-500 max-w-xl mx-auto leading-relaxed">
              Real stories from clients who trust DIYAM for their LED lighting projects across India.
            </p>
            <div className="mt-6 h-px max-w-sm mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #2563EB, transparent)' }} />
          </div>
        </ScrollReveal>

        {/* Swiper */}
        <ScrollReveal delay={0.15}>
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={24}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <TestimonialCard t={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </ScrollReveal>

        {/* Trust badges */}
        <ScrollReveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { icon: '⭐', label: '4.9/5 Rating', sub: '10,000+ reviews' },
              { icon: '🏆', label: 'Trusted Brand', sub: 'Since 2012' },
              { icon: '🚚', label: 'Pan-India Delivery', sub: '150+ cities' },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-3 bg-white border border-slate-100 shadow-sm px-5 py-3 rounded-full">
                <span className="text-2xl">{b.icon}</span>
                <div>
                  <div className="font-cinzel text-brand-600 text-sm font-bold">{b.label}</div>
                  <div className="font-inter text-gray-400 text-xs">{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function TestimonialCard({ t }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 h-full flex flex-col justify-between hover:border-brand-200 hover:shadow-md transition-all duration-300"
    >
      {/* Quote mark */}
      <div className="text-brand-500/20 font-cinzel text-6xl leading-none mb-4">"</div>

      {/* Text */}
      <p className="font-inter text-gray-600 text-sm leading-relaxed mb-6 flex-1">
        {t.text}
      </p>

      {/* Stars */}
      <StarRating rating={t.rating} />

      {/* Divider */}
      <div className="h-px bg-slate-100 my-4" />

      {/* Author */}
      <div className="flex items-center gap-3 font-inter">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-cinzel font-bold text-sm flex-shrink-0`}>
          {t.avatar}
        </div>
        <div>
          <div className="font-cinzel font-semibold text-gray-900 text-sm">{t.name}</div>
          <div className="font-slate-400 text-xs">{t.location}</div>
        </div>
        <div className="ml-auto text-green-600 text-xs font-semibold">Verified ✓</div>
      </div>
    </motion.div>
  )
}
