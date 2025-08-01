"use client";

import { useState } from "react";
import { User, Zap, Brain, Heart } from "lucide-react";
import Header from "./common/Header";
import Footer from "./common/Footer";
import Stepper from "./common/Stepper";
import CtaButton from "./common/CtaButton";

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
    {
      icon: Brain,
      label: "Stress",
      value: "25",
      unit: "%",
      change: "-30%",
      current: "55%",
    },
  ];

  const handleStartOver = () => {
    window.location.href = "/";
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
        className="absolute left-0 pointer-events-none select-none w-[100vw] md:hidden"
        style={{ top: "50px" }}
      />
      <img
        src="/step1-bg-2.svg"
        alt=""
        aria-hidden="true"
        className="absolute left-0 pointer-events-none select-none w-[100vw] md:hidden"
        style={{ bottom: "0", right: "0" }}
      />

      <div className="relative z-30 flex flex-col min-h-screen">
        <Header
          centerElement={<Stepper currentStep={5} />}
          ctaButton={
            <CtaButton
              onClick={handleStartOver}
              style={{
                width: "160px",
                height: "48px",
              }}
            >
              Start Over
            </CtaButton>
          }
        />
        {/* mobile view */}
        <main className="flex-1 flex flex-col items-center justify-start px-4 max-w-xl mx-auto w-full md:hidden">
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
            <p className="text-white/70 text-base font-light">
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
              {metrics.slice(0, 2).map((metric, idx) => (
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

            <div
              className="w-full max-w-[203px] h-11 p-[1px] rounded-full mx-auto mb-8"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255, 233, 153, 0.7) 0%, rgba(142, 208, 243, 0.7) 100%)",
              }}
            >
              <div
                className="flex items-center justify-center h-full w-full rounded-full"
                style={{
                  background: "#141e22",
                }}
              >
                <div
                  className="flex items-center justify-center h-full w-full rounded-full px-3 py-1"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,233,153,0.1), rgba(142,208,243,0.1))",
                  }}
                >
                  <span className="font-normal text-[14px] bg-gradient-to-r from-[#FFE999] to-[#8ED0F3] text-transparent bg-clip-text">
                    #valour_transformation
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#FFFFFF33] mb-5" />
            <h4 className="font-light text-[18px] text-center capitalize text-white mb-5 sm:text-[22px]">
              Own It. Share It. Repeat It.
            </h4>
            <button
              type="submit"
              className={`mb-5 mx-auto relative z-10 w-full h-12 rounded-full font-medium text-base flex items-center justify-center gap-2 shadow-[inset_0_4px_48px_0_rgba(126,186,238,0.22)] border-[3px] border-[#FFFFFF66] bg-gradient-to-r from-[#FFE999] to-[#8ED0F3] text-[#151C2B] hover:from-[#FCF5DE] hover:to-[#90D6FB] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8ED0F3]/30 my-1`}
              style={{
                backdropFilter: "blur(36px)",
                backgroundSize: "105% 105%",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
              }}
            >
              <span aria-hidden className="flex">
                <img src="/share.svg" alt="" aria-hidden />
              </span>
              Share your results
            </button>
            <div className="w-full flex gap-3 mb-5">
              <button className="flex-[0.8] h-12 gap-2 rounded-[40px] px-4 py-3 bg-[#FFFFFF0D] border-[#FFFFFF1A] border text-white font-light text-[15px] flex items-center justify-center">
                Copy link
                <span aria-hidden className="flex">
                  <img src="/copy.svg" alt="" aria-hidden />
                </span>
              </button>
              <button className="flex-[0.2] h-12 rounded-[40px] px-4 py-3 bg-[#FFFFFF0D] border-[#FFFFFF1A] border text-white flex items-center justify-center">
                <span aria-hidden className="flex">
                  <img src="/download.svg" alt="" aria-hidden />
                </span>
              </button>
            </div>
          </div>
        </main>

        {/* desktop view */}
        <div
          className="hidden md:flex md:mt-4 md:w-[95%] mx-auto flex-1 relative overflow-hidden border border-[#FFFFFF1A] bg-[#FFFFFF0D] rounded-2xl mb-auto"
          style={{
            backgroundImage:
              "url('/step1-bg-1-desktop.svg'), url('/step1-bg-2-desktop.svg')",
            backgroundPosition: "top right, bottom left",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundSize: "50%, 50%",
            maxHeight: "calc(100vh - 164px)",
            height: "calc(100vh - 164px)",
          }}
        >
          <div className="relative w-[40%] h-full flex flex-col z-10 bg-transparent px-5">
            <div
              className="w-full h-full flex flex-col items-center justify-between px-6 py-6 mt-14"
              style={{
                minHeight: 0,
              }}
            >
              <div
                style={{
                  width: "min(240px,25vw)",
                  height: "min(240px,25vw)",
                  minWidth: "80px",
                  minHeight: "80px",
                  maxWidth: "180px",
                  maxHeight: "180px",
                  borderRadius: "50%",
                  border: "1px solid #FFFFFF80",
                  boxShadow:
                    "4.74px 9.7px 26.69px 11.85px #A6D9F566, -4.37px -9.63px 26.48px 11.85px #6A685666",
                  overflow: "hidden",
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
              <div className="w-full h-[1px] bg-[#FFFFFF33] my-8" />

              <div
                className="w-full mx-5 rounded-[20px] bg-[#FFFFFF12] border border-[#FFFFFF80] shadow-[3.2px_6.6px_20.11px_9.6px_#A6D9F544,_-2.9px_-6.5px_20px_9.6px_#6A685633] backdrop-blur-[12px] flex flex-col items-center px-4 py-6 overflow-y-auto"
                style={{
                  maxHeight: "calc(100% - 220px)",
                }}
              >
                <h3 className="font-light text-lg tracking-[-0.04em] text-center capitalize text-white mb-2">
                  Your Future Glow-Up
                </h3>
                <div className="w-full h-[1px] bg-[#FFFFFF33] mb-3" />
                <div className="w-full flex flex-col gap-2 px-1 mb-2">
                  {metrics.slice(0, 2).map((metric, idx) => (
                    <div
                      key={idx}
                      className="w-full h-12 rounded-[8px] px-3 py-2 bg-[#FFFFFF0D] flex items-center"
                    >
                      <metric.icon className="w-5 h-5 text-white stroke-[1.5] mr-2" />
                      <span className="text-[#FFFFFFB2] font-light text-[15px] mr-auto">
                        {metric.label}
                      </span>
                      <span className="font-light text-[15px] bg-gradient-to-r from-[#FFE999] to-[#8ED0F3] text-transparent bg-clip-text">
                        {metric.change}
                      </span>
                    </div>
                  ))}
                </div>
                <div
                  className="w-fit h-10 p-[1px] rounded-full mx-auto mb-3"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255, 233, 153, 0.7) 0%, rgba(142, 208, 243, 0.7) 100%)",
                  }}
                >
                  <div
                    className="flex items-center justify-center h-full w-full rounded-full"
                    style={{
                      background: "#3e545e",
                    }}
                  >
                    <div
                      className="flex items-center justify-center h-full w-full rounded-full px-3 py-1"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(255,233,153,0.1), rgba(142,208,243,0.1))",
                      }}
                    >
                      <span className="font-normal text-[14px] bg-gradient-to-r from-[#FFE999] to-[#8ED0F3] text-transparent bg-clip-text">
                        #valour_transformation
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-[#FFFFFF33] mb-2" />
                <h4 className="font-light text-[16px] text-center capitalize text-white mb-2">
                  Own It. Share It. Repeat It.
                </h4>
                <button
                  type="submit"
                  className={`mb-3 mx-auto relative z-10 w-full h-10 rounded-full font-medium text-base flex items-center justify-center gap-2 shadow-[inset_0_4px_48px_0_rgba(126,186,238,0.22)] border-[2px] border-[#FFFFFF66] bg-gradient-to-r from-[#FFE999] to-[#8ED0F3] text-[#151C2B] hover:from-[#FCF5DE] hover:to-[#90D6FB] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8ED0F3]/30`}
                  style={{
                    backdropFilter: "blur(24px)",
                    backgroundSize: "105% 105%",
                    backgroundPosition: "center",
                    backgroundRepeat: "repeat",
                    fontSize: "15px",
                  }}
                >
                  <span aria-hidden className="flex">
                    <img src="/share.svg" alt="" aria-hidden />
                  </span>
                  Share your results
                </button>
                <div className="w-full flex gap-2 mb-2">
                  <button className="flex-1 h-10 gap-2 rounded-[28px] px-3 py-2 bg-[#FFFFFF0D] border-[#FFFFFF1A] border text-white font-light text-[13px] flex items-center justify-center">
                    Copy link
                    <span aria-hidden className="flex">
                      <img src="/copy.svg" alt="" aria-hidden />
                    </span>
                  </button>
                  <button className="w-10 h-10 rounded-[28px] px-2 py-2 bg-[#FFFFFF0D] border-[#FFFFFF1A] border text-white flex items-center justify-center">
                    <span aria-hidden className="flex">
                      <img src="/download.svg" alt="" aria-hidden />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[60%] px-8 mt-8 py-16 overflow-y-auto flex flex-col">
            <div className="text-left mb-8">
              <h2 className="text-[28px] font-light text-white mb-3">
                This Is Where You&#39;re Headed
              </h2>
              <p className="text-white/70 text-base font-light">
                Based on your lifestyle today, here&#39;s what&#39;s possible in
                1, 3 and 5 years.
              </p>
            </div>

            <div
              className="flex items-center mb-10 mt-2"
              style={{
                width: "fit-content",
                height: 60,
                borderRadius: 56,
                gap: 8,
                opacity: 1,
                border: "1px solid #F4F4F51A",
                padding: "8px 12px",
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

            <div className="text-left mb-4">
              <h3 className="text-2xl text-white mb-1">Foundation Built 🙌</h3>
              <p className="text-[#8C8C97] text-sm font-light">
                Your transformation begins
              </p>
            </div>

            <div className="mb-4">
              <div
                style={{
                  background: "#FFFFFF0D",
                  border: "1px solid #FFFFFF14",
                  backdropFilter: "blur(60px)",
                  borderRadius: 24,
                }}
                className="p-6 w-full"
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
                      <User
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
                      Biological age
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
                      -2 years
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
                    {biologicalAge}
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
                    years
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
                    {currentAge} years
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {metrics.slice(1).map((metric, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#FFFFFF0D",
                    border: "1px solid #FFFFFF14",
                    backdropFilter: "blur(60px)",
                    borderRadius: 24,
                  }}
                  className="p-6 w-full"
                >
                  <div className="flex items-center justify-between mb-4">
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
                  <div className="mb-4">
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
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
