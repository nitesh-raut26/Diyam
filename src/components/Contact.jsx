import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import { WHATSAPP_URL } from '../data/products'

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.18 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function LightSVG() {
  return (
    <svg viewBox="0 0 60 60" fill="none" width="60" height="60" className="text-brand-500">
      <circle cx="30" cy="24" r="14" fill="currentColor" opacity="0.15" />
      <circle cx="30" cy="24" r="8" fill="currentColor" opacity="0.3" />
      <circle cx="30" cy="24" r="4" fill="white" opacity="0.7" />
      <path d="M22 40 Q20 48 30 50 Q40 48 38 40 Q34 38 30 38 Q26 38 22 40Z" fill="currentColor" opacity="0.2" />
      <rect x="28" y="50" width="4" height="6" rx="2" fill="currentColor" opacity="0.25" />
    </svg>
  )
}

const contactInfo = [
  { Icon: PhoneIcon, label: 'Phone', value: '+91 95993 01369', href: 'tel:+919599301369' },
  { Icon: MailIcon, label: 'Email', value: 'contactlightsbazar@gmail.com', href: 'mailto:contactlightsbazar@gmail.com' },
  { Icon: MapPinIcon, label: 'Address', value: 'Shop No-52, 1st floor, AVL36GURGAON', href: '#' },
  { Icon: ClockIcon, label: 'Hours', value: 'Mon–Sat: 9:00 AM – 7:00 PM IST', href: '#' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-white">
      {/* Soft cyan/blue background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(37,99,235,0.02) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="section-label mb-4">Get In Touch</p>
            <h2 className="heading-luxury text-gray-900 mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Let's <span className="text-shimmer">Light Up</span> Your Space
            </h2>
            <p className="font-inter text-gray-500 max-w-xl mx-auto leading-relaxed">
              Have a project, bulk enquiry, or custom requirement? Reach out — we respond fast.
            </p>
            <div className="mt-6 h-px max-w-sm mx-auto" style={{ background: 'linear-gradient(90deg, transparent, #2563EB, transparent)' }} />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <ScrollReveal direction="right">
              <div className="space-y-4 mb-10">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    target={info.href.startsWith('http') ? '_blank' : undefined}
                    rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 bg-white border border-slate-100 shadow-sm rounded-2xl p-5 group hover:border-brand-200 hover:shadow-md transition-all duration-300 block"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-brand-500"
                      style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(37,99,235,0.03))' }}>
                      <info.Icon />
                    </div>
                    <div>
                      <div className="font-cinzel text-brand-600/70 text-xs tracking-widest uppercase mb-1">{info.label}</div>
                      <div className="font-inter text-gray-800 text-sm group-hover:text-brand-600 transition-colors">{info.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </ScrollReveal>

            {/* Owner info */}
            <ScrollReveal delay={0.1}>
              <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5 mb-6">
                <div className="font-cinzel text-brand-600/70 text-xs tracking-widest uppercase mb-2">Owner</div>
                <div className="font-playfair text-gray-900 text-lg">Mohan Kumar</div>
                <div className="font-inter text-gray-500 text-xs mt-1">Proprietor, DIYAM / Lightsbazar — Est. 2015</div>
              </div>
            </ScrollReveal>

            {/* WhatsApp CTA */}
            <ScrollReveal delay={0.2}>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl p-5 group transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md"
                style={{
                  background: 'linear-gradient(135deg, rgba(37,211,102,0.12), rgba(18,140,126,0.06))',
                  border: '1px solid rgba(37,211,102,0.18)',
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}>
                  <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div className="font-cinzel font-bold text-green-600 text-sm mb-1">Chat on WhatsApp</div>
                  <div className="font-inter text-gray-700 text-xs">Fastest way to place orders or get a quote</div>
                </div>
                <span className="ml-auto text-green-500 text-lg">→</span>
              </a>
            </ScrollReveal>
          </div>

          {/* Contact Form */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="flex justify-center mb-6 animate-float">
                    <LightSVG />
                  </div>
                  <h3 className="font-cinzel font-bold text-brand-600 text-xl mb-3">Message Sent!</h3>
                  <p className="font-inter text-gray-500 text-sm leading-relaxed">
                    Thank you for reaching out. We'll get back to you shortly!
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }) }}
                    className="mt-6 border-2 border-brand-500 text-brand-600 hover:bg-brand-500 hover:text-white transition-all duration-300 px-6 py-2 rounded-full text-sm font-inter font-semibold shadow-sm"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-inter text-gray-500 text-xs tracking-widest uppercase mb-2">Your Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rahul Sharma"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 font-inter text-sm transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-inter text-gray-500 text-xs tracking-widest uppercase mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 font-inter text-sm transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
                      />
                    </div>
                    <div>
                      <label className="block font-inter text-gray-500 text-xs tracking-widest uppercase mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 font-inter text-sm transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-inter text-gray-500 text-xs tracking-widest uppercase mb-2">Message *</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about your lighting project or requirements..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 font-inter text-sm resize-none transition-all duration-300 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500/30"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-brand-600 to-cyan-500 hover:from-brand-700 hover:to-cyan-600 py-4 rounded-xl text-white font-cinzel font-bold tracking-widest text-sm shadow-sm transition-all duration-300 shadow-brand-500/10"
                  >
                    Send Message ✦
                  </motion.button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
