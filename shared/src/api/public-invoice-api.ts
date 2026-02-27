// frontend/shared/src/api/public-invoice-api.ts
// Purpose: Shared API for public invoice operations used by brand websites

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : 'http://localhost:3001/api'

export interface Invoice {
  id: number
  invoice_number: string
  hammer_price?: number
  buyers_premium?: number
  total_amount?: number
  paid_amount?: number
  status?: string
  type?: string
  title?: string
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

export interface PublicInvoiceResponse {
  success: boolean
  data?: Invoice
  message?: string
}

export interface PaymentStatusResponse {
  success: boolean
  status: string
  totalAmount: number
  paidAmount: number
  dueAmount: number
  lastChecked: string
  message?: string
}

export interface VerifyInvoiceAccessResponse {
  success: boolean
  invoice?: Invoice
  accessToken?: string
  message?: string
}

export const PublicInvoiceAPI = {
  // Verify invoice access and get invoice data
  async verifyAccess(invoiceIdentifier: string | number, clientIdentifier: string): Promise<VerifyInvoiceAccessResponse> {
    try {
      const body: any = {
        clientIdentifier: clientIdentifier.trim(),
      }

      // Check if invoiceIdentifier is a number (ID) or string (invoice number)
      if (typeof invoiceIdentifier === 'number' || !isNaN(Number(invoiceIdentifier))) {
        body.invoiceId = Number(invoiceIdentifier)
      } else {
        body.invoiceNumber = String(invoiceIdentifier).trim()
      }

      const response = await fetch(`${API_BASE_URL}/public/invoices/verify-invoice-access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          message: data.message || 'Failed to verify invoice access'
        }
      }

      return {
        success: true,
        invoice: data.invoice,
        accessToken: data.accessToken,
        message: data.message
      }
    } catch (error: any) {
      console.error('Error verifying invoice access:', error)
      return {
        success: false,
        message: error.message || 'Failed to verify invoice access'
      }
    }
  },

  // Get public invoice data with token verification
  async getInvoice(invoiceId: number, accessToken: string): Promise<PublicInvoiceResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/invoices/${invoiceId}/${accessToken}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to fetch public invoice')
      }

      return await response.json()
    } catch (error: any) {
      console.error('Error fetching public invoice:', error)
      throw new Error(error.message || 'Failed to fetch public invoice')
    }
  },

  // Generate public invoice PDF
  async generatePdf(invoiceId: number, accessToken: string): Promise<Blob> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/invoices/${invoiceId}/${accessToken}/pdf`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to generate public PDF')
      }

      return await response.blob()
    } catch (error: any) {
      console.error('Error generating public PDF:', error)
      throw new Error(error.message || 'Failed to generate public PDF')
    }
  },

  // Check payment status for public invoice
  async checkPaymentStatus(invoiceId: number, accessToken: string): Promise<PaymentStatusResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/invoices/${invoiceId}/${accessToken}/payment-status`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to check payment status')
      }

      return await response.json()
    } catch (error: any) {
      console.error('Error checking payment status:', error)
      throw new Error(error.message || 'Failed to check payment status')
    }
  },

  // Update shipping selection for public invoice
  async updateShipping(invoiceId: number, accessToken: string, shippingData: any): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/invoices/${invoiceId}/${accessToken}/shipping`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shippingData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to update shipping')
      }

      return await response.json()
    } catch (error: any) {
      console.error('Error updating shipping:', error)
      throw new Error(error.message || 'Failed to update shipping')
    }
  },

  // Create shipping payment link
  async createShippingPaymentLink(invoiceId: number, accessToken: string, shippingAmount: number, customerEmail?: string): Promise<{ success: boolean; paymentLink: string; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/public/invoices/${invoiceId}/${accessToken}/create-shipping-payment-link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ shippingAmount, customerEmail })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to create shipping payment link')
      }

      return await response.json()
    } catch (error: any) {
      console.error('Error creating shipping payment link:', error)
      throw new Error(error.message || 'Failed to create shipping payment link')
    }
  }
}
