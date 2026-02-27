// frontend/metsab/src/app/invoice/[...slug]/page.tsx
// Purpose: Metsab catch-all invoice route supporting both /invoice/id and /invoice/id/token patterns
'use client'

import { useParams, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { PublicInvoicePage, PrimaryButton } from '@msaber/shared'

export default function InvoicePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const router = useRouter()
  const slug = params.slug as string[]

  // Parse the slug: [id], [id, token], or [id, clientId]
  const invoiceId = parseInt(slug[0])
  const isClientRoute = slug[1] && !isNaN(parseInt(slug[1])) && slug.length === 2
  const clientId = isClientRoute ? slug[1] : null
  const urlToken = isClientRoute ? null : slug[1] // Will be undefined if not provided

  const [verifiedToken, setVerifiedToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyAccess = async () => {
      // If we have a client ID from URL (e.g., /invoice/123/456), fetch invoice directly
      if (isClientRoute && clientId) {
        try {
          const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
          const response = await fetch(`${backendUrl}/api/public/invoices/${invoiceId}/client/${clientId}`)
          
          if (response.ok) {
            // Use a placeholder token for client-based access
            setVerifiedToken('client-access')
            setLoading(false)
            return
          } else {
            console.error('Failed to access invoice with client ID')
            router.push('/pay?error=access_denied')
            return
          }
        } catch (error) {
          console.error('Error accessing invoice:', error)
          router.push('/pay?error=network_error')
          return
        }
      }
      
      // If we have a token from URL path (e.g., /invoice/123/token), use it directly
      if (urlToken && urlToken !== 'page') {
        setVerifiedToken(urlToken)
        setLoading(false)
        return
      }

      // Check for client credentials in URL parameters
      const queryClientId = searchParams.get('client')
      const clientEmail = searchParams.get('email')

      if (queryClientId || clientEmail) {
        try {
          // Verify credentials and get token - call backend directly
          const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
          const response = await fetch(`${backendUrl}/api/public/invoices/verify-invoice-access`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              invoiceId: invoiceId,
              clientIdentifier: queryClientId || clientEmail,
            }),
          })

          let data
          try {
            data = await response.json()
          } catch (parseError) {
            console.error('Failed to parse response as JSON:', parseError)
            console.error('Response status:', response.status)
            console.error('Response headers:', Object.fromEntries(response.headers.entries()))
            router.push('/pay?error=server_error')
            return
          }

          if (response.ok) {
            setVerifiedToken(data.accessToken)
            // Update URL to include token for bookmarking
            router.replace(`/invoice/${invoiceId}/${data.accessToken}`, { scroll: false })
          } else {
            console.error('Verification failed:', data.message)
            router.push(`/pay?error=verification_failed&message=${encodeURIComponent(data.message || 'Access denied')}`)
          }
        } catch (error) {
          console.error('Error verifying access:', error)
          router.push('/pay?error=network_error')
        }
      } else {
        // No credentials provided, redirect to pay page
        router.push('/pay')
      }

      setLoading(false)
    }

    verifyAccess()
  }, [invoiceId, urlToken, clientId, searchParams, router])

  const handleBack = () => {
    router.push('/pay')
  }

  // Metsab theme configuration
  const metsabTheme = {
    bgClass: 'bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100',
    textClass: 'text-black',
    accentColor: 'blue',
    buttonClass: 'bg-blue-900 text-white hover:bg-blue-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto mb-4"></div>
          <p className="text-blue-900">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!verifiedToken) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-700 mb-4">Access verification failed</p>
          <PrimaryButton onClick={() => router.push('/pay')}>
            Try Again
          </PrimaryButton>
        </div>
      </div>
    )
  }

  return (
    <PublicInvoicePage
      invoiceId={invoiceId}
      accessToken={verifiedToken}
      clientId={clientId || undefined}
      onBack={handleBack}
      brandTheme={metsabTheme}
    />
  )
}
