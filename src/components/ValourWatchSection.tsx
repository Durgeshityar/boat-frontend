/* eslint-disable @next/next/no-img-element */
'use client'

export default function ValourWatchSection() {
  return (
    <>
      {/* Mobile */}
      <div className="block sm:hidden w-full max-w-sm mx-auto px-4 my-6">
        <div className="relative w-full flex flex-col items-center justify-between rounded-3xl overflow-hidden bg-[#091216] min-h-[554px] border-1 border-[#FFFFFF1A]">
          {/* Top Section */}
          <div className=" flex flex-col justify-center items-center px-10 z-[11] mt-10">
            <h2 className="text-white text-2xl font-light mb-4 leading-tight">
              Meet the
            </h2>

            <div className="flex items-center gap-3 mb-6 justify-center">
              <img
                src="/valour.svg"
                alt="Valour Logo"
                className="w-[110px] h-auto"
              />
              <span className="text-white text-[28px] font-light whitespace-nowrap">
                WATCH 1 GPS
              </span>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col items-center justify-center z-[11] mb-10 gap-2">
            <div className="grid grid-cols-3 grid-rows-2 gap-5 place-items-center px-8 relative">
              {[
                {
                  icon: '/calling.svg',
                  label: 'Crystal Clear Bluetooth Calling',
                },
                { icon: '/watch.svg', label: 'Dynamic Auto Change Watchfaces' },
                { icon: '/navigation.svg', label: 'Turn-by Turn Navigation' },
                { icon: '/qr.svg', label: 'QR Tray' },
                { icon: '/moon.svg', label: 'Advanced Sleep Insights' },
                { icon: '/step.svg', label: 'Step Count' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-5 h-5 mb-2"
                  />
                  <span className="text-white text-[10px] font-light">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="relative z-[20] px-20 h-12 rounded-full font-medium text-base flex items-center gap-2 shadow-[inset_0_4px_48px_0_rgba(126,186,238,0.22)] border-2 border-[#FFFFFF66] bg-gradient-to-r from-[#FFE999] to-[#8ED0F3] text-[#151C2B] hover:from-[#FCF5DE] hover:to-[#90D6FB] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8ED0F3]/30"
              style={{
                backdropFilter: 'blur(24px)',
                backgroundSize: '105% 105%',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
                fontSize: '15px',
              }}
              onClick={() => {
                window.open(
                  'https://www.boat-lifestyle.com/products/boat-valour-watch-1-gps-smartwatch-with-inbuilt-gps',
                  '_blank'
                )
              }}
            >
              Order Now
            </button>
          </div>

          {/* Background watch images */}
          <img
            src="/mobile-watch.svg"
            alt="Valour Watch"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[35%] w-full bg-no-repeat bg-contain bg-center z-[5] pointer-events-none"
          />
          <div
            className="absolute -top-[130px] left-0 w-full h-full z-[1] bg-no-repeat bg-center pointer-events-none"
            style={{
              backgroundImage: "url('/watch-light.svg')",
              backgroundSize: '130%',
            }}
          />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:block relative w-full h-[300px] overflow-hidden border border-[#FFFFFF1A] bg-[#091216] rounded-2xl my-6 mx-3">
        {/* Content Container */}
        <div className="relative z-10 h-full flex">
          {/* Left Section - Text and Button */}
          <div className="w-1/3 flex flex-col justify-center items-start px-10">
            <h2 className="text-white text-2xl font-light mb-4 leading-tight">
              Meet the
            </h2>

            <div className="flex items-center gap-3 mb-6">
              <img
                src="/valour.svg"
                alt="Valour Logo"
                className="w-[150px] h-auto"
              />
              <span className="text-white text-4xl font-light whitespace-nowrap">
                WATCH 1 GPS
              </span>
            </div>

            <button
              type="button"
              className="relative z-[20] w-max px-20 h-12 rounded-full font-medium text-base shadow-[inset_0_4px_48px_0_rgba(126,186,238,0.22)] border-2 border-[#FFFFFF66] bg-gradient-to-r from-[#FFE999] to-[#8ED0F3] text-[#151C2B] hover:from-[#FCF5DE] hover:to-[#90D6FB] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8ED0F3]/30"
              style={{
                backdropFilter: 'blur(24px)',
                backgroundSize: '105% 105%',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
                fontSize: '15px',
              }}
              onClick={() => {
                window.open(
                  'https://www.boat-lifestyle.com/products/boat-valour-watch-1-gps-smartwatch-with-inbuilt-gps',
                  '_blank'
                )
              }}
            >
              Order Now
            </button>
          </div>

          {/* Center Section - Watch Image */}
          <div className="w-1/3 ">
            <div
              className="absolute -inset-y-0 -right-36 w-full bg-no-repeat bg-contain bg-center z-[5] pointer-events-none"
              style={{
                backgroundImage: "url('/product-desktop.svg')",
              }}
            />
          </div>

          {/* Right Section - Features Grid */}
          <div className="w-1/3 grid grid-cols-3 grid-rows-2 gap-5 place-items-center px-8 relative z-10">
            {[
              {
                icon: '/calling.svg',
                label: 'Crystal Clear Bluetooth Calling',
              },
              { icon: '/watch.svg', label: 'Dynamic Auto Change Watchfaces' },
              { icon: '/navigation.svg', label: 'Turn-by Turn Navigation' },
              { icon: '/qr.svg', label: 'QR Tray' },
              { icon: '/moon.svg', label: 'Advanced Sleep Insights' },
              { icon: '/step.svg', label: 'Step Count' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-5 h-5 mb-2"
                />
                <span className="text-white text-xs font-light">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
