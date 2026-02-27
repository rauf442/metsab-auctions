// Core shared exports for MSaber frontend applications

// API functions
export {
  fetchClients,
  createClient as createClientRecord,
  updateClient,
  deleteClient,
  searchClients
} from './api/clients-api';

export { getPublicAuctions, getPublicBrandByCode } from './api/auctions-api';
export type { Auction, PublicAuctionsResponse, BrandInfo } from './api/auctions-api';

export { ArtworksAPI, ITEM_CATEGORIES, ITEM_PERIODS, ITEM_MATERIALS, ITEM_CONDITIONS, generateStartPrice } from './api/items-api';
export type { Artwork, ArtworksResponse, ArtworkResponse } from './api/items-api';

export { InvoicesAPI, getInvoicesForRefund } from './api/invoices-api';
export type { InvoicesResponse, InvoiceResponse } from './api/invoices-api';

export { ArtistsAPI } from './api/artists-api';
export type { Artist, ArtistsResponse, ArtistResponse, ArtistsFilters } from './api/artists-api';
export type { AIGenerateRequest as ArtistsAIGenerateRequest, AIGenerateResponse as ArtistsAIGenerateResponse } from './api/artists-api';

export { SchoolsAPI } from './api/schools-api';
export type { School, SchoolsResponse, SchoolResponse, SchoolsFilters } from './api/schools-api';
export type { AIGenerateRequest as SchoolsAIGenerateRequest, AIGenerateResponse as SchoolsAIGenerateResponse } from './api/schools-api';

export { getApiBaseUrl, getAuthHeaders, downloadAndParseGoogleSheet, syncClientsFromGoogleSheet, loadBrandGoogleSheetUrl, saveBrandGoogleSheetUrl, syncArtworksFromGoogleSheet, syncArtworksToGoogleSheet, autoSyncArtworkToGoogleSheet } from './api/google-sheets-api';

// Basic types
export type {
  User,
  ApiResponse,
  PaginatedResponse
} from './types/api';
export * from './types/invoice';

// Utilities
export { cn } from './utils/utils';

// Theme provider and theming
export { aurumTheme, metsabTheme } from './lib/theme';
export type { AppTheme } from './lib/theme';

// Shared site components
export * from './components/site';
export { default as NewsSection } from './components/site/NewsSection';

// Article components
export { default as ArticleDetail } from './components/articles/ArticleDetail';
export { default as ArticlesList } from './components/articles/ArticlesList';
export type { Article } from './components/articles/ArticleDetail';

// Legal components and utilities
export * from './components/legal';
export * from './utils/legal-placeholder';
export * from './utils/brand-themes';
export * from './types/legal';
export * from './data/legal-content';

// Info pages
export { default as BuyingPage } from './components/info/BuyingPage';
export { default as AboutPage } from './components/info/AboutPage';
export { default as CareersPage } from './components/info/CareersPage';
export { default as CollectionShippingPage } from './components/info/CollectionShippingPage';
export { default as CoreValuesPage } from './components/info/CoreValuesPage';
export { default as FaqPage } from './components/info/FaqPage';
export { getDefaultFaq } from './data/faq';

// Auction utils
export * from './utils/auctions';

// UI components
export { default as SearchableSelect } from './components/ui/SearchableSelect';
export type { SearchableOption } from './components/ui/SearchableSelect';
export { default as MediaRenderer } from './components/ui/MediaRenderer';
export { PrimaryButton } from './components/ui/PrimaryButton';
export type { PrimaryButtonProps } from './components/ui/PrimaryButton';
export { default as UpcomingAuctions } from './components/auctions/UpcomingAuctions';
export { default as ContactForm } from './components/forms/ContactForm';

// Inventory form shared components
export { default as PublicInventoryForm } from './components/inventory/PublicInventoryForm';
export { default as ImageUploadField } from './components/items/ImageUploadField';
export { default as ClientInfoSection } from './components/items/common/ClientInfoSection';
export { default as ArtistSchoolSelection } from './components/items/common/ArtistSchoolSelection';
export { default as ArtworkDescriptionSection } from './components/items/common/ArtworkDescriptionSection';
export { default as CertificationSection } from './components/items/common/CertificationSection';
export { default as DimensionsSection } from './components/items/common/DimensionsSection';

// Invoices
export { default as PublicShippingDialog } from './components/invoices/PublicShippingDialog';
export { default as PublicInvoicePage } from './components/invoice/PublicInvoicePage';

// Public Invoice API
export { PublicInvoiceAPI } from './api/public-invoice-api';
export type { VerifyInvoiceAccessResponse } from './api/public-invoice-api';

