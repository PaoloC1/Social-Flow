
import React from 'react';
import { PerformanceMetrics } from '../types';

interface RadarChartProps {
  metrics: PerformanceMetrics;
  target?: PerformanceMetrics;
}

export const RadarChart: React.FC<RadarChartProps> = ({ metrics, target }) => {
  const labels: (keyof PerformanceMetrics)[] = [
    'fluidita', 'entropia', 'lagTime', 'balbuzia', 
    'centralita', 'iniziativa', 'volumeVoce', 'contattoVisivo'
  ];
  
  const size = 300;
  const center = size / 2;
  const radius = center - 40;
  const angleStep = (Math.PI * 2) / labels.length;

  const getPoint = (value: number, index: number) => {
    const factor = value / 5;
    const x = center + radius * factor * Math.cos(index * angleStep - Math.PI / 2);
    const y = center + radius * factor * Math.sin(index * angleStep - Math.PI / 2);
    return `${x},${y}`;
  };

  const dataPoints = labels.map((l, i) => getPoint(metrics[l], i)).join(' ');
  const targetPoints = target ? labels.map((l, i) => getPoint(target[l], i)).join(' ') : null;

  return (
    <div className="flex justify-center items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Griglia */}
        {[1, 2, 3, 4, 5].map(v => (
          <polygon
            key={v}
            points={labels.map((_, i) => getPoint(v, i)).join(' ')}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
        ))}
        {/* Assi */}
        {labels.map((_, i) => {
          const p = getPoint(5, i).split(',');
          return (
            <line
              key={i}
              x1={center} y1={center}
              x2={p[0]} y2={p[1]}
              stroke="#E2E8F0"
            />
          );
        })}
        {/* Label */}
        {labels.map((l, i) => {
          const p = getPoint(5.8, i).split(',');
          return (
            <text
              key={i}
              x={p[0]} y={p[1]}
              textAnchor="middle"
              className="text-[10px] font-bold fill-slate-400 uppercase"
            >
              {l.replace(/([A-Z])/g, ' $1')}
            </text>
          );
        })}
        {/* Target Area (Green) */}
        {targetPoints && (
          <polygon
            points={targetPoints}
            fill="rgba(20, 184, 166, 0.1)"
            stroke="rgba(20, 184, 166, 0.3)"
            strokeWidth="1"
            strokeDasharray="4"
          />
        )}
        {/* User Data Area */}
        <polygon
          points={dataPoints}
          fill="rgba(20, 184, 166, 0.4)"
          stroke="#14B8A6"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};
