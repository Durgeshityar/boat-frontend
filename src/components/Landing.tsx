"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import CtaButton from "@/components/common/CtaButton";
import Header from "./common/Header";
import Footer from "./common/Footer";

interface LandingProps {
  onSubmit: (name: string) => void;
}

export default function Landing({ onSubmit }: LandingProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showInputOnDesktop, setShowInputOnDesktop] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setError("");
      onSubmit(name.trim());
      setShowInputOnDesktop(false);
    } else {
      setError("Please enter your name before proceeding.");
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
        src="/landing-bg-blue.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-20 -left-10 w-[calc(100vw+40px)] min-w-[calc(100vw+40px)] max-w-none md:hidden"
      />
      <img
        src="/landing-bg-yellow.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-20 -left-10 w-[calc(100vw+40px)] min-w-[calc(100vw+40px)] max-w-none md:hidden"
      />
      <img
        src="/landing-bg-blue-desktop.svg"
        alt=""
        aria-hidden="true"
        className={cn(
          "pointer-events-none select-none absolute -top-[394px] -left-0 w-full max-w-none hidden md:block",
          showInputOnDesktop ? "md:opacity-20" : "md:opacity-100"
        )}
      />
      <img
        src="/landing-bg-yellow-desktop.svg"
        alt=""
        aria-hidden="true"
        className={cn(
          "pointer-events-none select-none absolute -bottom-[394px] -left-0 w-full max-w-none hidden md:block",
          showInputOnDesktop ? "md:opacity-20" : "md:opacity-100"
        )}
      />

      <div className="relative z-30 min-h-screen flex flex-col">
        <Header />
        <main
          className={cn(
            "flex-1 flex flex-col items-center justify-start md:justify-center px-4 w-full transition-opacity duration-500"
          )}
        >
          <div
            className={cn(
              "mb-8 w-full px-2 sm:px-0 justify-center flex flex-col items-center",
              showInputOnDesktop ? "md:opacity-20" : "md:opacity-100"
            )}
          >
            <h2
              className="text-5xl md:text-[88px] font-normal text-white my-10 text-center leading-tight"
              style={{
                textShadow: "0px 1px 20px rgba(255, 255, 255, 0.75)",
              }}
            >
              Can Your Habits Beat Time?
            </h2>
            <p className="text-white/80 text-base font-light text-center leading-relaxed max-w-3xl">
              Real habits. Real data. A real glimpse
              <br />
              into what&apos;s next.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto space-y-4 md:hidden"
          >
            <div
              className="relative border rounded-3xl bg-[#FFFFFF0D] flex flex-col items-center p-3 backdrop-blur-lg shadow-lg"
              style={{
                backdropFilter: "blur(27px)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div
                aria-hidden="true"
                className="absolute left-2 bottom-2 w-60 h-14 rounded-full blur-xl z-0"
                style={{
                  background:
                    "linear-gradient(90deg, #FFE999 0%, #8ED0F3 100%)",
                  opacity: 0.56,
                  filter: "blur(18px)",
                }}
              />
              <input
                type="text"
                placeholder="Start by entering your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={error ? "true" : "false"}
                aria-describedby="name-error"
                className="relative z-10 block w-full bg-transparent text-base text-white placeholder-white/60 placeholder:text-center rounded-full px-6 py-3 mb-2 outline-none ring-0 border-0 focus:ring-0 focus:outline-none text-center"
                style={{
                  border: error ? "1px solid #FFE99980" : undefined,
                }}
              />
              {error && (
                <p
                  id="name-error"
                  className="relative z-10 text-sm select-none mb-2"
                  role="alert"
                  style={{ color: "#FFE999" }}
                >
                  {error}
                </p>
              )}
              <CtaButton>Let&apos;s Find Out&nbsp;</CtaButton>
            </div>
          </form>

          <div
            className={cn(
              "hidden md:flex items-center justify-center gap-4 w-full sm:max-w-xl md:max-w-2xl mx-auto relative z-40 transition-opacity duration-500"
            )}
          >
            {!showInputOnDesktop && (
              <div
                className="relative flex justify-center"
                style={{
                  transition: "all 0.4s ease",
                }}
              >
                <div
                  className="absolute left-2 bottom-2 w-60 h-14 rounded-full blur-xl z-0"
                  style={{
                    background:
                      "linear-gradient(90deg, #FFE999 0%, #8ED0F3 100%)",
                    opacity: 0.56,
                    filter: "blur(18px)",
                  }}
                />
                <div
                  className="bg-[#FFFFFF0D] border border-[#FFFFFF1A] w-60 rounded-full px-4 py-2 backdrop-blur-lg"
                  style={{
                    backdropFilter: "blur(27px)",
                  }}
                >
                  <CtaButton onClick={() => setShowInputOnDesktop(true)}>
                    Let&apos;s Find Out&nbsp;
                  </CtaButton>
                </div>
              </div>
            )}

            {showInputOnDesktop && (
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-3 w-full max-w-xl bg-[#FFFFFF0D] border border-[#FFFFFF1A] rounded-full px-4 py-2 backdrop-blur-lg"
              >
                <input
                  type="text"
                  placeholder="Start by entering your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby="name-error"
                  className="flex-1 bg-transparent text-white placeholder-white/60 w-[60%] text-base rounded-full px-6 py-3 outline-none ring-0 focus:ring-0"
                  style={{
                    border: error ? "1px solid #FFE99980" : undefined,
                  }}
                  autoFocus
                />
                <div className="relative w-[40%]">
                  <div
                    className="absolute -left-2 -bottom-2 w-60 h-14 rounded-full blur-xl z-0"
                    style={{
                      background:
                        "linear-gradient(90deg, #FFE999 0%, #8ED0F3 100%)",
                      opacity: 0.56,
                      filter: "blur(18px)",
                    }}
                  />
                  <CtaButton type="submit" className="relative z-10">
                    Let&apos;s Find Out&nbsp;
                  </CtaButton>
                </div>
              </form>
            )}
          </div>

          <div
            className={cn(
              "w-full h-px my-12 md:w-[80%]",
              showInputOnDesktop ? "md:opacity-20" : "md:opacity-100"
            )}
            style={{ backgroundColor: "#FFFFFF33" }}
            aria-hidden="true"
          />

          <section
            className={cn(
              "w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto text-center text-white mb-10",
              showInputOnDesktop ? "md:opacity-20" : "md:opacity-100"
            )}
          >
            <p className="mb-6 font-normal tracking-tight leading-relaxed text-xl">
              &quot;I didn&apos;t expect sleep and screen time to impact my future
              this much.&quot;
            </p>
            <div className="flex flex-col md:flex-row md:gap-3 items-center justify-center gap-0">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm select-none">
                  JB
                </span>
              </div>
              <div className="flex flex-col items-center md:items-start mt-1 md:mt-0">
                <p className="text-white font-normal text-base">Josh Bull</p>
                <p className="text-[#FFFFFF99] text-sm m-0">
                  Fitness enthusiast
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
}
