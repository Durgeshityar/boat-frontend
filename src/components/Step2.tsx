/* eslint-disable @next/next/no-img-element */
'use client'

import { useState } from 'react'
import CtaButton from '@/components/common/CtaButton'
import Header from './common/Header'
import Stepper from './common/Stepper'
import Footer from './common/Footer'
import ProfileBadge from './common/ProfileBadge'
import { SliderCard } from './common/SliderCard'
import UserImageCard from './common/UserImageCard'
import CustomCalendar from './common/custom-calendar'
import { useHealthStore } from '@/store/useHealthStore'

export default function Step2() {
  const { inputs, setInput, nextStep, processingImageUrl } = useHealthStore()
  const userName = inputs.name

  const [showValidation, setShowValidation] = useState(false)
  const [errors, setErrors] = useState<{
    dob?: boolean
    height?: boolean
    weight?: boolean
    gender?: boolean
    goal?: boolean
  }>({})

  const userPhotoUrl = processingImageUrl

  const validate = () => {
    const newErrors: typeof errors = {}
    if (!inputs.dob) newErrors.dob = true
    if (inputs.height < 120 || inputs.height > 220) newErrors.height = true
    if (inputs.weight < 30 || inputs.weight > 155) newErrors.weight = true
    if (!inputs.gender) newErrors.gender = true
    if (!inputs.goal) newErrors.goal = true
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      setShowValidation(false)
      nextStep()
    } else {
      setShowValidation(true)
    }
  }

  const handleStartOver = () => {
    window.location.reload()
  }

  const GenderSelector = ({ error }: { error?: boolean }) => (
    <div
      className="bg-[#020D11B2] rounded-2xl p-6 backdrop-blur-lg w-full"
      style={{
        border: error ? '1px solid #FFE99980' : '1px solid #FFFFFF14',
      }}
    >
      <label className="block text-lg text-[#F4F4F5] mb-2">
        What&apos;s your gender?
      </label>
      <p className="text-[#8C8C97] font-light text-sm mb-4">
        This helps us provide more accurate health recommendations.
      </p>
      <div className="flex gap-3">
        {[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'auto', label: 'Prefer not to say' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() =>
              setInput('gender', option.value as 'male' | 'female' | 'auto')
            }
            className={`flex-1 h-12 rounded-xl text-sm font-medium transition-all duration-200 ${
              inputs.gender === option.value
                ? 'text-[#020D11] hover:opacity-90'
                : 'text-[#F4F4F5] hover:border-[#FFE99960]'
            }`}
            style={{
              backgroundColor:
                inputs.gender === option.value ? '#FFE999' : '#F4F4F50D',
              border:
                inputs.gender === option.value
                  ? '1px solid #FFE999'
                  : error
                  ? '1px solid #FFE99980'
                  : '1px solid #F4F4F51A',
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )

  const GoalSelector = ({ error }: { error?: boolean }) => (
    <div
      className="bg-[#020D11B2] rounded-2xl p-6 backdrop-blur-lg w-full"
      style={{
        border: error ? '1px solid #FFE99980' : '1px solid #FFFFFF14',
      }}
    >
      <label className="block text-lg text-[#F4F4F5] mb-2">
        What&apos;s your primary goal?
      </label>
      <p className="text-[#8C8C97] font-light text-sm mb-4">
        Choose your main fitness objective to personalize your plan.
      </p>
      <div className="flex gap-3">
        {[
          { value: 'musclegain', label: 'Muscle Gain' },
          { value: 'fatloss', label: 'Weight Loss' },
        ].map((option) => (
          <button
            key={option.value}
            onClick={() =>
              setInput('goal', option.value as 'musclegain' | 'fatloss')
            }
            className={`flex-1 h-12 rounded-xl text-sm font-medium transition-all duration-200 ${
              inputs.goal === option.value
                ? 'text-[#020D11] hover:opacity-90'
                : 'text-[#F4F4F5] hover:border-[#FFE99960]'
            }`}
            style={{
              backgroundColor:
                inputs.goal === option.value ? '#FFE999' : '#F4F4F50D',
              border:
                inputs.goal === option.value
                  ? '1px solid #FFE999'
                  : error
                  ? '1px solid #FFE99980'
                  : '1px solid #F4F4F51A',
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )

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
        style={{ bottom: '0', right: '0' }}
      />

      <div className="relative z-30 flex flex-col min-h-screen">
        <Header
          centerElement={<Stepper currentStep={2} />}
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
        <main className="flex-1 flex flex-col items-center justify-start px-4 max-w-xl mx-auto w-full mb-16 md:hidden">
          <Stepper currentStep={2} />
          <div className="mb-8 w-full">
            <div className="flex items-center justify-center gap-4 mb-4">
              <ProfileBadge photoUrl={userPhotoUrl} size={100} showSparkle />
              <h2 className="text-2xl font-light text-white text-left">
                Your journey starts here, {userName}
              </h2>
            </div>
            <p className="text-white/60 text-center text-base font-light">
              Just a few questions to set your foundation.
              <br />
              Your journey starts here.
            </p>
          </div>

          <div
            className="w-full h-px"
            style={{ backgroundColor: '#FFFFFF33' }}
            aria-hidden="true"
          />

          <div className="w-full mt-8 space-y-6">
            <div
              className="bg-[#020D11B2] rounded-2xl p-6 backdrop-blur-lg mb-6"
              style={{
                border: errors.dob
                  ? '1px solid #FFE99980'
                  : '1px solid #FFFFFF14',
              }}
            >
              <label className="block text-lg text-[#F4F4F5] mb-2">
                What&#39;s your date of birth?
              </label>
              <p className="text-[#8C8C97] font-light text-sm mb-4">
                We&#39;ll use this to measure your biological vs actual age.
              </p>
              <CustomCalendar
                value={inputs.dob}
                onChange={(date) => setInput('dob', date)}
                error={errors.dob}
              />
            </div>

            <GenderSelector error={errors.gender} />

            <GoalSelector error={errors.goal} />

            <SliderCard
              title="Your Height (in cm)"
              description="Enter your height in centimeters."
              min={120}
              max={220}
              threshold={170}
              value={inputs.height}
              onChange={(val) => setInput('height', val)}
              unit=""
              error={errors.height}
            />

            <SliderCard
              title="Your Weight (in kg)"
              description="Your current weight helps us set a baseline."
              min={30}
              max={155}
              threshold={70}
              value={inputs.weight}
              onChange={(val) => setInput('weight', val)}
              unit=""
              error={errors.weight}
            />
          </div>

          {showValidation && (
            <p
              className="text-[#FFE999] text-sm mb-4 select-none text-center"
              aria-live="polite"
            >
              Please complete all fields before continuing.
            </p>
          )}

          <CtaButton onClick={handleSubmit}>Continue</CtaButton>
        </main>
        <div
          className="hidden md:flex md:mt-4 md:w-[95%] mx-auto flex-1 relative overflow-hidden border border-[#FFFFFF1A] bg-[#FFFFFF0D] rounded-2xl"
          style={{
            backgroundImage:
              "url('/step1-bg-1-desktop.svg'), url('/step1-bg-2-desktop.svg')",
            backgroundPosition: 'top right, bottom left',
            backgroundRepeat: 'no-repeat, no-repeat',
            backgroundSize: 'auto, auto',
          }}
        >
          <div className="w-1/2 p-12 flex flex-col justify-start z-10">
            <div className="mb-10">
              <h2 className="text-3xl font-light text-white mb-3  mt-10">
                Your journey starts here, {userName}
              </h2>
              <p className="text-white/60 text-base font-light">
                Just a few questions to set your foundation.
              </p>
            </div>

            <div
              className="h-px mb-8 w-full"
              style={{ backgroundColor: '#FFFFFF33' }}
            />

            <div className="flex flex-col gap-4 items-center">
              <div
                className="bg-[#020D11B2] rounded-2xl p-6 backdrop-blur-lg w-full"
                style={{
                  border: errors.dob
                    ? '1px solid #FFE99980'
                    : '1px solid #FFFFFF14',
                }}
              >
                <label className="block text-lg text-[#F4F4F5] mb-2">
                  What&#39;s your date of birth?
                </label>
                <p className="text-[#8C8C97] font-light text-sm mb-4">
                  We&#39;ll use this to measure your biological vs actual age.
                </p>
                <CustomCalendar
                  value={inputs.dob}
                  onChange={(date) => setInput('dob', date)}
                  error={errors.dob}
                />
              </div>

              <GenderSelector error={errors.gender} />

              <GoalSelector error={errors.goal} />

              <SliderCard
                title="Your Height (in cm)"
                description="Enter your height in centimeters."
                min={120}
                max={220}
                threshold={170}
                value={inputs.height}
                onChange={(val) => setInput('height', val)}
                unit=""
                error={errors.height}
              />
              <SliderCard
                title="Your Weight (in kg)"
                description="Your current weight helps us set a baseline."
                min={30}
                max={155}
                threshold={70}
                value={inputs.weight}
                onChange={(val) => setInput('weight', val)}
                unit=""
                error={errors.weight}
              />

              {showValidation && (
                <p
                  className="text-[#FFE999] text-sm mb-2 select-none"
                  aria-live="polite"
                >
                  Please complete all fields before continuing.
                </p>
              )}

              <CtaButton
                onClick={handleSubmit}
                style={{ width: 'fit-content', padding: '12px 24px' }}
              >
                Continue
              </CtaButton>
            </div>
          </div>

          <div className="w-1/2 flex items-start justify-center p-12 z-10 mt-10">
            <UserImageCard userPhotoUrl={userPhotoUrl} step={2} />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
