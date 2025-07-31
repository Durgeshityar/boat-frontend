"use client";

import { useEffect, useState } from "react";
import Landing from "@/components/Landing";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import Step4 from "@/components/Step4";
import Step5 from "@/components/Step5";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState("");
  const [userDetails, setUserDetails] = useState({
    dateOfBirth: "",
    height: 178,
    weight: 74,
  });
  const [dailyActivity, setDailyActivity] = useState({
    sleep: 6.5,
    water: 2000,
    steps: 13,
    calories: 2000,
  });

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    nextStep();
  };

  const handlePhotoUpload = (photo: string) => {
    nextStep();
  };

  const handleDetailsSubmit = (details: typeof userDetails) => {
    setUserDetails(details);
    nextStep();
  };

  const handleActivitySubmit = (activity: typeof dailyActivity) => {
    setDailyActivity(activity);
    nextStep();
    setTimeout(() => {
      nextStep();
    }, 3000);
  };

  useEffect(() => {
  if (currentStep === 4) {
    const timer = setTimeout(() => {
      nextStep();
    }, 8000);
    return () => clearTimeout(timer);
  }
}, [currentStep]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Landing onSubmit={handleNameSubmit} />;
      case 1:
        return <Step1 userName={userName} onPhotoUpload={handlePhotoUpload} />;
      case 2:
        return (
          <Step2
            userName={userName}
            userDetails={userDetails}
            onSubmit={handleDetailsSubmit}
          />
        );
      case 3:
        return (
          <Step3
            userName={userName}
            dailyActivity={dailyActivity}
            onSubmit={handleActivitySubmit}
          />
        );
      case 4:
        return <Step4 />;
      case 5:
        return (
          <Step5
            userDetails={userDetails}
            dailyActivity={dailyActivity}
          />
        );
      default:
        return <Landing onSubmit={handleNameSubmit} />;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#020D11]" />
<div className="absolute inset-0 z-10 pointer-events-none [background-size:20px_20px] [background-image:radial-gradient(rgba(212,212,212,0.08)_1px,transparent_1px)] dark:[background-image:radial-gradient(rgba(64,64,64,0.10)_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute inset-0 z-20 bg-white/0 dark:bg-black/0 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="relative z-20">{renderStep()}</div>
    </div>
  );
}
