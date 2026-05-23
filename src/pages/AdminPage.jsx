import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { categories, products } from '../data/products'
import ProductCard from '../components/ProductCard'

// Pre-loaded premium studio image options
const PRESET_IMAGES = [
  { label: 'Indoor LED Panel', value: '/products/indoor-led-light-16w.jpg' },
  { label: 'COB Downlight 15W', value: '/products/cob-led-downlight-15w.jpg' },
  { label: 'Linear LED Lamp', value: '/products/led-linear-lamp-10w.jpg' },
  { label: 'Recessed Downlight', value: '/products/led-recessed-downlight-10w.jpg' },
  { label: 'Premium Spotlight', value: '/products/warm-white-spotlight.jpg' },
  { label: 'LED Track Light', value: '/products/led-track-light-30w.jpg' },
  { label: 'LED Flood Light', value: '/products/led-flood-light-50w.jpg' },
  { label: 'LED Focus Light', value: '/products/led-focus-light-20w.jpg' },
]

const DEFAULT_PIN = '9473'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [customProducts, setCustomProducts] = useState([])
  const [successMsg, setSuccessMsg] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0]?.name || 'Led Light',
    customCategory: '',
    price: '',
    badge: '',
    badgeColor: 'bg-blue-600',
    wattage: '',
    colorTemp: '',
    material: '',
    moq: '',
    description: '',
    imageOption: 'preset', // 'preset' or 'custom'
    presetImage: PRESET_IMAGES[0].value,
    customImage: '',
    tags: '',
  })

  // Load custom products from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('diyam_custom_products')
      if (stored) {
        setCustomProducts(JSON.parse(stored))
      }
    } catch (e) {
      console.error(e)
    }

    // Check if session authenticated
    const sessionAuth = sessionStorage.getItem('diyam_admin_authenticated')
    if (sessionAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  // Lockscreen PIN entry
  const handlePinKeyPress = (digit) => {
    if (pin.length < 4) {
      const newPin = pin + digit
      setPin(newPin)
      
      if (newPin.length === 4) {
        if (newPin === DEFAULT_PIN) {
          setTimeout(() => {
            setIsAuthenticated(true)
            sessionStorage.setItem('diyam_admin_authenticated', 'true')
            setPin('')
          }, 300)
        } else {
          setTimeout(() => {
            setPinError(true)
            setPin('')
            // Vibrate pattern if supported
            if (navigator.vibrate) navigator.vibrate(200)
            setTimeout(() => setPinError(false), 500)
          }, 300)
        }
      }
    }
  }

  const handleBackspace = () => {
    setPin(pin.slice(0, -1))
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('diyam_admin_authenticated')
  }

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.price || !formData.description) {
      alert('Please fill out all required fields (Name, Price, Description)')
      return
    }

    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1
    const selectedCategory = formData.category === 'Custom' ? formData.customCategory : formData.category
    const imagePath = formData.imageOption === 'preset' ? formData.presetImage : formData.customImage || '/products/indoor-led-light-16w.jpg'
    
    const parsedTags = formData.tags
      ? formData.tags.split(',').map((t) => t.trim()).filter((t) => t.length > 0)
      : [formData.wattage, formData.colorTemp].filter(Boolean)

    const newProduct = {
      id: nextId,
      name: formData.name,
      category: selectedCategory || 'Led Light',
      price: formData.price,
      badge: formData.badge || null,
      badgeColor: formData.badgeColor || 'bg-blue-600',
      wattage: formData.wattage || null,
      colorTemp: formData.colorTemp || null,
      material: formData.material || null,
      moq: formData.moq || null,
      description: formData.description,
      image: imagePath,
      tags: parsedTags,
      inquiry: `I am interested in the ${formData.name}. Please share specifications and pricing.`,
    }

    const updatedCustomList = [...customProducts, newProduct]
    setCustomProducts(updatedCustomList)
    localStorage.setItem('diyam_custom_products', JSON.stringify(updatedCustomList))

    // Success banner & reload products array values
    setSuccessMsg('Product added successfully!')
    setTimeout(() => {
      setSuccessMsg('')
      // Reload page to re-initialize merged imports across the website
      window.location.reload()
    }, 1500)

    // Reset Form
    setFormData({
      name: '',
      category: categories[0]?.name || 'Led Light',
      customCategory: '',
      price: '',
      badge: '',
      badgeColor: 'bg-blue-600',
      wattage: '',
      colorTemp: '',
      material: '',
      moq: '',
      description: '',
      imageOption: 'preset',
      presetImage: PRESET_IMAGES[0].value,
      customImage: '',
      tags: '',
    })
  }

  // Delete dynamic product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedList = customProducts.filter((p) => p.id !== id)
      setCustomProducts(updatedList)
      localStorage.setItem('diyam_custom_products', JSON.stringify(updatedList))
      
      setSuccessMsg('Product deleted successfully.')
      setTimeout(() => {
        setSuccessMsg('')
        window.location.reload()
      }, 1000)
    }
  }

  // Reset all
  const handleResetDefaults = () => {
    if (window.confirm('Are you sure you want to reset all custom products? This will restore original website products.')) {
      localStorage.removeItem('diyam_custom_products')
      setCustomProducts([])
      setSuccessMsg('Restored to defaults!')
      setTimeout(() => {
        setSuccessMsg('')
        window.location.reload()
      }, 1000)
    }
  }

  // Generate live product preview object
  const previewProduct = {
    id: 9999,
    name: formData.name || 'Sample Product Name',
    category: formData.category === 'Custom' ? formData.customCategory || 'Custom Category' : formData.category,
    price: formData.price || '₹0/Piece',
    badge: formData.badge || 'Preview',
    badgeColor: formData.badgeColor || 'bg-blue-600',
    wattage: formData.wattage || '15W',
    colorTemp: formData.colorTemp || 'Warm White',
    description: formData.description || 'This is a sample description of your newly created LED lighting product.',
    image: formData.imageOption === 'preset' ? formData.presetImage : formData.customImage || '/products/indoor-led-light-16w.jpg',
    tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()) : ['Sample', 'LED'],
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white pt-24 font-inter relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* Secure Lockscreen View */
          <motion.div
            key="lockscreen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.4 }}
            className="max-w-md mx-auto px-6 py-12 flex flex-col items-center justify-center relative z-10"
          >
            {/* Lock Icon */}
            <div className="w-16 h-16 rounded-full bg-blue-600/10 border border-blue-500/30 flex items-center justify-center mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 animate-pulse">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>

            <h1 className="font-cinzel text-xl font-bold tracking-wider mb-2 text-center text-shimmer">ADMIN PORTAL</h1>
            <p className="text-xs text-slate-400 mb-8 text-center">Enter your 4-digit PIN to access administrative options</p>

            {/* PIN Indicator Dots */}
            <motion.div 
              animate={pinError ? { x: [-10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="flex gap-4 mb-10"
            >
              {[0, 1, 2, 3].map((index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full border transition-all duration-300 ${
                    pinError
                      ? 'bg-rose-500 border-rose-500 shadow-md shadow-rose-500/30'
                      : pin.length > index
                      ? 'bg-blue-500 border-blue-500 shadow-md shadow-blue-500/30 scale-110'
                      : 'border-slate-600 bg-transparent'
                  }`}
                />
              ))}
            </motion.div>

            {/* Keypad Grid */}
            <div className="grid grid-cols-3 gap-4 max-w-[280px] w-full">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePinKeyPress(num.toString())}
                  className="w-16 h-16 rounded-full bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/30 flex items-center justify-center font-cinzel text-lg font-bold text-slate-200 transition-all hover:scale-105 active:scale-95"
                >
                  {num}
                </button>
              ))}
              <div className="w-16 h-16" />
              <button
                onClick={() => handlePinKeyPress('0')}
                className="w-16 h-16 rounded-full bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/30 flex items-center justify-center font-cinzel text-lg font-bold text-slate-200 transition-all hover:scale-105 active:scale-95"
              >
                0
              </button>
              <button
                onClick={handleBackspace}
                className="w-16 h-16 flex items-center justify-center text-slate-400 hover:text-white transition-colors font-cinzel text-xs font-semibold uppercase tracking-wider"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ) : (
          /* Admin Dashboard Dashboard View */
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-6 py-6 relative z-10"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-cinzel text-2xl font-bold tracking-wider text-shimmer">ADMIN DASHBOARD</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                    Live Portal
                  </span>
                </div>
                <p className="text-slate-400 text-xs mt-1">Add new products and manage inventory reflections.</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleResetDefaults}
                  className="px-4 py-2 rounded-xl text-xs font-semibold font-cinzel border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 transition-all"
                >
                  Reset to Defaults
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl text-xs font-semibold font-cinzel bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700 transition-all"
                >
                  Secure Logout
                </button>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
                <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">Total Products</span>
                <span className="text-3xl font-cinzel font-bold text-white mt-2">{products.length} Items</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
                <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">Custom Products Added</span>
                <span className="text-3xl font-cinzel font-bold text-blue-400 mt-2">{customProducts.length} Items</span>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
                <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">Active Categories</span>
                <span className="text-3xl font-cinzel font-bold text-cyan-400 mt-2">16 Groups</span>
              </div>
            </div>

            {/* Main Section: Form & Live Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              
              {/* Product Creation Form */}
              <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8">
                <h2 className="font-cinzel text-lg font-bold tracking-wider mb-6 text-blue-400">List New LED Product</h2>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Product Name */}
                    <div className="flex flex-col">
                      <label className="text-xs text-slate-300 font-semibold mb-1.5">Product Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Diyam Diamond Downlight"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Price */}
                    <div className="flex flex-col">
                      <label className="text-xs text-slate-300 font-semibold mb-1.5">Price *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. ₹450/Piece"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Category Selection */}
                    <div className="flex flex-col">
                      <label className="text-xs text-slate-300 font-semibold mb-1.5">Category *</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                        <option value="Custom">-- Custom Write-in --</option>
                      </select>
                    </div>

                    {/* Custom Category Input */}
                    {formData.category === 'Custom' && (
                      <div className="flex flex-col">
                        <label className="text-xs text-cyan-400 font-semibold mb-1.5">Custom Category Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="Type custom category..."
                          value={formData.customCategory}
                          onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                          className="bg-slate-950 border border-cyan-500/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Wattage */}
                    <div className="flex flex-col">
                      <label className="text-xs text-slate-300 font-semibold mb-1.5">Wattage (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. 15W"
                        value={formData.wattage}
                        onChange={(e) => setFormData({ ...formData, wattage: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Color Temp */}
                    <div className="flex flex-col">
                      <label className="text-xs text-slate-300 font-semibold mb-1.5">Color Temperature (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. 4000K Warm White"
                        value={formData.colorTemp}
                        onChange={(e) => setFormData({ ...formData, colorTemp: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Material */}
                    <div className="flex flex-col">
                      <label className="text-xs text-slate-300 font-semibold mb-1.5">Material (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. Polycarbonate"
                        value={formData.material}
                        onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* MOQ */}
                    <div className="flex flex-col">
                      <label className="text-xs text-slate-300 font-semibold mb-1.5">MOQ (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. 10 Pieces"
                        value={formData.moq}
                        onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Badge */}
                    <div className="flex flex-col">
                      <label className="text-xs text-slate-300 font-semibold mb-1.5">Product Badge Label</label>
                      <input
                        type="text"
                        placeholder="e.g. New Launch"
                        value={formData.badge}
                        onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Badge Color */}
                    <div className="flex flex-col">
                      <label className="text-xs text-slate-300 font-semibold mb-1.5">Badge Color</label>
                      <select
                        value={formData.badgeColor}
                        onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        <option value="bg-blue-600">Premium Blue</option>
                        <option value="bg-amber-600">Golden Amber</option>
                        <option value="bg-teal-700">Teal Green</option>
                        <option value="bg-orange-600">Bright Orange</option>
                        <option value="bg-rose-700">Luxury Crimson</option>
                      </select>
                    </div>
                  </div>

                  {/* Image Options Selection */}
                  <div className="flex flex-col space-y-2 border border-slate-800/80 rounded-2xl p-4 bg-slate-950/50">
                    <span className="text-xs text-slate-300 font-semibold">Product Image source *</span>
                    
                    <div className="flex gap-6 mb-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-white">
                        <input
                          type="radio"
                          name="imageOption"
                          checked={formData.imageOption === 'preset'}
                          onChange={() => setFormData({ ...formData, imageOption: 'preset' })}
                          className="text-blue-500 focus:ring-0"
                        />
                        Select Premium Preset Studio Image
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-white">
                        <input
                          type="radio"
                          name="imageOption"
                          checked={formData.imageOption === 'custom'}
                          onChange={() => setFormData({ ...formData, imageOption: 'custom' })}
                          className="text-blue-500 focus:ring-0"
                        />
                        Use Custom Image URL/Path
                      </label>
                    </div>

                    {formData.imageOption === 'preset' ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                        <select
                          value={formData.presetImage}
                          onChange={(e) => setFormData({ ...formData, presetImage: e.target.value })}
                          className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                        >
                          {PRESET_IMAGES.map((img) => (
                            <option key={img.value} value={img.value}>
                              {img.label}
                            </option>
                          ))}
                        </select>
                        <span className="text-[10px] text-slate-400 flex items-center">
                          Matches background-removed categories style.
                        </span>
                      </div>
                    ) : (
                      <input
                        type="text"
                        placeholder="Paste image URL (e.g. Unsplash link or local path: /products/...)"
                        value={formData.customImage}
                        onChange={(e) => setFormData({ ...formData, customImage: e.target.value })}
                        className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    )}
                  </div>

                  {/* Description */}
                  <div className="flex flex-col">
                    <label className="text-xs text-slate-300 font-semibold mb-1.5">Description *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Enter premium product specifications, materials used, warranties, and exact application details..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors font-inter"
                    />
                  </div>

                  {/* Tags */}
                  <div className="flex flex-col">
                    <label className="text-xs text-slate-300 font-semibold mb-1.5">Product Tags (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 15W, Warm White, COB (comma-separated)"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-cinzel font-bold text-xs tracking-widest rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/10"
                  >
                    Publish to Website
                  </button>
                </form>
              </div>

              {/* Live Preview Panel */}
              <div className="flex flex-col">
                <div className="sticky top-28 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 flex flex-col items-center">
                  <h3 className="font-cinzel text-xs font-semibold tracking-wider text-slate-400 mb-6 uppercase">
                    Live Product Preview
                  </h3>
                  <div className="w-full max-w-[280px] text-gray-900">
                    <ProductCard product={previewProduct} index={0} />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-6 text-center italic max-w-xs">
                    This card preview updates in real-time as you type, matching the exact styling in the product catalog.
                  </span>
                </div>
              </div>

            </div>

            {/* Custom Products List Section */}
            {customProducts.length > 0 && (
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8 mb-12">
                <h2 className="font-cinzel text-lg font-bold tracking-wider mb-6 text-cyan-400">
                  Manage Custom Products ({customProducts.length})
                </h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                        <th className="py-3 px-4">Image</th>
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Price</th>
                        <th className="py-3 px-4">Badge</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {customProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-800/20 transition-colors">
                          <td className="py-3 px-4">
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg bg-slate-950 border border-slate-800" />
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-200">{p.name}</td>
                          <td className="py-3 px-4 text-slate-400">{p.category}</td>
                          <td className="py-3 px-4 font-mono text-cyan-400">{p.price}</td>
                          <td className="py-3 px-4">
                            {p.badge && (
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold text-white ${p.badgeColor}`}>
                                {p.badge}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="text-rose-400 hover:text-rose-300 font-semibold transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Success Banner Toast Overlay */}
            <AnimatePresence>
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="fixed bottom-10 right-10 bg-emerald-600 text-white font-cinzel text-xs font-bold tracking-widest px-6 py-4 rounded-xl shadow-xl z-50 flex items-center gap-3"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{successMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
