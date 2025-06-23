import React from "react";

export default function Preloader() {
  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900 transition-opacity duration-1000" 
      id="loading-overlay"
    >
      {/* Three glowing dots with staggered animation */}
      <div className="flex items-center space-x-4">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full bg-teal-400 animate-pulse-glow"
            style={{ 
              animationDelay: `${index * 0.2}s`,
              animationDuration: '1.2s'
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Tailwind custom animations (add to your global CSS or tailwind config):
// .animate-bounce-slow { animation: bounce 1.6s infinite cubic-bezier(0.6,0,0.4,1); }
// .animate-bar-wave { animation: barWave 1.1s infinite cubic-bezier(0.4,0,0.2,1); }
// @keyframes barWave { 0%,100%{transform:scaleY(1);} 20%{transform:scaleY(1.5);} 40%{transform:scaleY(0.7);} 60%{transform:scaleY(1.2);} 80%{transform:scaleY(0.9);} } 