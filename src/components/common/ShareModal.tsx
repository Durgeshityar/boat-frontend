/* eslint-disable @next/next/no-img-element */
'use client'

import { X } from 'lucide-react'
import { useEffect } from 'react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
}

export default function ShareModal({
  isOpen,
  onClose,
  imageUrl,
}: ShareModalProps) {
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

  // Helper function to convert image to blob using canvas
  const imageToBlob = async (imgSrc: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('Could not get canvas context'))
          return
        }

        canvas.width = img.naturalWidth
        canvas.height = img.naturalHeight
        ctx.drawImage(img, 0, 0)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob)
            } else {
              reject(new Error('Could not convert to blob'))
            }
          },
          'image/jpeg',
          0.9
        )
      }
      img.onerror = () => reject(new Error('Could not load image'))
      img.src = imgSrc
    })
  }

  // Prefer server proxy to bypass CORS, fallback to canvas conversion
  const getImageBlob = async (url: string): Promise<Blob> => {
    try {
      const proxy = `/api/download-image?url=${encodeURIComponent(url)}`
      const res = await fetch(proxy)
      if (res.ok) {
        return await res.blob()
      }
    } catch {
      // ignore proxy failure and fallback
    }
    // fallback to canvas
    return imageToBlob(url)
  }

  const handleInstagramShare = async () => {
    try {
      console.log('Instagram share: Starting...')
      const blob = await getImageBlob(imageUrl)
      const file = new File([blob], 'valour-transformation.jpg', {
        type: 'image/jpeg',
      })
      console.log('Instagram share: File created', file)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const n = navigator as any
      if (
        typeof n.share === 'function' &&
        typeof n.canShare === 'function' &&
        n.canShare({ files: [file] })
      ) {
        console.log('Instagram share: Using Web Share API')
        await n.share({
          files: [file],
          title: 'My Valour Transformation',
          text: 'Check out my transformation 💪! #valour_transformation',
        })
        console.log('Instagram share: Web Share API completed')
        return
      }

      // Fallback: copy hashtag and open Instagram
      await navigator.clipboard.writeText(
        'Check out my transformation 💪! #valour_transformation'
      )
      window.open('https://www.instagram.com/', '_blank')
    } catch (error) {
      console.log('Instagram share: Error occurred', error)
      await navigator.clipboard.writeText(
        'Check out my transformation 💪! #valour_transformation'
      )
      window.open('https://www.instagram.com/', '_blank')
    }
  }

  // Share to WhatsApp
  const handleWhatsappShare = async () => {
    try {
      console.log('WhatsApp share: Starting...')
      const blob = await getImageBlob(imageUrl)
      const file = new File([blob], 'valour-transformation.jpg', {
        type: blob.type || 'image/jpeg',
      })
      console.log('WhatsApp share: File created', file)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const n = navigator as any
      console.log(
        'WhatsApp share: navigator.share exists?',
        typeof n.share === 'function'
      )
      console.log(
        'WhatsApp share: navigator.canShare exists?',
        typeof n.canShare === 'function'
      )

      if (
        typeof n.share === 'function' &&
        typeof n.canShare === 'function' &&
        n.canShare({ files: [file] })
      ) {
        console.log('WhatsApp share: Using Web Share API')
        await n.share({
          files: [file],
          title: 'My Valour Transformation',
          text: 'Check out my transformation 💪! #valour_transformation',
        })
        console.log('WhatsApp share: Web Share API completed')
        return
      } else {
        console.log(
          'WhatsApp share: Web Share API not supported, canShare result:',
          typeof n.canShare === 'function'
            ? n.canShare({ files: [file] })
            : 'canShare not available'
        )
      }

      console.log('WhatsApp share: Falling back to URL method')
      // Fallback to WhatsApp link with text + image url
      const text = encodeURIComponent(
        'Check out my transformation 💪! #valour_transformation\n\n'
      )
      const url = encodeURIComponent(imageUrl)
      window.open(
        `https://api.whatsapp.com/send?text=${text}${url}`,
        '_blank',
        'noopener,noreferrer'
      )
    } catch (error) {
      console.log('WhatsApp share: Error occurred', error)
      const text = encodeURIComponent(
        'Check out my transformation 💪! #valour_transformation\n\n'
      )
      const url = encodeURIComponent(imageUrl)
      window.open(
        `https://api.whatsapp.com/send?text=${text}${url}`,
        '_blank',
        'noopener,noreferrer'
      )
    }
  }

  // Share to X (formerly Twitter)
  const handleXShare = async () => {
    try {
      console.log('X share: Starting...')
      const blob = await getImageBlob(imageUrl)
      const file = new File([blob], 'valour-transformation.jpg', {
        type: 'image/jpeg',
      })
      console.log('X share: File created', file)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const n = navigator as any
      if (
        typeof n.share === 'function' &&
        typeof n.canShare === 'function' &&
        n.canShare({ files: [file] })
      ) {
        console.log('X share: Using Web Share API')
        await n.share({
          files: [file],
          title: 'My Valour Transformation',
          text: 'Check out my transformation 💪! #valour_transformation',
        })
        console.log('X share: Web Share API completed')
        return
      }

      console.log('X share: Falling back to URL method')
      const text = encodeURIComponent(
        'Check out my transformation 💪! #valour_transformation\n\n'
      )
      const url = encodeURIComponent(imageUrl)
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        '_blank',
        'noopener,noreferrer,width=600,height=400'
      )
    } catch (error) {
      console.log('X share: Error occurred', error)
      const text = encodeURIComponent(
        'Check out my transformation 💪! #valour_transformation\n\n'
      )
      const url = encodeURIComponent(imageUrl)
      window.open(
        `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
        '_blank',
        'noopener,noreferrer,width=600,height=400'
      )
    }
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
          <h2 className="text-xl font-light text-white mb-6 text-center">
            Share Your Transformation
          </h2>

          {/* Image */}
          <div className="w-48 h-48 rounded-full overflow-hidden border border-[#FFFFFF80] shadow-lg mb-6">
            <img
              src={imageUrl}
              alt="Your transformation"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Hashtag */}
          <div
            className="w-full max-w-[220px] h-10 p-[1px] rounded-full mx-auto mb-6"
            style={{
              background:
                'linear-gradient(90deg, rgba(255, 233, 153, 0.7) 0%, rgba(142, 208, 243, 0.7) 100%)',
            }}
          >
            <div
              className="flex items-center justify-center h-full w-full rounded-full"
              style={{
                background: '#141e22',
              }}
            >
              <div
                className="flex items-center justify-center h-full w-full rounded-full px-4 py-1"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,233,153,0.1), rgba(142,208,243,0.1))',
                }}
              >
                <span className="font-normal text-sm bg-gradient-to-r from-[#FFE999] to-[#8ED0F3] text-transparent bg-clip-text">
                  #valour_transformation
                </span>
              </div>
            </div>
          </div>

          {/* Share buttons */}
          <div className="w-full space-y-3">
            {/* Instagram Share */}
            <button
              onClick={handleInstagramShare}
              className="w-full h-12 rounded-full bg-gradient-to-r from-[#E4405F] to-[#F56040] text-white font-medium text-sm flex items-center justify-center gap-3 hover:from-[#E85A73] hover:to-[#F7724A] transition-all duration-200 shadow-lg"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Share on Instagram
            </button>

            {/* WhatsApp Share */}
            <button
              onClick={handleWhatsappShare}
              className="w-full h-12 rounded-full bg-[#25D366] text-white font-medium text-sm flex items-center justify-center gap-3 hover:bg-[#1EBE5D] transition-all duration-200 shadow-lg"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12.04 2.003c5.514 0 9.962 4.446 9.962 9.96 0 5.519-4.448 9.997-9.962 9.997a9.952 9.952 0 0 1-5.087-1.387l-5.221 1.36 1.393-5.098a9.954 9.954 0 0 1-1.4-5.192c0-5.514 4.448-9.96 9.963-9.96Zm0-2.003A11.965 11.965 0 0 0 .07 11.963a11.9 11.9 0 0 0 1.701 6.129L0 24l6.045-1.593a11.943 11.943 0 0 0 6 1.6c6.627 0 12-5.372 12-12.003A11.966 11.966 0 0 0 12.04.001Zm5.91 17.33c-.246.695-1.39 1.281-1.918 1.363-.492.074-1.105.104-1.776-.11-.41-.128-.937-.304-1.612-.596-2.837-1.168-4.687-4.052-4.831-4.243-.14-.192-1.153-1.534-1.153-2.932 0-1.398.735-2.082.996-2.366.257-.282.568-.354.758-.354.19 0 .379.003.546.01.175.007.41-.066.64.49.245.6.833 2.071.905 2.219.07.149.116.33.022.522-.093.192-.14.31-.274.475-.132.166-.28.37-.401.497-.132.136-.268.285-.115.557.153.272.68 1.118 1.461 1.809 1.004.898 1.852 1.186 2.124 1.32.273.136.432.115.594-.07.162-.186.686-.8.87-1.076.182-.276.36-.23.605-.14.245.093 1.553.73 1.823.862.272.132.455.196.522.308.066.112.066.646-.18 1.34Z" />
              </svg>
              Share on WhatsApp
            </button>

            {/* X (Twitter) Share */}
            <button
              onClick={handleXShare}
              className="w-full h-12 rounded-full border bg-black text-white font-medium text-sm flex items-center justify-center gap-3 hover:bg-[#1A1A1A] transition-all duration-200 shadow-lg"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.162 0 14.7 8.063 23.414 24h-5.298L11.96 14.777 4.977 24H.001l8.02-9.595L0 0h5.518l7.008 8.707L19.45 0h2.712Z" />
              </svg>
              Share on X
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
