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
        <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--primary)' }}>Thank You!</h3>
        <p style={{ color: 'var(--text)' }}>We'll get back to you shortly.</p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 hover:underline"
          style={{ color: 'var(--accent)' }}
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <div className="shadow-xl rounded-2xl p-8 md:p-12 border" style={{ background: 'var(--background)', borderColor: 'var(--secondary)' }}>
      <h3 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--primary)' }}>Contact Our Team</h3>
      <p className="mb-8 text-center" style={{ color: 'var(--text)' }}>We'd love to hear from you! Fill out the form and our team will get in touch soon.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border px-4 py-3 text-base shadow-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--secondary)] transition-all ${errors.name ? 'border-red-500' : ''}`}
            style={{ background: 'var(--secondary)', borderColor: 'var(--secondary)', color: 'var(--text)' }}
            placeholder="Your Name"
          />
          {errors.name && <p className="mt-1 text-sm" style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border px-4 py-3 text-base shadow-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--secondary)] transition-all ${errors.email ? 'border-red-500' : ''}`}
            style={{ background: 'var(--secondary)', borderColor: 'var(--secondary)', color: 'var(--text)' }}
            placeholder="you@email.com"
          />
          {errors.email && <p className="mt-1 text-sm" style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border px-4 py-3 text-base shadow-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--secondary)] transition-all ${errors.company ? 'border-red-500' : ''}`}
            style={{ background: 'var(--secondary)', borderColor: 'var(--secondary)', color: 'var(--text)' }}
            placeholder="Company Name"
          />
          {errors.company && <p className="mt-1 text-sm" style={{ color: 'red' }}>{errors.company}</p>}
        </div>
        <div>
          <label htmlFor="licenseType" className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>License Type</label>
          <select
            id="licenseType"
            name="licenseType"
            value={formData.licenseType}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border px-4 py-3 text-base shadow-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--secondary)] transition-all ${errors.licenseType ? 'border-red-500' : ''}`}
            style={{ background: 'var(--secondary)', borderColor: 'var(--secondary)', color: 'var(--text)' }}
          >
            <option value="">Select a license type</option>
            <option value="adobe">Adobe</option>
            <option value="microsoft">Microsoft</option>
            <option value="autodesk">Autodesk</option>
            <option value="other">Other</option>
          </select>
          {errors.licenseType && <p className="mt-1 text-sm" style={{ color: 'red' }}>{errors.licenseType}</p>}
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1" style={{ color: 'var(--text)' }}>Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-lg border px-4 py-3 text-base shadow-sm focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--secondary)] transition-all ${errors.message ? 'border-red-500' : ''}`}
            style={{ background: 'var(--secondary)', borderColor: 'var(--secondary)', color: 'var(--text)' }}
            placeholder="How can we help you?"
          />
          {errors.message && <p className="mt-1 text-sm" style={{ color: 'red' }}>{errors.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 transition-all"
          style={{ background: 'var(--primary)', color: 'var(--background)' }}
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
    <div className="min-h-screen w-full" style={{ background: 'var(--background)', color: 'var(--text)' }}>
      {/* Navigation */}
      <nav className="fixed w-full shadow-sm z-50" style={{ background: 'var(--background)', borderBottom: '1px solid var(--secondary)' }}>
        <div className="w-full max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>SoftSell</div>
          <div className="hidden md:flex space-x-6">
            <a href="#how-it-works" className="hover:underline" style={{ color: 'var(--text)' }}>How It Works</a>
            <a href="#why-us" className="hover:underline" style={{ color: 'var(--text)' }}>Why Choose Us</a>
            <a href="#testimonials" className="hover:underline" style={{ color: 'var(--text)' }}>Testimonials</a>
            <a href="#contact" className="hover:underline" style={{ color: 'var(--text)' }}>Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="w-full pt-24 pb-12 md:pt-32 md:pb-20" style={{ background: 'linear-gradient(to right, var(--secondary), var(--background))' }}>
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6" style={{ color: 'var(--text)' }}>
              Turn Your Software Licenses Into Cash
            </h1>
            <p className="text-xl mb-8" style={{ color: 'var(--text)' }}>
              SoftSell helps businesses and individuals sell their unused software licenses quickly and securely. Get the best value for your digital assets.
            </p>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
              style={{ background: 'var(--primary)', color: 'var(--background)' }}
            >
              Get a Quote
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-16" style={{ background: 'var(--background)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--text)' }}>How It Works</h2>
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
                style={{ background: 'var(--secondary)', borderRadius: '1rem' }}
              >
                {/* Icon and content for each card */}
                {i === 0 && (
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--primary)10' }}>
                    <svg className="w-8 h-8" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                )}
                {i === 1 && (
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--primary)10' }}>
                    <svg className="w-8 h-8" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                {i === 2 && (
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--primary)10' }}>
                    <svg className="w-8 h-8" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                )}
                {i === 0 && <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--accent)' }}>Upload License</h3>}
                {i === 1 && <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--accent)' }}>Get Valuation</h3>}
                {i === 2 && <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--accent)' }}>Get Paid</h3>}
                {i === 0 && <p style={{ color: 'var(--text)' }}>Share your license details securely through our platform</p>}
                {i === 1 && <p style={{ color: 'var(--text)' }}>Receive a fair market value assessment within 24 hours</p>}
                {i === 2 && <p style={{ color: 'var(--text)' }}>Receive payment quickly and securely once the sale is complete</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section (animated) */}
      <section id="why-us" className="w-full py-16" style={{ background: 'var(--secondary)' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--primary)' }}>Why Choose Us</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={whyUsVariants}
                className="p-6 rounded-lg shadow-sm"
                style={{ background: 'var(--background)' }}
              >
                {/* Icon and content for each tile */}
                {i === 0 && (
                  <><div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--primary)10' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--accent)' }}>Secure Transactions</h3>
                  <p style={{ color: 'var(--text)' }}>Bank-level security for all license transfers and payments</p></>) }
                {i === 1 && (
                  <><div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--primary)10' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--accent)' }}>Quick Process</h3>
                  <p style={{ color: 'var(--text)' }}>Complete the sale in as little as 24 hours</p></>) }
                {i === 2 && (
                  <><div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--primary)10' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--accent)' }}>Best Value</h3>
                  <p style={{ color: 'var(--text)' }}>Get up to 80% of retail value for your licenses</p></>) }
                {i === 3 && (
                  <><div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: 'var(--primary)10' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--primary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--accent)' }}>Expert Support</h3>
                  <p style={{ color: 'var(--text)' }}>Dedicated team to guide you through the process</p></>) }
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section (animated) */}
      <section id="testimonials" className="w-full py-16" style={{ background: 'var(--background)' }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--primary)' }}>What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={testimonialVariants}
                className="p-6 rounded-lg"
                style={{ background: 'var(--secondary)' }}
              >
                {i === 0 && (
                  <><div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl" style={{ background: 'var(--primary)', color: 'var(--background)' }}>
                      JD
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold" style={{ color: 'var(--accent)' }}>John Doe</h4>
                      <p className="text-sm" style={{ color: 'var(--text)' }}>CTO, TechCorp Inc.</p>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text)' }}>
                    "SoftSell helped us liquidate our unused Adobe licenses quickly and efficiently. The process was smooth, and we received a fair market value for our assets."
                  </p></>) }
                {i === 1 && (
                  <><div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl" style={{ background: 'var(--primary)', color: 'var(--background)' }}>
                      SJ
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold" style={{ color: 'var(--accent)' }}>Sarah Johnson</h4>
                      <p className="text-sm" style={{ color: 'var(--text)' }}>IT Manager, DesignStudio</p>
                    </div>
                  </div>
                  <p style={{ color: 'var(--text)' }}>
                    "The team at SoftSell made selling our Microsoft licenses incredibly easy. Their platform is intuitive, and their customer service is outstanding."
                  </p></>) }
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-16" style={{ background: 'var(--secondary)' }}>
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--primary)' }}>Get in Touch</h2>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12" style={{ background: 'var(--primary)', color: 'var(--background)' }}>
        <div className="w-full max-w-[1440px] mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SoftSell</h3>
              <p style={{ color: 'var(--background)' }}>
                Your trusted partner in software license resale. We help businesses and individuals get the best value for their unused software licenses.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#how-it-works" className="hover:underline" style={{ color: 'var(--background)' }}>How It Works</a></li>
                <li><a href="#why-us" className="hover:underline" style={{ color: 'var(--background)' }}>Why Choose Us</a></li>
                <li><a href="#testimonials" className="hover:underline" style={{ color: 'var(--background)' }}>Testimonials</a></li>
                <li><a href="#contact" className="hover:underline" style={{ color: 'var(--background)' }}>Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">License Types</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline" style={{ color: 'var(--background)' }}>Adobe</a></li>
                <li><a href="#" className="hover:underline" style={{ color: 'var(--background)' }}>Microsoft</a></li>
                <li><a href="#" className="hover:underline" style={{ color: 'var(--background)' }}>Autodesk</a></li>
                <li><a href="#" className="hover:underline" style={{ color: 'var(--background)' }}>Other</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2" style={{ color: 'var(--background)' }}>
                <li>Email: info@softsell.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Tech Street</li>
                <li>San Francisco, CA 94105</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center" style={{ borderColor: 'var(--accent)', color: 'var(--background)' }}>
            <p>&copy; {new Date().getFullYear()} SoftSell. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
