"use client";

import { useState } from "react";
import CtaButton from "@/components/ui/CtaButton";
import { User, Zap, Brain, Heart, Copy, Download, Share } from "lucide-react";
import Header from "./header";
import Footer from "./footer";

interface Step5Props {
  userName: string;
  userPhoto: string | null;
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

export default function Step5({
  userName,
  userPhoto,
  userDetails,
  dailyActivity,
}: Step5Props) {
  const [selectedPeriod, setSelectedPeriod] = useState("1 year");

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
  const biologicalAge = Math.max(20, currentAge - 1);

  const metrics = [
    {
      icon: User,
      label: "Biological age",
      value: `${biologicalAge}`,
      unit: "years",
      change: "-1 year",
      current: `${currentAge} years`,
      percentage: null,
    },
    {
      icon: Zap,
      label: "Energy",
      value: "78",
      unit: "%",
      change: "+13%",
      current: "65%",
      percentage: 78,
    },
    {
      icon: Brain,
      label: "Focus",
      value: "82",
      unit: "%",
      change: "+12%",
      current: "70%",
      percentage: 82,
    },
    {
      icon: Heart,
      label: "Mood",
      value: "85",
      unit: "%",
      change: "+13%",
      current: "72%",
      percentage: 85,
    },
    {
      icon: Heart,
      label: "Mood",
      value: "45",
      unit: "%",
      change: "-23%",
      current: "68%",
      percentage: 45,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900 text-white">
      <Header />
      <div className="px-6 pb-6 overflow-y-auto">
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-slate-700 mb-4">
            <img
              src={
                userPhoto ||
                "/placeholder.svg?height=128&width=128&query=fitness+person"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">
            This Is Where You're Headed
          </h2>
          <p className="text-slate-400 text-sm">
            Based on your lifestyle today, here's what's
            <br />
            possible in 1, 3 and 5 years.
          </p>
        </div>

        <div className="flex gap-2 mb-8 justify-center">
          {["1 year", "2 years", "3 years"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedPeriod === period
                  ? "bg-white text-slate-900"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {period}
            </button>
          ))}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold mb-2">Foundation Built 🙌</h3>
          <p className="text-slate-400 text-sm">Your transformation begins</p>
        </div>

        <div className="space-y-4 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className="bg-slate-800/50 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <metric.icon className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-300">{metric.label}</span>
                </div>
                <span className="text-green-400 text-sm font-medium">
                  {metric.change}
                </span>
              </div>

              <div className="mb-4">
                <span className="text-4xl font-bold">{metric.value}</span>
                <span className="text-xl text-slate-400 ml-1">
                  {metric.unit}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">vs current</span>
                <span className="text-slate-400">{metric.current}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/30 rounded-3xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-center mb-6">
            Your Future Glow-Up
          </h3>

          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-slate-700 mb-6">
            <img
              src={
                userPhoto ||
                "/placeholder.svg?height=96&width=96&query=fitness+person"
              }
              alt="Future self"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-slate-400" />
                <span className="text-slate-300">Bio Age</span>
              </div>
              <span className="text-white font-semibold">-7 years</span>
            </div>

            <div className="flex items-center justify-between bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-slate-400" />
                <span className="text-slate-300">Energy</span>
              </div>
              <span className="text-green-400 font-semibold">+13%</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <span className="bg-slate-700 text-slate-300 px-4 py-2 rounded-full text-sm">
              #valour_transformation
            </span>
          </div>

          <h4 className="text-lg font-semibold text-center mb-6">
            Own It. Share It. Repeat It.
          </h4>

          <div className="space-y-3">
            <CtaButton >
              <Share className="w-4 h-4 mr-2" />
              Share your results
            </CtaButton>

            <div className="flex gap-3">
              <button
                className="flex-1 h-12 bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700 rounded-xl"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy link
              </button>
              <button
                className="h-12 px-4 bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700 rounded-xl"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
