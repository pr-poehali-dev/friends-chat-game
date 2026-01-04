import { useState, useEffect } from 'react';
import { CarDashboard } from '@/components/CarDashboard';
import { CarRadio } from '@/components/CarRadio';
import { OnlinePlayers } from '@/components/OnlinePlayers';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [fuel, setFuel] = useState(100);
  const [leftBlinker, setLeftBlinker] = useState(false);
  const [rightBlinker, setRightBlinker] = useState(false);
  const [lights, setLights] = useState(false);
  const [accelerating, setAccelerating] = useState(false);
  const [braking, setBraking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSpeed(prev => {
        let newSpeed = prev;
        
        if (accelerating && prev < 240) {
          newSpeed = Math.min(240, prev + 2);
          setFuel(f => Math.max(0, f - 0.05));
        } else if (braking && prev > 0) {
          newSpeed = Math.max(0, prev - 4);
        } else if (!accelerating && !braking && prev > 0) {
          newSpeed = Math.max(0, prev - 0.5);
        }
        
        return newSpeed;
      });

      setRpm(prev => {
        if (accelerating && prev < 7000) {
          return Math.min(7000, prev + 150);
        } else if (braking || !accelerating) {
          return Math.max(800, prev - 100);
        }
        return prev;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [accelerating, braking]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
        setAccelerating(true);
      }
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        setBraking(true);
      }
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        setLeftBlinker(true);
      }
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        setRightBlinker(true);
      }
      if (e.key === 'l' || e.key === 'L') {
        setLights(prev => !prev);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') {
        setAccelerating(false);
      }
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') {
        setBraking(false);
      }
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        setLeftBlinker(false);
      }
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        setRightBlinker(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00FF88] to-[#00CC70] flex items-center justify-center">
              <Icon name="Car" className="text-black" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-[#00FF88]" style={{ fontFamily: 'Orbitron' }}>
              CAR SIMULATOR
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm" style={{ fontFamily: 'Orbitron' }}>ONLINE</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <CarDashboard 
              speed={speed}
              rpm={rpm}
              fuel={fuel}
              leftBlinker={leftBlinker}
              rightBlinker={rightBlinker}
              lights={lights}
            />
          </div>
          <div>
            <OnlinePlayers />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <CarRadio />
          </div>
          <Card className="bg-gray-900 border-2 border-gray-700 p-6">
            <h3 className="text-xl font-bold text-[#00FF88] mb-4" style={{ fontFamily: 'Orbitron' }}>
              УПРАВЛЕНИЕ
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00FF88] to-[#00CC70] flex items-center justify-center font-bold text-black">
                  W
                </div>
                <span className="text-gray-300">Газ / Ускорение</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B35] to-[#CC4420] flex items-center justify-center font-bold text-white">
                  S
                </div>
                <span className="text-gray-300">Тормоз</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center font-bold">
                  A
                </div>
                <span className="text-gray-300">Левый поворотник</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center font-bold">
                  D
                </div>
                <span className="text-gray-300">Правый поворотник</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFD23F] to-[#FFA500] flex items-center justify-center font-bold text-black">
                  L
                </div>
                <span className="text-gray-300">Фары</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Info" className="text-[#00FF88]" size={20} />
                <span className="font-semibold text-[#00FF88]" style={{ fontFamily: 'Orbitron' }}>
                  СОВЕТ
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Следите за уровнем топлива и оборотами двигателя. При превышении 6000 об/мин стрелка станет красной!
              </p>
            </div>
          </Card>
        </div>

        <div className="relative h-32 bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl border-2 border-gray-700 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent animate-pulse"
              style={{ 
                animation: speed > 0 ? `slide ${10 - (speed / 30)}s linear infinite` : 'none',
                left: '25%'
              }}
            ></div>
            <div 
              className="w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent animate-pulse"
              style={{ 
                animation: speed > 0 ? `slide ${10 - (speed / 30)}s linear infinite` : 'none',
                left: '50%',
                animationDelay: '0.5s'
              }}
            ></div>
            <div 
              className="w-1 h-full bg-gradient-to-b from-transparent via-white to-transparent animate-pulse"
              style={{ 
                animation: speed > 0 ? `slide ${10 - (speed / 30)}s linear infinite` : 'none',
                left: '75%',
                animationDelay: '1s'
              }}
            ></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl">{speed > 0 ? '🚗' : '🅿️'}</span>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes slide {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Index;
