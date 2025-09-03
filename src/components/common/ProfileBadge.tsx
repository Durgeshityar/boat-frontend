/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface ProfileBadgeProps {
  photoUrl?: string | null
  step?: 2 | 3
  size?: number
  showSparkle?: boolean
  fallbackLetter?: string
}

export default function ProfileBadge({
  photoUrl,
  step = 2,
  size = 96,
  showSparkle = true,
  fallbackLetter,
}: ProfileBadgeProps) {
  const validPhoto =
    photoUrl &&
    typeof photoUrl === 'string' &&
    photoUrl.trim() !== '' &&
    !photoUrl.startsWith('blob:null') &&
    !photoUrl.startsWith('undefined')

  const percentage = step === 2 ? 25 : step === 3 ? 50 : 0

  const imageSize = size * 0.75

  return (
    <div
      className="relative"
      style={{
        width: size,
        height: size,
      }}
    >
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={2}
        styles={buildStyles({
          trailColor: '#FFFFFF1A',
          pathColor: '#ffffff',
        })}
      >
        {showSparkle && (
          <div
            className="absolute z-10"
            style={{
              height: size * 0.4,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <img
              src="/sparkle.svg"
              alt="sparkle"
              className="w-full h-full"
              draggable={false}
            />
          </div>
        )}

        <div
          className="overflow-hidden rounded-full flex items-center justify-center bg-black/50"
          style={{
            filter: validPhoto ? 'blur(4px)' : 'none',
          }}
        >
          {validPhoto ? (
            <img
              src={photoUrl}
              alt="profile"
              className="w-full h-full object-cover"
              draggable={false}
              style={{ userSelect: 'none' }}
            />
          ) : (
            <span
              className="text-white uppercase font-bold"
              style={{
                fontSize: imageSize * 0.35,
              }}
            >
              {fallbackLetter?.[0] || '?'}
            </span>
          )}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  )
}
