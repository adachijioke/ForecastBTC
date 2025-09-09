import { Calendar, TrendingUp, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Market } from '@/services/contractService';

interface MarketCardProps {
  market: Market;
}

export const MarketCard = ({ market }: MarketCardProps) => {
  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `$${(volume / 1000).toFixed(0)}K`;
    return `$${volume}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      crypto: 'bg-accent/10 text-accent border-accent/20',
      defi: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      nft: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      regulation: 'bg-green-500/10 text-green-400 border-green-500/20',
    } as const;
    return colors[category as keyof typeof colors] || 'bg-muted text-muted-foreground';
  };

  const isResolved = market.status === 'resolved';
  const timeRemaining = new Date(market.resolutionDate).getTime() - Date.now();
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

  return (
    <Card className="group hover:shadow-accent/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-card border-border/50">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Badge className={getCategoryColor(market.category)}>
            {market.category.toUpperCase()}
          </Badge>
          {isResolved && (
            <Badge variant={market.winner === 'yes' ? 'default' : 'secondary'}>
              {market.winner?.toUpperCase()} WON
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg leading-tight group-hover:text-accent transition-colors">
          {market.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {market.description}
        </p>

        {/* Market Stats */}
        <div className="grid grid-cols-2 gap-4 py-3 border-y border-border/50">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              YES {(market.yesPrice * 100).toFixed(0)}¢
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-3 w-3" />
              {formatVolume(market.volume)} vol
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 rotate-180" />
              NO {(market.noPrice * 100).toFixed(0)}¢
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {formatDate(market.resolutionDate)}
            </div>
          </div>
        </div>

        {/* Time Remaining */}
        {!isResolved && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            {daysRemaining > 0 ? `${daysRemaining} days left` : 'Ending soon'}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full" variant={isResolved ? 'secondary' : 'default'}>
          <Link to={`/market/${market.id}`}>
            {isResolved ? 'View Results' : 'Trade Market'}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};