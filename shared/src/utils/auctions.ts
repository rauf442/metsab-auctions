// frontend/shared/src/utils/auctions.ts
// Purpose: helpers for auctions including external URL selection
import type { Auction } from '../api/auctions-api'

export type AuctionUrl = { platform: string; url: string; key: keyof Auction }

export function getExternalAuctionUrls(auction?: Partial<Auction> | null): AuctionUrl[] {
  if (!auction) return []
  const candidates: AuctionUrl[] = [
    { platform: 'LiveAuctioneers', url: auction.liveauctioneers_url || '', key: 'liveauctioneers_url' as any },
    { platform: 'EasyLive', url: auction.easy_live_url || '', key: 'easy_live_url' as any },
    { platform: 'Invaluable', url: auction.invaluable_url || '', key: 'invaluable_url' as any },
    { platform: 'The Saleroom', url: auction.the_saleroom_url || '', key: 'the_saleroom_url' as any },
  ].filter(i => i.url && i.url.trim() !== '')
  return candidates
}

export function getPrimaryAuctionUrl(auction?: Partial<Auction> | null): string | undefined {
  const urls = getExternalAuctionUrls(auction)
  return urls[0]?.url
}


