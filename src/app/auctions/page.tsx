// frontend/metsab/src/app/auctions/page.tsx
// Purpose: Metsab Auctions listing with filters using public API, matching light theme with black accents
import Link from 'next/link';
import Image from 'next/image';
import { getPublicAuctions, type Auction } from '@msaber/shared';

export const dynamic = 'force-dynamic';

function formatDate(d?: string) {
  if (!d) return '';
  const dt = new Date(d);
  return dt.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'planned': return 'Upcoming';
    case 'in_progress': return 'Live Now';
    case 'ended': return 'Completed';
    default: return status;
  }
}

export default async function AuctionsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const sp = await searchParams;
  const status = (sp.status as string) || 'planned';
  const type = (sp.type as string) || 'all';
  const search = (sp.search as string) || '';
  const page = Number(sp.page || 1);

  let auctions: Auction[] = [];
  let pagination = { page, limit: 24, total: 0, pages: 1 };
  let error: string | null = null;

  try {
    const res = await getPublicAuctions({ status, type, search, page, limit: 24, sort_field: 'settlement_date', sort_direction: 'asc' });
    auctions = res.auctions;
    pagination = res.pagination;
  } catch (err) {
    error = 'Failed to load auctions. Please try again later.';
    console.error('Error fetching auctions:', err);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <main className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4">Auctions</h1>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Discover exceptional collectibles and rare treasures in our prestigious auctions
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { key: 'planned', label: 'Upcoming' },
            { key: 'in_progress', label: 'Live Now' },
            { key: 'ended', label: 'Completed' }
          ].map(({ key, label }) => (
            <Link
              key={key}
              href={`/auctions?status=${key}`}
              className={`px-6 py-3 rounded-lg border-2 font-medium transition-all duration-200 ${
                status === key
                  ? 'bg-black text-white border-black shadow-lg'
                  : 'bg-white text-black border-neutral-300 hover:border-black hover:bg-neutral-50'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Auctions Grid */}
        {!error && (
          <>
            {auctions.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🏛️</div>
                <h3 className="text-xl font-semibold text-black mb-2">No auctions found</h3>
                <p className="text-neutral-500">Check back later for upcoming auctions</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {auctions.map((auction: Auction) => (
                    <Link
                      key={auction.id}
                      href={`/auctions/${auction.id}`}
                      className="group block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 hover:border-black overflow-hidden"
                    >
                      {/* Image Placeholder */}
                      <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden">
                        {auction.title_image_url ? (
                          <Image
                            src={auction.title_image_url}
                            alt={auction.long_name || auction.short_name}
                            fill
                            style={{objectFit: 'cover'}}
                            className="group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-4xl opacity-30">🏛️</div>
                          </div>
                        )}
                        {/* Status Badge */}
                        <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 text-black text-xs font-medium rounded shadow">
                          {getStatusLabel(auction.status || 'planned')}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="text-sm text-neutral-600 uppercase tracking-wide mb-2">
                          {auction.type?.toUpperCase?.()} AUCTION
                        </div>
                        <h3 className="text-xl font-bold text-black group-hover:text-neutral-700 transition-colors line-clamp-2 mb-3">
                          {auction.long_name || auction.short_name}
                        </h3>
                        <div className="flex items-center justify-between text-sm">
                          <div className="text-neutral-700">
                            <div className="font-medium">{formatDate(auction.settlement_date)}</div>
                            {auction.settlement_date && (
                              <div className="text-neutral-500 text-xs">
                                Settlement Date
                              </div>
                            )}
                          </div>
                          {auction.total_estimate_low && auction.total_estimate_high && (
                            <div className="text-right">
                              <div className="text-black font-medium">
                                £{auction.total_estimate_low.toLocaleString()} - £{auction.total_estimate_high.toLocaleString()}
                              </div>
                              <div className="text-neutral-500 text-xs">Estimated Value</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
                      <Link
                        key={p}
                        href={`/auctions?status=${status}&page=${p}`}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${
                          p === pagination.page
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-black border-neutral-300 hover:border-black hover:bg-neutral-50'
                        }`}
                      >
                        {p}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}


