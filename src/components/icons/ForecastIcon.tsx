import { SVGProps } from 'react';

export const ForecastIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="forecast-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(25 95% 53%)" />
        <stop offset="100%" stopColor="hsl(45 100% 60%)" />
      </linearGradient>
    </defs>
    
    {/* Outer circle representing global markets */}
    <circle 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="url(#forecast-gradient)" 
      strokeWidth="2" 
      fill="none"
    />
    
    {/* Chart lines representing predictions */}
    <path 
      d="M6 14l3-3 2 2 4-4 3 1" 
      stroke="url(#forecast-gradient)" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill="none"
    />
    
    {/* Central diamond representing value/accuracy */}
    <path 
      d="M12 8l2 2-2 2-2-2z" 
      fill="url(#forecast-gradient)"
    />
    
    {/* Small dots representing data points */}
    <circle cx="9" cy="11" r="1" fill="currentColor" fillOpacity="0.6" />
    <circle cx="11" cy="13" r="1" fill="currentColor" fillOpacity="0.6" />
    <circle cx="15" cy="9" r="1" fill="currentColor" fillOpacity="0.6" />
    <circle cx="18" cy="10" r="1" fill="currentColor" fillOpacity="0.6" />
  </svg>
);