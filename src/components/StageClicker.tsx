import { useState } from "react";
import { Mic } from "lucide-react";

interface StageClickerProps {
  onPerform: () => void;
  famePerClick: number;
}

export const StageClicker = ({ onPerform, famePerClick }: StageClickerProps) => {
  const [clickAnimations, setClickAnimations] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPerform();
    
    // Create floating text animation
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const animationId = Date.now() + Math.random();
    setClickAnimations(prev => [...prev, { id: animationId, x, y }]);
    
    // Remove animation after 1 second
    setTimeout(() => {
      setClickAnimations(prev => prev.filter(anim => anim.id !== animationId));
    }, 1000);
  };

  return (
    <div className="relative spotlight-glow">
      <button
        onClick={handleClick}
        className="stage-button w-48 h-48 flex items-center justify-center text-primary-foreground font-bold text-xl transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        <Mic className="w-20 h-20" />
      </button>
      
      {/* Floating Fame Text */}
      {clickAnimations.map((animation) => (
        <div
          key={animation.id}
          className="absolute pointer-events-none text-primary font-bold text-2xl animate-fame-float"
          style={{
            left: animation.x,
            top: animation.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          +{famePerClick}
        </div>
      ))}
      
      <div className="text-center mt-4">
        <p className="text-muted-foreground">Click to perform!</p>
        <p className="text-sm text-primary">+{famePerClick} fame per click</p>
      </div>
    </div>
  );
};