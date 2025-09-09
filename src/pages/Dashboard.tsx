import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Trophy, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Leaderboard } from '@/components/Leaderboard';
import { StatsChart } from '@/components/StatsChart';
import { useWallet } from '@/hooks/useWallet';
import { getUserPositions } from '@/services/contractService';

const Dashboard = () => {
  const { connected, address } = useWallet();
  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      if (!connected || !address) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const userPositions = await getUserPositions(address);
        setPositions(userPositions);
      } catch (error) {
        console.error('Failed to load user positions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [connected, address]);

  // Calculate summary stats
  const totalInvested = positions.reduce((sum, pos) => sum + pos.amount, 0);
  const totalCurrentValue = positions.reduce((sum, pos) => sum + pos.currentValue, 0);
  const totalPnL = positions.reduce((sum, pos) => sum + pos.pnl, 0);
  const winRate = positions.length > 0 ? (positions.filter(pos => pos.pnl > 0).length / positions.length) * 100 : 0;

  if (!connected) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <Target className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Connect Your Wallet</h2>
            <p className="text-muted-foreground mb-6">
              Connect your wallet to view your prediction market positions, track performance, and see detailed analytics.
            </p>
            <Button asChild>
              <Link to="/markets">Browse Markets</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-card/30 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                  Dashboard
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Track your predictions and performance
                </p>
              </div>
              <Button asChild>
                <Link to="/markets">Find New Markets</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalInvested.toFixed(2)} STX</div>
                  <p className="text-xs text-muted-foreground">
                    Across {positions.length} position{positions.length !== 1 ? 's' : ''}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Value</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalCurrentValue.toFixed(2)} STX</div>
                  <p className="text-xs text-muted-foreground">
                    {totalCurrentValue > totalInvested ? 'Up' : 'Down'} from invested
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
                  {totalPnL >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalPnL >= 0 ? '+' : ''}{totalPnL.toFixed(2)} STX
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {((totalPnL / Math.max(totalInvested, 1)) * 100).toFixed(1)}% return
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{winRate.toFixed(0)}%</div>
                  <p className="text-xs text-muted-foreground">
                    {positions.filter(pos => pos.pnl > 0).length} winning positions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="positions" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="positions">Positions</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              {/* Positions Tab */}
              <TabsContent value="positions" className="space-y-6">
                <Card className="bg-gradient-card">
                  <CardHeader>
                    <CardTitle>Your Positions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {positions.length > 0 ? (
                      <div className="space-y-4">
                        {positions.map((position, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <Link 
                                  to={`/market/${position.marketId}`}
                                  className="font-medium text-foreground hover:text-accent transition-colors"
                                >
                                  Market #{position.marketId}
                                </Link>
                                <Badge variant={position.outcome === 'yes' ? 'default' : 'secondary'}>
                                  {position.outcome.toUpperCase()}
                                </Badge>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Staked: {position.amount} STX
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{position.currentValue.toFixed(2)} STX</div>
                              <div className={`text-sm ${position.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                {position.pnl >= 0 ? '+' : ''}{position.pnl.toFixed(2)} STX
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">No Positions Yet</h3>
                        <p className="text-muted-foreground mb-4">
                          Start by placing stakes on prediction markets to see your positions here.
                        </p>
                        <Button asChild>
                          <Link to="/markets">Browse Markets</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Performance Tab */}
              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="bg-gradient-card">
                    <CardHeader>
                      <CardTitle>Performance Chart</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StatsChart />
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-card">
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8 text-muted-foreground">
                        <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Activity history coming soon</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Leaderboard Tab */}
              <TabsContent value="leaderboard" className="space-y-6">
                <Leaderboard />
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity" className="space-y-6">
                <Card className="bg-gradient-card">
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Transaction history coming soon</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;