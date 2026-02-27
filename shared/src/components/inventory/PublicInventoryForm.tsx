// frontend/shared/src/components/inventory/PublicInventoryForm.tsx
"use client"

import React, { useState, useEffect, useMemo, useRef } from 'react'
import { ChevronLeft, Save, X, Plus, Sparkles, CheckSquare, Square, Upload, FolderOpen } from 'lucide-react'
import { generateStartPrice, ITEM_CATEGORIES, ITEM_PERIODS, ITEM_MATERIALS, ITEM_CONDITIONS } from '../../api/items-api'
import { ArtistsAPI, Artist } from '../../api/artists-api'
import { SchoolsAPI, School } from '../../api/schools-api'
import ImageUploadField from '../items/ImageUploadField'
import SearchableSelect, { SearchableOption } from '../ui/SearchableSelect'
import { getApiBaseUrl } from '../../api/google-sheets-api'
import ClientInfoSection from '../items/common/ClientInfoSection'
import ArtistSchoolSelection from '../items/common/ArtistSchoolSelection'
import ArtworkDescriptionSection from '../items/common/ArtworkDescriptionSection'
import DimensionsSection from '../items/common/DimensionsSection'
import CertificationSection from '../items/common/CertificationSection'
import { defaultTheme } from '../../lib/theme-utils'
import AIAutoFillModal from './AIAutoFillModal'

interface ClientInfo {
  client_id?: string
  first_name?: string
  last_name?: string
  email?: string
  phone?: string
  company_name?: string
}

interface ArtworkFormData {
  id: string
  title: string
  description: string
  low_est: string
  high_est: string
  start_price: string
  condition: string
  reserve: string
  category: string
  subcategory: string
  weight: string
  materials: string
  artist_id: string
  school_id: string
  period_age: string
  provenance: string
  artwork_subject: string
  signature_placement: string
  medium: string
  include_artist_description: boolean
  include_artist_key_description: boolean
  include_artist_biography: boolean
  include_artist_notable_works: boolean
  include_artist_major_exhibitions: boolean
  include_artist_awards_honors: boolean
  include_artist_market_value_range: boolean
  include_artist_signature_style: boolean
  height_inches: string
  width_inches: string
  height_cm: string
  width_cm: string
  height_with_frame_inches: string
  width_with_frame_inches: string
  height_with_frame_cm: string
  width_with_frame_cm: string
  condition_report: string
  gallery_certification: boolean
  gallery_certification_file: string
  gallery_id: string
  artist_certification: boolean
  artist_certification_file: string
  certified_artist_id: string
  artist_family_certification: boolean
  artist_family_certification_file: string
  restoration_done: boolean
  restoration_done_file: string
  restoration_by: string
  images: string[]
}

// ─── Bulk Upload Types ───────────────────────────────────────────────────────
interface BulkImageEntry {
  id: string
  file: File
  previewUrl: string
  assignedInventoryIndex: number // -1 = unassigned
  selected: boolean
  confirmed?: boolean
}

const createInitialArtworkData = (): ArtworkFormData => ({
  title: '',
  description: '',
  low_est: '',
  high_est: '',
  start_price: '',
  condition: '',
  reserve: '',
  id: Math.random().toString(36).substr(2, 9),
  category: '',
  subcategory: '',
  height_inches: '',
  width_inches: '',
  height_cm: '',
  width_cm: '',
  height_with_frame_inches: '',
  width_with_frame_inches: '',
  height_with_frame_cm: '',
  width_with_frame_cm: '',
  weight: '',
  materials: '',
  artist_id: '',
  school_id: '',
  period_age: '',
  provenance: '',
  artwork_subject: '',
  signature_placement: '',
  medium: '',
  include_artist_description: true,
  include_artist_key_description: true,
  include_artist_biography: false,
  include_artist_notable_works: false,
  include_artist_major_exhibitions: false,
  include_artist_awards_honors: false,
  include_artist_market_value_range: false,
  include_artist_signature_style: false,
  condition_report: '',
  gallery_certification: false,
  gallery_certification_file: '',
  gallery_id: '',
  artist_certification: false,
  artist_certification_file: '',
  certified_artist_id: '',
  artist_family_certification: false,
  artist_family_certification_file: '',
  restoration_done: false,
  restoration_done_file: '',
  restoration_by: '',
  images: []
})

const categoryOptions = ITEM_CATEGORIES.map(category => ({ value: category, label: category }))
const conditionOptions = ITEM_CONDITIONS.map(condition => ({ value: condition.toLowerCase().replace(/\s+/g, ''), label: condition }))
const periodOptions = ITEM_PERIODS.map(period => ({ value: period, label: period }))
const materialOptions = ITEM_MATERIALS.map(material => ({ value: material, label: material }))

// Tabs defined outside component so they're stable
const TABS = [
  { id: 'client', label: 'Your Info', icon: '👤', description: 'Enter your contact information' },
  { id: 'basic', label: 'Basic Info', icon: '📝', description: 'Add artwork details and artist information' },
  { id: 'details', label: 'Details', icon: '🔍', description: 'Pricing, category and dimensions' },
  { id: 'images', label: 'Images', icon: '🖼️', description: 'Upload artwork photos' },
  { id: 'preview', label: 'Preview', icon: '👁️', description: 'Review and submit for approval' }
]

