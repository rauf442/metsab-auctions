// frontend/metsab/src/app/global-error.tsx
// Purpose: Global error boundary for production builds
'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-slate-100 text-slate-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">Something went wrong!</h2>
            <button
              onClick={() => reset()}
              className="px-8 py-4 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

