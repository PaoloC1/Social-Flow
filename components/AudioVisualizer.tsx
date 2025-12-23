import React from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isActive }) => {
  return (
    <div className="flex items-center justify-center space-x-2 h-16">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-3 bg-indigo-500 rounded-full transition-all duration-300 ${
            isActive ? 'animate-pulse' : 'h-2 bg-gray-300'
          }`}
          style={{
            height: isActive ? `${Math.random() * 40 + 20}px` : '8px',
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );
};