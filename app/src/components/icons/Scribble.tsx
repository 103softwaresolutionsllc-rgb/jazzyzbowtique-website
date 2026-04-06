import React from 'react';

interface ScribbleProps {
  className?: string;
  color?: string;
  variant?: 'line' | 'zigzag' | 'curl';
}

export const Scribble: React.FC<ScribbleProps> = ({ 
  className = '', 
  color = '#2B6CB0',
  variant = 'line'
}) => {
  if (variant === 'zigzag') {
    return (
      <svg 
        viewBox="0 0 100 30" 
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M5 15L20 5L35 25L50 5L65 25L80 5L95 15" 
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  
  if (variant === 'curl') {
    return (
      <svg 
        viewBox="0 0 80 40" 
        className={className}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M5 30C15 10 35 5 45 15C55 25 45 35 35 30C25 25 35 15 50 15C65 15 70 25 75 30" 
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    );
  }
  
  return (
    <svg 
      viewBox="0 0 100 20" 
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M5 10C25 5 35 15 50 10C65 5 75 15 95 10" 
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export default Scribble;
