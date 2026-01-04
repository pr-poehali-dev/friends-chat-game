import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type BlockType = 'grass' | 'dirt' | 'stone' | 'wood' | 'leaves' | 'water' | 'coal' | 'iron' | 'gold' | 'diamond' | null;

interface Block {
  type: BlockType;
  x: number;
  y: number;
}

interface InventoryItem {
  type: BlockType;
  count: number;
}

interface CraftRecipe {
  name: string;
  result: BlockType;
  ingredients: { type: BlockType; count: number }[];
  emoji: string;
}

const blockColors: Record<string, string> = {
  grass: '#7CB342',
  dirt: '#795548',
  stone: '#607D8B',
  wood: '#8D6E63',
  leaves: '#66BB6A',
  water: '#1976D2',
  coal: '#212121',
  iron: '#CFD8DC',
  gold: '#FFC107',
  diamond: '#00BCD4'
};

const blockEmojis: Record<string, string> = {
  grass: '🟩',
  dirt: '🟫',
  stone: '⬜',
  wood: '🪵',
  leaves: '🌿',
  water: '💧',
  coal: '⚫',
  iron: '⚪',
  gold: '🟨',
  diamond: '💎'
};

const craftRecipes: CraftRecipe[] = [
  { name: 'Доски', result: 'wood', ingredients: [{ type: 'wood', count: 1 }], emoji: '🪵' },
  { name: 'Кирка', result: 'stone', ingredients: [{ type: 'wood', count: 3 }, { type: 'stone', count: 2 }], emoji: '⛏️' }
];

