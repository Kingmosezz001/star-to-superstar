import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effect: number;
  type: 'click' | 'auto';
  owned: number;
  icon: string;
}

interface UpgradeShopProps {
  upgrades: Upgrade[];
  fame: number;
  onPurchase: (upgradeId: string) => void;
}

export const UpgradeShop = ({ upgrades, fame, onPurchase }: UpgradeShopProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-theater font-bold text-primary text-center">
        Career Upgrades
      </h3>
      
      <div className="grid gap-4 max-h-96 overflow-y-auto">
        {upgrades.map((upgrade) => {
          const canAfford = fame >= upgrade.cost;
          
          return (
            <Card 
              key={upgrade.id} 
              className="upgrade-card hover:border-primary/50 transition-all duration-300"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="text-2xl">{upgrade.icon}</span>
                    {upgrade.name}
                  </CardTitle>
                  {upgrade.owned > 0 && (
                    <Badge variant="secondary" className="bg-primary/20 text-primary">
                      {upgrade.owned}
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm">
                  {upgrade.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    {upgrade.type === 'click' 
                      ? `+${upgrade.effect} fame per click`
                      : `+${upgrade.effect} fame per second`
                    }
                  </div>
                  
                  <Button
                    onClick={() => onPurchase(upgrade.id)}
                    disabled={!canAfford}
                    variant={canAfford ? "default" : "secondary"}
                    size="sm"
                    className="min-w-20"
                  >
                    ${upgrade.cost.toLocaleString()}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};