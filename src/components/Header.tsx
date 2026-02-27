// frontend/metsab/src/components/Header.tsx
// Purpose: Sticky top navigation bar themed for Metsab brand
import Link from 'next/link';
import Image from 'next/image';
import metsabLogo from '../../assets/brand_logo_metsab.png';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-black/60 bg-black/80 border-b border-yellow-500/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image src={metsabLogo} alt="Metsab" width={120} height={32} className="h-8 w-auto object-contain" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-yellow-300">
          <Link href="/auctions" className="hover:text-yellow-400">Auctions</Link>
          <Link href="#" className="hover:text-yellow-400">Departments</Link>
          <Link href="#" className="hover:text-yellow-400">Services</Link>
          <Link href="#" className="hover:text-yellow-400">Discover</Link>
          <Link href="#" className="hover:text-yellow-400">About</Link>
          <Link href="#" className="hover:text-yellow-400">My Account</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link aria-label="Search" href="/auctions" className="p-2 rounded hover:bg-yellow-500/10 text-yellow-300" title="Search">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
              <path fillRule="evenodd" d="M10.5 3a7.5 7.5 0 015.905 12.134l3.23 3.231a1 1 0 01-1.414 1.414l-3.23-3.23A7.5 7.5 0 1110.5 3zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}