export const MinecraftGame = () => {
  const [world, setWorld] = useState<Block[][]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { type: 'grass', count: 0 },
    { type: 'dirt', count: 0 },
    { type: 'stone', count: 0 },
    { type: 'wood', count: 0 },
    { type: 'coal', count: 0 },
    { type: 'iron', count: 0 },
    { type: 'gold', count: 0 },
    { type: 'diamond', count: 0 }
  ]);
  const [selectedBlock, setSelectedBlock] = useState<BlockType>('grass');
  const [playerPos, setPlayerPos] = useState({ x: 5, y: 5 });
  const [health, setHealth] = useState(20);
  const [hunger, setHunger] = useState(20);
  const [gameMode, setGameMode] = useState<'survival' | 'creative'>('survival');
  const [showCraft, setShowCraft] = useState(false);

  useEffect(() => {
    const newWorld: Block[][] = [];
    for (let y = 0; y < 12; y++) {
      const row: Block[] = [];
      for (let x = 0; x < 16; x++) {
        let blockType: BlockType = null;
        
        if (y < 3) {
          blockType = 'grass';
        } else if (y < 6) {
          blockType = Math.random() > 0.7 ? 'dirt' : 'stone';
        } else if (y < 8) {
          if (Math.random() > 0.9) blockType = 'coal';
          else if (Math.random() > 0.95) blockType = 'iron';
          else blockType = 'stone';
        } else if (y < 10) {
          if (Math.random() > 0.95) blockType = 'gold';
          else if (Math.random() > 0.98) blockType = 'diamond';
          else blockType = 'stone';
        } else {
          blockType = 'stone';
        }
        
        row.push({ type: blockType, x, y });
      }
      newWorld.push(row);
    }
    setWorld(newWorld);
  }, []);

  useEffect(() => {
    if (gameMode === 'survival') {
      const interval = setInterval(() => {
        setHunger(prev => Math.max(0, prev - 1));
        if (hunger === 0) {
          setHealth(prev => Math.max(0, prev - 1));
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [gameMode, hunger]);

  const mineBlock = (x: number, y: number) => {
    const block = world[y]?.[x];
    if (!block || !block.type) return;

    const newWorld = [...world];
    const minedType = newWorld[y][x].type;
    newWorld[y][x] = { ...newWorld[y][x], type: null };
    setWorld(newWorld);

    setInventory(prev => {
      const newInv = [...prev];
      const item = newInv.find(i => i.type === minedType);
      if (item) {
        item.count++;
      }
      return newInv;
    });

    if (gameMode === 'survival') {
      setHunger(prev => Math.max(0, prev - 1));
    }
  };

  const placeBlock = (x: number, y: number) => {
    if (!selectedBlock) return;
    
    const item = inventory.find(i => i.type === selectedBlock);
    if (gameMode === 'survival' && (!item || item.count === 0)) return;

    const newWorld = [...world];
    if (newWorld[y]?.[x]) {
      newWorld[y][x] = { ...newWorld[y][x], type: selectedBlock };
      setWorld(newWorld);

      if (gameMode === 'survival') {
        setInventory(prev => {
          const newInv = [...prev];
          const invItem = newInv.find(i => i.type === selectedBlock);
          if (invItem && invItem.count > 0) {
            invItem.count--;
          }
          return newInv;
        });
      }
    }
  };

  const movePlayer = (dx: number, dy: number) => {
    setPlayerPos(prev => ({
      x: Math.max(0, Math.min(15, prev.x + dx)),
      y: Math.max(0, Math.min(11, prev.y + dy))
    }));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'w') movePlayer(0, -1);
      if (e.key === 'ArrowDown' || e.key === 's') movePlayer(0, 1);
      if (e.key === 'ArrowLeft' || e.key === 'a') movePlayer(-1, 0);
      if (e.key === 'ArrowRight' || e.key === 'd') movePlayer(1, 0);
      if (e.key === ' ') mineBlock(playerPos.x, playerPos.y);
      if (e.key === 'e') placeBlock(playerPos.x, playerPos.y);
      if (e.key === 'c') setShowCraft(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPos, selectedBlock, inventory, gameMode]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold text-[#7CB342]" style={{ fontFamily: 'monospace' }}>
            MINECRAFT
          </h2>
          <Badge 
            variant={gameMode === 'survival' ? 'default' : 'secondary'}
            className="cursor-pointer"
            onClick={() => setGameMode(gameMode === 'survival' ? 'creative' : 'survival')}
          >
            {gameMode === 'survival' ? '⚔️ Выживание' : '🎨 Творчество'}
          </Badge>
        </div>
        
        {gameMode === 'survival' && (
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-red-500">❤️</span>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-4 h-4 ${i < health / 2 ? 'bg-red-500' : 'bg-gray-700'} border border-gray-600`}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>🍖</span>
              <div className="flex gap-1">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-4 h-4 ${i < hunger / 2 ? 'bg-orange-500' : 'bg-gray-700'} border border-gray-600`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <Card className="p-4 bg-black border-4 border-gray-700">
            <div className="grid gap-1">
              {world.map((row, y) => (
                <div key={y} className="flex gap-1">
                  {row.map((block, x) => (
                    <div
                      key={`${x}-${y}`}
                      className="w-8 h-8 border border-gray-800 cursor-pointer transition-all hover:scale-110 relative"
                      style={{
                        backgroundColor: block.type ? blockColors[block.type] : '#000',
                      }}
                      onClick={() => mineBlock(x, y)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        placeBlock(x, y);
                      }}
                    >
                      {playerPos.x === x && playerPos.y === y && (
                        <div className="absolute inset-0 flex items-center justify-center text-2xl animate-pulse">
                          😊
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Card>

          <Card className="mt-4 p-4 bg-gray-900 border-2 border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-[#7CB342]">Инвентарь</h3>
            <div className="grid grid-cols-8 gap-2">
              {inventory.map((item, i) => (
                item.type && (
                  <div
                    key={i}
                    className={`p-3 border-2 cursor-pointer transition-all hover:scale-105 ${
                      selectedBlock === item.type ? 'border-[#7CB342] bg-[#7CB342]/20' : 'border-gray-600 bg-gray-800'
                    }`}
                    onClick={() => setSelectedBlock(item.type)}
                  >
                    <div className="text-2xl text-center mb-1">{blockEmojis[item.type]}</div>
                    <div className="text-xs text-center text-white font-bold">{item.count}</div>
                  </div>
                )
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-4 bg-gray-900 border-2 border-gray-700">
            <h3 className="text-lg font-bold mb-3 text-[#7CB342]">Управление</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 p-2 bg-gray-800 rounded">
                <span className="font-bold">WASD</span>
                <span className="text-gray-400">Движение</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-800 rounded">
                <span className="font-bold">ЛКМ</span>
                <span className="text-gray-400">Копать</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-800 rounded">
                <span className="font-bold">ПКМ</span>
                <span className="text-gray-400">Ставить</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-800 rounded">
                <span className="font-bold">SPACE</span>
                <span className="text-gray-400">Копать под собой</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-800 rounded">
                <span className="font-bold">E</span>
                <span className="text-gray-400">Ставить под собой</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-gray-800 rounded">
                <span className="font-bold">C</span>
                <span className="text-gray-400">Крафт</span>
              </div>
            </div>
          </Card>

          {showCraft && (
            <Card className="p-4 bg-gray-900 border-2 border-[#7CB342]">
              <h3 className="text-lg font-bold mb-3 text-[#7CB342]">Крафт</h3>
              <div className="space-y-2">
                {craftRecipes.map((recipe, i) => (
                  <div key={i} className="p-3 bg-gray-800 rounded border border-gray-700">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{recipe.emoji}</span>
                      <span className="font-bold text-white">{recipe.name}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {recipe.ingredients.map((ing, j) => (
                        <div key={j}>
                          {blockEmojis[ing.type!]} x{ing.count}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          <Card className="p-4 bg-gray-800/50 border-2 border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Info" className="text-[#7CB342]" size={20} />
              <span className="font-bold text-[#7CB342]">Подсказка</span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Копай блоки, чтобы собрать ресурсы! Алмазы находятся глубоко под землёй. В режиме выживания следи за здоровьем и голодом!
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};
