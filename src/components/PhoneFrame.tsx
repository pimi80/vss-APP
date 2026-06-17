import { ReactNode } from 'react';

interface PhoneFrameProps {
  children: ReactNode;
}

export default function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #dc2626 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)' }} />
      </div>

      {/* Desktop: show phone frame; Mobile: full screen */}
      <div className="relative w-full h-full md:w-[420px] md:h-[calc(100vh-40px)] md:max-h-[900px]">
        {/* Phone bezel (desktop only) */}
        <div className="hidden md:block absolute -inset-3 rounded-[3rem] bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 shadow-2xl shadow-black/50">
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/5 to-transparent" />
          {/* Side buttons */}
          <div className="absolute right-[-6px] top-32 w-[3px] h-16 rounded-r-full bg-gray-600" />
          <div className="absolute right-[-6px] top-52 w-[3px] h-10 rounded-r-full bg-gray-600" />
          <div className="absolute left-[-6px] top-40 w-[3px] h-20 rounded-l-full bg-gray-600" />
        </div>

        {/* Screen content */}
        <div className="relative w-full h-full md:rounded-[2.2rem] overflow-hidden bg-brand-darker z-10">
          {/* Notch (desktop only) */}
          <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-black rounded-b-2xl z-50 items-end justify-center pb-1">
            <div className="w-16 h-1 rounded-full bg-gray-700" />
          </div>

          {/* Status bar */}
          <div className="hidden md:flex h-7 bg-brand-darker items-center justify-between px-8 text-white/50 text-[10px] z-40 relative">
            <span dir="ltr">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px]">
                <div className="w-[3px] h-[6px] rounded-[1px] bg-white/40" />
                <div className="w-[3px] h-[8px] rounded-[1px] bg-white/40" />
                <div className="w-[3px] h-[10px] rounded-[1px] bg-white/40" />
                <div className="w-[3px] h-[12px] rounded-[1px] bg-white/30" />
              </div>
              <span className="ml-1">WiFi</span>
              <div className="w-6 h-3 rounded-sm border border-white/30 flex items-center px-[2px]">
                <div className="w-3.5 h-1.5 rounded-[1px] bg-green-400" />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="w-full h-full md:h-[calc(100%-27px)] flex flex-col">
            {children}
          </div>
        </div>
      </div>

      {/* Desktop branding text */}
      <div className="hidden md:block absolute bottom-4 text-center">
        <p className="text-white/10 text-xs"><span className="italic font-semibold" dir="ltr"><span className="text-red-500/20">v</span><span className="text-blue-500/20">ss</span></span> Browser — پیش‌نمایش وب</p>
      </div>
    </div>
  );
}
