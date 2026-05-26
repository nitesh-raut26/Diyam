import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiRobot2Line, RiSendPlane2Fill, RiCloseLine, RiSparklingFill, RiShoppingBag3Line, RiCheckboxCircleFill, RiErrorWarningLine } from 'react-icons/ri'
import { askQuestion, sendOrderInquiry } from '../services/ragApi'

const WELCOME = {
  id: 0,
  role: 'assistant',
  content: "Hello! I'm the Diyam Smart Light Consultant, powered by Gemini 2.5 Flash.\n\nAsk me anything — outdoor lighting, wattage specs, dimmable drivers, pricing, or product comparisons. I'll find the perfect fit from our catalog.",
  products: [],
}

const SUGGESTED = [
  'Best outdoor focus lights?',
  'Dimmable LED driver options?',
  'Recommend spotlights for showroom',
]

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div
        className="rounded-2xl rounded-bl-sm px-4 py-3"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              className="block w-1.5 h-1.5 rounded-full bg-indigo-400"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.55, delay: i * 0.15, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product, onInquire }) {
  return (
    <div
      className="rounded-xl p-2.5 mt-1"
      style={{
        background: 'rgba(99,102,241,0.08)',
        border: '1px solid rgba(99,102,241,0.25)',
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-white text-[11px] font-semibold leading-snug truncate">{product.name}</p>
          <p className="text-indigo-300 text-[10px] mt-0.5">
            {product.category}{product.wattage ? ` · ${product.wattage}` : ''}
            {product.colorTemp ? ` · ${product.colorTemp}` : ''}
          </p>
          {product.price && (
            <p className="text-amber-400 text-[10px] font-semibold mt-0.5">{product.price}</p>
          )}
          {product.score && (
            <p className="text-slate-500 text-[9px] mt-0.5">Match: {Math.round(product.score * 100)}%</p>
          )}
        </div>
        <button
          onClick={() => onInquire(product)}
          className="flex-shrink-0 flex items-center gap-1 text-[10px] font-medium text-white px-2 py-1 rounded-lg"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          <RiShoppingBag3Line className="text-[11px]" />
          Inquire
        </button>
      </div>
    </div>
  )
}

function OrderModal({ product, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', quantity: 1 })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0
    const num = priceStr.replace(/[₹,\s/Piecepcs]/gi, '')
    return isNaN(+num) ? 0 : +num
  }

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim()) return
    setStatus('loading')
    try {
      const unitPrice = parsePrice(product.price)
      const ok = await sendOrderInquiry({
        customerName: form.name.trim(),
        customerEmail: form.email.trim(),
        productName: product.name,
        quantity: form.quantity,
        totalValue: unitPrice * form.quantity,
      })
      setStatus(ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.96 }}
        transition={{ type: 'spring', damping: 22 }}
        className="w-full max-w-sm rounded-2xl p-5"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)',
          border: '1px solid rgba(99,102,241,0.35)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-white font-semibold text-sm">Order Inquiry</h3>
            <p className="text-indigo-300 text-xs mt-0.5 leading-relaxed max-w-[220px]">{product.name}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white mt-0.5">
            <RiCloseLine className="text-lg" />
          </button>
        </div>

        {status === 'success' ? (
          <div className="text-center py-6">
            <RiCheckboxCircleFill className="text-4xl text-green-400 mx-auto mb-3" />
            <p className="text-white text-sm font-medium">Inquiry Sent!</p>
            <p className="text-slate-400 text-xs mt-1">Our team will contact you at <span className="text-indigo-300">{form.email}</span> shortly.</p>
            <button
              onClick={onClose}
              className="mt-4 text-xs text-white/50 hover:text-white underline"
            >Close</button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Your Name *"
              className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            />
            <input
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="Email Address *"
              type="email"
              className="w-full rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500 transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
            />
            <div className="flex items-center gap-2">
              <label className="text-white/50 text-xs whitespace-nowrap">Quantity</label>
              <input
                value={form.quantity}
                onChange={e => setForm(f => ({ ...f, quantity: Math.max(1, +e.target.value || 1) }))}
                type="number"
                min="1"
                className="flex-1 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }}
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-400 text-xs">
                <RiErrorWarningLine />
                <span>Could not send. Make sure n8n webhook is active.</span>
              </div>
            )}

            <div className="flex gap-2 mt-1">
              <button
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-sm text-white/50 transition-colors hover:text-white"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={status === 'loading' || !form.name.trim() || !form.email.trim()}
                className="flex-1 py-2.5 rounded-xl text-sm text-white font-medium disabled:opacity-50 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                {status === 'loading' ? 'Sending…' : 'Send Inquiry'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default function SmartAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderProduct, setOrderProduct] = useState(null)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  const send = async (text) => {
    const question = (text ?? input).trim()
    if (!question || loading) return
    setInput('')

    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: question }])
    setLoading(true)

    try {
      const data = await askQuestion(question)
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.answer,
          products: data.retrieved_context || [],
        },
      ])
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          role: 'assistant',
          content: "I couldn't reach the Diyam AI backend right now. Please make sure the FastAPI server is running:\n\n`cd Assignment2 && ./run.sh`",
          products: [],
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating toggle button — sits above the WhatsApp button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', damping: 15 }}
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        title="Diyam Smart Assistant"
        className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #6366f1, #7c3aed)',
          boxShadow: open
            ? '0 8px 32px rgba(99,102,241,0.7)'
            : '0 8px 28px rgba(99,102,241,0.45)',
        }}
      >
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ background: '#6366f1', animationDuration: '2s' }}
        />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            {open
              ? <RiCloseLine className="text-white text-xl sm:text-2xl" />
              : <RiRobot2Line className="text-white text-xl sm:text-2xl" />
            }
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed z-50 bottom-[8.5rem] right-4 sm:bottom-44 sm:right-6 w-[92vw] max-w-[360px] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #0d1526 0%, #0f0c2e 100%)',
              border: '1px solid rgba(99,102,241,0.28)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(99,102,241,0.08)',
              maxHeight: '72vh',
            }}
          >
            {/* ── Header ── */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)' }}
              >
                <RiSparklingFill className="text-white text-sm" />
              </div>
              <div className="min-w-0">
                <p className="text-white text-sm font-semibold leading-none">Diyam Smart Assistant</p>
                <p className="text-indigo-400 text-[10px] mt-0.5 truncate">Powered by Gemini 2.5 Flash · RAG</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto text-white/35 hover:text-white transition-colors flex-shrink-0"
              >
                <RiCloseLine className="text-lg" />
              </button>
            </div>

            {/* ── Messages ── */}
            <div className="flex-1 overflow-y-auto px-3 pt-3 pb-2 flex flex-col gap-3">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'rounded-br-sm text-white'
                        : 'rounded-bl-sm text-slate-200'
                    }`}
                    style={
                      msg.role === 'user'
                        ? { background: 'linear-gradient(135deg, #4f46e5, #7c3aed)' }
                        : { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)' }
                    }
                  >
                    <p className="text-[13px]">{msg.content}</p>

                    {/* Product result cards */}
                    {msg.products?.length > 0 && (
                      <div className="mt-2 flex flex-col gap-1.5">
                        {msg.products.slice(0, 3).map(p => (
                          <ProductCard key={p.id} product={p} onInquire={setOrderProduct} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {loading && <TypingDots />}
              <div ref={bottomRef} />
            </div>

            {/* ── Suggested chips (only when just the welcome message) ── */}
            {messages.length === 1 && !loading && (
              <div className="px-3 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {SUGGESTED.map(s => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="text-[11px] px-2.5 py-1 rounded-full text-indigo-300 transition-colors hover:text-white"
                    style={{ border: '1px solid rgba(99,102,241,0.35)', background: 'rgba(99,102,241,0.08)' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* ── Input ── */}
            <div
              className="px-3 pb-3 pt-2 flex gap-2 flex-shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="Ask about LED products…"
                className="flex-1 rounded-xl px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center disabled:opacity-35 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #6366f1, #7c3aed)' }}
              >
                <RiSendPlane2Fill className="text-white text-sm" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Order Inquiry Modal */}
      <AnimatePresence>
        {orderProduct && (
          <OrderModal product={orderProduct} onClose={() => setOrderProduct(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
