import { Market } from '@/types/market';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Users, Clock, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketCardProps {
  market: Market;
  onClick?: () => void;
  compact?: boolean;
}

export function MarketCard({ market, onClick, compact = false }: MarketCardProps) {
  const isPriceIncreasing = market.yesPrice > 0.5;
  const timeLeft = new Date(market.endDate).getTime() - new Date().getTime();
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  const formatPrice = (price: number) => `${(price * 100).toFixed(1)}%`;
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `${(volume / 1000).toFixed(1)}K`;
    return volume.toString();
  };

  return (
    <Card 
      className={cn(
        "gradient-card border-border/50 hover:border-primary/30 transition-smooth cursor-pointer shadow-card hover:shadow-glow group",
        compact && "p-3"
      )}
      onClick={onClick}
    >
      <CardHeader className={cn("pb-3", compact && "pb-2")}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant="outline" 
                className="text-xs bg-primary/10 text-primary border-primary/30"
              >
                {market.category}
              </Badge>
              {market.status === 'active' && (
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {daysLeft}d left
                </div>
              )}
            </div>
            <h3 className={cn(
              "font-semibold text-foreground group-hover:text-primary transition-smooth line-clamp-2",
              compact ? "text-sm" : "text-base"
            )}>
              {market.title}
            </h3>
          </div>
          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth" />
        </div>
      </CardHeader>

      <CardContent className={cn("pt-0", compact && "pt-0")}>
        {!compact && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {market.description}
          </p>
        )}

        {/* Price Display */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-success/10 border border-success/30 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-success">YES</span>
              <TrendingUp className="w-3 h-3 text-success" />
            </div>
            <div className="text-lg font-bold text-success">
              {formatPrice(market.yesPrice)}
            </div>
          </div>
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-destructive">NO</span>
              <TrendingDown className="w-3 h-3 text-destructive" />
            </div>
            <div className="text-lg font-bold text-destructive">
              {formatPrice(market.noPrice)}
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center">
            <Users className="w-3 h-3 mr-1" />
            {market.participants} traders
          </div>
          <div className="font-medium">
            ₿{formatVolume(market.totalVolume)} volume
          </div>
        </div>

        {!compact && (
          <Button 
            className="w-full mt-4 gradient-bitcoin text-primary-foreground font-semibold hover:shadow-glow transition-smooth"
            size="sm"
          >
            Trade Now
          </Button>
        )}
      </CardContent>
    </Card>
  );
}