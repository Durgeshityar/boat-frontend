"use client";

import { useState } from "react";
import CtaButton from "@/components/common/CtaButton";
import { User, Zap, Brain, Heart, Copy, Download, Share } from "lucide-react";
import Header from "./common/Header";
import Footer from "./common/Footer";

interface Step5Props {
  userDetails: {
    dateOfBirth: string;
    height: number;
    weight: number;
  };
  dailyActivity: {
    sleep: number;
    water: number;
    steps: number;
    calories: number;
  };
}

export default function Step5({ userDetails }: Step5Props) {
  const [selectedPeriod, setSelectedPeriod] = useState("1 year");
  const userPhotoUrl =
    "https://manofmany.com/wp-content/uploads/2022/02/Green-and-Gold-feature-400x300.jpg";
  const calculateAge = () => {
    if (!userDetails.dateOfBirth) return 27;
    const today = new Date();
    const birthDate = new Date(userDetails.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const currentAge = calculateAge();
  const biologicalAge = Math.max(20, currentAge - 2);

  const metrics = [
    {
      icon: User,
      label: "Biological age",
      value: `${biologicalAge}`,
      unit: "years",
      change: "-2 years",
      current: `${currentAge} years`,
    },
    {
      icon: Zap,
      label: "Energy",
      value: "83",
      unit: "%",
      change: "+18%",
      current: "65%",
    },
    {
      icon: Brain,
      label: "Focus",
      value: "88",
      unit: "%",
      change: "+14%",
      current: "74%",
    },
    {
      icon: Heart,
      label: "Mood",
      value: "91",
      unit: "%",
      change: "+19%",
      current: "72%",
    },
  ];

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
        style={{ top: "50px" }}
      />
      <img
        src="/step1-bg-2.svg"
        alt=""
        aria-hidden="true"
        className="absolute left-0 pointer-events-none select-none w-[100vw]"
        style={{ bottom: "0", right: "0" }}
      />

      <div className="relative z-30 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-start px-4 max-w-xl mx-auto w-full">
          <div
            className="mx-auto mt-12 mb-6 flex items-center justify-center"
            style={{
              width: 228,
              height: 228,
              borderRadius: 222,
              border: "1px solid #FFFFFF80",
              boxShadow:
                "2.5px 5px 13.5px 6px #A6D9F544, -2.1px -4.6px 13.4px 6px #6A685633",
              overflow: "hidden",
              opacity: 1,
              position: "relative",
              background: "#181A20",
            }}
          >
            <img
              src={userPhotoUrl}
              alt="User profile"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>

          <div
            className="w-full"
            style={{
              height: 1,
              backgroundColor: "#FFFFFF33",
              marginBottom: 32,
            }}
            aria-hidden="true"
          />

          <div className="text-center mb-10 px-2">
            <h2 className="text-[26px] font-light text-white mb-3">
              This Is Where You&#39;re Headed
            </h2>
            <p className="text-white/70 text-basefont-light">
              Based on your lifestyle today, here&#39;s what&#39;s possible in
              1, 3 and 5 years.
            </p>
          </div>

          <div
            className="flex items-center justify-center mb-8 mt-2"
            style={{
              width: "100%",
              height: 60,
              borderRadius: 56,
              gap: 8,
              opacity: 1,
              border: "1px solid #F4F4F51A",
              padding: 8,
              background: "#F4F4F50D",
              backdropFilter: "blur(6px)",
            }}
          >
            {["1 year", "2 years", "3 years"].map((period) => {
              const isSelected = selectedPeriod === period;
              return (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  style={{
                    width: 109.67,
                    height: 44,
                    borderRadius: 32,
                    padding: "12px 8px",
                    marginRight: 8,
                    background: isSelected ? "#FFFFFF" : "transparent",
                    color: isSelected ? "#11131A" : "#FFFFFF",
                    fontSize: 15,
                    fontWeight: isSelected ? 400 : 300,
                    lineHeight: "20px",
                    opacity: 1,
                    transition: "background 0.2s, color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="focus:outline-none"
                >
                  {period}
                </button>
              );
            })}
          </div>

          <div className="text-center mb-4">
            <h3 className="text-2xl text-white mb-1">Foundation Built 🙌</h3>
            <p className="text-[#8C8C97] text-sm font-light">
              Your transformation begins
            </p>
          </div>

          <div className="space-y-4 mb-8 w-full">
            {metrics.map((metric, index) => (
              <div
                key={index}
                style={{
                  background: "#FFFFFF0D",
                  border: "1px solid #FFFFFF14",
                  backdropFilter: "blur(60px)",
                  borderRadius: 24,
                }}
                className="p-6"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 12,
                        background: "#FFFFFF0D",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <metric.icon
                        style={{
                          color: "#FFFFFF",
                          width: 24,
                          height: 24,
                          strokeWidth: 1.5,
                        }}
                      />
                    </div>
                    <span
                      style={{
                        color: "#FFFFFF",
                        fontWeight: 300,
                        fontSize: 16,
                        lineHeight: "22px",
                      }}
                    >
                      {metric.label}
                    </span>
                  </div>
                  <div
                    style={{
                      padding: "4px 14px",
                      borderRadius: 18,
                      height: 30,
                      background:
                        "linear-gradient(90deg, rgba(255, 233, 153, 0.1) 0%, rgba(142, 208, 243, 0.1) 100%)",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #FFE999 0%, #8ED0F3 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        WebkitTextFillColor: "transparent",
                        fontWeight: 300,
                        fontSize: 14,
                        lineHeight: "18px",
                      }}
                    >
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div className="mb-6">
                  <span
                    style={{
                      color: "#FFFFFF",
                      fontWeight: 400,
                      fontSize: 32,
                      lineHeight: "40px",
                    }}
                  >
                    {metric.value}
                  </span>
                  <span
                    style={{
                      color: "#FFFFFFCC",
                      fontWeight: 300,
                      fontSize: 20,
                      lineHeight: "28px",
                      marginLeft: 8,
                    }}
                  >
                    {metric.unit}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#FFFFFF0D",
                    borderRadius: 9999,
                    padding: "7px 18px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "#AAAEB5",
                      fontWeight: 300,
                      marginRight: 12,
                      whiteSpace: "nowrap",
                    }}
                  >
                    vs current
                  </span>
                  <div
                    style={{
                      flexGrow: 1,
                      height: 1,
                      background: "#FFFFFF2E",
                      margin: "0 12px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 16,
                      color: "#FFFFFF",
                      fontWeight: 300,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {metric.current}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full rounded-[24px] px-2 py-8 bg-[#FFFFFF12] border border-[#FFFFFF80] shadow-[3.2px_6.6px_20.11px_9.6px_#A6D9F544,_-2.9px_-6.5px_20px_9.6px_#6A685633] backdrop-blur-[12px] flex flex-col items-center mb-8 mx-auto">
            <h3 className="font-light text-[22px] tracking-[-0.04em] text-center capitalize bg-gradient-to-r from-[#FFE999] to-[#8ED0F3] text-transparent bg-clip-text mb-6 sm:text-[26px]">
              Your Future Glow-Up
            </h3>
            <div className="w-full max-w-[185px] aspect-square rounded-full mx-auto border border-[#FFFFFF80] shadow-[2.5px_5px_13.5px_6px_#A6D9F544,_-2.1px_-4.6px_13.4px_6px_#6A685633] overflow-hidden bg-[#181A20] mb-6">
              <img
                src={userPhotoUrl}
                alt="Future self"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="w-full h-[1px] bg-[#FFFFFF33] mb-6" />
            <div className="w-full flex flex-col gap-3 px-1 mb-8">
              {metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="w-full h-14 rounded-[8px] px-4 py-3 bg-[#FFFFFF0D] flex items-center"
                >
                  <metric.icon className="w-6 h-6 text-white stroke-[1.5] mr-3" />
                  <span className="text-[#FFFFFFB2] font-light text-[15px] mr-auto">
                    {metric.label}
                  </span>
                  <span className="font-light text-[15px] bg-gradient-to-r from-[#FFE999] to-[#8ED0F3] text-transparent bg-clip-text">
                    {metric.change}
                  </span>
                </div>
              ))}
            </div>
            <div className="w-full max-w-[203px] h-11 rounded-full px-5 py-2 bg-gradient-to-r from-[rgba(255,233,153,0.1)] to-[rgba(142,208,243,0.1)] border border-[rgba(255,233,153,0.7)] flex items-center justify-center mx-auto mb-8">
              <span className="font-normal text-[16px] bg-gradient-to-r from-[#FFE999] to-[#8ED0F3] text-transparent bg-clip-text">
                #valour_transformation
              </span>
            </div>
            <div className="w-full h-[1px] bg-[#FFFFFF33] mb-5" />
           <h4 className="font-light text-[18px] text-center capitalize text-white mb-5 sm:text-[22px]">
  Own It. Share It. Repeat It.
</h4>

<button
  type="submit"
  className={`mb-5 mx-auto relative z-10 w-full h-14 rounded-full font-medium text-base
    flex items-center justify-center gap-2
    shadow-[inset_0_4px_48px_0_rgba(126,186,238,0.22)]
    border-[3px] border-[#FFFFFF66]
    bg-gradient-to-r from-[#FFE999] to-[#8ED0F3]
    text-[#151C2B] hover:from-[#FCF5DE] hover:to-[#90D6FB]
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-[#8ED0F3]/30
    my-1
  `}
  style={{ backdropFilter: "blur(36px)" }}
>
  <span aria-hidden className="flex">
    <img src="/share.svg" alt="" aria-hidden />
  </span>
  Share your results
</button>

<div className="w-full flex gap-3 mb-5">
  <button className="flex-[0.8] h-12 rounded-[40px] px-4 py-3 bg-[#FFFFFF0D] border-[#FFFFFF1A] border text-white font-light text-[15px] flex items-center justify-center">
    Copy link
    <Copy className="w-5 h-5 ml-2" />
  </button>
  <button className="flex-[0.2] h-12 rounded-[40px] px-4 py-3 bg-[#FFFFFF0D] border-[#FFFFFF1A] border text-white flex items-center justify-center">
    <Download className="w-5 h-5" />
  </button>
</div>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
