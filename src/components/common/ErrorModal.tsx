'use client'

import { AlertTriangle, X } from 'lucide-react'
import { useEffect } from 'react'

interface ErrorModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message: string
  onTryAgain?: () => void
  onBackToHome?: () => void
  showTryAgain?: boolean
  showBackToHome?: boolean
}

export default function ErrorModal({
  isOpen,
  onClose,
  title = 'Something went wrong',
  message,
  onTryAgain,
  onBackToHome,
  showTryAgain = true,
  showBackToHome = true,
}: ErrorModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleTryAgain = () => {
    onClose()
    onTryAgain?.()
  }

  const handleBackToHome = () => {
    onClose()
    onBackToHome?.()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-[#020D11] border border-[#FFFFFF1A] rounded-3xl p-6 shadow-xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/60 hover:text-white transition-colors rounded-full hover:bg-white/10"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal content */}
        <div className="flex flex-col items-center">
          {/* Error Icon */}
          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>

          {/* Title */}
          <h2 className="text-xl font-light text-white mb-3 text-center">
            {title}
          </h2>

          {/* Message */}
          <p className="text-white/80 text-sm text-center mb-6 leading-relaxed">
            {message}
          </p>

          {/* Action buttons */}
          <div className="w-full space-y-3">
            {showTryAgain && onTryAgain && (
              <button
                onClick={handleTryAgain}
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#FFE999] to-[#8ED0F3] text-black font-medium text-sm flex items-center justify-center gap-3 hover:opacity-90 transition-all duration-200 shadow-lg"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M1 4v6h6" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
                Try Again
              </button>
            )}

            {showBackToHome && onBackToHome && (
              <button
                onClick={handleBackToHome}
                className="w-full h-12 rounded-full bg-[#FFFFFF0D] border border-[#FFFFFF1A] text-white font-medium text-sm flex items-center justify-center gap-3 hover:bg-[#FFFFFF1A] transition-all duration-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9,22 9,12 15,12 15,22" />
                </svg>
                Back to Home
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
