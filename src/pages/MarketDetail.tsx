import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, TrendingUp, Users, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PlaceStakeModal } from '@/components/PlaceStakeModal';
import type { Market } from '@/services/contractService';
import marketsData from '@/data/mock/markets.json';

const MarketDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [market, setMarket] = useState<Market | null>(null);
  const [loading, setLoading] = useState(true);
  const [stakeModalOpen, setStakeModalOpen] = useState(false);
  const [selectedOutcome, setSelectedOutcome] = useState<'yes' | 'no'>('yes');

  useEffect(() => {
    const loadMarket = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const foundMarket = (marketsData as Market[]).find(m => m.id === id);
      setMarket(foundMarket || null);
      setLoading(false);
    };
    
    loadMarket();
  }, [id]);

  const handlePlaceStake = (outcome: 'yes' | 'no') => {
    setSelectedOutcome(outcome);
    setStakeModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading market...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!market) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Market Not Found</h2>
            <p className="text-muted-foreground mb-6">The market you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/markets">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Markets
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`;
    if (volume >= 1000) return `$${(volume / 1000).toFixed(0)}K`;
    return `$${volume}`;
  };

  const timeRemaining = new Date(market.resolutionDate).getTime() - Date.now();
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));
  const isResolved = market.status === 'resolved';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Back Navigation */}
        <div className="bg-card/30 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Button asChild variant="ghost" size="sm">
              <Link to="/markets">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Markets
              </Link>
            </Button>
          </div>
        </div>

        {/* Market Header */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-accent/10 text-accent border-accent/20">
                  {market.category.toUpperCase()}
                </Badge>
                {isResolved && (
                  <Badge variant={market.winner === 'yes' ? 'default' : 'secondary'}>
                    {market.winner?.toUpperCase()} WON
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  <Clock className="mr-1 h-3 w-3" />
                  {isResolved ? 'Resolved' : `${daysRemaining} days left`}
                </Badge>
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                {market.title}
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-4xl">
                {market.description}
              </p>

              {/* Market Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-t border-border">
                <div>
                  <div className="text-2xl font-bold text-foreground">{formatVolume(market.volume)}</div>
                  <div className="text-sm text-muted-foreground">Total Volume</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{market.totalStaked.toFixed(0)} STX</div>
                  <div className="text-sm text-muted-foreground">Total Staked</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{formatDate(market.resolutionDate)}</div>
                  <div className="text-sm text-muted-foreground">Resolution Date</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{market.minStake}-{market.maxStake} STX</div>
                  <div className="text-sm text-muted-foreground">Stake Range</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trading Interface */}
        <section className="pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Trading Panes */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* YES Card */}
                  <Card className="bg-gradient-card border-green-500/20 hover:shadow-green-500/10 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-green-400">YES</CardTitle>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">
                            {(market.yesPrice * 100).toFixed(0)}¢
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {market.yesStakes.toFixed(1)} STX staked
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handlePlaceStake('yes')}
                        disabled={isResolved}
                      >
                        {isResolved ? 'Market Resolved' : 'Stake YES'}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* NO Card */}
                  <Card className="bg-gradient-card border-red-500/20 hover:shadow-red-500/10 transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-red-400">NO</CardTitle>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-red-400">
                            {(market.noPrice * 100).toFixed(0)}¢
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {market.noStakes.toFixed(1)} STX staked
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handlePlaceStake('no')}
                        disabled={isResolved}
                      >
                        {isResolved ? 'Market Resolved' : 'Stake NO'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Market Details */}
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="rules">Rules</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="space-y-4">
                    <Card className="bg-gradient-card">
                      <CardHeader>
                        <CardTitle>Market Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Created</div>
                            <div>{new Date(market.createdAt).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Creator</div>
                            <div className="font-mono text-xs">
                              {market.creator.slice(0, 6)}...{market.creator.slice(-4)}
                            </div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Min Stake</div>
                            <div>{market.minStake} STX</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Max Stake</div>
                            <div>{market.maxStake} STX</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="activity" className="space-y-4">
                    <Card className="bg-gradient-card">
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-8 text-muted-foreground">
                          <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Activity feed coming soon</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="rules" className="space-y-4">
                    <Card className="bg-gradient-card">
                      <CardHeader>
                        <CardTitle>Market Rules</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 text-sm">
                        <p>• Markets resolve based on objective, verifiable outcomes</p>
                        <p>• Resolution occurs automatically on the specified date</p>
                        <p>• Payouts are distributed proportionally to winning stakes</p>
                        <p>• Market creator receives a small fee from total volume</p>
                        <p>• Disputes can be raised within 24 hours of resolution</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Side Chart Placeholder */}
              <div className="space-y-6">
                <Card className="bg-gradient-card">
                  <CardHeader>
                    <CardTitle>Price Chart</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-lg">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Chart coming soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-card">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">24h Volume</span>
                      <span>{formatVolume(market.volume * 0.1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">All-time High (YES)</span>
                      <span>{Math.min(85, Math.round(market.yesPrice * 100) + 10)}¢</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">All-time Low (YES)</span>
                      <span>{Math.max(15, Math.round(market.yesPrice * 100) - 10)}¢</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <PlaceStakeModal 
        open={stakeModalOpen}
        onOpenChange={setStakeModalOpen}
        market={market}
        outcome={selectedOutcome}
      />
    </div>
  );
};

export default MarketDetail;