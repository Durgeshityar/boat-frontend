/* eslint-disable @next/next/no-img-element */
import React from 'react'

interface UserImageCardProps {
  userPhotoUrl: string
  step: 2 | 3 | 4
  progress?: number
}

export default function UserImageCard({
  userPhotoUrl,
  step,
  progress,
}: UserImageCardProps) {
  let displayProgress: number

  if (step === 2) {
    displayProgress = 25
  } else if (step === 3) {
    displayProgress = 50
  } else if (step === 4) {
    displayProgress = progress !== undefined ? progress : 0
  } else {
    displayProgress = 0
  }

  return (
    <div
      className="relative mx-auto overflow-hidden rounded-2xl mt-6"
      style={{
        width: 'var(--user-image-card-width, 400px)',
        height: '550px',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        boxShadow:
          '-11px -17px 58.3px 20px #6A6856, 8px 20px 72.3px 20px rgba(166, 217, 245, 0.4)',
      }}
    >
      <img
        src={userPhotoUrl}
        alt="User Photo"
        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        style={{
          zIndex: 1,
          filter: 'blur(10px)',
        }}
      />
      <img
        src="/rectangle-bg-1.svg"
        alt="Background 1"
        className="absolute top-0 right-0 rounded-tr-[20px] pointer-events-none"
        style={{ width: '100%', zIndex: 10, borderRadius: '0 20px 0 0' }}
      />
      <img
        src="/rectangle-bg-2.svg"
        alt="Background 2"
        className="absolute bottom-0 left-0 pointer-events-none"
        style={{ width: '100%', zIndex: 10, borderRadius: '0px 0px 0px 20px' }}
      />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center z-20 h-full p-4">
        {/* Sparkle icon */}
        <img
          src="/sparkle.svg"
          alt="Sparkle"
          className="absolute"
          style={{
            width: '48px',
            height: '64px',
            zIndex: 30,
          }}
        />

        <div
          className="absolute bottom-[37px] flex flex-col items-start rounded-3xl"
          style={{
            width: '294px',
            height: '4px',
            left: 'calc(50% - 294px/2)',
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <div
            className="h-full bg-white rounded-3xl"
            style={{
              width: `${displayProgress}%`,
              transition: 'width 0.5s ease-in-out',
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}