async function submitPendingItems(payload: any) {
  const apiUrl = getApiBaseUrl()
  const formData = new FormData()

  if (payload.client_info) {
    formData.append('client_info', JSON.stringify(payload.client_info))
  }
  if (payload.client_id) {
    formData.append('client_id', payload.client_id)
  }
  if (payload.items && payload.items.length > 0) {
    formData.append('items_json', JSON.stringify(payload.items))
  }

  const res = await fetch(`${apiUrl}/public/inventory/submit`, {
    method: 'POST',
    body: formData,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Submission failed')
  return data
}


export default function PublicInventoryForm() {
  const theme = defaultTheme
  const [clientId, setClientId] = useState('')
  const [clientInfo, setClientInfo] = useState<ClientInfo>({})
  const [artworks, setArtworks] = useState<ArtworkFormData[]>([createInitialArtworkData()])
  const [activeArtworkIndex, setActiveArtworkIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [artists, setArtists] = useState<Artist[]>([])
  const [schools, setSchools] = useState<School[]>([])
  const [loadingArtistsSchools, setLoadingArtistsSchools] = useState(false)
  const [pendingImages, setPendingImages] = useState<Record<string, File>>({})
  const [pendingCertificationFiles, setPendingCertificationFiles] = useState<Record<string, File>>({})

  // ── AI Auto-Fill state ────────────────────────────────────────────────────
  const [showAIModal, setShowAIModal] = useState(false)
  const [aiFilledIndex, setAiFilledIndex] = useState<number | null>(null)

  // ─── Bulk Upload State ─────────────────────────────────────────────────────
  const [showBulkUploader, setShowBulkUploader] = useState(false)
  const [bulkImages, setBulkImages] = useState<BulkImageEntry[]>([])
  const [bulkSelectAll, setBulkSelectAll] = useState(false)
  const [bulkAssignTarget, setBulkAssignTarget] = useState<number>(0)
  const [bulkAssignError, setBulkAssignError] = useState<string | null>(null)
  const bulkInputRef = useRef<HTMLInputElement>(null)

  // ─────────────────────────────────────────────────────────────────────────
  // PER-INVENTORY TAB STATE
  // artworkTabs maps: artwork index (string) → tab id
  // Special key '-1' tracks whether the global client step is still active.
  // When '-1' === 'client', the form shows the client step regardless of inventory.
  // Once the user moves past it, '-1' is set to 'done' and each inventory
  // independently tracks its own current step.
  // ─────────────────────────────────────────────────────────────────────────
  const [artworkTabs, setArtworkTabs] = useState<Record<string, string>>({
    '-1': 'client', // global: still on client step
    '0': 'basic',   // inventory 0 will start at basic when client is done
  })

  // The tab that is currently visible
  const activeTab: string = artworkTabs['-1'] === 'client'
    ? 'client'
    : (artworkTabs[String(activeArtworkIndex)] ?? 'basic')

  // Helper: update the active tab, persisting per-inventory state
  const setActiveTab = (tabId: string) => {
    setArtworkTabs(prev => {
      if (tabId === 'client') {
        return { ...prev, '-1': 'client' }
      }
      return {
        ...prev,
        '-1': 'done', // client step completed globally
        [String(activeArtworkIndex)]: tabId,
      }
    })
  }

  // Switch to a different inventory, restoring its last saved tab
  const switchToArtwork = (index: number) => {
    setActiveArtworkIndex(index)
    // No tab mutation needed — activeTab is derived from artworkTabs[index]
  }

  const currentArtwork = artworks[activeArtworkIndex] || createInitialArtworkData()

  useEffect(() => {
    const loadArtistsSchools = async () => {
      try {
        setLoadingArtistsSchools(true)
        const [artistsResponse, schoolsResponse] = await Promise.all([
          ArtistsAPI.getArtists({ status: 'active', limit: 1000 }),
          SchoolsAPI.getSchools({ status: 'active', limit: 1000 }),
        ])
        if (artistsResponse.success) setArtists(artistsResponse.data)
        if (schoolsResponse.success) setSchools(schoolsResponse.data)
      } catch (err) {
        console.error('Failed to load artists/schools:', err)
      } finally {
        setLoadingArtistsSchools(false)
      }
    }
    loadArtistsSchools()
  }, [])

  const addArtwork = () => {
    const newIndex = artworks.length
    setArtworks(prev => [...prev, createInitialArtworkData()])
    setArtworkTabs(prev => ({
      ...prev,
      '-1': 'done',           // keep client step completed
      [String(newIndex)]: 'basic', // new inventory always starts at step 2
    }))
    setActiveArtworkIndex(newIndex)
  }

  const removeArtwork = (index: number) => {
    if (artworks.length <= 1) return
    setArtworks(prev => prev.filter((_, i) => i !== index))
    // Re-key artworkTabs: remove the deleted index, shift higher indices down
    setArtworkTabs(prev => {
      const reKeyed: Record<string, string> = { '-1': prev['-1'] }
      artworks.forEach((_, i) => {
        if (i < index) reKeyed[String(i)] = prev[String(i)] ?? 'basic'
        else if (i > index) reKeyed[String(i - 1)] = prev[String(i)] ?? 'basic'
      })
      return reKeyed
    })
    const newActive = activeArtworkIndex >= artworks.length - 1
      ? Math.max(0, artworks.length - 2)
      : activeArtworkIndex
    setActiveArtworkIndex(newActive)
  }

  const generateAutoTitle = (data?: ArtworkFormData): string => {
    const currentData = data || currentArtwork
    const parts: string[] = []
    if (currentData.artist_id) {
      const artist = artists.find(a => a.id?.toString() === currentData.artist_id)
      if (artist) {
        let artistPart = artist.name
        if (artist.birth_year || artist.death_year) {
          artistPart += ` (${artist.birth_year || ''}${artist.death_year ? `-${artist.death_year}` : ''})`
        }
        parts.push(artistPart)
      }
    }
    parts.push(currentData.artwork_subject?.trim() || 'Untitled')
    let mediumPart = ''
    if (currentData.medium?.trim()) {
      mediumPart = currentData.medium.trim()
      if (currentData.materials?.trim() && currentData.materials.trim() !== currentData.medium.trim()) {
        mediumPart += ` (${currentData.materials.trim()})`
      }
    } else if (currentData.materials?.trim()) {
      mediumPart = currentData.materials.trim()
    }
    if (mediumPart) parts.push(mediumPart)
    if (currentData.signature_placement?.trim()) parts.push(`Signed ${currentData.signature_placement.trim()}`)
    if (currentData.period_age?.trim()) parts.push(currentData.period_age.trim())
    return parts.join(' | ')
  }

  const previewDescription = useMemo(() => {
    const parts: string[] = []
    const currentTitle = currentArtwork.title || generateAutoTitle() || 'Untitled Artwork'
    parts.push(currentTitle)
    if (currentArtwork.description?.trim()) parts.push(currentArtwork.description.trim())
    if (currentArtwork.artist_id) {
      const artist = artists.find(a => a.id?.toString() === currentArtwork.artist_id)
      if (artist) {
        const artistParts: string[] = []
        if (currentArtwork.include_artist_description && artist.description) artistParts.push(artist.description)
        if (currentArtwork.include_artist_key_description && artist.key_description) artistParts.push(artist.key_description)
        if (currentArtwork.include_artist_biography && artist.biography) artistParts.push(artist.biography)
        if (currentArtwork.include_artist_notable_works && artist.notable_works) artistParts.push(`Notable Works: ${artist.notable_works}`)
        if (currentArtwork.include_artist_major_exhibitions && artist.exhibitions) artistParts.push(`Major Exhibitions: ${artist.exhibitions}`)
        if (currentArtwork.include_artist_awards_honors && artist.awards) artistParts.push(`Awards and Honors: ${artist.awards}`)
        if (currentArtwork.include_artist_market_value_range && artist.market_value_range) artistParts.push(`Market Value Range: ${artist.market_value_range}`)
        if (currentArtwork.include_artist_signature_style && artist.signature_style) artistParts.push(`Signature Style: ${artist.signature_style}`)
        if (artistParts.length > 0) parts.push(artistParts.join('<br>'))
      }
    }
    if (currentArtwork.height_inches || currentArtwork.width_inches || currentArtwork.height_cm || currentArtwork.width_cm) {
      let dimensionText = 'Dimensions: '
      if (currentArtwork.height_inches && currentArtwork.width_inches) {
        dimensionText += `${currentArtwork.height_inches} × ${currentArtwork.width_inches} inches`
        if (currentArtwork.height_cm && currentArtwork.width_cm) dimensionText += ` (${currentArtwork.height_cm} × ${currentArtwork.width_cm} cm)`
      } else if (currentArtwork.height_cm && currentArtwork.width_cm) {
        dimensionText += `${currentArtwork.height_cm} × ${currentArtwork.width_cm} cm`
      }
      parts.push(dimensionText)
    }
    if (parts.length > 2) {
      return [parts[0], parts[1], ...parts.slice(2, -1), parts[parts.length - 1]].join('<br><br>').replace(/<br><br>Dimensions:/, '<br>Dimensions:')
    }
    return parts.length === 2 ? parts.join('<br><br>') : (parts[0] || 'Untitled Artwork')
  }, [
    currentArtwork.title, currentArtwork.description, currentArtwork.artist_id,
    currentArtwork.include_artist_description, currentArtwork.include_artist_key_description,
    currentArtwork.include_artist_biography, currentArtwork.include_artist_notable_works,
    currentArtwork.include_artist_major_exhibitions, currentArtwork.include_artist_awards_honors,
    currentArtwork.include_artist_market_value_range, currentArtwork.include_artist_signature_style,
    currentArtwork.height_inches, currentArtwork.width_inches, currentArtwork.height_cm,
    currentArtwork.width_cm, artists, activeArtworkIndex
  ])

  const handleInputChange = (field: string, value: string | boolean) => {
    setArtworks(prev => prev.map((artwork, index) => {
      if (index !== activeArtworkIndex) return artwork
      let updated: ArtworkFormData = { ...artwork, [field]: value as any }
      const isValidNumber = (val: string) => val !== '' && val !== '.' && !isNaN(parseFloat(val)) && isFinite(Number(val))
      if (field === 'height_inches' && typeof value === 'string' && isValidNumber(value)) updated.height_cm = (parseFloat(value) * 2.54).toFixed(1)
      if (field === 'height_cm' && typeof value === 'string' && isValidNumber(value)) updated.height_inches = (parseFloat(value) / 2.54).toFixed(1)
      if (field === 'width_inches' && typeof value === 'string' && isValidNumber(value)) updated.width_cm = (parseFloat(value) * 2.54).toFixed(1)
      if (field === 'width_cm' && typeof value === 'string' && isValidNumber(value)) updated.width_inches = (parseFloat(value) / 2.54).toFixed(1)
      const h = parseFloat(updated.height_inches || '0'), w = parseFloat(updated.width_inches || '0')
      if (!isNaN(h) && !isNaN(w) && h > 0 && w > 0) {
        updated.height_with_frame_inches = (h + 2).toFixed(1); updated.width_with_frame_inches = (w + 2).toFixed(1)
        updated.height_with_frame_cm = ((h + 2) * 2.54).toFixed(1); updated.width_with_frame_cm = ((w + 2) * 2.54).toFixed(1)
      }
      if (field === 'low_est' && typeof value === 'string' && isValidNumber(value)) {
        const start = generateStartPrice(parseFloat(value)); updated.start_price = String(start); updated.reserve = String(start)
      }
      if (field === 'start_price' && typeof value === 'string' && isValidNumber(value)) updated.reserve = value
      if (['artist_id', 'artwork_subject', 'medium', 'signature_placement', 'period_age'].includes(field)) {
        const autoTitle = generateAutoTitle(updated)
        if (autoTitle && autoTitle !== 'Untitled') updated.title = autoTitle
      }
      return updated
    }))
    setValidationErrors([])
  }

const handleImageChange = (index: number, url: string, file?: File) => {
  const removedUrl = artworks[activeArtworkIndex]?.images[index]

  setArtworks(prev => prev.map((artwork, artworkIndex) => {
    if (artworkIndex !== activeArtworkIndex) return artwork
    const newImages = [...artwork.images]
    while (newImages.length <= index) newImages.push('')
    newImages[index] = url
    const collapsed = newImages.filter(img => img && img.trim())
    return { ...artwork, images: collapsed }
  }))

  if (file) {
    setPendingImages(prev => ({ ...prev, [`artwork_${activeArtworkIndex}_image_${index}`]: file }))
    // Sync to bulk modal
    setBulkImages(prev => {
      if (prev.some(img => img.previewUrl === url)) return prev
      return [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        file,
        previewUrl: url,
        assignedInventoryIndex: activeArtworkIndex,
        selected: false,
        confirmed: true,
      }]
    })
  } else {
    // Re-index pendingImages after collapse
    setPendingImages(prev => {
      const currentImages = artworks[activeArtworkIndex]?.images ?? []
      const newImages = [...currentImages]
      while (newImages.length <= index) newImages.push('')
      newImages[index] = ''
      const updated: Record<string, File> = {}
      let newIdx = 0
      for (let i = 0; i < newImages.length; i++) {
        if (newImages[i] && newImages[i].trim()) {
          const oldKey = `artwork_${activeArtworkIndex}_image_${i}`
          if (prev[oldKey]) {
            updated[`artwork_${activeArtworkIndex}_image_${newIdx}`] = prev[oldKey]
          }
          newIdx++
        }
      }
      return {
        ...Object.fromEntries(Object.entries(prev).filter(([k]) => !k.startsWith(`artwork_${activeArtworkIndex}_image_`))),
        ...updated
      }
    })
    // Remove from bulk modal
    if (removedUrl) {
      setBulkImages(prev => prev.filter(img => img.previewUrl !== removedUrl))
    }
  }

  setValidationErrors([])
}

  const handleMultipleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files; if (!files) return
    const slots: number[] = []
    for (let i = 0; i < 10; i++) { if (!currentArtwork.images[i] || currentArtwork.images[i] === '') slots.push(i) }
    const toProcess = Array.from(files).slice(0, slots.length)
    if (toProcess.length === 0) { alert('All image slots are already filled.'); return }
    if (toProcess.length < files.length) alert(`Only ${toProcess.length} files can be added`)
    toProcess.forEach((file, index) => {
      if (!file.type.startsWith('image/')) { alert(`File ${file.name} is not an image`); return }
      if (file.size > 10 * 1024 * 1024) { alert(`File ${file.name} is too large (max 10MB)`); return }
      handleImageChange(slots[index], URL.createObjectURL(file), file)
    })
    event.target.value = ''; setValidationErrors([])
  }

  const handleCertificationFileUpload = (certificationType: 'gallery_certification_file' | 'artist_certification_file' | 'artist_family_certification_file' | 'restoration_done_file', file: File) => {
    const previewUrl = URL.createObjectURL(file)
    setArtworks(prev => prev.map((artwork, index) => index === activeArtworkIndex ? { ...artwork, [certificationType]: previewUrl } as any : artwork))
    setPendingCertificationFiles(prev => ({ ...prev, [certificationType]: file }))
  }

  const handleAIFill = (data: Record<string, any>, images: { file: File; preview: string }[]) => {
    setArtworks(prev => prev.map((artwork, index) => {
      if (index !== activeArtworkIndex) return artwork
      const stringFields = ['title', 'description', 'category', 'subcategory', 'materials', 'medium', 'condition', 'period_age', 'provenance', 'artwork_subject', 'signature_placement', 'height_inches', 'width_inches', 'height_cm', 'width_cm', 'height_with_frame_inches', 'width_with_frame_inches', 'height_with_frame_cm', 'width_with_frame_cm', 'weight']
      const numericFields = ['low_est', 'high_est', 'start_price']
      const updates: Partial<ArtworkFormData> = {}
      stringFields.forEach(f => { if (data[f] != null && data[f] !== '') (updates as any)[f] = String(data[f]) })
      numericFields.forEach(f => { if (data[f] != null && data[f] !== '') (updates as any)[f] = String(data[f]) })
      if (updates.low_est && !updates.start_price) { const sp = generateStartPrice(parseFloat(updates.low_est)); updates.start_price = sp.toString(); updates.reserve = sp.toString() }
      else if (updates.start_price) updates.reserve = updates.start_price
      const autoTitle = generateAutoTitle({ ...artwork, ...updates } as ArtworkFormData)
      if (autoTitle && autoTitle !== 'Untitled' && !updates.title) updates.title = autoTitle
      if (images.length > 0) {
        const newImages = [...artwork.images]; let slotIndex = 0
        images.forEach(({ preview }) => { while (slotIndex < 10 && newImages[slotIndex] && newImages[slotIndex] !== '') slotIndex++; if (slotIndex < 10) { newImages[slotIndex] = preview; slotIndex++ } })
        updates.images = newImages
      }
      return { ...artwork, ...updates }
    }))
    images.forEach(({ file }, i) => setPendingImages(prev => ({ ...prev, [`artwork_${activeArtworkIndex}_image_${i}`]: file })))
    setAiFilledIndex(activeArtworkIndex); setShowAIModal(false); setValidationErrors([])
    if (activeTab === 'images') setActiveTab('basic')
  }

  // ─── Bulk Upload Handlers ──────────────────────────────────────────────────
  const handleBulkFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    const newEntries: BulkImageEntry[] = Array.from(files)
      .filter(file => {
        if (!file.type.startsWith('image/')) return false
        if (file.size > 10 * 1024 * 1024) return false
        return true
      })
      .map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        previewUrl: URL.createObjectURL(file),
        assignedInventoryIndex: -1,
        selected: false,
      }))

    setBulkImages(prev => [...prev, ...newEntries])
    setBulkAssignError(null)
    event.target.value = ''
  }

  const toggleBulkImageSelected = (id: string) => {
    setBulkImages(prev =>
      prev.map(img => img.id === id ? { ...img, selected: !img.selected } : img)
    )
  }

  const toggleSelectAll = () => {
    const next = !bulkSelectAll
    setBulkSelectAll(next)
    setBulkImages(prev => prev.map(img => ({ ...img, selected: next })))
  }

  const updateBulkImageInventory = (id: string, inventoryIndex: number) => {
    setBulkImages(prev =>
      prev.map(img => img.id === id ? { ...img, assignedInventoryIndex: inventoryIndex } : img)
    )
  }

