// frontend/shared/src/components/forms/ContactForm.tsx
'use client'
import React, { useState } from 'react'
import { defaultTheme } from '../../lib/theme-utils'

interface ContactFormProps {
  type?: string
  brandCode: string
  className?: string
}

export default function ContactForm({ type = 'general', brandCode, className = '' }: ContactFormProps) {
  const theme = defaultTheme
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type,
          brandCode
        })
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
          className={`w-full px-3 py-2 border ${theme.borderClass} rounded-lg ${theme.cardBgClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className={`w-full px-3 py-2 border ${theme.borderClass} rounded-lg ${theme.cardBgClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      <div>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone (optional)"
          className={`w-full px-3 py-2 border ${theme.borderClass} rounded-lg ${theme.cardBgClass} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>

      <div>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Message"
          rows={5}
          required
          className={`w-full px-3 py-2 border ${theme.borderClass} rounded-lg ${theme.cardBgClass} focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical`}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${theme.primaryButtonClass} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>

      {submitStatus === 'success' && (
        <div className="text-green-600 dark:text-green-400 text-sm">
          Thank you for your message. We'll get back to you soon!
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="text-red-600 dark:text-red-400 text-sm">
          There was an error submitting your message. Please try again.
        </div>
      )}
    </form>
  )
}
