/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useRef } from 'react'
import CtaButton from '@/components/common/CtaButton'
import Header from './common/Header'
import Footer from './common/Footer'
import Stepper from './common/Stepper'
import { useHealthStore } from '@/store/useHealthStore'

import { LuCamera, LuX } from 'react-icons/lu'

export default function Step1() {
  const [dragOver, setDragOver] = useState(false)
  const [photoData, setPhotoData] = useState<string | null>(null)
  const [showValidation, setShowValidation] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { inputs, setInput, nextStep, setProcessingImageUrl } = useHealthStore()
  const userName = inputs.name

  const handleFileUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setPhotoData(e.target.result as string)
        setInput('imageFile', file)
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setProcessingImageUrl(e.target.result as string)
          }
        }
        reader.readAsDataURL(file)
        setShowValidation(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    handleFileUpload(file)
  }

  const handleCameraCapture = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
      setStream(mediaStream)
      setShowCamera(true)

      // Wait for video to be ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      }, 100)
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Camera access denied or not available')
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        context.drawImage(video, 0, 0)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const file = new File([blob], 'camera-capture.jpg', {
                type: 'image/jpeg',
              })
              handleFileUpload(file)
              closeCameraHandler()
            }
          },
          'image/jpeg',
          0.8
        )
      }
    }
  }

  const closeCameraHandler = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setShowCamera(false)
  }

  const handleNextClick = () => {
    if (!photoData) {
      setShowValidation(true)
    } else {
      nextStep()
      setShowValidation(false)
    }
  }

  const handleStartOver = () => {
    window.location.reload()
  }

  if (showCamera) {
    return (
      <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <div className="bg-black rounded-2xl overflow-hidden w-full max-w-md mx-auto md:max-w-2xl flex flex-col max-h-[90vh]">
          <div className="flex justify-between items-center p-4 bg-black">
            <h3 className="text-white text-lg font-medium">Take Photo</h3>
            <button
              onClick={closeCameraHandler}
              className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <LuX size={24} />
            </button>
          </div>

          <div className="relative aspect-[4/3] bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="p-6 flex justify-center bg-black">
            <button
              onClick={capturePhoto}
              className="w-16 h-16 bg-white rounded-full border-4 border-gray-300 hover:border-gray-400 transition-colors flex items-center justify-center"
            >
              <div className="w-12 h-12 bg-white rounded-full" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-0 bg-[#020D11]" />
      <div
        className="absolute inset-0 z-10 pointer-events-none [background-size:20px_20px]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(212,212,212,0.08) 1px, transparent 1px)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-20 bg-white/0 dark:bg-black/0"
        style={{
          maskImage:
            'radial-gradient(ellipse at center, transparent 20%, black)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, transparent 20%, black)',
        }}
      />
      <img
        src="/step1-bg-1.svg"
        alt=""
        aria-hidden="true"
        className="absolute left-0 pointer-events-none select-none w-[100vw] md:hidden"
        style={{ top: '50px' }}
      />
      <img
        src="/step1-bg-2.svg"
        alt=""
        aria-hidden="true"
        className="absolute left-0 pointer-events-none select-none w-[100vw] md:hidden"
        style={{ top: '350px', left: '0' }}
      />

      <div className="relative z-30 flex flex-col min-h-screen">
        <Header
          centerElement={<Stepper currentStep={1} />}
          ctaButton={
            <CtaButton
              onClick={handleStartOver}
              style={{
                width: '160px',
                height: '48px',
              }}
            >
              Start Over
            </CtaButton>
          }
        />

        <div className="flex-1 flex flex-col items-center justify-start px-4 max-w-md mx-auto w-full md:hidden">
          <Stepper currentStep={1} />
          <div className="mb-8">
            <h2 className="text-2xl font-light text-white mb-3 text-left">
              Let&#39;s Get to Know You, {userName}
            </h2>
            <p className="text-white/60 text-base font-light text-left">
              A few quick questions to set the foundation. Just you and your
              daily rhythms.
            </p>
          </div>
          <div
            className="w-full h-px"
            style={{ backgroundColor: '#FFFFFF33' }}
            aria-hidden="true"
          />
          <div
            className="my-8 w-full max-w-md mx-auto bg-[#020D11B2] border border-white/8 rounded-3xl flex flex-col items-center p-6"
            style={{ backdropFilter: 'blur(60px)' }}
          >
            <h3 className="text-lg font-normal text-[#F4F4F5] text-left mb-2">
              Ready for the Glow-Up?
            </h3>
            <p className="text-[#67787F] text-left text-sm font-light mb-7">
              We&#39;ll generate a visual transformation based on your current
              inputs.
            </p>

            {/*Upload zone */}
            <div
              className={`border border-dashed rounded-2xl w-full p-7 text-center mb-2 transition-colors ${
                dragOver ? 'border-yellow-400' : 'border-[#FFFFFF33]'
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                backdropFilter: 'blur(27px)',
                borderColor: showValidation ? '#FFE99980' : undefined,
              }}
            >
              <div className="flex flex-col items-center">
                {photoData ? (
                  <div className="w-20 h-20 bg-[#F5F5F51A] rounded-3xl flex items-center justify-center overflow-hidden">
                    <img
                      src={photoData}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-xl z-30"
                    />
                  </div>
                ) : (
                  <>
                    <div
                      className="w-20 h-20 bg-[#FFFFFF0D] rounded-3xl flex items-center justify-center mb-4"
                      style={{ backdropFilter: 'blur(27px)' }}
                    >
                      <img
                        src="/upload-cloud.svg"
                        alt="Upload icon"
                        className="w-8 h-7"
                      />
                    </div>
                    <p className="text-white mb-2 text-base">
                      Drop your photo here or
                      <br />
                      choose upload method
                    </p>
                    <p className="text-[#FFFFFF80] text-sm mt-2">
                      JPEG, PNG or GIF — max 800×800px
                    </p>

                    {/* Upload Options */}
                    <div className="flex gap-4 mt-4 w-full">
                      <label
                        htmlFor="file-upload"
                        className="flex-1 py-3 px-4 bg-[#FFFFFF0D] rounded-xl cursor-pointer text-center border border-[#FFFFFF1A] hover:bg-[#FFFFFF1A] transition-colors"
                        style={{ backdropFilter: 'blur(27px)' }}
                      >
                        <span className="text-white text-sm">Browse Files</span>
                        <input
                          id="file-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>

                      <button
                        onClick={handleCameraCapture}
                        className="flex-1 py-3 px-4 bg-[#FFFFFF0D] rounded-xl cursor-pointer text-center border border-[#FFFFFF1A] hover:bg-[#FFFFFF1A] transition-colors"
                        style={{ backdropFilter: 'blur(27px)' }}
                      >
                        <span className="text-white text-sm">Camera</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            {showValidation && (
              <p
                className="text-[#FFE999] text-sm mb-4 select-none"
                aria-live="polite"
              >
                Please upload a photo to continue.
              </p>
            )}
            <CtaButton onClick={handleNextClick}>Upload your photo</CtaButton>
          </div>
        </div>

        {/*Desktop View */}
        <div
          className="hidden md:flex md:my-4 md:w-[95%] flex-col items-center justify-start mx-auto p-8 rounded-2xl border border-[#FFFFFF1A] bg-[#FFFFFF0D] flex-1 relative overflow-hidden"
          style={{
            backgroundImage:
              "url('/step1-bg-1-desktop.svg'), url('/step1-bg-2-desktop.svg')",
            backgroundPosition: 'top right, bottom left',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundSize: 'auto, auto',
          }}
        >
          <div className="w-full mb-8 z-10">
            <h2 className="text-3xl font-light text-white mb-3 text-left mt-10">
              Let&#39;s Get to Know You, {userName}
            </h2>
            <p className="text-white/60 text-base font-light text-left">
              A few quick questions to set the foundation. Just you and your
              daily rhythms.
            </p>
          </div>
          <div
            className="w-full h-px mb-8 z-10"
            style={{ backgroundColor: '#FFFFFF33' }}
            aria-hidden="true"
          />
          <div
            className="w-full bg-[#020D11B2] border border-white/8 rounded-3xl flex flex-col items-center p-8 z-10"
            style={{ backdropFilter: 'blur(60px)' }}
          >
            <h3 className="text-xl font-normal text-[#F4F4F5] text-left mb-2 w-full">
              Ready for the Glow-Up?
            </h3>
            <p className="text-[#67787F] text-left text-base font-light mb-7 w-full">
              We&#39;ll generate a visual transformation based on your current
              inputs.
            </p>
            {/*Upload zone */}
            <div
              className={`border border-dashed rounded-2xl w-full p-10 text-center mb-4 transition-colors ${
                dragOver ? 'border-yellow-400' : 'border-[#FFFFFF33]'
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                setDragOver(true)
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                backdropFilter: 'blur(27px)',
                borderColor: showValidation ? '#FFE99980' : undefined,
              }}
            >
              <div className="flex flex-col items-center">
                {photoData ? (
                  <div className="w-32 h-32 bg-[#F5F5F51A] rounded-3xl flex items-center justify-center overflow-hidden relative">
                    <img
                      src={photoData}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-xl z-30"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 items-center justify-center">
                    <div
                      className="w-20 h-20 bg-[#FFFFFF0D] rounded-3xl flex flex-col items-center justify-center mb-2"
                      style={{ backdropFilter: 'blur(27px)' }}
                    >
                      <img
                        src="/upload-cloud.svg"
                        alt="Upload icon"
                        className="w-6 h-5"
                      />
                    </div>
                    <p className="text-white mb-2 text-xl">
                      Drop your photo here or choose upload method
                    </p>
                    <p className="text-[#FFFFFF80] text-sm mb-6">
                      JPEG, PNG or GIF — max 800×800px
                    </p>

                    {/* Upload Options */}
                    <div className="flex gap-6 w-full max-w-md">
                      <label
                        htmlFor="file-upload-desktop"
                        className="flex-1 py-4 px-6 bg-[#FFFFFF0D] rounded-2xl cursor-pointer text-center border border-[#FFFFFF1A] hover:bg-[#FFFFFF1A] transition-colors"
                        style={{ backdropFilter: 'blur(27px)' }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <img
                            src="/upload-cloud.svg"
                            alt="Upload"
                            className="w-6 h-5"
                          />
                          <span className="text-white text-sm font-medium">
                            Browse Files
                          </span>
                        </div>
                        <input
                          id="file-upload-desktop"
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>

                      <button
                        onClick={handleCameraCapture}
                        className="flex-1 py-4 px-6 bg-[#FFFFFF0D] rounded-2xl cursor-pointer text-center border border-[#FFFFFF1A] hover:bg-[#FFFFFF1A] transition-colors"
                        style={{ backdropFilter: 'blur(27px)' }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <LuCamera
                            className="text-white size-6"
                            strokeWidth={1}
                          />
                          <span className="text-white text-sm font-medium">
                            Use Camera
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {showValidation && (
              <p
                className="text-[#FFE999] text-sm mb-6 select-none"
                aria-live="polite"
              >
                Please upload a photo to continue.
              </p>
            )}
            <CtaButton
              onClick={handleNextClick}
              style={{ width: 'fit-content', padding: '12px 24px' }}
            >
              Upload your photo
            </CtaButton>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