const removeBulkImage = (id: string) => {
  setBulkImages(prev => {
    const entry = prev.find(img => img.id === id)
    if (!entry) return prev

    // Also remove from the assigned artwork's images
    if (entry.assignedInventoryIndex !== -1 && entry.confirmed) {
      setArtworks(artworksPrev => artworksPrev.map((artwork, idx) => {
        if (idx !== entry.assignedInventoryIndex) return artwork
        const collapsed = artwork.images.filter(img => img !== entry.previewUrl)
        return { ...artwork, images: collapsed }
      }))
      // Clean up pendingImages for that artwork
      setPendingImages(pendingPrev => {
        const updated = { ...pendingPrev }
        Object.keys(updated).forEach(key => {
          if (updated[key] === entry.file) delete updated[key]
        })
        return updated
      })
    }

    URL.revokeObjectURL(entry.previewUrl)
    return prev.filter(img => img.id !== id)
  })
}

  const applyBulkAssignment = () => {
    setBulkAssignError(null)
    const selectedImages = bulkImages.filter(img => img.selected)
    if (selectedImages.length === 0) {
      setBulkAssignError('Please select at least one image to assign.')
      return
    }
    setBulkImages(prev =>
      prev.map(img =>
        img.selected ? { ...img, assignedInventoryIndex: bulkAssignTarget, selected: false } : img
      )
    )
    setBulkSelectAll(false)
  }

  const confirmBulkAssignments = () => {
    setBulkAssignError(null)

    const unassigned = bulkImages.filter(img => img.assignedInventoryIndex === -1)
    if (unassigned.length > 0) {
      setBulkAssignError(`${unassigned.length} image(s) are not yet assigned.`)
      return
    }

    const newPendingImages: Record<string, File> = {}

    setArtworks(prev => {
      const updated = [...prev]

      // Clear all artwork images first
      updated.forEach((artwork, idx) => {
        updated[idx] = { ...artwork, images: [] }
      })

      // Regroup all bulk images by their current inventory assignment
      const groups: Record<number, BulkImageEntry[]> = {}
      bulkImages.forEach(img => {
        if (!groups[img.assignedInventoryIndex]) groups[img.assignedInventoryIndex] = []
        groups[img.assignedInventoryIndex].push(img)
      })

      // Rebuild each artwork's images from scratch
      Object.entries(groups).forEach(([idxStr, entries]) => {
        const artworkIdx = Number(idxStr)
        if (artworkIdx < 0 || artworkIdx >= updated.length) return
        const artwork = { ...updated[artworkIdx] }
        const images: string[] = []

        entries.forEach((entry, i) => {
          images.push(entry.previewUrl)
          newPendingImages[`artwork_${artworkIdx}_image_${i}`] = entry.file
        })

        artwork.images = images
        updated[artworkIdx] = artwork
      })

      return updated
    })

    setPendingImages(prev => ({ ...prev, ...newPendingImages }))
    setBulkImages(prev => prev.map(img => ({ ...img, confirmed: true, selected: false })))
    setBulkSelectAll(false)
    setShowBulkUploader(false)
    setValidationErrors([])
  }

  const closeBulkUploader = () => {
    // Only revoke blob URLs for images not yet confirmed (confirmed ones are used in artworks)
    bulkImages.filter(img => !img.confirmed).forEach(img => URL.revokeObjectURL(img.previewUrl))
    // Keep confirmed images in state so they show next time modal opens
    setBulkImages(prev => prev.filter(img => img.confirmed))
    setBulkSelectAll(false)
    setShowBulkUploader(false)
    setBulkAssignError(null)
  }

  const selectedCount = bulkImages.filter(img => img.selected).length
  const assignedCount = bulkImages.filter(img => img.assignedInventoryIndex !== -1).length

  const getFilledSlotsCount = (): number => {
    return currentArtwork.images.filter(url => url && url.trim() !== '').length
  }

  const currentTabIndex = TABS.findIndex(tab => tab.id === activeTab)
  const isFirstTab = currentTabIndex === 0
  const isLastTab = currentTabIndex === TABS.length - 1

  const isTabValid = (tabId: string): boolean => {
    if (tabId === 'client') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
      return !!(clientId?.trim() || (clientInfo.first_name?.trim() && clientInfo.last_name?.trim() && clientInfo.email?.trim() && emailRegex.test(clientInfo.email ?? '')))
    }
    if (tabId === 'basic') return !!(currentArtwork.title?.trim() && currentArtwork.description?.trim() && currentArtwork.artwork_subject?.trim())
    if (tabId === 'details') { const low = Number(currentArtwork.low_est), high = Number(currentArtwork.high_est); return Number.isFinite(low) && low > 0 && Number.isFinite(high) && high > 0 && low < high }
    if (tabId === 'images') return currentArtwork.images.some(img => img && img.trim())
    return true
  }

  const canProceedToNext = () => isTabValid(activeTab)
  const canNavigateToTab = (targetIndex: number): boolean => {
    if (targetIndex <= currentTabIndex) return true
    for (let i = 0; i < targetIndex; i++) { if (!isTabValid(TABS[i].id)) return false }
    return true
  }

  const areAllArtworksComplete = (): boolean => {
    return artworks.every((artwork) => {
      if (!artwork.title?.trim() || !artwork.description?.trim() || !artwork.artwork_subject?.trim()) return false
      const low = Number(artwork.low_est), high = Number(artwork.high_est)
      if (!Number.isFinite(low) || low <= 0 || !Number.isFinite(high) || high <= 0 || low >= high) return false
      if (!artwork.images.some(img => img && img.trim())) return false
      return true
    })
  }

  const goToNextTab = () => {
    if (!isLastTab && canProceedToNext()) {
      setActiveTab(TABS[currentTabIndex + 1].id)
    }
  }

  const goToPrevTab = () => { if (!isFirstTab) setActiveTab(TABS[currentTabIndex - 1].id) }

  const AIAutoFillButton = () => (
    <button type="button" onClick={() => setShowAIModal(true)}
      className="flex items-center px-4 py-2 rounded-lg border-2 border-purple-400 bg-purple-50 text-purple-700 hover:bg-purple-100 active:scale-95 transition-all duration-200 shadow-sm font-medium text-sm"
      title="Upload artwork photos and let AI auto-fill form fields">
      <Sparkles className="h-4 w-4 mr-1.5 text-purple-500" />AI Auto-Fill
      {aiFilledIndex === activeArtworkIndex && <span className="ml-1.5 w-2 h-2 rounded-full bg-green-500 inline-block" title="AI data applied" />}
    </button>
  )

  const onSubmit = async () => {
  setError(null)
  setMessage(null)
  setSubmitting(true)

  try {
    // Converts a File to a base64 data URL
    const toDataUrl = (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(String(reader.result))
        reader.onerror = () => reject(new Error('Failed to read file'))
        reader.readAsDataURL(file)
      })

    // For each artwork, resolve every image slot to either:
    //   • a base64 data URL  (if we have the File in pendingImages)
    //   • an https:// URL    (already uploaded, pass through)
    //   • skip               (blob:// URLs the server cannot use)
    const serializeArtworkImages = async (artworkIndex: number): Promise<string[]> => {
      const artwork = artworks[artworkIndex]
      const resolved: string[] = []

      for (let imgIdx = 0; imgIdx < artwork.images.length; imgIdx++) {
        const key = `artwork_${artworkIndex}_image_${imgIdx}`
        const pendingFile = pendingImages[key]

        if (pendingFile) {
          // We have the original File — convert to base64
          try {
            const dataUrl = await toDataUrl(pendingFile)
            resolved.push(dataUrl)
          } catch {
            console.warn(`Skipping unreadable image: ${key}`)
          }
        } else if (artwork.images[imgIdx]?.startsWith('https://')) {
          // Already a remote URL — safe to include as-is
          resolved.push(artwork.images[imgIdx])
        }
        // blob:// URLs without a pending File are stale previews — skip them
      }

      return resolved
    }

    const payloadItems = await Promise.all(
      artworks.map(async (artwork, index) => {
        const images = await serializeArtworkImages(index)
        return {
          title: artwork.title,
          description: artwork.description,
          low_est: Number(artwork.low_est),
          high_est: Number(artwork.high_est),
          start_price: artwork.start_price ? Number(artwork.start_price) : undefined,
          condition: artwork.condition || undefined,
          reserve: artwork.reserve ? Number(artwork.reserve) : undefined,
          category: artwork.category || undefined,
          subcategory: artwork.subcategory || undefined,
          height_inches: artwork.height_inches || undefined,
          width_inches: artwork.width_inches || undefined,
          height_cm: artwork.height_cm || undefined,
          width_cm: artwork.width_cm || undefined,
          height_with_frame_inches: artwork.height_with_frame_inches || undefined,
          width_with_frame_inches: artwork.width_with_frame_inches || undefined,
          height_with_frame_cm: artwork.height_with_frame_cm || undefined,
          width_with_frame_cm: artwork.width_with_frame_cm || undefined,
          artist_id: artwork.artist_id || undefined,
          school_id: artwork.school_id || undefined,
          condition_report: artwork.condition_report || undefined,
          include_artist_description: artwork.include_artist_description,
          include_artist_key_description: artwork.include_artist_key_description,
          include_artist_biography: artwork.include_artist_biography,
          include_artist_notable_works: artwork.include_artist_notable_works,
          include_artist_major_exhibitions: artwork.include_artist_major_exhibitions,
          include_artist_awards_honors: artwork.include_artist_awards_honors,
          include_artist_market_value_range: artwork.include_artist_market_value_range,
          include_artist_signature_style: artwork.include_artist_signature_style,
          gallery_certification: artwork.gallery_certification,
          gallery_id: artwork.gallery_id || undefined,
          artist_certification: artwork.artist_certification,
          certified_artist_id: artwork.certified_artist_id || undefined,
          artist_family_certification: artwork.artist_family_certification,
          restoration_done: artwork.restoration_done,
          restoration_by: artwork.restoration_by || undefined,
          materials: artwork.materials || undefined,
          medium: artwork.medium || undefined,
          period_age: artwork.period_age || undefined,
          provenance: artwork.provenance || undefined,
          artwork_subject: artwork.artwork_subject || undefined,
          signature_placement: artwork.signature_placement || undefined,
          weight: artwork.weight || undefined,
          images,
        }
      })
    )

    const payload = {
      client_id: clientId || undefined,
      client_info: !clientId ? clientInfo : undefined,
      items: payloadItems,
    }

    const result = await submitPendingItems(payload)
    setMessage(`Submitted successfully. Reference: ${result.submission_token}`)

    // Reset form
    setArtworks([createInitialArtworkData()])
    setActiveArtworkIndex(0)
    setArtworkTabs({ '-1': 'client', '0': 'basic' })
    setClientId('')
    setClientInfo({})
    setPendingImages({})
    setPendingCertificationFiles({})
    setValidationErrors([])
    setAiFilledIndex(null)
    setBulkImages([])
  } catch (e: any) {
    console.error('Submission error:', e)
    setError(e.message || 'Submission failed')
  } finally {
    setSubmitting(false)
  }
}




  return (
    <div className={`min-h-screen ${theme.bgClass} py-12 px-4`}>
      {showAIModal && <AIAutoFillModal onClose={() => setShowAIModal(false)} onFill={handleAIFill} />}

      <div className={`max-w-5xl mx-auto ${theme.cardBgClass} ${theme.borderClass} border rounded-xl shadow-lg`}>
        {/* Header */}
        <div className={`p-6 border-b ${theme.borderClass}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-2xl font-bold ${theme.textClass}`}>Inventory Submission</h1>
              <p className={`${theme.textClass} opacity-75`}>Submit multiple inventory items for review. We'll contact you after approval.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                const frontendUrl =
                  window.location.hostname === "localhost"
                    ? "http://localhost:3000"
                    : "https://auction-frontend-bice.vercel.app"

                window.location.href = `${frontendUrl}/items`
              }}
              className="flex items-center px-4 py-2 mt-4 rounded-lg border bg-blue-600 text-white border-blue-600 hover:bg-blue-700 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              Back to Dashboard
            </button>
          </div>
          {error && <div className={`mb-4 p-3 ${theme.errorBgClass} ${theme.errorBorderClass} border rounded ${theme.errorTextClass}`}>{error}</div>}
          {message && <div className={`mb-4 p-3 ${theme.successBgClass} ${theme.successBorderClass} border rounded ${theme.successTextClass}`}>{message}</div>}
          {validationErrors.length > 0 && (
            <div className={`mb-4 p-3 ${theme.errorBgClass} ${theme.errorBorderClass} border rounded`}>
              <h3 className={`${theme.errorTextClass} font-medium mb-2`}>Please fix the following errors:</h3>
              <ul className={`list-disc list-inside ${theme.errorTextClass} space-y-1`}>{validationErrors.map((e, i) => <li key={i}>{e}</li>)}</ul>
            </div>
          )}
        </div>

        {/* Client step banner */}
        {activeTab === 'client' && (
          <div className={`p-6 ${theme.infoBgClass} border-b ${theme.infoBorderClass}`}>
            <div className="flex items-center mb-4">
              <div className={`${theme.accentBgClass} rounded-full p-2 mr-3`}><span className={`${theme.accentTextClass} text-lg`}>👤</span></div>
              <div>
                <h2 className={`text-lg font-semibold ${theme.infoTextClass}`}>Your Contact Information</h2>
                <p className={`${theme.infoTextClass} text-sm opacity-90`}>We need this to contact you about your submission</p>
              </div>
            </div>
          </div>
        )}

        {/* Inventory switcher (hidden on client step) */}
        {activeTab !== 'client' && (
          <div className={`p-6 border-b ${theme.borderClass} ${theme.sectionBgClass}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <div className={`${theme.accentBgClass} rounded-full p-2 mr-3`}><span className={`${theme.accentTextClass} text-lg`}>🎨</span></div>
                <div>
                  <h3 className={`text-lg font-semibold ${theme.textClass}`}>Inventory Items ({artworks.length})</h3>
                  <p className={`${theme.textClass} opacity-75 text-sm`}>Manage your artwork submissions</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AIAutoFillButton />
                <button onClick={addArtwork} className={`flex items-center px-4 py-2 ${theme.primaryButtonClass} active:scale-95 transition-all duration-200 shadow-md`}>
                  <Plus className="h-4 w-4 mr-1" />Add Inventory
                </button>
              </div>
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {artworks.map((artwork, index) => {
                const savedTab = artworkTabs[String(index)] ?? 'basic'
                const savedTabIndex = TABS.findIndex(t => t.id === savedTab)
                return (
                  <div key={artwork.id} className="flex items-center">
                    <button onClick={() => switchToArtwork(index)}
                      className={`px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${activeArtworkIndex === index ? theme.primaryButtonClass : `${theme.cardBgClass} ${theme.textClass} hover:${theme.accentBgClass}`}`}
                    >
                      Inventory {index + 1}
                      {/* Show completion status */}
                      {activeArtworkIndex !== index && (
                        <span className={`ml-1 text-xs ${savedTab === 'preview' ? 'text-green-600' : 'opacity-50'}`}>
                          {savedTab === 'preview' ? '✓ Complete' : `· Step ${savedTabIndex + 1}`}
                        </span>
                      )}
                      {aiFilledIndex === index && <span className="ml-1.5 text-xs text-purple-600 font-medium">✦ AI</span>}
                      {artwork.title && `: ${artwork.title.substring(0, 20)}${artwork.title.length > 20 ? '...' : ''}`}
                    </button>
                    {artworks.length > 1 && (
                      <button onClick={() => removeArtwork(index)} className={`ml-1 p-2 ${theme.errorTextClass} hover:${theme.errorBgClass} rounded-md`} title="Remove">
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Step indicator */}
        <div className={`px-6 py-6 ${theme.sectionBgClass} border-b ${theme.borderClass}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {TABS.map((tab, index) => {
                const navigable = canNavigateToTab(index)
                return (
                  <div key={tab.id} className={`flex items-center ${navigable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    onClick={() => navigable && setActiveTab(tab.id)}
                    title={!navigable ? 'Complete the previous steps first' : tab.label}>
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-sm font-medium transition-all duration-200
                      ${activeTab === tab.id ? `${theme.primaryBgColor} text-white border-current`
                        : index < currentTabIndex ? `${theme.successBgClass} ${theme.successBorderClass} ${theme.successTextClass}`
                          : navigable ? `${theme.cardBgClass} ${theme.borderClass} ${theme.textClass} hover:border-teal-400 hover:text-teal-600`
                            : `${theme.cardBgClass} ${theme.borderClass} ${theme.textClass} opacity-35`}`}>
                      {index < currentTabIndex ? <span className="text-sm">✓</span> : <span className="text-sm font-medium">{index + 1}</span>}
                    </div>
                    {index < TABS.length - 1 && <div className={`w-12 h-0.5 mx-2 ${index < currentTabIndex ? theme.successTextClass : theme.borderClass}`} />}
                  </div>
                )
              })}
            </div>
            <div className={`text-sm ${theme.textClass} opacity-75`}>Step {currentTabIndex + 1} of {TABS.length}</div>
          </div>
        </div>

        {/* Tab title bar */}
        <div className={`px-6 py-4 ${theme.cardBgClass} border-b ${theme.borderClass}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">{TABS[currentTabIndex]?.icon}</span>
              <div>
                <h2 className={`text-xl font-semibold ${theme.textClass}`}>{TABS[currentTabIndex]?.label}</h2>
                <p className={`text-sm ${theme.textClass} opacity-75`}>{TABS[currentTabIndex]?.description}</p>
              </div>
            </div>
            {!canProceedToNext() && activeTab !== 'preview' && (
              <div className={`${theme.warningBgClass} ${theme.warningBorderClass} border rounded-lg px-3 py-2`}>
                <p className={`text-xs ${theme.warningTextClass}`}>
                  {activeTab === 'client' && 'Please provide your contact information'}
                  {activeTab === 'basic' && (() => {
                    const missing = []
                    if (!currentArtwork.title?.trim()) missing.push('title')
                    if (!currentArtwork.artwork_subject?.trim()) missing.push('artwork subject')
                    if (!currentArtwork.description?.trim()) missing.push('description')
                    return `Please add: ${missing.join(', ')}`
                  })()}
                  {activeTab === 'details' && 'Please add valid price estimates'}
                  {activeTab === 'images' && 'Please upload at least one image'}
                </p>
              </div>
            )}
          </div>
        </div>

        <form className="p-8">
          {activeTab === 'client' && (
            <div className="space-y-6">
              <ClientInfoSection clientId={clientId} clientInfo={clientInfo} onClientIdChange={setClientId} onClientInfoChange={setClientInfo} isPublicForm={true} />
            </div>
          )}

          {activeTab === 'basic' && (
            <div className="space-y-6">
              {aiFilledIndex === activeArtworkIndex && (
                <div className="flex items-center space-x-2 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <Sparkles className="h-4 w-4 text-purple-600 flex-shrink-0" />
                  <p className="text-sm text-purple-700">Fields were auto-filled by AI. Please review and adjust as needed.</p>
                  <button type="button" onClick={() => setAiFilledIndex(null)} className="ml-auto text-purple-400 hover:text-purple-600"><X className="h-3.5 w-3.5" /></button>
                </div>
              )}
              <ArtistSchoolSelection artistId={currentArtwork.artist_id} schoolId={currentArtwork.school_id} artworkSubject={currentArtwork.artwork_subject} signaturePlacement={currentArtwork.signature_placement} medium={currentArtwork.medium} periodAge={currentArtwork.period_age} artists={artists} schools={schools} loadingArtistsSchools={loadingArtistsSchools} materialOptions={materialOptions} periodOptions={periodOptions} onFieldChange={handleInputChange} uniqueIdPrefix={`artwork_${activeArtworkIndex}_`} />
              <ArtworkDescriptionSection title={currentArtwork.title} description={currentArtwork.description} artistId={currentArtwork.artist_id} artists={artists} includeArtistDescription={currentArtwork.include_artist_description} includeArtistKeyDescription={currentArtwork.include_artist_key_description} includeArtistBiography={currentArtwork.include_artist_biography} includeArtistNotableWorks={currentArtwork.include_artist_notable_works} includeArtistMajorExhibitions={currentArtwork.include_artist_major_exhibitions} includeArtistAwardsHonors={currentArtwork.include_artist_awards_honors} includeArtistMarketValueRange={currentArtwork.include_artist_market_value_range} includeArtistSignatureStyle={currentArtwork.include_artist_signature_style} conditionReport={currentArtwork.condition_report} onFieldChange={handleInputChange} uniqueIdPrefix={`artwork_${activeArtworkIndex}_`} />
              <CertificationSection galleryCertification={currentArtwork.gallery_certification} galleryCertificationFile={currentArtwork.gallery_certification_file} galleryId={currentArtwork.gallery_id} artistCertification={currentArtwork.artist_certification} artistCertificationFile={currentArtwork.artist_certification_file} certifiedArtistId={currentArtwork.certified_artist_id} artistFamilyCertification={currentArtwork.artist_family_certification} artistFamilyCertificationFile={currentArtwork.artist_family_certification_file} restorationDone={currentArtwork.restoration_done} restorationDoneFile={currentArtwork.restoration_done_file} restorationBy={currentArtwork.restoration_by} onFieldChange={handleInputChange} onCertificationFileUpload={handleCertificationFileUpload} uniqueIdPrefix={`artwork_${activeArtworkIndex}_`} />
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className={`${theme.successBgClass} ${theme.successBorderClass} border rounded-lg p-4`}>
                <h3 className={`text-sm font-medium ${theme.successTextClass} mb-4`}>Pricing Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div><label className={`block text-sm font-medium ${theme.labelClass} mb-2`}>Low Estimate * (£)</label><input type="number" step="0.01" min="0" value={currentArtwork.low_est} onChange={e => handleInputChange('low_est', e.target.value)} className={`w-full px-3 py-2 ${theme.inputClass} ${theme.focusRingClass}`} required /></div>
                  <div><label className={`block text-sm font-medium ${theme.labelClass} mb-2`}>High Estimate * (£)</label><input type="number" step="0.01" min="0" value={currentArtwork.high_est} onChange={e => handleInputChange('high_est', e.target.value)} className={`w-full px-3 py-2 ${theme.inputClass} ${theme.focusRingClass}`} required /></div>
                  <div><label className={`block text-sm font-medium ${theme.labelClass} mb-2`}>Start Price (£) <span className={`text-xs ${theme.textClass} opacity-60`}>(auto-calculated)</span></label><input type="number" step="0.01" min="0" value={currentArtwork.start_price} onChange={e => handleInputChange('start_price', e.target.value)} className={`w-full px-3 py-2 ${theme.inputClass} ${theme.focusRingClass}`} /></div>
                  <div><label className={`block text-sm font-medium ${theme.labelClass} mb-2`}>Reserve Price (£) <span className={`text-xs ${theme.textClass} opacity-60`}>(internal use)</span></label><input type="number" step="0.01" min="0" value={currentArtwork.reserve} onChange={e => handleInputChange('reserve', e.target.value)} className={`w-full px-3 py-2 ${theme.inputClass} ${theme.focusRingClass}`} /></div>
                </div>
              </div>
              <div className={`${theme.infoBgClass} ${theme.infoBorderClass} border rounded-lg p-4`}>
                <h3 className={`text-sm font-medium ${theme.infoTextClass} mb-4`}>Category Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div><label className={`block text-sm font-medium ${theme.labelClass} mb-2`}>Category</label><SearchableSelect value={currentArtwork.category} options={[{ value: '', label: 'Select category...' }, ...categoryOptions]} placeholder="Select category..." onChange={value => handleInputChange('category', value?.toString() || '')} className="w-full" inputPlaceholder="Type to search categories..." /></div>
                  <div><label className={`block text-sm font-medium ${theme.labelClass} mb-2`}>Subcategory</label><input type="text" value={currentArtwork.subcategory} onChange={e => handleInputChange('subcategory', e.target.value)} className={`w-full px-3 py-2 ${theme.inputClass} ${theme.focusRingClass}`} placeholder="e.g., Oil Paintings, Watercolors" /></div>
                  <div><label className={`block text-sm font-medium ${theme.labelClass} mb-2`}>Condition</label><SearchableSelect value={currentArtwork.condition} options={[{ value: '', label: 'Select condition...' }, ...conditionOptions]} placeholder="Select condition..." onChange={value => handleInputChange('condition', value?.toString() || '')} className="w-full" inputPlaceholder="Type to search conditions..." /></div>
                </div>
              </div>
              <DimensionsSection heightInches={currentArtwork.height_inches} widthInches={currentArtwork.width_inches} heightCm={currentArtwork.height_cm} widthCm={currentArtwork.width_cm} heightWithFrameInches={currentArtwork.height_with_frame_inches} widthWithFrameInches={currentArtwork.width_with_frame_inches} heightWithFrameCm={currentArtwork.height_with_frame_cm} widthWithFrameCm={currentArtwork.width_with_frame_cm} weight={currentArtwork.weight} onFieldChange={handleInputChange} />
              <div><label className={`block text-sm font-medium ${theme.labelClass} mb-2`}>Provenance</label><textarea rows={3} value={currentArtwork.provenance} onChange={e => handleInputChange('provenance', e.target.value)} className={`w-full px-3 py-2 ${theme.inputClass} ${theme.focusRingClass}`} placeholder="History and ownership details" /></div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-6">
              <div className={`flex items-center justify-between p-5 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 hover:opacity-90 active:scale-[0.99] ${theme.infoBorderClass} ${theme.infoBgClass}`} onClick={() => setShowBulkUploader(true)}>
                <div className="flex items-center gap-4">
                  <div className={`${theme.accentBgClass} p-3 rounded-xl shrink-0`}><FolderOpen className={`h-7 w-7 ${theme.accentTextClass}`} /></div>
                  <div>
                    <p className={`font-bold text-base ${theme.infoTextClass}`}>Upload Multiple Images</p>
                    <p className={`text-sm ${theme.infoTextClass} opacity-75`}>Select any number of images at once and assign them to any inventory item</p>
                  </div>
                </div>
                <button type="button" onClick={e => { e.stopPropagation(); setShowBulkUploader(true) }} className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm ${theme.primaryButtonClass} transition-all active:scale-95`}>
                  <Upload className="h-4 w-4" />Upload Multiple Images
                </button>
              </div>
              <div className={`text-sm ${theme.textClass} opacity-75`}>Or upload atleast 1 image to proceed</div>
              {/* Image Summary Section */}
<div className={`p-4 rounded-xl border ${theme.borderClass} ${theme.sectionBgClass}`}>
  <h4 className={`text-sm font-semibold ${theme.textClass} mb-3`}>Images Summary</h4>
  <div className="flex flex-wrap gap-3">
    {artworks.map((artwork, idx) => {
      const count = artwork.images.filter(img => img && img.trim()).length
      return (
        <div
          key={idx}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all
            ${activeArtworkIndex === idx
              ? `${theme.primaryBgColor} text-white border-current`
              : count > 0
                ? `${theme.successBgClass} ${theme.successBorderClass} ${theme.successTextClass}`
                : `${theme.cardBgClass} ${theme.borderClass} ${theme.textClass} opacity-60`
            }`}
        >
          <span className="text-sm font-medium">Inventory {idx + 1}</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            activeArtworkIndex === idx
              ? 'bg-white/20 text-white'
              : count > 0
                ? `${theme.successTextClass} bg-white/60`
                : `${theme.textClass} opacity-40 bg-black/10`
          }`}>
            {count} img{count !== 1 ? 's' : ''}
          </span>
        </div>
      )
    })}
  </div>
</div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {Array.from(
    { length: Math.max(1, currentArtwork.images.filter(img => img && img.trim()).length) },
    (_, i) => (
      <ImageUploadField key={`${activeArtworkIndex}_${i}`} label={`Image ${i + 1}`} value={currentArtwork.images[i] || ''} onChange={(url, file) => handleImageChange(i, url, file)} itemId={undefined} imageIndex={i + 1} required={false} />
    )
  )}
</div>
              <div className={`${theme.infoBgClass} ${theme.infoBorderClass} border rounded-lg p-4`}>
                <h4 className={`font-medium ${theme.infoTextClass} mb-2`}>Image Requirements</h4>
                <ul className={`text-sm ${theme.infoTextClass} space-y-1`}>
                  <li>• Supported formats: JPG, PNG, GIF</li><li>• Maximum file size: 10MB per image</li>
                  <li>• Recommended minimum resolution: 800x600 pixels</li>
                  <li>• First image will be used as the primary listing image</li>
                  <li>• Images are automatically stored in secure cloud storage</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'preview' && (
            <div className="space-y-6">
              <div className={`${theme.sectionBgClass} ${theme.borderClass} border rounded-lg p-6`}>
                <h3 className={`text-lg font-medium ${theme.textClass} mb-4`}>Export Preview</h3>
                <p className={`text-sm ${theme.textClass} opacity-75 mb-6`}>This is how your artwork information will appear when exported to auction platforms.</p>
                <div>
                  <h4 className={`text-sm font-medium ${theme.labelClass} mb-2`}>Description Preview:</h4>
                  <div className={`${theme.cardBgClass} ${theme.borderClass} border rounded-md p-4`}>
                    <div className={`${theme.textClass} leading-relaxed`} dangerouslySetInnerHTML={{ __html: previewDescription || 'Enter artwork description...' }} />
                  </div>
                </div>
                <div className={`mt-6 ${theme.infoBgClass} ${theme.infoBorderClass} border rounded-lg p-4`}>
                  <h4 className={`text-sm font-medium ${theme.infoTextClass} mb-2`}>Export Information:</h4>
                  <ul className={`text-sm ${theme.infoTextClass} space-y-1`}>
                    <li>• Description includes selected artist information</li>
                    <li>• Dimensions will be formatted appropriately for each platform</li>
                    {currentArtwork.artist_id && <li>• Artist: {(() => { const a = artists.find(a => a.id?.toString() === currentArtwork.artist_id); return a ? a.name : `ID: ${currentArtwork.artist_id}` })()}</li>}
                    {aiFilledIndex === activeArtworkIndex && <li className="text-purple-700">✦ Fields auto-filled with AI assistance</li>}
                  </ul>
                </div>
                <div className={`mt-4 text-xs ${theme.textClass} opacity-60`}>📝 Preview updates automatically as you edit fields in other tabs.</div>
              </div>
            </div>
          )}
        </form>

        {/* Footer navigation */}
        <div className={`px-8 py-6 ${theme.sectionBgClass} border-t ${theme.borderClass}`}>
          <div className="flex items-center justify-between">
            <button type="button" onClick={goToPrevTab} disabled={isFirstTab}
              className={`flex items-center px-6 py-3 rounded-lg border ${isFirstTab ? `${theme.cardBgClass} ${theme.textClass} opacity-50 ${theme.borderClass} cursor-not-allowed` : theme.secondaryButtonClass}`}>
              <ChevronLeft className="h-5 w-5 mr-2" />Previous
            </button>
            <div className="text-center">
              {!canProceedToNext() && activeTab !== 'preview' && (
                <div className={`${theme.warningBgClass} ${theme.warningBorderClass} border px-4 py-2 rounded-lg`}>
                  <span className={`text-sm font-medium ${theme.warningTextClass}`}>⚠️ Complete required fields to continue</span>
                </div>
              )}
              {canProceedToNext() && activeTab !== 'preview' && (
                <div className={`${theme.successBgClass} ${theme.successBorderClass} border px-4 py-2 rounded-lg`}>
                  <span className={`text-sm font-medium ${theme.successTextClass}`}>✅ Ready to proceed</span>
                </div>
              )}
              {activeTab === 'preview' && !areAllArtworksComplete() && (
                <div className={`${theme.warningBgClass} ${theme.warningBorderClass} border px-4 py-2 rounded-lg`}>
                  <span className={`text-sm font-medium ${theme.warningTextClass}`}>⚠️ Fill all inventory {artworks.length} details before submitting</span>
                </div>
              )}
              {activeTab === 'preview' && areAllArtworksComplete() && (
                <div className={`${theme.successBgClass} ${theme.successBorderClass} border px-4 py-2 rounded-lg`}>
                  <span className={`text-sm font-medium ${theme.successTextClass}`}>✅ All items complete - ready to submit</span>
                </div>
              )}
            </div>
            {activeTab === 'preview' ? (
              <button type="button" onClick={onSubmit} disabled={submitting || !areAllArtworksComplete()} className={`flex items-center px-8 py-3 ${theme.primaryButtonClass} disabled:opacity-50 ${submitting ? 'animate-pulse' : ''}`}>
                <Save className={`h-5 w-5 mr-2 ${submitting ? 'animate-spin' : ''}`} />{submitting ? 'Submitting...' : artworks.length > 1 ? 'Submit All for Review' : 'Submit for Review'}
              </button>
            ) : (
              <button type="button" onClick={goToNextTab} disabled={!canProceedToNext() || isLastTab}
                className={`flex items-center px-6 py-3 rounded-lg ${!canProceedToNext() || isLastTab ? `${theme.cardBgClass} ${theme.textClass} opacity-50 ${theme.borderClass} cursor-not-allowed` : theme.primaryButtonClass}`}>
                Next<ChevronLeft className="h-5 w-5 ml-2 rotate-180" />
              </button>
            )}
          </div>
          <div className="mt-4 text-center">
            <p className={`text-xs ${theme.textClass} opacity-60`}>
              {activeTab === 'client' && 'Step 1: Enter your contact information so we can reach you'}
              {activeTab === 'basic' && 'Step 2: Add basic artwork information and artist details'}
              {activeTab === 'details' && 'Step 3: Set pricing and provide detailed specifications'}
              {activeTab === 'images' && 'Step 4: Upload high-quality photos of your artwork'}
              {activeTab === 'preview' && 'Step 5: Review all information and submit for approval'}
            </p>
          </div>
        </div>
      </div>

      {/* ═══ BULK IMAGE UPLOADER MODAL ═══════════════════════════════════════ */}
      {showBulkUploader && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-6 px-4">
          <div className={`w-full max-w-6xl ${theme.cardBgClass} rounded-2xl shadow-2xl border ${theme.borderClass} flex flex-col`}>
            <div className={`flex items-center justify-between px-6 py-4 border-b ${theme.borderClass} sticky top-0 ${theme.cardBgClass} rounded-t-2xl z-10`}>
              <div className="flex items-center gap-3">
                <div className={`${theme.accentBgClass} p-2 rounded-lg`}><FolderOpen className={`h-5 w-5 ${theme.accentTextClass}`} /></div>
                <div><h2 className={`text-lg font-bold ${theme.textClass}`}>Bulk Image Upload</h2><p className={`text-sm ${theme.textClass} opacity-60`}>Select images, then assign them to inventories</p></div>
              </div>
              <button onClick={closeBulkUploader} className={`p-2 rounded-lg ${theme.errorTextClass} hover:${theme.errorBgClass} transition-colors`}><X className="h-5 w-5" /></button>
            </div>
            <div className={`mx-6 mt-5 p-4 rounded-xl border-2 border-dashed ${theme.infoBorderClass} ${theme.infoBgClass} flex items-center gap-4`}>
              <div className={`${theme.accentBgClass} p-3 rounded-lg shrink-0`}><Upload className={`h-6 w-6 ${theme.accentTextClass}`} /></div>
              <div className="flex-1 min-w-0"><p className={`font-semibold ${theme.infoTextClass}`}>Select images from your device</p><p className={`text-xs ${theme.infoTextClass} opacity-75`}>You can select any number of images</p></div>
              <button type="button" onClick={() => bulkInputRef.current?.click()} className={`shrink-0 px-5 py-2.5 rounded-lg font-semibold text-sm ${theme.primaryButtonClass} transition-all active:scale-95`}>Choose Files</button>
              <input ref={bulkInputRef} type="file" multiple accept="image/*" onChange={handleBulkFileSelect} className="hidden" />
            </div>
            {bulkImages.length > 0 && (
              <div className={`mx-6 mt-3 flex items-center gap-4 text-sm ${theme.textClass}`}>
                <span className={`px-3 py-1 rounded-full ${theme.accentBgClass} ${theme.accentTextClass} font-medium`}>{bulkImages.length} image{bulkImages.length !== 1 ? 's' : ''} loaded</span>
                <span className={`px-3 py-1 rounded-full ${theme.successBgClass} ${theme.successTextClass} font-medium`}>{assignedCount} assigned</span>
                <span className={`px-3 py-1 rounded-full ${theme.warningBgClass} ${theme.warningTextClass} font-medium`}>{bulkImages.length - assignedCount} unassigned</span>
              </div>
            )}
            {selectedCount > 0 && (
              <div className={`mx-6 mt-3 flex items-center gap-3 p-3 rounded-xl border ${theme.successBorderClass} ${theme.successBgClass}`}>
                <span className={`text-sm font-semibold ${theme.successTextClass} shrink-0`}>Assign {selectedCount} selected to:</span>
                <select value={bulkAssignTarget} onChange={e => setBulkAssignTarget(Number(e.target.value))} className={`flex-1 max-w-xs px-3 py-2 rounded-lg border text-sm font-medium ${theme.inputClass} ${theme.borderClass}`}>
                  {artworks.map((artwork, idx) => <option key={idx} value={idx}>Inventory {idx + 1}{artwork.title ? ` — ${artwork.title.substring(0, 30)}` : ''}</option>)}
                </select>
                <button type="button" onClick={applyBulkAssignment} className={`px-4 py-2 rounded-lg text-sm font-semibold ${theme.primaryButtonClass} active:scale-95 transition-all shrink-0`}>Assign</button>
              </div>
            )}
            {bulkAssignError && <div className={`mx-6 mt-2 px-4 py-2 rounded-lg border ${theme.errorBorderClass} ${theme.errorBgClass}`}><p className={`text-sm ${theme.errorTextClass}`}>{bulkAssignError}</p></div>}
            {bulkImages.length > 0 ? (
              <div className="px-6 mt-4 flex-1 overflow-y-auto">
                <div className="flex items-center gap-2 mb-3">
                  <button type="button" onClick={toggleSelectAll} className={`flex items-center gap-2 text-sm font-medium ${theme.textClass} hover:opacity-70 transition-opacity`}>
                    {bulkSelectAll ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}{bulkSelectAll ? 'Deselect All' : 'Select All'}
                  </button>
                  <span className={`text-xs ${theme.textClass} opacity-50`}>· Click thumbnails to select, then use toolbar above to assign</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 pb-4">
                  {bulkImages.map(img => {
                    const isAssigned = img.assignedInventoryIndex !== -1
                    return (
                      <div key={img.id}
                        className={`relative rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-150 group ${img.selected ? 'border-blue-500 shadow-lg shadow-blue-200 scale-[1.02]' : isAssigned ? `${theme.successBorderClass} shadow-sm` : `${theme.borderClass} hover:border-blue-300`}`}
                        onClick={() => toggleBulkImageSelected(img.id)} style={{ aspectRatio: '1' }}>
                        <img src={img.previewUrl} alt={img.file.name} className="w-full h-full object-cover" />
                        <div className={`absolute top-1.5 left-1.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${img.selected ? 'bg-blue-500 border-blue-500' : 'bg-white/80 border-gray-300 group-hover:border-blue-400'}`}>
                          {img.selected && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                        </div>
                        <button 
  type="button" 
  onMouseDown={e => e.stopPropagation()}
  onClick={e => { e.stopPropagation(); e.preventDefault(); removeBulkImage(img.id) }} 
  className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
>
  <X className="w-3 h-3" />
</button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1 py-1" onClick={e => e.stopPropagation()}>
                          <select value={img.assignedInventoryIndex} onChange={e => updateBulkImageInventory(img.id, Number(e.target.value))} className="w-full text-xs text-white bg-transparent border-0 outline-none cursor-pointer truncate" style={{ fontSize: '10px' }}>
                            <option value={-1} className="text-gray-900 bg-white">— Unassigned —</option>
                            {artworks.map((artwork, idx) => <option key={idx} value={idx} className="text-gray-900 bg-white">Inv. {idx + 1}{artwork.title ? ` · ${artwork.title.substring(0, 15)}` : ''}</option>)}
                          </select>
                        </div>
                        {isAssigned && (
                          <div className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-white font-bold bg-green-500 ${img.selected ? 'opacity-0' : 'group-hover:opacity-0'} transition-opacity`} style={{ fontSize: '9px' }}>
                            Inv. {img.assignedInventoryIndex + 1}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className={`mx-6 mt-6 mb-4 flex flex-col items-center justify-center py-16 rounded-xl border-2 border-dashed ${theme.borderClass}`}>
                <FolderOpen className={`h-12 w-12 ${theme.textClass} opacity-20 mb-3`} />
                <p className={`${theme.textClass} opacity-40 text-sm`}>No images selected yet</p>
                <p className={`${theme.textClass} opacity-30 text-xs mt-1`}>Click "Choose Files" above to get started</p>
              </div>
            )}
            <div className={`flex items-center justify-between px-6 py-4 border-t ${theme.borderClass} sticky bottom-0 ${theme.cardBgClass} rounded-b-2xl`}>
              <button type="button" onClick={closeBulkUploader} className={`px-5 py-2.5 rounded-lg border font-medium text-sm ${theme.secondaryButtonClass} transition-all`}>Cancel</button>
              <div className={`text-center text-xs ${theme.textClass} opacity-50`}>
                {bulkImages.length > 0 && <>{assignedCount}/{bulkImages.length} images assigned{assignedCount < bulkImages.length && <span className={`ml-2 ${theme.warningTextClass}`}>· {bulkImages.length - assignedCount} still unassigned</span>}</>}
              </div>
              <button type="button" onClick={confirmBulkAssignments} disabled={bulkImages.length === 0}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all active:scale-95 ${bulkImages.length === 0 ? `${theme.cardBgClass} ${theme.textClass} opacity-40 cursor-not-allowed border ${theme.borderClass}` : theme.primaryButtonClass}`}>
                <Save className="h-4 w-4" />Confirm & Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
