// frontend/metsab/src/app/not-found.tsx
// Purpose: Custom 404 page for Metsab with light theme

import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100 text-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-slate-900">404</h1>
        <p className="text-slate-600 text-xl mb-8">Page not found</p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
