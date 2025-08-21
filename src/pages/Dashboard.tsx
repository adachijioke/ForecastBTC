import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  Clock, 
  Trophy,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { useNavigate } from 'react-router-dom';
import { mockUser, mockMarkets } from '@/data/mockData';
import { AnimatedCounter } from '@/components/ui/animated-counter';

const Dashboard = () => {
  const wallet = useWallet();
  const navigate = useNavigate();

  if (!wallet.isConnected) {
    navigate('/');
    return null;
  }

  const userPositions = mockUser.positions.map(position => {
    const market = mockMarkets.find(m => m.id === position.marketId);
    return { ...position, market };
  });

  const stats = [
    {
      title: 'Total Portfolio Value',
      value: mockUser.balance.sbtc + mockUser.totalStaked,
      change: '+12.5%',
      icon: DollarSign,
      prefix: '₿',
      decimals: 4,
      positive: true
    },
    {
      title: 'Active Positions',
      value: userPositions.length,
      change: '+2',
      icon: Target,
      positive: true
    },
    {
      title: 'Win Rate',
      value: mockUser.winRate,
      change: '+5.2%',
      icon: Trophy,
      suffix: '%',
      decimals: 1,
      positive: true
    },
    {
      title: 'Total Winnings',
      value: mockUser.totalWinnings,
      change: '+0.234 BTC',
      icon: TrendingUp,
      prefix: '₿',
      decimals: 3,
      positive: true
    }
  ];

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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
          </h1>
          <p className="text-muted-foreground">
            Track your predictions and manage your portfolio
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="gradient-card border-border/50 hover:border-primary/30 transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                    <Badge 
                      variant="outline" 
                      className={`${stat.positive ? 'text-success border-success/30 bg-success/10' : 'text-destructive border-destructive/30 bg-destructive/10'}`}
                    >
                      {stat.change}
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    <AnimatedCounter 
                      target={stat.value * (stat.decimals ? Math.pow(10, stat.decimals) : 1)}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="positions" className="space-y-6">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="positions">Active Positions</TabsTrigger>
            <TabsTrigger value="history">Trading History</TabsTrigger>
            <TabsTrigger value="rewards">Claimable Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="positions" className="space-y-6">
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Active Positions ({userPositions.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userPositions.map((position) => (
                    <div key={position.id} className="border border-border/50 rounded-lg p-4 hover:border-primary/30 transition-smooth">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2 line-clamp-2">{position.market?.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <Badge variant="outline" className={position.prediction ? "bg-success/10 text-success border-success/30" : "bg-destructive/10 text-destructive border-destructive/30"}>
                              {position.prediction ? 'YES' : 'NO'}
                            </Badge>
                            <span>Stake: ₿{position.stakeAmount}</span>
                            <span>Tokens: {position.tokenAmount.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-semibold">₿{position.currentValue.toFixed(4)}</div>
                            <div className={`text-sm flex items-center gap-1 ${position.pnl >= 0 ? 'text-success' : 'text-destructive'}`}>
                              {position.pnl >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                              {position.pnlPercentage >= 0 ? '+' : ''}{position.pnlPercentage.toFixed(1)}%
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/market/${position.marketId}`)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-muted-foreground mb-1">
                          <span>Position Progress</span>
                          <span>{((position.currentValue / position.stakeAmount) * 100).toFixed(1)}%</span>
                        </div>
                        <Progress 
                          value={(position.currentValue / position.stakeAmount) * 100} 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  Trading History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your trading history will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards">
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Claimable Rewards
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No rewards available to claim yet</p>
                  <p className="text-sm mt-2">Complete your predictions to earn rewards!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;