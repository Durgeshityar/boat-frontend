'use client'

import Landing from '@/components/Landing'
import Step1 from '@/components/Step1'
import Step2 from '@/components/Step2'
import Step3 from '@/components/Step3'
import Step4 from '@/components/Step4'
import Step5 from '@/components/Step5'
import { useHealthStore } from '@/store/useHealthStore'

export default function Home() {
  const { step } = useHealthStore()

  const renderStep = () => {
    switch (step) {
      case 0:
        return <Landing />
      case 1:
        return <Step1 />
      case 2:
        return <Step2 />
      case 3:
        return <Step3 />
      case 4:
        return <Step4 />
      case 5:
        return <Step5 />
      default:
        return <Landing />
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#020D11]" />
      <div className="absolute inset-0 z-10 pointer-events-none [background-size:20px_20px] [background-image:radial-gradient(rgba(212,212,212,0.08)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(64,64,64,0.10)_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-white/0 dark:bg-black/0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="relative z-20">{renderStep()}</div>
    </div>
  )
}
