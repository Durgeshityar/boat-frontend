"use client"

import { useState } from "react"
import CtaButton from "@/components/common/CtaButton"
import { Input } from "@/components/common/input"
import Header from "./common/Header"
import Stepper from "./common/Stepper"
import Footer from "./common/Footer"
import ProfileBadge from "./common/ProfileBadge"
import { SliderCard } from "./common/SliderCard"

interface Step2Props {
  userName: string
  userDetails: {
    dateOfBirth: string
    height: number
    weight: number
  }
  onSubmit: (details: { dateOfBirth: string; height: number; weight: number }) => void
}

export default function Step2({ userName, userDetails, onSubmit }: Step2Props) {
  const [details, setDetails] = useState(userDetails)
  const userPhotoUrl = "https://i.pinimg.com/736x/0c/de/64/0cde642b047ceb6034ecc752cd7c1fe9.jpg"

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-0 bg-[#020D11]" />
      <div className="absolute inset-0 z-10 pointer-events-none [background-size:20px_20px]" style={{ backgroundImage: "radial-gradient(rgba(212,212,212,0.08) 1px, transparent 1px)" }} />
      <div className="pointer-events-none absolute inset-0 z-20 bg-white/0 dark:bg-black/0" style={{
        maskImage: "radial-gradient(ellipse at center, transparent 20%, black)",
        WebkitMaskImage: "radial-gradient(ellipse at center, transparent 20%, black)"
      }} />
       <img
        src="/step1-bg-1.svg"
        alt=""
        aria-hidden="true"
        className="absolute left-0 pointer-events-none select-none w-[100vw]"
        style={{
          top: "50px",
        }}
      />
      <img
        src="/step1-bg-2.svg"
        alt=""
        aria-hidden="true"
        className="absolute left-0 pointer-events-none select-none w-[100vw]"
        style={{
          bottom: "0",
          right:"0",
        }}
      />
      <div className="relative z-30 flex flex-col min-h-screen">
        <Header />
        <Stepper currentStep={1} />
        <main className="flex-1 flex flex-col items-center justify-start px-4 max-w-xl mx-auto w-full">
          <div className="mb-8 w-full">
            <div className="flex items-center justify-center gap-4 mb-4">
              <ProfileBadge
                photoUrl={userPhotoUrl}
                size={100}
                showSparkle={true}
              />
              <h2 className="text-2xl font-light text-white text-left">
                Your journey starts here, {userName}
              </h2>
            </div>
            <p className="text-white/60 text-center text-md font-light">
              Just a few questions to set your foundation.
              <br />
              Your journey starts here.
            </p>
          </div>

          <div className="w-full h-px" style={{ backgroundColor: "#FFFFFF33" }} aria-hidden="true" />

          <div className="w-full mt-8 space-y-6">
            <div className="bg-[#020D11B2] border border-[#FFFFFF14] rounded-2xl p-6 backdrop-blur-lg mb-6">
              <label className="block text-lg text-[#F4F4F5] mb-2">
                What's your date of birth?
              </label>
              <p className="text-[#8C8C97] font-light text-sm mb-4">
                We'll use this to measure your biological vs actual age.
              </p>
              <div className="relative">
                <Input
                  type="date"
                  value={details.dateOfBirth}
                  onChange={(e) =>
                    setDetails({ ...details, dateOfBirth: e.target.value })
                  }
                  className="w-full bg-[#F4F4F50D] border border-[#F4F4F51A] text-white h-14 text-lg rounded-4xl px-6 focus:border-yellow-400 placeholder:text-[#8C8C97] placeholder:font-light"
                  placeholder="DD/MM/YYYY"
                />
                <span className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none">
                  <img src="/calendar.svg" alt="calendar-icon" className="w-full h-full" />
                </span>
              </div>
            </div>

            <SliderCard
              title="Your Height (in cm)"
              description="Enter your height in centimeters."
              min={120}
              max={220}
              threshold={170}
              value={details.height}
              onChange={(val) => setDetails({ ...details, height: val })}
              unit=""
            />

            <SliderCard
              title="Your Weight (in kg)"
              description="Your current weight helps us set a baseline."
              min={30}
              max={155}
              threshold={70}
              value={details.weight}
              onChange={(val) => setDetails({ ...details, weight: val })}
              unit=""
            />
          </div>

          <CtaButton onClick={() => onSubmit(details)}>Continue</CtaButton>
        </main>
        <Footer />
      </div>
    </div>
  )
}
