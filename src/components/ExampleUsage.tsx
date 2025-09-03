'use client'

import ValourWatchSection from './ValourWatchSection'

export default function ExampleUsage() {
  return (
    <div className="min-h-screen bg-[#020D11] p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-3xl font-light mb-8 text-center">
          Valour Watch Section Example
        </h1>

        {/* The new component */}
        <ValourWatchSection />

        <div className="mt-8 text-center">
          <p className="text-white/70 text-sm">
            This component recreates the exact design from your reference image
          </p>
        </div>
      </div>
    </div>
  )
}
