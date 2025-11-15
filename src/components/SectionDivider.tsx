
import React from 'react';

interface SectionDividerProps {
  className?: string;
  style?: 'wave' | 'triangle' | 'curved' | 'simple';
  bgTop?: string;
  bgBottom?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ 
  className = "", 
  style = "wave",
  bgTop = "bg-white", 
  bgBottom = "bg-gray-50" 
}) => {
  if (style === 'wave') {
    return (
      <div className={`${className} relative ${bgTop}`}>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden rotate-180">
          <svg 
            className="fill-current text-gray-50 w-full h-16 md:h-24" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
          </svg>
        </div>
      </div>
    );
  } else if (style === 'triangle') {
    return (
      <div className={`${className} relative ${bgTop}`}>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg 
            className="fill-current text-gray-50 w-full h-16 md:h-24" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path d="M1200 0L0 0 598.97 114.72 1200 0z"></path>
          </svg>
        </div>
      </div>
    );
  } else if (style === 'curved') {
    return (
      <div className={`${className} relative ${bgTop}`}>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
          <svg 
            className="fill-current text-gray-50 w-full h-16 md:h-24" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"></path>
          </svg>
        </div>
      </div>
    );
  } else {
    // simple style
    return (
      <div className={`${className} h-12 ${bgTop}`}>
        <div className="container mx-auto px-4">
          <div className="h-0.5 bg-gray-200 w-full max-w-4xl mx-auto"></div>
        </div>
      </div>
    );
  }
};

export default SectionDivider;
