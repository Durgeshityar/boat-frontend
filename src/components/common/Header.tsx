import React from "react";

interface HeaderProps {
  ctaButton?: React.ReactNode;
  centerElement?: React.ReactNode;
}

export default function Header({ ctaButton, centerElement }: HeaderProps) {
  return (
    <header className="relative z-20 w-full">
      {/* Mobile Header */}
      <div
        className="
          flex justify-center items-center
          bg-[#16202366] backdrop-blur-[44px]
          h-[70px] w-full
          md:hidden
        "
        style={{ padding: "20px 0" }}
      >
        <img
          src="/logo.svg"
          alt="Logo"
          style={{ height: 22, width: "auto", display: "block" }}
        />
      </div>

      {/* Desktop Header */}
      <div
        className="
          hidden md:flex items-center
          h-[80px] w-full px-10
          bg-transparent pt-[20px]
        "
        style={{
          justifyContent: centerElement ? "space-between" : "flex-between",
        }}
      >
        <div className="flex items-center flex-shrink-0">
          <img
            src="/logo.svg"
            alt="Logo"
            style={{ height: 26, width: "auto", display: "block" }}
          />
        </div>

        {centerElement ? (
          <div className="flex-1 flex justify-center items-center min-w-0">
            <div className="max-w-full">{centerElement}</div>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        <div className="flex items-center flex-shrink-0">
          {ctaButton}
        </div>
      </div>
    </header>
  );
}
