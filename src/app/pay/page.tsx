// frontend/metsab/src/app/pay/page.tsx
// Purpose: Metsab invoice payment entry page - allows users to enter invoice number for payment
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight } from 'lucide-react'
import { CreditCard } from 'lucide-react'
import { PrimaryButton } from '@msaber/shared'

export default function PayPage() {
  const router = useRouter()
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [clientIdentifier, setClientIdentifier] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Process invoice number - extract just the numeric part (e.g., "INV-7-4" → "7-4")
  const processInvoiceNumber = (input: string): string => {
    // Remove any prefix like "INV-" and keep only the numeric part
    return input.trim().replace(/^INV[-\s]*/, '').replace(/^[A-Z]+[-\s]*/, '')
  }

  // Process client identifier - extract just the numeric part (e.g., "MET-123" → "123")
  const processClientIdentifier = (input: string): string => {
    // If it's an email, return as-is
    if (input.includes('@')) {
      return input.trim()
    }
    // Otherwise, extract just the numeric part
    const match = input.trim().match(/(\d+)$/)
    return match ? match[1] : input.trim()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!invoiceNumber.trim()) {
      setError('Please enter an invoice number')
      return
    }

    if (!clientIdentifier.trim()) {
      setError('Please enter your client ID or email address')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      // Process the inputs
      const processedInvoiceNumber = processInvoiceNumber(invoiceNumber)
      const processedClientIdentifier = processClientIdentifier(clientIdentifier)

      // Call API to verify invoice access and get invoice data
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await fetch(`${backendUrl}/api/public/invoices/verify-invoice-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          invoiceNumber: processedInvoiceNumber,
          clientIdentifier: processedClientIdentifier,
          brandCode: 'METSAB', // Specify the brand for validation
        }),
      })

      let data
      try {
        data = await response.json()
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError)
        throw new Error('Server returned an invalid response. Please try again.')
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to verify invoice access')
      }

      // Redirect to the local invoice view page
      router.push(`/invoice/${data.invoice.id}?client=${processedClientIdentifier}`)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Unable to access invoice. Please check your details and try again.';
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-900 rounded-full mb-6">
              <CreditCard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-black mb-2">View Your Invoice</h1>
            <p className="text-neutral-600">
              Enter your invoice number and client details to access your invoice
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg border border-neutral-200 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="invoiceNumber" className="block text-sm font-medium text-black mb-2">
                  Invoice Number
                </label>
                <div className="relative">
                  <input
                    id="invoiceNumber"
                    type="text"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                    placeholder="e.g., INV-00123"
                    className="w-full px-4 py-3 bg-white border border-blue-700 rounded-lg text-black placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors shadow-sm"
                    required
                  />
                  <Search className="absolute right-3 top-3.5 w-5 h-5 text-neutral-400" />
                </div>
              </div>

              <div>
                <label htmlFor="clientIdentifier" className="block text-sm font-medium text-black mb-2">
                  Client ID or Email Address
                </label>
                <div className="relative">
                  <input
                    id="clientIdentifier"
                    type="text"
                    value={clientIdentifier}
                    onChange={(e) => setClientIdentifier(e.target.value)}
                    placeholder="Enter your client ID or email"
                    className="w-full px-4 py-3 bg-white border border-blue-700 rounded-lg text-black placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors shadow-sm"
                    required
                  />
                </div>
                <p className="text-xs text-neutral-600 mt-1">
                  This helps us verify your access to the invoice
                </p>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              <PrimaryButton
                type="submit"
                loading={isLoading}
                disabled={!invoiceNumber.trim() || !clientIdentifier.trim()}
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                {isLoading ? 'Processing...' : 'View Invoice'}
              </PrimaryButton>
            </form>

            {/* Help Text */}
            <div className="mt-6 text-center">
              <p className="text-neutral-600 text-sm">
                Need help? Contact our support team for assistance with your invoice.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
