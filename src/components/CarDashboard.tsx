import { useEffect, useState } from 'react';

interface CarDashboardProps {
  speed: number;
  rpm: number;
  fuel: number;
  leftBlinker: boolean;
  rightBlinker: boolean;
  lights: boolean;
}

export const CarDashboard = ({ speed, rpm, fuel, leftBlinker, rightBlinker, lights }: CarDashboardProps) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const speedRotation = (speed / 240) * 270 - 135;
  const rpmRotation = (rpm / 8000) * 270 - 135;
  const fuelWidth = (fuel / 100) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl shadow-2xl border-4 border-gray-700">
      <div className="grid grid-cols-2 gap-8 mb-6">
        <div className="relative">
          <div className="w-64 h-64 mx-auto relative">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="#1a1a1a" stroke="#333" strokeWidth="4"/>
              <circle cx="100" cy="100" r="85" fill="none" stroke="#00FF88" strokeWidth="2" opacity="0.3"/>
              
              {[0, 30, 60, 90, 120, 150, 180, 210, 240].map((val, i) => {
                const angle = (val / 240) * 270 - 135;
                const rad = (angle * Math.PI) / 180;
                const x1 = 100 + 75 * Math.cos(rad);
                const y1 = 100 + 75 * Math.sin(rad);
                const x2 = 100 + 85 * Math.cos(rad);
                const y2 = 100 + 85 * Math.sin(rad);
                return (
                  <g key={val}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#00FF88" strokeWidth="2"/>
                    <text 
                      x={100 + 60 * Math.cos(rad)} 
                      y={100 + 60 * Math.sin(rad)} 
                      fill="#00FF88" 
                      fontSize="12" 
                      textAnchor="middle" 
                      dominantBaseline="middle"
                      fontFamily="Orbitron"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}
              
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="30"
                stroke="#00FF88"
                strokeWidth="3"
                strokeLinecap="round"
                transform={`rotate(${speedRotation} 100 100)`}
                style={{ transition: 'transform 0.3s ease-out' }}
              />
              <circle cx="100" cy="100" r="8" fill="#00FF88"/>
              
              <text x="100" y="140" fill="#00FF88" fontSize="24" textAnchor="middle" fontFamily="Orbitron" fontWeight="700">
                {Math.round(speed)}
              </text>
              <text x="100" y="160" fill="#00FF88" fontSize="12" textAnchor="middle" fontFamily="Orbitron">
                КМ/Ч
              </text>
            </svg>
          </div>
          <div className="text-center mt-2">
            <span className="text-2xl font-bold text-[#00FF88]" style={{ fontFamily: 'Orbitron' }}>СПИДОМЕТР</span>
          </div>
        </div>

        <div className="relative">
          <div className="w-64 h-64 mx-auto relative">
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="90" fill="#1a1a1a" stroke="#333" strokeWidth="4"/>
              <circle cx="100" cy="100" r="85" fill="none" stroke="#FF6B35" strokeWidth="2" opacity="0.3"/>
              
              {[0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000].map((val, i) => {
                const angle = (val / 8000) * 270 - 135;
                const rad = (angle * Math.PI) / 180;
                const x1 = 100 + 75 * Math.cos(rad);
                const y1 = 100 + 75 * Math.sin(rad);
                const x2 = 100 + 85 * Math.cos(rad);
                const y2 = 100 + 85 * Math.sin(rad);
                const color = val > 6000 ? '#FF0000' : '#FF6B35';
                return (
                  <g key={val}>
                    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="2"/>
                    <text 
                      x={100 + 60 * Math.cos(rad)} 
                      y={100 + 60 * Math.sin(rad)} 
                      fill={color} 
                      fontSize="10" 
                      textAnchor="middle" 
                      dominantBaseline="middle"
                      fontFamily="Orbitron"
                    >
                      {val / 1000}
                    </text>
                  </g>
                );
              })}
              
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="30"
                stroke={rpm > 6000 ? '#FF0000' : '#FF6B35'}
                strokeWidth="3"
                strokeLinecap="round"
                transform={`rotate(${rpmRotation} 100 100)`}
                style={{ transition: 'transform 0.2s ease-out' }}
              />
              <circle cx="100" cy="100" r="8" fill={rpm > 6000 ? '#FF0000' : '#FF6B35'}/>
              
              <text x="100" y="140" fill="#FF6B35" fontSize="24" textAnchor="middle" fontFamily="Orbitron" fontWeight="700">
                {Math.round(rpm)}
              </text>
              <text x="100" y="160" fill="#FF6B35" fontSize="12" textAnchor="middle" fontFamily="Orbitron">
                ОБ/МИН
              </text>
            </svg>
          </div>
          <div className="text-center mt-2">
            <span className="text-2xl font-bold text-[#FF6B35]" style={{ fontFamily: 'Orbitron' }}>ТАХОМЕТР</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-8 py-4 bg-gray-900/50 rounded-2xl border border-gray-700">
        <div className="flex items-center gap-6">
          <div 
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
              leftBlinker && blink ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-700/50'
            }`}
          >
            ←
          </div>
          <div 
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
              rightBlinker && blink ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-gray-700/50'
            }`}
          >
            →
          </div>
          <div 
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl transition-all ${
              lights ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 'bg-gray-700/50'
            }`}
          >
            💡
          </div>
        </div>

        <div className="flex-1 mx-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[#FFD23F]" style={{ fontFamily: 'Orbitron', fontSize: '18px' }}>⛽ ТОПЛИВО</span>
            <span className="text-[#FFD23F] text-xl font-bold" style={{ fontFamily: 'Orbitron' }}>
              {Math.round(fuel)}%
            </span>
          </div>
          <div className="h-6 bg-gray-700 rounded-full overflow-hidden border-2 border-gray-600">
            <div 
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-300"
              style={{ width: `${fuelWidth}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
