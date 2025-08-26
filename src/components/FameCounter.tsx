import { Star } from "lucide-react";

interface FameCounterProps {
  fame: number;
  famePerSecond: number;
}

export const FameCounter = ({ fame, famePerSecond }: FameCounterProps) => {
  return (
    <div className="fame-counter p-6 rounded-2xl text-center">
      <div className="flex items-center justify-center gap-2 mb-2">
        <Star className="w-6 h-6 text-primary animate-star-twinkle" />
        <h2 className="text-2xl font-theater font-bold text-primary text-shadow-gold">
          Fame Points
        </h2>
        <Star className="w-6 h-6 text-primary animate-star-twinkle" />
      </div>
      
      <div className="text-4xl font-bold text-foreground mb-2">
        {fame.toLocaleString()}
      </div>
      
      <div className="text-sm text-muted-foreground">
        +{famePerSecond.toFixed(1)} fame/sec
      </div>
    </div>
  );
};