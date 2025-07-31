"use client";

import type React from "react";
import { useState } from "react";
import CtaButton from "@/components/ui/CtaButton";
import { Upload } from "lucide-react";
import Header from "./header";
import Footer from "./footer";
import Stepper from "./stepper";

interface Step1Props {
  userName: string;
  onPhotoUpload: (photo: string) => void;
}

export default function Step1({ userName, onPhotoUpload }: Step1Props) {
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onPhotoUpload(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
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
        className="absolute left-0 pointer-events-none select-none w-[100vw]"
        style={{
          top: "350px",
          left:"0",
        }}
      />

      <div className="relative z-30 flex flex-col min-h-screen">
        <Header />
        <Stepper currentStep={1} />
        <div className="flex-1 flex flex-col items-center justify-start px-4 max-w-md mx-auto w-full">
          <div className="mb-8">
            <h2 className="text-2xl font-light text-white mb-3 text-left md:text-center">
              Let's Get to Know You, {userName}
            </h2>
            <p className="text-white/60 text-md font-light text-left md:text-center">
              A few quick questions to set the foundation. Just you and your daily rhythms.
            </p>
          </div>

          <div
            className="w-full h-px"
            style={{ backgroundColor: "#FFFFFF33" }}
            aria-hidden="true"
          />

          <div
            className="my-8 w-full max-w-md mx-auto bg-[#020D11B2] border border-white/8 rounded-3xl flex flex-col items-center p-6"
            style={{
              backdropFilter: "blur(60px)",
            }}
          >
            <h3 className="text-lg font-normal text-[#F4F4F5] text-left md:text-center mb-2">
              Ready for the Glow-Up?
            </h3>
            <p className="text-[#67787F] text-left text-sm font-light mb-7 md:text-center">
              We'll generate a visual transformation based on your current
              inputs.
            </p>
            <div
              className={`border border-[#FFFFFF33] border-dashed rounded-2xl w-full p-7 text-center mb-8 transition-colors ${
                dragOver
                  ? "border-yellow-400"
                  : "border-slate-600"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                backdropFilter: "blur(27px)",
              }}
            >
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-[#F5F5F51A] rounded-3xl flex items-center justify-center mb-4">
                  <img
                    src="/upload-cloud.svg"
                    alt="Uploaded photo"
                    className="w-8 h-7"
                  />
                </div>
                <p className="text-white mb-2 text-md">
                  Drop your photo here or
                  <br/>
                  tap to upload
                </p>
                <p className="text-[#FFFFFF80] text-sm mt-2">
                  JPEG, PNG or GIF — max 800×800px
                </p>
              </div>
             <label
  htmlFor="file-upload"
  className="absolute inset-0 w-full h-full cursor-pointer bg-[#FFFFFF0D] rounded-2xl"
  style={{
    backdropFilter: "blur(27px)",
  }}
>
  <input
    id="file-upload"
    type="file"
    accept="image/*"
    onChange={handleFileSelect}
    className="hidden"
  />
</label>

            </div>

            <CtaButton onClick={() => onPhotoUpload("/placeholder.svg?height=200&width=200")}>
              Upload your photo
            </CtaButton>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
