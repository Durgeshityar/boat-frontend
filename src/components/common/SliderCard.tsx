import React from "react";

interface SliderCardProps {
  title: string;
  description: string;
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  threshold: number;
  step?: number;
  unit?: string;
  children?: React.ReactNode;
  error?: boolean;
}

export function SliderCard({
  title,
  description,
  min,
  max,
  value,
  onChange,
  threshold,
  step = 1,
  unit = "",
  children,
  error = false,
}: SliderCardProps) {
  const labelValues = Array.from(
    { length: 6 },
    (_, i) => min + i * ((max - min) / 5)
  );
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div
      className="bg-[#020D11B2] rounded-2xl p-6 backdrop-blur-lg mb-6 md:mb-0 md:w-full"
      style={{
        border: error ? "1px solid #FFE99980" : "1px solid #FFFFFF14",
      }}
    >
      <div className="flex justify-between items-start mb-4 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-lg text-[#F4F4F5]">{title}</label>
          <p className="text-[#8C8C97] text-sm font-light">{description}</p>
        </div>
        <span className="text-[#F4F4F5] bg-[#F4F4F50D] border border-[#F4F4F51A] h-14 text-lg rounded-4xl px-6 flex items-center">
          {value}
          {unit}
        </span>
      </div>

      {children && <div className="mb-4">{children}</div>}

      <div className="relative w-full h-4 rounded-full bg-[#F4F4F50D]">
        <div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(to right, #FFE999, #8ED0F3)",
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-4 appearance-none bg-transparent absolute top-0 left-0"
        />
      </div>

      <div className="flex justify-between text-xs mt-2">
        {labelValues.map((val) => (
          <span
            key={val}
            className={`${
              val === threshold ? "text-white" : "text-[#8C8C97] font-light"
            }`}
          >
            {val}
            {unit}
          </span>
        ))}
      </div>

      <style jsx>{`
        input[type="range"]::-webkit-slider-runnable-track {
          height: 16px;
          background: transparent;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ffffff;
          margin-top: 0px;
          cursor: pointer;
          border: none;
        }

        input[type="range"]::-moz-range-track {
          height: 16px;
          background: transparent;
        }

        input[type="range"]::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}
