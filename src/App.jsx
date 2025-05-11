import { useState } from 'react'
import { motion } from 'framer-motion'
import './App.css'

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    licenseType: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    if (!formData.company.trim()) newErrors.company = 'Company is required'
    if (!formData.licenseType) newErrors.licenseType = 'License type is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // In a real app, this would send the data to a backend
      console.log('Form submitted:', formData)
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        company: '',
        licenseType: '',
        message: ''
      })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <h3 className="text-xl font-semibold text-green-600 mb-2">Thank You!</h3>
        <p className="text-gray-600">We'll get back to you shortly.</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white/90 shadow-xl rounded-2xl p-8 md:p-12 border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Contact Our Team</h3>
      <p className="text-gray-500 mb-8 text-center">We'd love to hear from you! Fill out the form and our team will get in touch soon.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${errors.name ? 'border-red-500' : ''}`}
            placeholder="Your Name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${errors.email ? 'border-red-500' : ''}`}
            placeholder="you@email.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${errors.company ? 'border-red-500' : ''}`}
            placeholder="Company Name"
          />
          {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
        </div>

        <div>
          <label htmlFor="licenseType" className="block text-sm font-medium text-gray-700 mb-1">License Type</label>
          <select
            id="licenseType"
            name="licenseType"
            value={formData.licenseType}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${errors.licenseType ? 'border-red-500' : ''}`}
          >
            <option value="">Select a license type</option>
            <option value="adobe">Adobe</option>
            <option value="microsoft">Microsoft</option>
            <option value="autodesk">Autodesk</option>
            <option value="other">Other</option>
          </select>
          {errors.licenseType && <p className="mt-1 text-sm text-red-600">{errors.licenseType}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all ${errors.message ? 'border-red-500' : ''}`}
            placeholder="How can we help you?"
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          Send Message
        </button>
      </form>
    </div>
  )
}

const howItWorksVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      type: 'spring',
    },
  }),
}

const whyUsVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      type: 'spring',
    },
  }),
}

const testimonialVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.7,
      type: 'spring',
    },
  }),
}

function App() {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="w-full max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">SoftSell</div>
          <div className="hidden md:flex space-x-6">
            <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">How It Works</a>
            <a href="#why-us" className="text-gray-600 hover:text-blue-600">Why Choose Us</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600">Testimonials</a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Turn Your Software Licenses Into Cash
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              SoftSell helps businesses and individuals sell their unused software licenses quickly and securely. Get the best value for your digital assets.
            </p>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get a Quote
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={howItWorksVariants}
                className="text-center p-6"
              >
                {/* Icon and content for each card */}
                {i === 0 && (
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                )}
                {i === 1 && (
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                {i === 2 && (
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
                {i === 0 && <h3 className="text-xl font-semibold mb-2">Upload License</h3>}
                {i === 1 && <h3 className="text-xl font-semibold mb-2">Get Valuation</h3>}
                {i === 2 && <h3 className="text-xl font-semibold mb-2">Get Paid</h3>}
                {i === 0 && <p className="text-gray-600">Share your license details securely through our platform</p>}
                {i === 1 && <p className="text-gray-600">Receive a fair market value assessment within 24 hours</p>}
                {i === 2 && <p className="text-gray-600">Receive payment quickly and securely once the sale is complete</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="w-full py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={whyUsVariants}
                className="bg-white p-6 rounded-lg shadow-sm"
              >
                {/* Icon and content for each tile */}
                {i === 0 && (
                  <><div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Secure Transactions</h3>
                  <p className="text-gray-600">Bank-level security for all license transfers and payments</p></>) }
                {i === 1 && (
                  <><div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Quick Process</h3>
                  <p className="text-gray-600">Complete the sale in as little as 24 hours</p></>) }
                {i === 2 && (
                  <><div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Best Value</h3>
                  <p className="text-gray-600">Get up to 80% of retail value for your licenses</p></>) }
                {i === 3 && (
                  <><div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Expert Support</h3>
                  <p className="text-gray-600">Dedicated team to guide you through the process</p></>) }
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={testimonialVariants}
                className="bg-gray-50 p-6 rounded-lg"
              >
                {i === 0 && (
                  <><div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                      JD
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">John Doe</h4>
                      <p className="text-gray-600 text-sm">CTO, TechCorp Inc.</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "SoftSell helped us liquidate our unused Adobe licenses quickly and efficiently. The process was smooth, and we received a fair market value for our assets."
                  </p></>) }
                {i === 1 && (
                  <><div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                      SJ
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">Sarah Johnson</h4>
                      <p className="text-gray-600 text-sm">IT Manager, DesignStudio</p>
                    </div>
                  </div>
                  <p className="text-gray-600">
                    "The team at SoftSell made selling our Microsoft licenses incredibly easy. Their platform is intuitive, and their customer service is outstanding."
                  </p></>) }
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-12">
        <div className="w-full max-w-[1440px] mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SoftSell</h3>
              <p className="text-gray-400">
                Your trusted partner in software license resale. We help businesses and individuals get the best value for their unused software licenses.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white">How It Works</a></li>
                <li><a href="#why-us" className="text-gray-400 hover:text-white">Why Choose Us</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white">Testimonials</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">License Types</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Adobe</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Microsoft</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Autodesk</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Other</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@softsell.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Tech Street</li>
                <li>San Francisco, CA 94105</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} SoftSell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
