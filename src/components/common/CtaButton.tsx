"use client";

import React from "react";

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function CtaButton({
  children,
  className = "",
  style = {},
  ...props
}: CtaButtonProps) {
  const internalStyle: React.CSSProperties = {
    backdropFilter: "blur(36px)",
    backgroundSize: "105% 105%",
    backgroundPosition: "center",
    backgroundRepeat: "repeat",
  };

  const mergedStyle = { ...internalStyle, ...style };

  return (
    <button
      type="submit"
      className={`relative z-10 w-full h-14 rounded-full font-medium text-md
        flex items-center justify-center gap-2
        shadow-[inset_0_4px_48px_0_rgba(126,186,238,0.22)]
        border-[3px] border-[#FFFFFF66]
        bg-gradient-to-r from-[#FFE999] to-[#8ED0F3]
        text-[#151C2B] hover:from-[#FCF5DE] hover:to-[#90D6FB]
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-[#8ED0F3]/30
        my-1
        ${className}
      `}
      style={mergedStyle}
      {...props}
    >
      {children}
      <span aria-hidden className="flex">
        <img src="/arrow-right.svg" alt="" aria-hidden />
      </span>
    </button>
  );
}
