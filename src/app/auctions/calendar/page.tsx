'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPublicAuctions, ArtworksAPI } from '@msaber/shared';
import { getGoogleDriveImageUrl, getRandomLocalImage } from '../../../lib/utils';

const AUCTIONS_PER_PAGE = 5;

export default function AuctionsCalendar() {
  const [auctions, setAuctions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Filters
  const [typeFilter, setTypeFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('All');

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const res = await getPublicAuctions({
          limit: 1000,
          sort_field: 'settlement_date',
          sort_direction: 'asc',
        });

        // fetch artwork image for each auction
        const auctionsWithImages = await Promise.all(
          res.auctions.map(async (auction: any) => {
            try {
              const artworksRes = await ArtworksAPI.getArtworks({
                auction_id: String(auction.id),
                limit: 1,
              });

              const firstArtwork = artworksRes.data?.[0];

              return {
                ...auction,
                artworkImage: firstArtwork?.images?.[0] || null,
                artworkTitle: firstArtwork?.title || null,
              };
            } catch {
              return auction;
            }
          })
        );

        if (isMounted) setAuctions(auctionsWithImages);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter auctions
  const filteredAuctions = auctions.filter((auction) => {
    let matchesType = typeFilter === 'All' || auction.type === typeFilter;
    let matchesMonth = true;

    if (monthFilter !== 'All' && auction.settlement_date) {
      const monthName = new Date(auction.settlement_date).toLocaleString('default', {
        month: 'long',
      });
      matchesMonth = monthName === monthFilter;
    }

    return matchesType && matchesMonth;
  });

  const totalPages = Math.ceil(filteredAuctions.length / AUCTIONS_PER_PAGE);
  const paginatedAuctions = filteredAuctions.slice(
    (currentPage - 1) * AUCTIONS_PER_PAGE,
    currentPage * AUCTIONS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Generate unique types and months for filters
  const auctionTypes = Array.from(new Set(auctions.map((a) => a.type).filter(Boolean)));
  const auctionMonths = Array.from(
    new Set(
      auctions
        .map((a) => a.settlement_date && new Date(a.settlement_date).toLocaleString('default', { month: 'long' }))
        .filter(Boolean)
    )
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading auctions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <h1 className="text-4xl font-bold text-black mb-5">Auction Calendar</h1>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-4 mb-6">
          {/* Type filter */}
          <select
            className="border rounded-md px-4 py-2"
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Types</option>
            {auctionTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          {/* Month filter */}
          <select
            className="border rounded-md px-4 py-2"
            value={monthFilter}
            onChange={(e) => {
              setMonthFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">All Months</option>
            {auctionMonths.map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </div>

        {paginatedAuctions.length === 0 ? (
          <div className="text-center py-16">
            <p>No auctions found.</p>
          </div>
        ) : (
          <div className="space-y-6 w-full">
            {paginatedAuctions.map((auction) => {
              const auctionLink =
                auction.liveauctioneers_url?.trim() ||
                auction.easy_live_url?.trim() ||
                auction.invaluable_url?.trim() ||
                auction.the_saleroom_url?.trim() ||
                null;

              return (
                <Link
                  key={auction.id}
                  href={`/auctions/${auction.id}`}
                  className="flex items-start justify-between py-6 px-2"
                >
                  <div className="flex-1 pr-6">
                    <h3 className="font-light text-black mb-2" style={{ fontSize: '30px' }}>
                      {auction.long_name || auction.short_name}
                    </h3>
                    <div className="text-sm text-neutral-600">
                      {auction.catalogue_launch_date && (
                        <div>
                          Start-Date:{' '}
                          {new Date(auction.catalogue_launch_date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                      )}
                      {auction.settlement_date && (
                        <div>
                          End-Date:{' '}
                          {new Date(auction.settlement_date).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                      )}
                      {auction.description && (
                        <div className="mt-2">
                          Description:
                          <p>{auction.description}</p>
                        </div>
                      )}
                    </div>

                    {auctionLink && (
                      <a
                        href={auctionLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 px-6 py-2 border-2 border-black bg-black text-white hover:bg-white hover:text-black font-semibold rounded-md transition-colors duration-200"
                      >
                        View Auction
                      </a>
                    )}
                  </div>

                  {/* RIGHT SIDE - IMAGE */}
                  <div
                    className="flex-shrink-0 overflow-hidden rounded-md bg-neutral-100"
                    style={{ width: '267px', height: '396px' }}
                  >
                    {auction.artworkImage ? (
                      <img
                        src={getGoogleDriveImageUrl(auction.artworkImage)}
                        alt={auction.artworkTitle || auction.long_name || auction.short_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          if (!target.dataset.fallback) {
                            target.src = getRandomLocalImage();
                            target.dataset.fallback = 'true';
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl opacity-40">
                        🏛️
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-6">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-md bg-white hover:bg-black hover:text-white transition"
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`px-4 py-2 border rounded-md transition ${
                      currentPage === i + 1
                        ? 'bg-black text-white'
                        : 'bg-white hover:bg-black hover:text-white'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-md bg-white hover:bg-black hover:text-white transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <main className="container mx-auto px-4 py-12 max-w-7xl">
//         <div className="flex gap-4 row-reverse">
//           <div className="auctions w-full">
//             <h1 className="text-4xl font-bold text-black mb-5">
//               Auction Calendar
//             </h1>
//             {auctions.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="text-5xl mb-4">📅</div>
//                 <p>No auctions found.</p>
//               </div>
//             ) : (
//               <div className="space-y-6 w-full">
//                 {auctions.map((auction) => (
//                   <Link
//                     key={auction.id}
//                     href={`/auctions/${auction.id}`}
//                     className="flex items-start justify-between py-6 px-2"
//                   >
//                     {/* LEFT SIDE - TEXT */}
//                     <div className="flex-1 pr-6">
//                       <h3 className="font-light text-black mb-2" style={{ fontSize: '30px' }}>
//                         {auction.long_name || auction.short_name}
//                       </h3>
//                       {auction.settlement_date && (
//                         <div className="text-sm text-neutral-600">
//                           End-Date:{" "}
//                           {new Date(auction.settlement_date).toLocaleDateString(undefined, {
//                             year: "numeric",
//                             month: "long",
//                             day: "numeric",
//                           })}
//                         </div>
//                       )}
//                     </div>

//                     {/* RIGHT SIDE - IMAGE */}
//                     <div
//                       className="flex-shrink-0 overflow-hidden rounded-md bg-neutral-100"
//                       style={{ width: '267px', height: '396px' }}
//                     >
//                       {auction.artworkImage ? (
//                         <img
//                           src={auction.artworkImage}
//                           alt={auction.long_name || auction.short_name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center text-3xl opacity-40">
//                           🏛️
//                         </div>
//                       )}
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </div>
//           <div className="blogs"></div>
//         </div>
//       </main>
//     </div>
//   );
// }
