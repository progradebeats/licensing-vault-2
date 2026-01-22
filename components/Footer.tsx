
import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const displayYear = currentYear > 2026 ? currentYear : 2026;

  return (
    <footer className="w-full py-12 px-6 border-t border-white/5 bg-[#0a0a0a]">
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center text-center">
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-6 gap-y-2 mb-8 text-sm text-gray-400 font-medium">
          <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
          <span className="text-gray-700 select-none">•</span>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span className="text-gray-700 select-none">•</span>
          <a href="#" className="hover:text-white transition-colors">Master License Agreement</a>
          <span className="text-gray-700 select-none">•</span>
          <a href="#" className="hover:text-white transition-colors">License Tiers</a>
        </div>

        {/* Copyright and Trademark Notices */}
        <div className="space-y-2">
          <p className="text-sm text-gray-500 font-medium tracking-tight">
            © {displayYear} MazeOne Digital Recordings, LLC. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 tracking-tight">
            PROGRADE® is a registered trademark of MazeOne Digital Recordings, LLC.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
