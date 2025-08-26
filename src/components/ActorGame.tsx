import { FameCounter } from "./FameCounter";
import { StageClicker } from "./StageClicker";
import { UpgradeShop } from "./UpgradeShop";
import { useActorGame } from "@/hooks/useActorGame";

export const ActorGame = () => {
  const { fame, famePerClick, famePerSecond, upgrades, performAction, purchaseUpgrade } = useActorGame();

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header with Title */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-theater font-bold text-primary text-shadow-gold mb-2">
          🎭 Actor Life 🎭
        </h1>
        <p className="text-muted-foreground text-lg">
          Rise from street performer to Hollywood superstar!
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Fame Counter */}
        <div className="space-y-6">
          <FameCounter fame={fame} famePerSecond={famePerSecond} />
        </div>

        {/* Center Column - Main Clicker */}
        <div className="flex flex-col items-center justify-center space-y-8">
          <StageClicker onPerform={performAction} famePerClick={famePerClick} />
          
          {/* Career Progress Indicator */}
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-2">Career Level</div>
            <div className="flex items-center gap-2">
              {fame < 100 && <span className="text-lg">🎭 Street Performer</span>}
              {fame >= 100 && fame < 1000 && <span className="text-lg">🎪 Theater Actor</span>}
              {fame >= 1000 && fame < 5000 && <span className="text-lg">📺 TV Actor</span>}
              {fame >= 5000 && fame < 25000 && <span className="text-lg">🎬 Movie Star</span>}
              {fame >= 25000 && <span className="text-lg">⭐ Hollywood Icon</span>}
            </div>
          </div>
        </div>

        {/* Right Column - Upgrades */}
        <div>
          <UpgradeShop 
            upgrades={upgrades} 
            fame={fame} 
            onPurchase={purchaseUpgrade}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-muted-foreground">
        <p className="text-sm">
          Click the microphone to perform and earn fame! Buy upgrades to boost your career.
        </p>
      </footer>
    </div>
  );
};