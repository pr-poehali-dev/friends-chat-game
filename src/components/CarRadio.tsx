import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RadioStation {
  id: number;
  name: string;
  genre: string;
  frequency: string;
}

const stations: RadioStation[] = [
  { id: 1, name: 'Hit FM', genre: 'Поп', frequency: '107.9' },
  { id: 2, name: 'Rock Station', genre: 'Рок', frequency: '101.3' },
  { id: 3, name: 'Dance Energy', genre: 'Электроника', frequency: '95.5' },
  { id: 4, name: 'Jazz Lounge', genre: 'Джаз', frequency: '88.7' },
  { id: 5, name: 'Retro Wave', genre: 'Ретро', frequency: '103.2' }
];

interface CarRadioProps {
  onVolumeChange?: (volume: number) => void;
}

export const CarRadio = ({ onVolumeChange }: CarRadioProps) => {
  const [currentStation, setCurrentStation] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(true);

  const station = stations[currentStation];

  const nextStation = () => {
    setCurrentStation((prev) => (prev + 1) % stations.length);
  };

  const prevStation = () => {
    setCurrentStation((prev) => (prev - 1 + stations.length) % stations.length);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    onVolumeChange?.(newVolume);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-gray-700 p-6">
      <div className="text-center mb-6">
        <div className="text-[#00FF88] text-6xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>
          {station.frequency}
        </div>
        <div className="text-white text-2xl font-semibold mb-1" style={{ fontFamily: 'Orbitron' }}>
          {station.name}
        </div>
        <div className="text-gray-400 text-lg" style={{ fontFamily: 'Orbitron' }}>
          {station.genre}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mb-6">
        <button
          onClick={prevStation}
          className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 transition-all flex items-center justify-center hover:scale-110"
        >
          <Icon name="SkipBack" className="text-white" size={24} />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00FF88] to-[#00CC70] hover:scale-110 transition-all flex items-center justify-center shadow-lg shadow-green-500/50"
        >
          <Icon name={isPlaying ? 'Pause' : 'Play'} className="text-black" size={28} />
        </button>

        <button
          onClick={nextStation}
          className="w-14 h-14 rounded-full bg-gray-700 hover:bg-gray-600 transition-all flex items-center justify-center hover:scale-110"
        >
          <Icon name="SkipForward" className="text-white" size={24} />
        </button>
      </div>

      <div className="flex items-center gap-4">
        <Icon name="Volume2" className="text-[#FFD23F]" size={24} />
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => handleVolumeChange(Number(e.target.value))}
          className="flex-1 h-2 rounded-full appearance-none bg-gray-700 outline-none"
          style={{
            background: `linear-gradient(to right, #FFD23F 0%, #FFD23F ${volume}%, #374151 ${volume}%, #374151 100%)`
          }}
        />
        <span className="text-[#FFD23F] font-bold min-w-[3rem] text-right" style={{ fontFamily: 'Orbitron' }}>
          {volume}%
        </span>
      </div>

      {isPlaying && (
        <div className="mt-6 flex justify-center gap-1">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-[#00FF88] rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 40 + 10}px`,
                animationDelay: `${i * 0.05}s`,
                animationDuration: `${Math.random() * 0.5 + 0.5}s`
              }}
            />
          ))}
        </div>
      )}
    </Card>
  );
};
