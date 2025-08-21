import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MarketGrid } from '@/components/market/MarketGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { ArrowRight, Zap, Globe, Shield, TrendingUp } from 'lucide-react';
import { mockMarkets, platformStats } from '@/data/mockData';
import { Market } from '@/types/market';
import { useWallet } from '@/hooks/useWallet';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import heroImage from '@/assets/hero-bitcoin.jpg';

const Index = () => {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const wallet = useWallet();
  const navigate = useNavigate();

  const handleMarketSelect = (market: Market) => {
    setSelectedMarket(market);
    navigate(`/market/${market.id}`);
  };

  // Featured markets (top 3 by volume)
  const featuredMarkets = mockMarkets
    .sort((a, b) => b.totalVolume - a.totalVolume)
    .slice(0, 3);

  const features = [
    {
      icon: TrendingUp,
      title: 'Bitcoin-Powered',
      description: 'Trade with Bitcoin and sBTC on the Stacks blockchain for secure, decentralized predictions.'
    },
    {
      icon: Globe,
      title: 'Global Markets',
      description: 'Predict outcomes on politics, sports, economics, climate, and technology from around the world.'
    },
    {
      icon: Shield,
      title: 'Trustless Resolution',
      description: 'Smart contracts and decentralized oracles ensure fair and transparent market resolution.'
    },
    {
      icon: Zap,
      title: 'Real-time Trading',
      description: 'Dynamic pricing with live updates and instant settlement of winning positions.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        user={wallet.isConnected ? {
          address: wallet.address || '',
          balance: { stx: 1250.75, sbtc: 0.0234 },
          isConnected: true
        } : undefined}
        onConnectWallet={wallet.connectWallet}
        onDisconnectWallet={wallet.disconnectWallet}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
        <div className="relative container mx-auto text-center">
          <div className="mb-8">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 mb-6">
              <Zap className="w-3 h-3 mr-1" />
              Powered by Bitcoin & Stacks Blockchain
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Predict the Future,
              <br />
              <span className="gradient-bitcoin bg-clip-text text-transparent">
                Earn Bitcoin
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              The world's first Bitcoin-native prediction market platform. 
              Stake on real-world outcomes and earn rewards for accurate predictions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="gradient-bitcoin text-primary-foreground font-semibold shadow-bitcoin hover:shadow-glow transition-smooth"
              onClick={wallet.isConnected ? () => navigate('/markets') : wallet.connectWallet}
            >
              {wallet.isConnected ? 'Explore Markets' : 'Start Trading'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-border hover:border-primary"
              onClick={() => navigate('/markets')}
            >
              View Markets
            </Button>
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                ₿<AnimatedCounter target={platformStats.totalVolume} decimals={1} />
              </div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">
                <AnimatedCounter target={platformStats.activeMarkets} />
              </div>
              <div className="text-sm text-muted-foreground">Active Markets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">
                <AnimatedCounter target={platformStats.totalUsers} />
              </div>
              <div className="text-sm text-muted-foreground">Traders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">
                <AnimatedCounter target={platformStats.resolvedMarkets} />
              </div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Markets */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Markets</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              High-volume prediction markets with the most trader activity and liquidity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredMarkets.map((market) => (
              <Card key={market.id} className="gradient-card border-border/50 hover:border-primary/30 transition-smooth group cursor-pointer shadow-card hover:shadow-glow">
                <CardContent className="p-6">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 mb-3">
                    {market.category}
                  </Badge>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-smooth line-clamp-2">
                    {market.title}
                  </h3>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">
                        {(market.yesPrice * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs text-muted-foreground">YES</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-destructive">
                        {(market.noPrice * 100).toFixed(0)}%
                      </div>
                      <div className="text-xs text-muted-foreground">NO</div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₿{market.totalVolume} volume</span>
                    <span>{market.participants} traders</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/markets')}
              className="border-border hover:border-primary"
            >
              View All Markets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose ForecastBTC?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the future of prediction markets with Bitcoin-native infrastructure and transparent, decentralized operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="gradient-card border-border/50 hover:border-primary/30 transition-smooth group">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 inline-flex">
                      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-smooth">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-smooth">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Predicting?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of traders who are already earning Bitcoin by making accurate predictions about the future.
          </p>
          <Button 
            size="lg"
            className="gradient-bitcoin text-primary-foreground font-semibold shadow-bitcoin hover:shadow-glow transition-smooth"
            onClick={wallet.isConnected ? () => navigate('/markets') : wallet.connectWallet}
          >
            {wallet.isConnected ? 'Start Trading Now' : 'Connect Wallet to Begin'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;