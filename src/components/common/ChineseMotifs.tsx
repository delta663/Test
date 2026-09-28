import React from 'react';

// Abstract Chinese Cloud Pattern (Minimalist hairline curve)
export const CloudAbstractSvg: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M20 70C15 70 10 65 10 58C10 52 14 47 20 46C21 34 32 25 45 25C54 25 62 30 66 38C70 36 74 35 78 35C88 35 96 43 96 53C96 62 88 70 78 70H20Z"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M32 70C32 62 38 56 46 56C52 56 57 60 59 65"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Minimal Chinese Dragon Curve (Geometric contemporary reduction)
export const DragonMinimalSvg: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M85 20C75 20 70 28 65 35C58 45 52 52 40 52C28 52 20 44 20 32C20 22 28 15 38 15C50 15 52 28 45 35C40 40 32 42 25 48C18 54 15 65 18 75C22 85 34 88 45 85C60 80 65 65 75 58C82 52 90 55 92 65"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="82" cy="24" r="2.5" fill="currentColor" />
  </svg>
);

// Bamboo Flow (Linear modern bamboo segments)
export const BambooFlowSvg: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <line x1="35" y1="12" x2="35" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <line x1="35" y1="48" x2="35" y2="88" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <line x1="28" y1="45" x2="42" y2="45" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    
    <line x1="65" y1="18" x2="65" y2="58" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <line x1="65" y1="64" x2="65" y2="92" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    <line x1="58" y1="61" x2="72" y2="61" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    
    <path d="M35 30C45 25 55 28 60 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M65 50C55 55 45 52 40 58" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// Dynamic Chinese Wave (Fluid oceanic ripple)
export const WaveDynamicSvg: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M10 70C25 70 30 50 45 50C60 50 65 70 80 70C88 70 93 64 95 58"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M5 82C20 82 25 65 40 65C55 65 60 82 75 82C88 82 95 72 98 66"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeOpacity="0.7"
    />
    <path
      d="M20 50C32 30 48 30 60 45"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="2 4"
    />
  </svg>
);

// Subtle Chinese Seal / Square Mark
export const ChineseSealMark: React.FC<{ text?: string; className?: string }> = ({
  text = '塑新',
  className = 'w-8 h-8',
}) => (
  <div
    className={`border border-[#B3261E] bg-[#B3261E]/15 text-[#B3261E] flex items-center justify-center font-serif text-[11px] tracking-wider rounded-xs select-none ${className}`}
  >
    {text}
  </div>
);
