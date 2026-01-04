import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const sections = [
  { id: 'chat', icon: 'MessageCircle', title: 'Чаты', gradient: 'from-primary to-secondary' },
  { id: 'games', icon: 'Gamepad2', title: 'Игры', gradient: 'from-secondary to-accent' },
  { id: 'dating', icon: 'Heart', title: 'Знакомства', gradient: 'from-accent to-blue-accent' },
  { id: 'music', icon: 'Music', title: 'Музыка', gradient: 'from-blue-accent to-primary' },
  { id: 'karaoke', icon: 'Mic2', title: 'Караоке', gradient: 'from-primary to-orange-accent' },
  { id: 'video', icon: 'Video', title: 'Видео', gradient: 'from-orange-accent to-secondary' }
];

const recommendedFriends = [
  { id: 1, name: 'Алиса', status: 'online', avatar: '👩‍🎤', interests: ['Музыка', 'Игры'] },
  { id: 2, name: 'Максим', status: 'online', avatar: '🎮', interests: ['Игры', 'Видео'] },
  { id: 3, name: 'Софья', status: 'away', avatar: '🎨', interests: ['Музыка', 'Караоке'] },
  { id: 4, name: 'Даниил', status: 'online', avatar: '🎸', interests: ['Караоке', 'Чаты'] }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      <header className="border-b border-border backdrop-blur-sm bg-card/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse-glow">
              <Icon name="Rocket" className="text-white" size={24} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              ConnectHub
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="animate-fade-in">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Онлайн
            </Badge>
            <Avatar className="w-10 h-10 border-2 border-primary animate-scale-in cursor-pointer hover:scale-110 transition-transform">
              <div className="w-full h-full flex items-center justify-center text-2xl">😊</div>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Что будем делать сегодня?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <Card
                key={section.id}
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 animate-scale-in ${
                  activeSection === section.id ? 'border-primary shadow-xl' : 'border-transparent'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setActiveSection(section.id)}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${section.gradient} flex items-center justify-center mb-4 animate-pulse-glow`}>
                  <Icon name={section.icon as any} className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {section.id === 'chat' && 'Общайтесь с друзьями в реальном времени'}
                  {section.id === 'games' && 'Играйте в любимые игры вместе'}
                  {section.id === 'dating' && 'Находите новых интересных людей'}
                  {section.id === 'music' && 'Слушайте музыку с друзьями'}
                  {section.id === 'karaoke' && 'Пойте любимые песни'}
                  {section.id === 'video' && 'Смотрите видео вместе'}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Рекомендуем познакомиться
            </h2>
            <Icon name="Sparkles" className="text-accent animate-pulse" size={24} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedFriends.map((friend, index) => (
              <Card
                key={friend.id}
                className="p-4 hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer animate-scale-in"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-3">
                    <Avatar className="w-20 h-20 border-4 border-primary/50 animate-pulse-glow">
                      <div className="w-full h-full flex items-center justify-center text-4xl">
                        {friend.avatar}
                      </div>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-card ${
                      friend.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                    } animate-pulse`}></div>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{friend.name}</h4>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {friend.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  <button className="mt-3 w-full py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg transition-all">
                    Добавить
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 animate-fade-in" style={{ animationDelay: '1.1s' }}>
          <div className="flex items-center gap-4 mb-4">
            <Icon name="Zap" className="text-accent" size={32} />
            <h3 className="text-2xl font-bold">Сейчас активно</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 rounded-xl bg-card/50 backdrop-blur">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                1,234
              </div>
              <div className="text-sm text-muted-foreground">В чатах</div>
            </div>
            <div className="p-4 rounded-xl bg-card/50 backdrop-blur">
              <div className="text-3xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                567
              </div>
              <div className="text-sm text-muted-foreground">В играх</div>
            </div>
            <div className="p-4 rounded-xl bg-card/50 backdrop-blur">
              <div className="text-3xl font-bold bg-gradient-to-r from-accent to-blue-accent bg-clip-text text-transparent">
                890
              </div>
              <div className="text-sm text-muted-foreground">Слушают музыку</div>
            </div>
            <div className="p-4 rounded-xl bg-card/50 backdrop-blur">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-accent to-primary bg-clip-text text-transparent">
                345
              </div>
              <div className="text-sm text-muted-foreground">Смотрят видео</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
