"use client";

import { useEffect, useState } from "react";
import Stepper from "./common/Stepper";
import Header from "./common/Header";
import Footer from "./common/Footer";

export default function Step4() {
  const [dots, setDots] = useState("");
  const [factIndex, setFactIndex] = useState(0);

  const facts = [
    "Your biological age can be younger than your real age — with the right habits.",
    "Sleep quality directly impacts how quickly your cells age.",
    "Staying hydrated improves skin elasticity and slows aging.",
  ];

  const userPhotoUrl =
    "https://i.pinimg.com/736x/0c/de/64/0cde642b047ceb6034ecc752cd7c1fe9.jpg";

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const factInterval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % facts.length);
    }, 4000);
    return () => clearInterval(factInterval);
  }, []);

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
        src="/step4-bg-1.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute z-10 w-[100vw]"
        style={{
          top: "50px",
        }}
      />
      <img
        src="/step4-bg-2.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute z-10 w-[100vw]"
        style={{
          top: "200px",
        }}
      />
      <img
        src="/step4-bg-3.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute z-10 w-[100vw]"
        style={{
          top: "582.33px",
          right: "0",
        }}
      />

      <div className="relative z-30 flex flex-col min-h-screen">
        <Header />
        <Stepper currentStep={4} />

        <main className="flex-1 flex flex-col items-center justify-start px-4 max-w-xl mx-auto w-full">
          <div className="mb-8 w-full">
            <div
              className="w-full h-px mb-8"
              style={{ backgroundColor: "#FFFFFF33" }}
              aria-hidden="true"
            />

            <div
              className="my-8 bg-[#FFFFFF0D] border border-[#FFFFFF80] rounded-3xl backdrop-blur-lg relative"
              style={{
                border: "1px solid #FFFFFF80",
                boxShadow: `
                  6.06px 12.4px 34.11px 15.15px #A6D9F566,
                 -5.59px -12.31px 33.84px 15.15px #6A6856
                `,
                height: 450,
                width: 350,
                margin: "0 auto",
              }}
            >
              <img
                src="/rectangle-bg-1.svg"
                alt="Background 1"
                className="absolute rounded-r-[20px] pointer-events-none"
              />
              <img
                src="/rectangle-bg-2.svg"
                alt="Background 2"
                className="absolute bottom-0 pointer-events-none"
              />

              <div className="relative w-full h-full overflow-hidden rounded-2xl">
                <img
                  src={userPhotoUrl}
                  alt="User profile"
                  className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
                  style={{
                    filter: "blur(20px)",
                  }}
                />
                <div className="relative flex flex-col items-center justify-center z-10 h-full">
                  <img
                    src="/sparkle.svg"
                    alt="Sparkle"
                    className="w-8 h-8 mb-2"
                  />
                  <div className="text-white text-lg">
                    Preparing your future self{dots}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{ backdropFilter: "blur(60px)" }}
              className="mt-8 bg-[#020D11B2] border border-[#FFFFFF14] rounded-2xl p-6"
            >
              <div className="flex justify-between items-center">
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, #FFE999 0%, #8ED0F3 100%)",
                    borderRadius: "10px",
                    width: "4px",
                    height: "100px",
                  }}
                />
                <div className="flex-1 px-4">
                  <h3 className="text-[#8C8C97] mb-2 text-md">DID YOU KNOW?</h3>
                  <p className="text-slate-300">{facts[factIndex]}</p>
                </div>
                <div className="flex flex-col justify-center items-center bg-[#FFFFFF0A] rounded-full py-2 px-1 h-[50px] w-5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full mb-2 last:mb-0 transition-all`}
                      style={{
                        backgroundColor:
                          i === factIndex ? "#FFFFFF" : "#FFFFFF1A",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
