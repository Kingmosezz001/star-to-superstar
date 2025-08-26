import { useState, useEffect, useCallback } from 'react';
import type { Upgrade } from '@/components/UpgradeShop';

interface GameState {
  fame: number;
  famePerClick: number;
  famePerSecond: number;
  upgrades: Upgrade[];
}

const initialUpgrades: Upgrade[] = [
  {
    id: 'acting-classes',
    name: 'Acting Classes',
    description: 'Learn the basics of performance',
    cost: 10,
    effect: 1,
    type: 'click',
    owned: 0,
    icon: '🎭'
  },
  {
    id: 'headshots',
    name: 'Professional Headshots',
    description: 'Get noticed by casting directors',
    cost: 50,
    effect: 5,
    type: 'click',
    owned: 0,
    icon: '📸'
  },
  {
    id: 'street-performance',
    name: 'Street Performance',
    description: 'Earn passive fame from busking',
    cost: 100,
    effect: 1,
    type: 'auto',
    owned: 0,
    icon: '🎪'
  },
  {
    id: 'agent',
    name: 'Talent Agent',
    description: 'Someone to find you work',
    cost: 500,
    effect: 5,
    type: 'auto',
    owned: 0,
    icon: '💼'
  },
  {
    id: 'theater-role',
    name: 'Theater Role',
    description: 'Regular income from stage work',
    cost: 1000,
    effect: 10,
    type: 'auto',
    owned: 0,
    icon: '🎪'
  },
  {
    id: 'tv-commercial',
    name: 'TV Commercial',
    description: 'Boost your fame with advertising',
    cost: 2500,
    effect: 25,
    type: 'auto',
    owned: 0,
    icon: '📺'
  },
  {
    id: 'movie-role',
    name: 'Movie Role',
    description: 'Big screen breakthrough',
    cost: 10000,
    effect: 100,
    type: 'auto',
    owned: 0,
    icon: '🎬'
  }
];

export const useActorGame = () => {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem('actor-game-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          upgrades: initialUpgrades.map(upgrade => {
            const saved = parsed.upgrades?.find((u: Upgrade) => u.id === upgrade.id);
            return saved ? { ...upgrade, owned: saved.owned, cost: saved.cost } : upgrade;
          })
        };
      } catch {
        // If parsing fails, use default state
      }
    }
    
    return {
      fame: 0,
      famePerClick: 1,
      famePerSecond: 0,
      upgrades: initialUpgrades
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('actor-game-state', JSON.stringify(gameState));
  }, [gameState]);

  // Auto-generate fame per second
  useEffect(() => {
    if (gameState.famePerSecond > 0) {
      const interval = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          fame: prev.fame + prev.famePerSecond
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState.famePerSecond]);

  const performAction = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      fame: prev.fame + prev.famePerClick
    }));
  }, []);

  const purchaseUpgrade = useCallback((upgradeId: string) => {
    setGameState(prev => {
      const upgrade = prev.upgrades.find(u => u.id === upgradeId);
      if (!upgrade || prev.fame < upgrade.cost) return prev;

      const updatedUpgrades = prev.upgrades.map(u => {
        if (u.id === upgradeId) {
          return {
            ...u,
            owned: u.owned + 1,
            cost: Math.floor(u.cost * 1.15) // Increase cost by 15% each time
          };
        }
        return u;
      });

      // Calculate new fame per click/second
      let newFamePerClick = 1;
      let newFamePerSecond = 0;

      updatedUpgrades.forEach(u => {
        if (u.type === 'click') {
          newFamePerClick += u.effect * u.owned;
        } else {
          newFamePerSecond += u.effect * u.owned;
        }
      });

      return {
        ...prev,
        fame: prev.fame - upgrade.cost,
        famePerClick: newFamePerClick,
        famePerSecond: newFamePerSecond,
        upgrades: updatedUpgrades
      };
    });
  }, []);

  return {
    ...gameState,
    performAction,
    purchaseUpgrade
  };
};