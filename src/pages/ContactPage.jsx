import SEO from '../components/SEO'
import { motion } from 'framer-motion'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollReveal from '../components/ScrollReveal'
import { WHATSAPP_URL } from '../data/products'

function WAIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}

const quickOptions = [
  {
    Icon: WAIcon,
    title: 'WhatsApp Chat',
    sub: 'Instant response',
    href: WHATSAPP_URL,
    color: 'from-green-50 to-emerald-50',
    border: 'border-green-200',
    textColor: 'text-green-700',
  },
  {
    Icon: PhoneIcon,
    title: 'Call Us',
    sub: '+91 95993 01369',
    href: 'tel:+919599301369',
    color: 'from-brand-50 to-cyan-50',
    border: 'border-brand-200',
    textColor: 'text-brand-700',
  },
  {
    Icon: MailIcon,
    title: 'Email',
    sub: 'diyamlights@gmail.com',
    href: 'mailto:diyamlights@gmail.com',
    color: 'from-blue-50 to-indigo-50',
    border: 'border-blue-200',
    textColor: 'text-blue-700',
  },
]

export default function ContactPage() {
  return (
    <>
      <SEO 
        title="Contact Us - Premium Lighting Inquiries"
        description="Get in touch with DIYAM (diyam.co.in) Premium Lighting. Inquire about our heavy-duty waterproof LED Focus Lights, spotlights, and electronic drivers. WhatsApp, call, or visit our Haryana showroom."
        keywords="diyam contact, diyam haryana address, order focus lights ncr, led supplier contact, whatsapp diyam lighting"
        path="/contact"
      />
      {/* Page Hero */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden bg-white">
        <div className="absolute inset-0 glow-center opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="section-label mb-4">
            Connect With Us
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="heading-luxury text-shimmer mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Contact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-inter text-gray-500 max-w-xl mx-auto"
          >
            We're here to help with your LED lighting project. Reach out — we respond fast.
          </motion.p>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.3 }} className="mt-6 h-px max-w-sm mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #2563EB, transparent)' }} />
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-10 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickOptions.map((opt, i) => (
              <ScrollReveal key={opt.title} delay={i * 0.1}>
                <a
                  href={opt.href}
                  target={opt.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 rounded-2xl p-5 border ${opt.border} bg-gradient-to-br ${opt.color} group hover:scale-[1.02] transition-all duration-300 block`}
                >
                  <span className={opt.textColor}>
                    <opt.Icon />
                  </span>
                  <div>
                    <div className={`font-cinzel font-bold text-sm ${opt.textColor}`}>{opt.title}</div>
                    <div className="font-inter text-gray-500 text-xs mt-0.5">{opt.sub}</div>
                  </div>
                  <span className={`ml-auto ${opt.textColor} opacity-50 group-hover:opacity-100 transition-opacity`}>→</span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Contact />

      {/* Location info */}
      <section className="px-6 pb-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="glass-card rounded-3xl overflow-hidden min-h-[16rem] flex items-center justify-center relative p-8">
              <div className="absolute inset-0 glow-center opacity-30" />
              <div className="text-center relative z-10 max-w-lg mx-auto">
                <div className="flex justify-center text-brand-500 mb-4">
                  <MapPinIcon />
                </div>
                <h3 className="font-cinzel font-bold text-brand-600 text-xl mb-3">Our Location</h3>
                <p className="font-inter text-gray-800 text-base font-semibold mb-1">
                  1st floor, AVL36GURGAON
                </p>
                <p className="font-inter text-gray-500 text-xs tracking-wide uppercase mb-3">
                  Haryana, India
                </p>
                <div className="h-px w-20 bg-brand-100 mx-auto mb-4" />
                <p className="font-inter text-gray-500 text-xs mt-1">
                  Serving Gurugram, Delhi NCR, and Pan-India. Dedicated to premium LED light delivery and consultation.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
