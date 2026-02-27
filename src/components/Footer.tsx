// frontend/metsab/src/components/Footer.tsx
// Purpose: Footer styled similar to reference with locations, popular pages, newsletter stub (Metsab theme)
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 bg-black/70 text-yellow-300 border-t border-yellow-500/20">
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold mb-3 text-white">Locations & Contact</h4>
          <p className="text-sm">Stansted Auction Rooms<br/>T 01279 817778 | E auctions@metsab.com</p>
          <p className="text-sm mt-3">Hertford<br/>T 01992 583508 | E hertford@metsab.com</p>
          <p className="text-sm mt-3">London<br/>T 0203 971 2500 | E london@metsab.com</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Popular Pages</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/auctions" className="hover:underline">Upcoming Auctions</Link></li>
            <li><Link href="/auctions?status=ended" className="hover:underline">Results</Link></li>
            <li><Link href="#" className="hover:underline">News & Articles</Link></li>
            <li><Link href="#" className="hover:underline">Buying</Link></li>
            <li><Link href="#" className="hover:underline">Selling</Link></li>
            <li><Link href="#" className="hover:underline">Collection & Shipping</Link></li>
            <li><Link href="#" className="hover:underline">FAQs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Connect With Us</h4>
          <div className="flex gap-3 text-yellow-400">
            <span>FB</span><span>IG</span><span>IN</span>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-white">Newsletter</h4>
          <form className="space-y-2">
            <input type="text" placeholder="First name" className="w-full rounded border border-yellow-500/30 px-3 py-2 bg-black/40 text-yellow-200 placeholder-yellow-300/70" />
            <input type="text" placeholder="Surname" className="w-full rounded border border-yellow-500/30 px-3 py-2 bg-black/40 text-yellow-200 placeholder-yellow-300/70" />
            <input type="email" placeholder="Email" className="w-full rounded border border-yellow-500/30 px-3 py-2 bg-black/40 text-yellow-200 placeholder-yellow-300/70" />
            <button type="button" className="px-4 py-2 bg-yellow-500 text-black rounded">Submit</button>
          </form>
        </div>
      </div>
      <div className="border-t border-yellow-500/20 py-4 text-xs text-yellow-300/90">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Metsab. All Rights Reserved.</div>
          <div className="flex gap-3">
            <Link href="#" className="hover:underline">Cookies</Link>
            <Link href="#" className="hover:underline">Terms</Link>
            <Link href="#" className="hover:underline">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


