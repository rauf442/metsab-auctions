// frontend/shared/src/components/invoice/PublicInvoicePage.tsx
// Purpose: Shared public invoice page component for brand websites (aurum/metsab)
'use client'

import React, { useState, useEffect } from 'react'
import { FileText, Truck, CreditCard, CheckCircle, AlertCircle, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { PrimaryButton } from '../ui/PrimaryButton'
import PublicShippingDialog from '../invoices/PublicShippingDialog'

interface Invoice {
  id: number
  invoice_number: string
  sale_prices?: number[]
  buyer_premium_prices?: number[]
  total_amount?: number
  paid_amount?: number
  status?: string
  type?: string
  buyer_first_name?: string
  buyer_last_name?: string
  buyer_email?: string
  ship_to_address?: string
  ship_to_city?: string
  ship_to_country?: string
  ship_to_postal_code?: string
  total_shipping_amount?: number
  payment_link?: string
  logistics?: any
  items?: any[]
  items_info?: any[]
  l_method?: string
  l_status?: string
  l_postal_code?: string
  l_destination?: string
  l_country?: string
  client?: {
    id: number
    first_name: string
    last_name: string
    email?: string
    phone_number?: string
  }
  brand?: {
    name: string
    code: string
  }
}

interface PublicInvoicePageProps {
  invoiceId: number
  accessToken: string
  clientId?: string
  onBack?: () => void
  brandTheme?: {
    bgClass: string
    textClass: string
    accentColor: string
    buttonClass: string
  }
}

export default function PublicInvoicePage({ invoiceId, accessToken, clientId, onBack, brandTheme }: PublicInvoicePageProps) {
  const [invoice, setInvoice] = useState<Invoice | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [showShippingDialog, setShowShippingDialog] = useState(false)
  const [step, setStep] = useState<'payment' | 'shipping' | 'complete'>('payment')

  // Default theme fallback
  const theme = brandTheme || {
    bgClass: 'bg-gray-50',
    textClass: 'text-gray-900',
    accentColor: 'blue',
    buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white'
  }

  useEffect(() => {
    if (accessToken) {
      loadInvoice()
    } else {
      setError('Access token is required')
      setLoading(false)
    }
  }, [invoiceId, accessToken, clientId])

  const loadInvoice = async () => {
    try {
      setLoading(true)
      console.log('Loading public invoice for ID:', invoiceId, clientId ? `with client ID: ${clientId}` : `with token: ${accessToken}`)

      // Call backend directly - use client route if clientId is provided
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const apiUrl = clientId 
        ? `${backendUrl}/api/public/invoices/${invoiceId}/client/${clientId}`
        : `${backendUrl}/api/public/invoices/${invoiceId}/${accessToken}`
      
      const response = await fetch(apiUrl, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to load invoice')
      }

      if (data.success) {
        console.log('Invoice loaded successfully:', data.data)
        setInvoice(data.data)
        await determineStep(data.data)
        await generatePdf()
      } else {
        throw new Error(data.message || 'Failed to load invoice')
      }
    } catch (err: any) {
      console.error('Error loading public invoice:', err)
      setError(err.message || 'Failed to load invoice')
    } finally {
      setLoading(false)
    }
  }

  const determineStep = async (invoiceData: Invoice) => {
    // For vendor invoices, skip shipping step and go directly to payment or complete
    if (invoiceData.type === 'vendor') {
      const paidAmount = invoiceData.paid_amount || 0
      const totalAmount = invoiceData.total_amount || 0

      if (paidAmount >= totalAmount) {
        setStep('complete')
      } else {
        setStep('payment')
      }
      return
    }

    try {
      // Call backend directly
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const response = await fetch(`${backendUrl}/api/public/invoices/${invoiceId}/${accessToken}/payment-status`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const statusData = await response.json()

      if (statusData.success) {
        if (statusData.status === 'paid') {
          setStep('complete')
        } else if (statusData.dueAmount <= (invoiceData.total_shipping_amount || 0)) {
          setStep('shipping')
        } else {
          setStep('payment')
        }
      } else {
        // Fallback calculation using array-based pricing
        const hammerPrice = (invoiceData.sale_prices || []).reduce((sum, price) => sum + price, 0)
        const buyerPremium = (invoiceData.buyer_premium_prices || []).reduce((sum, price) => sum + price, 0)
        const hammerAndPremium = hammerPrice + buyerPremium
        const paidAmount = invoiceData.paid_amount || 0
        const totalAmount = invoiceData.total_amount || 0

        if (paidAmount >= totalAmount) {
          setStep('complete')
        } else if (paidAmount >= hammerAndPremium) {
          setStep('shipping')
        } else {
          setStep('payment')
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error)
      // Fallback calculation using array-based pricing
      const hammerPrice = (invoiceData.sale_prices || []).reduce((sum, price) => sum + price, 0)
      const buyerPremium = (invoiceData.buyer_premium_prices || []).reduce((sum, price) => sum + price, 0)
      const hammerAndPremium = hammerPrice + buyerPremium
      const paidAmount = invoiceData.paid_amount || 0
      const totalAmount = invoiceData.total_amount || 0

      if (paidAmount >= totalAmount) {
        setStep('complete')
      } else if (paidAmount >= hammerAndPremium) {
        setStep('shipping')
      } else {
        setStep('payment')
      }
    }
  }

  const generatePdf = async () => {
    try {
      console.log('Generating PDF for invoice:', invoiceId, clientId ? `with client ID: ${clientId}` : `with token: ${accessToken}`)
      // Call backend directly - use client route if clientId is provided
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
      const pdfUrl = clientId 
        ? `${backendUrl}/api/public/invoices/${invoiceId}/client/${clientId}/pdf`
        : `${backendUrl}/api/public/invoices/${invoiceId}/${accessToken}/pdf`
      
      const response = await fetch(pdfUrl)

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        console.log('PDF generated successfully, URL:', url)
        setPdfUrl(url)
      }
    } catch (err) {
      console.error('Failed to generate PDF:', err)
    }
  }

  const handleShippingSelection = () => {
    // Don't allow shipping selection for vendor invoices
    if (invoice?.type === 'vendor') {
      return
    }
    setShowShippingDialog(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount)
  }

  const getStepIcon = (currentStep: string) => {
    switch (currentStep) {
      case 'payment':
        return step === 'payment' ? <CreditCard className={`h-5 w-5 text-${theme.accentColor}-600`} /> :
               <CheckCircle className="h-5 w-5 text-green-600" />
      case 'shipping':
        return step === 'shipping' ? <Truck className={`h-5 w-5 text-${theme.accentColor}-600`} /> :
               step === 'complete' ? <CheckCircle className="h-5 w-5 text-green-600" /> :
               <AlertCircle className="h-5 w-5 text-gray-400" />
      case 'complete':
        return step === 'complete' ? <CheckCircle className="h-5 w-5 text-green-600" /> :
               <AlertCircle className="h-5 w-5 text-gray-400" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />
    }
  }

  const getStepStatus = (currentStep: string) => {
    if (step === currentStep) return 'current'

    // For vendor invoices, shipping step doesn't exist
    if (invoice?.type === 'vendor' && currentStep === 'shipping') {
      return 'completed' // Mark as completed so it's not shown as upcoming
    }

    if ((currentStep === 'payment' && (step === 'shipping' || step === 'complete')) ||
        (currentStep === 'shipping' && step === 'complete')) {
      return 'completed'
    }
    return 'upcoming'
  }

  if (loading) {
    return (
      <div className={`min-h-screen ${theme.bgClass} flex items-center justify-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={theme.textClass}>Loading invoice...</p>
        </div>
      </div>
    )
  }

  if (error || !invoice) {
    return (
      <div className={`min-h-screen ${theme.bgClass} py-16 px-4`}>
        <div className="max-w-md mx-auto text-center">
          {/* Error Icon */}
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
            theme.accentColor === 'yellow'
              ? 'bg-red-900/20 border-2 border-red-500/30'
              : 'bg-red-50 border-2 border-red-200'
          }`}>
            <AlertCircle className={`h-10 w-10 ${
              theme.accentColor === 'yellow' ? 'text-red-400' : 'text-red-600'
            }`} />
          </div>

          {/* Error Title */}
          <h1 className={`text-2xl font-bold mb-3 ${theme.textClass}`}>
            Invoice Not Found
          </h1>

          {/* Error Message */}
          <p className={`text-lg mb-6 ${
            theme.accentColor === 'yellow' ? 'text-neutral-300' : 'text-neutral-600'
          }`}>
            {error || 'The requested invoice could not be found or access is denied.'}
          </p>

          {/* Possible Reasons */}
          <div className={`text-left p-4 rounded-lg mb-6 ${
            theme.accentColor === 'yellow'
              ? 'bg-gray-900/50 border border-gray-700'
              : 'bg-white border border-gray-200 shadow-sm'
          }`}>
            <h3 className={`font-semibold mb-3 ${theme.textClass}`}>Possible reasons:</h3>
            <ul className={`text-sm space-y-2 ${
              theme.accentColor === 'yellow' ? 'text-neutral-300' : 'text-neutral-600'
            }`}>
              <li>• Invoice number or access link is incorrect</li>
              <li>• Invoice has expired or been removed</li>
              <li>• You don't have permission to view this invoice</li>
              <li>• Link may have been tampered with</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {onBack && (
              <PrimaryButton
                onClick={onBack}
                icon={<ArrowLeft className="w-5 h-5" />}
                iconPosition="left"
                size="lg"
                fullWidth
              >
                Back to Invoice Search
              </PrimaryButton>
            )}

            <button
              onClick={() => window.location.href = '/'}
              className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                theme.accentColor === 'yellow'
                  ? 'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200'
              }`}
            >
              Return to Home
            </button>
          </div>

          {/* Support Contact */}
          <div className={`mt-8 pt-6 border-t ${
            theme.accentColor === 'yellow' ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <p className={`text-sm ${
              theme.accentColor === 'yellow' ? 'text-neutral-400' : 'text-neutral-500'
            }`}>
              Need help? Contact our support team for assistance.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${theme.bgClass}`}>
      {/* Back Button */}
      {onBack && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-2 ${theme.textClass} hover:text-gray-600 transition-colors font-medium`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Invoice Search
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Invoice {invoice.invoice_number}</h1>
              <p className="text-gray-600 mt-1">
                {invoice.client ?
                  `${invoice.client.first_name} ${invoice.client.last_name}` :
                  `${invoice.buyer_first_name} ${invoice.buyer_last_name}`
                }
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Brand</p>
              <p className="font-semibold">{invoice.brand?.name || 'Auction House'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout - Left: Details, Right: PDF Viewer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8" style={{ minHeight: 'calc(100vh - 180px)' }}>

          {/* Left Column - Progress Steps & Details */}
          <div className="lg:w-2/5 lg:flex-shrink-0 space-y-6">

            {/* Progress Steps */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Progress</h2>

              <div className="space-y-6">
                {/* Step 1: Payment */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      getStepStatus('payment') === 'completed'
                        ? 'bg-green-100'
                        : getStepStatus('payment') === 'current'
                        ? `bg-${theme.accentColor}-100`
                        : 'bg-gray-100'
                    }`}>
                      {getStepIcon('payment')}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className={`font-semibold ${
                        getStepStatus('payment') === 'completed'
                          ? 'text-green-700'
                          : getStepStatus('payment') === 'current'
                          ? `text-${theme.accentColor}-700`
                          : 'text-gray-500'
                      }`}>Payment</h3>
                      {getStepStatus('payment') === 'current' && invoice.payment_link && (
                        <PrimaryButton
                          href={invoice.payment_link}
                          target="_blank"
                          icon={<CreditCard className="h-4 w-4" />}
                          iconPosition="left"
                          size="sm"
                        >
                          Pay Now
                        </PrimaryButton>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {getStepStatus('payment') === 'completed'
                        ? (invoice.type === 'vendor' ? 'Payment remitted' : 'Payment received')
                        : (invoice.type === 'vendor' ? 'Awaiting remittance' : 'Pay invoice amount')
                      }
                    </p>
                  </div>
                </div>

                {/* Step 2: Shipping - Only show for buyer invoices */}
                {invoice.type !== 'vendor' && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        getStepStatus('shipping') === 'completed'
                          ? 'bg-green-100'
                          : getStepStatus('shipping') === 'current'
                          ? 'bg-orange-100'
                          : 'bg-gray-100'
                      }`}>
                        {getStepIcon('shipping')}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold ${
                          getStepStatus('shipping') === 'completed'
                            ? 'text-green-700'
                            : getStepStatus('shipping') === 'current'
                            ? 'text-orange-700'
                            : 'text-gray-500'
                        }`}>Shipping</h3>
                        {getStepStatus('shipping') === 'current' && (
                          <PrimaryButton
                            onClick={handleShippingSelection}
                            icon={<Truck className="h-4 w-4" />}
                            iconPosition="left"
                            size="sm"
                          >
                            Select Shipping
                          </PrimaryButton>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {getStepStatus('shipping') === 'completed' ? 'Shipping method selected' : 'Select shipping method'}
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Complete */}
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      getStepStatus('complete') === 'current' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {getStepIcon('complete')}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold ${
                      getStepStatus('complete') === 'current' ? 'text-green-700' : 'text-gray-500'
                    }`}>Complete</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {getStepStatus('complete') === 'current' ? 'Order complete' : 'Awaiting completion'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Hammer Price:</span>
                  <span className="font-semibold">{formatCurrency((invoice.sale_prices || []).reduce((sum, price) => sum + price, 0))}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span className="text-sm text-gray-600">
                    {invoice.type === 'vendor' ? "Vendor's Premium:" : "Buyer's Premium:"}
                  </span>
                  <span className="font-semibold">{formatCurrency((invoice.buyer_premium_prices || []).reduce((sum, price) => sum + price, 0))}</span>
                </div>
                {(invoice.total_shipping_amount || 0) > 0 && (
                  <div className="flex justify-between items-center py-1 border-b border-gray-100">
                    <span className="text-sm text-gray-600">Shipping:</span>
                    <span className="font-semibold">{formatCurrency(invoice.total_shipping_amount || 0)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-1 border-b-2 border-gray-200">
                  <span className="text-sm font-semibold text-gray-900">Total:</span>
                  <span className="text-lg font-bold text-blue-700">{formatCurrency(invoice.total_amount || 0)}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-600">
                    {invoice.type === 'vendor' ? 'Remitted:' : 'Paid:'}
                  </span>
                  <span className="font-semibold text-green-700">{formatCurrency(invoice.paid_amount || 0)}</span>
                </div>
                {(invoice.total_amount || 0) - (invoice.paid_amount || 0) > 0 && (
                  <div className="flex justify-between items-center py-1">
                    <span className="text-sm text-gray-600">
                      {invoice.type === 'vendor' ? 'Outstanding Remittance:' : 'Outstanding:'}
                    </span>
                    <span className="font-semibold text-red-700">{formatCurrency((invoice.total_amount || 0) - (invoice.paid_amount || 0))}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Action Status Card */}
            {step === 'payment' && (
              <div className={`p-4 rounded-lg border ${
                theme.accentColor === 'yellow'
                  ? 'bg-yellow-50 border-yellow-200'
                  : `bg-${theme.accentColor}-50 border-${theme.accentColor}-200`
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-semibold ${
                      theme.accentColor === 'yellow' ? 'text-yellow-900' : `text-${theme.accentColor}-900`
                    }`}>
                      {invoice.type === 'vendor' ? 'Remittance Pending' : 'Payment Required'}
                    </h3>
                    <p className={`text-sm mt-1 ${
                      theme.accentColor === 'yellow' ? 'text-yellow-700' : `text-${theme.accentColor}-700`
                    }`}>
                      Outstanding: {formatCurrency((invoice.total_amount || 0) - (invoice.paid_amount || 0))}
                    </p>
                  </div>
                  {invoice.payment_link && (
                    <PrimaryButton
                      href={invoice.payment_link}
                      target="_blank"
                      icon={<CreditCard className="h-4 w-4" />}
                      iconPosition="left"
                      size="sm"
                    >
                      Pay Now
                    </PrimaryButton>
                  )}
                </div>
              </div>
            )}

            {step === 'shipping' && invoice?.type !== 'vendor' && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-orange-900">Shipping Selection</h3>
                    <p className="text-sm text-orange-700 mt-1">
                      Payment received. Choose shipping method.
                    </p>
                  </div>
                  <PrimaryButton
                    onClick={handleShippingSelection}
                    icon={<Truck className="h-4 w-4" />}
                    iconPosition="left"
                    size="sm"
                  >
                    Select Shipping
                  </PrimaryButton>
                </div>
              </div>
            )}

            {step === 'complete' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-900 mb-2">
                  {invoice.type === 'vendor' ? 'Settlement Complete!' : 'Order Complete!'}
                </h3>
                <p className="text-sm text-green-700">
                  {invoice.type === 'vendor'
                    ? 'We have remitted payment to you.'
                    : 'We have received your payment and shipping details.'
                  }
                </p>
              </div>
            )}
          </div>

          {/* Right Column - PDF Viewer */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex flex-col" style={{ minHeight: 'calc(100vh - 200px)' }}>
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-gray-600" />
                    Invoice Document
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">Review your invoice details below</p>
                </div>
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    download={`invoice-${invoice.invoice_number}.pdf`}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </a>
                )}
              </div>

              {pdfUrl ? (
                <div className="flex-1 relative" style={{ minHeight: 'calc(100vh - 300px)' }}>
                  <iframe
                    src={pdfUrl}
                    className="w-full h-full border-0"
                    title={`Invoice ${invoice.invoice_number}`}
                    style={{ minHeight: 'inherit' }}
                  />
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 300px)' }}>
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Loading PDF...</p>
                    <div className="mt-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Dialog */}
      <PublicShippingDialog
        isOpen={showShippingDialog}
        onClose={() => setShowShippingDialog(false)}
        invoice={invoice}
        accessToken={accessToken}
        clientId={clientId}
        onSuccess={loadInvoice}
      />
    </div>
  )
}
