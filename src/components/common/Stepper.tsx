import { Check } from "lucide-react";
import React from "react";

interface StepperProps {
  currentStep: 1 | 2 | 3 | 4;
}
const PHASE_LABELS = ["Basics", "Daily Rhythm", "Your Results"];

function getPhaseIdx(currentStep: 1 | 2 | 3 | 4): 0 | 1 | 2 {
  if (currentStep === 1 || currentStep === 2) return 0;
  if (currentStep === 3) return 1;
  return 2;
}

export default function Stepper({ currentStep }: StepperProps) {
  const phaseIdx = getPhaseIdx(currentStep);
  return (
    <div className="flex items-center justify-center my-8 gap-0">
      {[0, 1, 2].map((idx) => (
        <React.Fragment key={idx}>
          <div className="flex items-center gap-2">
            {idx < phaseIdx ? (
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center transition-all duration-200">
                <Check className="w-3 h-3 text-black" strokeWidth={5} />
              </div>
            ) : idx === phaseIdx ? (
              <div className="w-5 h-5 rounded-full border-4 border-[#FFDB58] bg-transparent flex items-center justify-center transition-all duration-200" />
            ) : (
              <div className="w-5 h-5 rounded-full border border-[#FFFFFF66] bg-transparent transition-all duration-200" />
            )}
            {idx === phaseIdx && (
              <span className="mx-1 font-normal text-base text-white">
                {PHASE_LABELS[idx]}
              </span>
            )}
          </div>
          {idx < 2 && (
            <div
              className={`w-8 h-0.25 rounded-full mx-2 transition-colors duration-300 ${
                idx < phaseIdx ? "bg-white" : "bg-[#FFFFFF33]"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
