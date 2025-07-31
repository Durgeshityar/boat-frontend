"use client";

import { useState } from "react";
import CtaButton from "@/components/common/CtaButton";
import Header from "./common/Header";
import Stepper from "./common/Stepper";
import Footer from "./common/Footer";
import ProfileBadge from "./common/ProfileBadge";
import { SliderCard } from "./common/SliderCard";

interface Step3Props {
  userName: string;
  dailyActivity: {
    sleep: number;
    water: number;
    steps: number;
    calories: number;
  };
  onSubmit: (activity: {
    sleep: number;
    water: number;
    steps: number;
    calories: number;
  }) => void;
}

export default function Step3({
  userName,
  dailyActivity,
  onSubmit,
}: Step3Props) {
  const [activity, setActivity] = useState(dailyActivity);
  const [showValidation, setShowValidation] = useState(false);
  const [errors, setErrors] = useState<{
    sleep?: boolean;
    water?: boolean;
    steps?: boolean;
    calories?: boolean;
  }>({});
  const userPhotoUrl =
    "https://manofmany.com/wp-content/uploads/2022/02/Green-and-Gold-feature-400x300.jpg";

  const validate = () => {
    const e: typeof errors = {};
    if (activity.sleep < 2 || activity.sleep > 10) e.sleep = true;
    if (activity.water < 250 || activity.water > 3000) e.water = true;
    if (activity.steps < 1 || activity.steps > 20) e.steps = true;
    if (activity.calories < 1000 || activity.calories > 3500) e.calories = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setShowValidation(false);
      onSubmit(activity);
    } else {
      setShowValidation(true);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-0 bg-[#020D11]" />
      <div
        className="absolute inset-0 z-10 pointer-events-none [background-size:20px_20px]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(212,212,212,0.08) 1px, transparent 1px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-20 bg-white/0 dark:bg-black/0"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, transparent 20%, black)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, transparent 20%, black)",
        }}
      />

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
        className="absolute left-0 pointer-events-none select-none w-full"
        style={{
          top: "350px",
        }}
      />
      <img
        src="/step3-bg-3.svg"
        alt=""
        aria-hidden="true"
        className="absolute left-0 pointer-events-none select-none w-[100vw]"
        style={{
          bottom: "0",
          right: "0",
        }}
      />
      <div className="relative z-30 flex flex-col min-h-screen">
        <Header />
        <Stepper currentStep={3} />
        <main className="flex-1 flex flex-col items-center justify-start px-4 max-w-xl mx-auto w-full">
          <div className="mb-8 w-full">
            <div className="flex items-center justify-center gap-4 mb-4">
              <ProfileBadge
                photoUrl={userPhotoUrl}
                size={100}
                step={3}
                showSparkle={true}
              />
              <h2 className="text-2xl font-light text-white text-left">
                How You Move, Fuel
                <br />
                &amp; Feel, {userName}?
              </h2>
            </div>
            <p className="text-white/60 text-center text-md font-light">
              These daily choices shape your tomorrow —
              <br />
              let's map them out.
            </p>
          </div>

          <div
            className="w-full h-px"
            style={{ backgroundColor: "#FFFFFF33" }}
            aria-hidden="true"
          />

          <div className="space-y-6 mt-8 w-full">
            <SliderCard
              title="On average, how many hours do you sleep?"
              description="Sleep is your body's ultimate recovery system."
              min={0}
              max={10}
              step={0.5}
              value={activity.sleep}
              threshold={6}
              unit="h"
              onChange={(value) => setActivity({ ...activity, sleep: value })}
              error={errors.sleep}
            />

            <SliderCard
              title="What's your daily water intake? (in ml)"
              description="How many glasses of water do you drink daily on average?"
              min={0}
              max={3000}
              step={250}
              value={activity.water}
              threshold={2000}
              unit="ml"
              onChange={(value) => setActivity({ ...activity, water: value })}
              error={errors.water}
            >
              <div className="flex justify-center gap-3">
                {Array.from({ length: 12 }).map((_, index) => {
                  const filled = activity.water >= (index + 1) * 250;
                  const src = filled ? "/filled-glass.svg" : "/empty-glass.svg";
                  return (
                    <img
                      key={index}
                      src={src}
                      alt={filled ? "Filled glass" : "Empty glass"}
                      width={15}
                      height={20}
                      className="transition-all"
                    />
                  );
                })}
              </div>
            </SliderCard>

            <SliderCard
              title="Steps Per Day"
              description="How many steps do you usually take per day?"
              min={0}
              max={20}
              step={0.25}
              value={activity.steps}
              threshold={12}
              unit="k"
              onChange={(value) => setActivity({ ...activity, steps: value })}
              error={errors.steps}
            />

            <SliderCard
              title="Calorie Intake"
              description="Roughly how many calories do you consume daily?"
              min={1000}
              max={3500}
              step={500}
              value={activity.calories}
              threshold={2000}
              unit=""
              onChange={(value) =>
                setActivity({ ...activity, calories: value })
              }
              error={errors.calories}
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

          <CtaButton onClick={handleSubmit}>See Your Future Self</CtaButton>
        </main>
        <Footer />
      </div>
    </div>
  );
}
