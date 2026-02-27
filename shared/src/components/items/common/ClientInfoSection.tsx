// frontend/shared/src/components/items/common/ClientInfoSection.tsx
"use client"

import React, { useState } from 'react'
import { defaultTheme } from '../../../lib/theme-utils'

interface ClientInfo {
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  company_name?: string
}

interface ClientInfoSectionProps {
  clientId?: string
  clientInfo: ClientInfo
  onClientIdChange?: (clientId: string) => void
  onClientInfoChange: (clientInfo: ClientInfo) => void
  isPublicForm?: boolean
}

export default function ClientInfoSection({
  clientId = '',
  clientInfo,
  onClientIdChange,
  onClientInfoChange,
  isPublicForm = false
}: ClientInfoSectionProps) {
  const theme = defaultTheme
  const [useExistingClient, setUseExistingClient] = useState(false)
  const [emailError, setEmailError] = useState('')

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!email) { setEmailError(''); return; }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address (e.g. name@example.com)')
    } else {
      setEmailError('')
    }
  }

  const handleToggle = (useExisting: boolean) => {
    // Only update the active tab — preserve all existing data as-is
    setUseExistingClient(useExisting)
  }

  return (
    <div className={`${theme.infoBgClass} ${theme.infoBorderClass} border rounded-lg p-4`}>
      <h3 className={`text-lg font-semibold ${theme.infoTextClass} mb-4`}>
        {isPublicForm ? 'Your Information' : 'Client Information'}
      </h3>
      <div className="mb-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-x-6">
          <button
            type="button"
            onClick={() => handleToggle(true)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              useExistingClient
                ? `${theme.primaryButtonClass} shadow-sm`
                : `${theme.secondaryButtonClass}`
            }`}
          >
            {isPublicForm ? 'I have a Client ID' : 'Use Existing Client ID'}
          </button>
          <button
            type="button"
            onClick={() => handleToggle(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              !useExistingClient
                ? `${theme.primaryButtonClass} shadow-sm`
                : `${theme.secondaryButtonClass}`
            }`}
          >
            {isPublicForm ? 'I am a new client' : 'Enter New Client Information'}
          </button>
        </div>
        {isPublicForm && (
          <p className={`text-xs ${theme.infoTextClass} mt-2`}>
            If you have previously consigned with us, you can use your existing Client ID. Otherwise, please provide your information below.
          </p>
        )}
      </div>

      {useExistingClient && onClientIdChange && (
        <div>
          <label className={`block text-sm font-medium ${theme.labelClass} mb-2`}>
            Client ID *
          </label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => onClientIdChange(e.target.value)}
            className={`w-full px-3 py-2 ${theme.inputClass} ${theme.focusRingClass}`}
            placeholder={isPublicForm ? "Enter your Client ID" : "Enter existing client ID"}
            required
          />
          <p className={`text-xs ${theme.textClass} opacity-60 mt-1`}>
            {isPublicForm
              ? "Enter your Client ID from previous consignments with us"
              : "Enter the ID of an existing client in the system"
            }
          </p>
        </div>
      )}

      {!useExistingClient && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={`block text-sm font-medium ${theme.labelClass} mb-1`}>
              First Name *
            </label>
            <input
              type="text"
              value={clientInfo.first_name || ''}
              onChange={(e) => { const value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); onClientInfoChange({ ...clientInfo, first_name: value }) }}
              className={`w-full px-3 py-2 ${theme.inputClass} ${theme.focusRingClass}`}
              placeholder="First Name"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme.labelClass} mb-1`}>
              Last Name *
            </label>
            <input
              type="text"
              value={clientInfo.last_name || ''}
              onChange={(e) => { const value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); onClientInfoChange({ ...clientInfo, last_name: value }) }}
              className={`w-full px-3 py-2 ${theme.inputClass} ${theme.focusRingClass}`}
              placeholder="Last Name"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme.labelClass} mb-1`}>
              Email *
            </label>
            <input
              type="email"
              value={clientInfo.email || ''}
              onChange={(e) => { onClientInfoChange({ ...clientInfo, email: e.target.value }); validateEmail(e.target.value) }}
              onBlur={(e) => validateEmail(e.target.value)}
              className={`w-full px-3 py-2 ${theme.inputClass} ${theme.focusRingClass} ${emailError ? 'border-red-500' : ''}`}
              placeholder="Email"
              required
            />
            {emailError && <p className="text-xs text-red-500 mt-1">{emailError}</p>}
          </div>

          <div>
            <label className={`block text-sm font-medium ${theme.labelClass} mb-1`}>
              Phone (optional)
            </label>
            <input
              type="tel"
              value={clientInfo.phone || ""}
              maxLength={10}
              onChange={(e) => { const value = e.target.value.replace(/[^0-9]/g, ''); onClientInfoChange({ ...clientInfo, phone: value }) }}
              className={`w-full px-3 py-2 ${theme.inputClass} ${theme.focusRingClass}`}
              placeholder="Phone"
            />
          </div>

          <div className="md:col-span-2">
            <label className={`block text-sm font-medium ${theme.labelClass} mb-1`}>
              Company (optional)
            </label>
            <input
              type="text"
              value={clientInfo.company_name || ''}
              onChange={(e) => onClientInfoChange({
                ...clientInfo,
                company_name: e.target.value
              })}
              className={`w-full px-3 py-2 ${theme.inputClass} ${theme.focusRingClass}`}
              placeholder="Company Name"
            />
          </div>
        </div>
      )}

      {isPublicForm && (
        <div className={`mt-3 text-xs ${theme.infoTextClass}`}>
          ℹ️ This information will be used to create your client profile for consignment purposes.
        </div>
      )}
    </div>
  )
}