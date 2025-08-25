"use client";

import { useEffect, useState } from "react";
import Landing from "@/components/Landing";
import Step1 from "@/components/Step1";
import Step2 from "@/components/Step2";
import Step3 from "@/components/Step3";
import Step4 from "@/components/Step4";
import Step5 from "@/components/Step5";
import { useTransformation } from "@/lib/hooks/useTransformation";
import { UserData } from "@/lib/api";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState<string>("");
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

  const { 
    isProcessing, 
    isComplete, 
    error, 
    result, 
    progress, 
    processTransformation, 
    resetTransformation,
    acquireToken
  } = useTransformation();

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleNameSubmit = (name: string) => {
    setUserName(name);
    nextStep();
  };

  const handlePhotoUpload = async (photo: string) => {
    setUserPhoto(photo);
    
    // Acquire auth token when photo is uploaded
    try {
      await acquireToken();
    } catch (error) {
      console.error('Failed to acquire token:', error);
      // Continue with the flow even if token acquisition fails
      // The transformation process will handle token acquisition later
    }
    
    nextStep();
  };

  const handleDetailsSubmit = (details: typeof userDetails) => {
    setUserDetails(details);
    nextStep();
  };

  const handleActivitySubmit = async (activity: typeof dailyActivity) => {
    setDailyActivity(activity);
    nextStep();
    
    // Prepare user data for API call
    const userData: UserData = {
      userName,
      userPhoto,
      userDetails,
      dailyActivity: activity,
    };

    // Process transformation
    await processTransformation(userData);
    
    // Move to results step after processing
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
        return (
          <Step4 
            isProcessing={isProcessing}
            progress={progress}
            error={error}
          />
        );
      case 5:
        return (
          <Step5
            userDetails={userDetails}
            dailyActivity={dailyActivity}
            transformationResult={result}
            userPhoto={userPhoto}
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
