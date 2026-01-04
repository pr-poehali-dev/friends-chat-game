import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Player {
  id: number;
  name: string;
  speed: number;
  car: string;
  emoji: string;
  distance: number;
}

const carEmojis = ['🚗', '🚙', '🚕', '🏎️', '🚓', '🚐'];

const generateRandomPlayer = (id: number): Player => ({
  id,
  name: `Игрок ${id}`,
  speed: Math.floor(Math.random() * 180) + 20,
  car: ['BMW', 'Audi', 'Mercedes', 'Toyota', 'Honda', 'Ford'][Math.floor(Math.random() * 6)],
  emoji: carEmojis[Math.floor(Math.random() * carEmojis.length)],
  distance: Math.floor(Math.random() * 500) + 50
});

export const OnlinePlayers = () => {
  const [players, setPlayers] = useState<Player[]>([
    generateRandomPlayer(1),
    generateRandomPlayer(2),
    generateRandomPlayer(3),
    generateRandomPlayer(4)
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(prev => prev.map(player => ({
        ...player,
        speed: Math.max(0, player.speed + (Math.random() * 20 - 10)),
        distance: Math.max(10, player.distance + (Math.random() * 100 - 50))
      })));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="w-full max-w-md bg-gray-900/95 border-2 border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Orbitron' }}>
          ИГРОКИ ОНЛАЙН
        </h3>
        <Badge className="bg-green-500 text-black font-bold">
          {players.length}
        </Badge>
      </div>

      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.id}
            className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-[#00FF88] transition-all"
          >
            <Avatar className="w-12 h-12 bg-gray-700 border-2 border-[#00FF88]">
              <div className="w-full h-full flex items-center justify-center text-2xl">
                {player.emoji}
              </div>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-semibold" style={{ fontFamily: 'Orbitron' }}>
                  {player.name}
                </span>
                <Badge variant="outline" className="text-[#00FF88] border-[#00FF88]">
                  {Math.round(player.speed)} км/ч
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">{player.car}</span>
                <span className="text-gray-500">{Math.round(player.distance)}м</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-700 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm">Синхронизация в реальном времени</span>
        </div>
      </div>
    </Card>
  );
};
