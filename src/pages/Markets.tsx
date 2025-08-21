import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { MarketGrid } from '@/components/market/MarketGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Plus } from 'lucide-react';
import { mockMarkets, mockUser } from '@/data/mockData';
import { Market, MarketCategory } from '@/types/market';
import { useWallet } from '@/hooks/useWallet';
import { useNavigate } from 'react-router-dom';

const Markets = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const wallet = useWallet();
  const navigate = useNavigate();

  const categories = [
    { id: 'all', name: 'All Markets', count: mockMarkets.length },
    { id: MarketCategory.POLITICS, name: 'Politics', count: mockMarkets.filter(m => m.category === MarketCategory.POLITICS).length },
    { id: MarketCategory.SPORTS, name: 'Sports', count: mockMarkets.filter(m => m.category === MarketCategory.SPORTS).length },
    { id: MarketCategory.ECONOMICS, name: 'Economics', count: mockMarkets.filter(m => m.category === MarketCategory.ECONOMICS).length },
    { id: MarketCategory.TECHNOLOGY, name: 'Technology', count: mockMarkets.filter(m => m.category === MarketCategory.TECHNOLOGY).length },
    { id: MarketCategory.CLIMATE, name: 'Climate', count: mockMarkets.filter(m => m.category === MarketCategory.CLIMATE).length },
    { id: MarketCategory.ENTERTAINMENT, name: 'Entertainment', count: mockMarkets.filter(m => m.category === MarketCategory.ENTERTAINMENT).length },
  ];

  const filteredMarkets = mockMarkets.filter(market => {
    const matchesSearch = market.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         market.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || market.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleMarketSelect = (market: Market) => {
    setSelectedMarket(market);
    navigate(`/market/${market.id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={wallet.isConnected ? {
          ...mockUser,
          address: wallet.address || '',
          isConnected: true
        } : undefined}
        onConnectWallet={wallet.connectWallet}
        onDisconnectWallet={wallet.disconnectWallet}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Prediction Markets</h1>
              <p className="text-muted-foreground">
                Discover and participate in Bitcoin-powered prediction markets
              </p>
            </div>
            <Button 
              onClick={() => navigate('/create-market')}
              className="gradient-bitcoin text-primary-foreground font-semibold shadow-bitcoin hover:shadow-glow transition-smooth"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Market
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter:</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`cursor-pointer transition-smooth ${
                selectedCategory === category.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:border-primary'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name} ({category.count})
            </Badge>
          ))}
        </div>

        {/* Markets Grid */}
        <MarketGrid 
          markets={filteredMarkets}
          onMarketSelect={handleMarketSelect}
          title={`${filteredMarkets.length} Markets Found`}
        />
      </div>
    </div>
  );
};

export default Markets;