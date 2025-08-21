import { Market } from '@/types/market';
import { MarketCard } from './MarketCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, TrendingUp, Clock, Zap } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface MarketGridProps {
  markets: Market[];
  onMarketSelect?: (market: Market) => void;
  title?: string;
  showFilters?: boolean;
}

export function MarketGrid({ markets, onMarketSelect, title = "Trending Markets", showFilters = true }: MarketGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'volume' | 'ending' | 'recent'>('volume');

  const categories = ['all', 'Politics', 'Sports', 'Economics', 'Technology', 'Climate', 'Entertainment'];

  const filteredMarkets = markets
    .filter(market => 
      (selectedCategory === 'all' || market.category === selectedCategory) &&
      (searchTerm === '' || market.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       market.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'volume':
          return b.totalVolume - a.totalVolume;
        case 'ending':
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        case 'recent':
          return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
        default:
          return 0;
      }
    });

  const sortOptions = [
    { id: 'volume', label: 'Volume', icon: TrendingUp },
    { id: 'ending', label: 'Ending Soon', icon: Clock },
    { id: 'recent', label: 'Recently Added', icon: Zap }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <div className="text-sm text-muted-foreground">
          {filteredMarkets.length} markets found
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/30 border-border focus:border-primary"
            />
          </div>

          {/* Category and Sort Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-smooth capitalize",
                    selectedCategory === category 
                      ? "gradient-bitcoin text-primary-foreground" 
                      : "hover:border-primary hover:text-primary"
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex gap-2 ml-auto">
              {sortOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <Button
                    key={option.id}
                    variant={sortBy === option.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSortBy(option.id as any)}
                    className={cn(
                      "transition-smooth",
                      sortBy === option.id && "gradient-bitcoin text-primary-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {option.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Markets Grid */}
      {filteredMarkets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMarkets.map((market) => (
            <MarketCard
              key={market.id}
              market={market}
              onClick={() => onMarketSelect?.(market)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No markets found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find relevant markets.
          </p>
        </div>
      )}
    </div>
  );
}