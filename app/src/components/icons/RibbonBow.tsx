import React from 'react';

interface RibbonBowProps {
  className?: string;
  color?: string;
}

export const RibbonBow: React.FC<RibbonBowProps> = ({ 
  className = '', 
  color = '#2B6CB0' 
}) => {
  return (
    <svg 
      viewBox="0 0 200 140" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left loop */}
      <path 
        d="M90 70C90 70 70 20 40 25C10 30 5 70 5 70C5 70 10 110 40 115C70 120 90 70 90 70Z" 
        fill={color}
      />
      {/* Right loop */}
      <path 
        d="M110 70C110 70 130 20 160 25C190 30 195 70 195 70C195 70 190 110 160 115C130 120 110 70 110 70Z" 
        fill={color}
      />
      {/* Center knot */}
      <ellipse cx="100" cy="70" rx="20" ry="25" fill={color} />
      {/* Left ribbon tail */}
      <path 
        d="M85 85C85 85 60 110 50 130C45 140 55 145 60 135C70 115 90 95 90 95" 
        fill={color}
      />
      {/* Right ribbon tail */}
      <path 
        d="M115 85C115 85 140 110 150 130C155 140 145 145 140 135C130 115 110 95 110 95" 
        fill={color}
      />
      {/* Highlight on left loop */}
      <path 
        d="M35 45C30 50 25 65 25 70C25 75 30 90 35 95" 
        stroke="rgba(255,255,255,0.3)" 
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Highlight on right loop */}
      <path 
        d="M165 45C170 50 175 65 175 70C175 75 170 90 165 95" 
        stroke="rgba(255,255,255,0.3)" 
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export default RibbonBow;
