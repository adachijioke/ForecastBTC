import { useState, useMemo } from 'react';
import { Search, Filter, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MarketCard } from './MarketCard';
import type { Market } from '@/services/contractService';

interface MarketListProps {
  markets: Market[];
  title?: string;
  showFilters?: boolean;
}

export const MarketList = ({ markets, title = "Active Markets", showFilters = true }: MarketListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('volume');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(markets.map(m => m.category))];
    return cats.sort();
  }, [markets]);

  // Filter and sort markets
  const filteredAndSortedMarkets = useMemo(() => {
    let filtered = markets;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(market =>
        market.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        market.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(market => market.category === selectedCategory);
    }

    // Sort markets
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'volume':
          return b.volume - a.volume;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'ending':
          return new Date(a.resolutionDate).getTime() - new Date(b.resolutionDate).getTime();
        case 'stakes':
          return b.totalStaked - a.totalStaked;
        default:
          return 0;
      }
    });

    return filtered;
  }, [markets, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <p className="text-muted-foreground">
            {filteredAndSortedMarkets.length} market{filteredAndSortedMarkets.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        {showFilters && (
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <TrendingUp className="h-3 w-3 mr-1" />
              {markets.filter(m => m.status === 'active').length} Active
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {markets.filter(m => m.status === 'resolved').length} Resolved
            </Badge>
          </div>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search markets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort Options */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="volume">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-3 w-3" />
                  Highest Volume
                </div>
              </SelectItem>
              <SelectItem value="newest">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  Newest First
                </div>
              </SelectItem>
              <SelectItem value="ending">
                <div className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  Ending Soon
                </div>
              </SelectItem>
              <SelectItem value="stakes">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  Most Staked
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Markets Grid */}
      {filteredAndSortedMarkets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedMarkets.map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Filter className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No markets found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your filters to see more results.'
              : 'No markets available at the moment.'
            }
          </p>
          {(searchTerm || selectedCategory !== 'all') && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};