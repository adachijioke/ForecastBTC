import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Clock,
  DollarSign,
  Target,
  Calendar,
  Info
} from 'lucide-react';
import { useWallet } from '@/hooks/useWallet';
import { mockMarkets, mockUser, mockPriceHistory } from '@/data/mockData';
import { Market } from '@/types/market';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MarketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const wallet = useWallet();
  const [market, setMarket] = useState<Market | null>(null);
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedPrediction, setSelectedPrediction] = useState<boolean | null>(null);

  useEffect(() => {
    const foundMarket = mockMarkets.find(m => m.id === id);
    if (foundMarket) {
      setMarket(foundMarket);
    } else {
      navigate('/markets');
    }
  }, [id, navigate]);

  if (!market) {
    return <div>Loading...</div>;
  }

  const handleStake = () => {
    if (!wallet.isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!selectedPrediction === null || !stakeAmount) {
      toast.error('Please select a prediction and enter an amount');
      return;
    }

    const amount = parseFloat(stakeAmount);
    if (amount <= 0 || amount > mockUser.balance.sbtc) {
      toast.error('Invalid stake amount');
      return;
    }

    toast.success(`Staked ₿${amount} on ${selectedPrediction ? 'YES' : 'NO'}`, {
      description: 'Your prediction has been recorded!'
    });
    setStakeAmount('');
    setSelectedPrediction(null);
  };

  const chartData = mockPriceHistory.map(point => ({
    ...point,
    date: format(new Date(point.timestamp), 'MMM dd')
  }));

  const timeToResolution = () => {
    const now = new Date();
    const end = new Date(market.endDate);
    const diff = end.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
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
        <Button 
          variant="outline" 
          onClick={() => navigate('/markets')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Markets
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Header */}
            <Card className="gradient-card border-border/50">
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 mb-3">
                    {market.category}
                  </Badge>
                  <h1 className="text-2xl font-bold mb-3">{market.title}</h1>
                  <p className="text-muted-foreground">{market.description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg border border-border/50">
                    <div className="text-lg font-bold text-success">
                      {(market.yesPrice * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-muted-foreground">YES Price</div>
                  </div>
                  <div className="text-center p-3 rounded-lg border border-border/50">
                    <div className="text-lg font-bold text-destructive">
                      {(market.noPrice * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-muted-foreground">NO Price</div>
                  </div>
                  <div className="text-center p-3 rounded-lg border border-border/50">
                    <div className="text-lg font-bold text-primary">
                      ₿{market.totalVolume}
                    </div>
                    <div className="text-xs text-muted-foreground">Volume</div>
                  </div>
                  <div className="text-center p-3 rounded-lg border border-border/50">
                    <div className="text-lg font-bold text-accent">
                      {market.participants}
                    </div>
                    <div className="text-xs text-muted-foreground">Traders</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chart */}
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Price History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        domain={[0, 1]}
                        tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                        formatter={(value: number, name: string) => [
                          `${(value * 100).toFixed(1)}%`,
                          name === 'yesPrice' ? 'YES' : 'NO'
                        ]}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="yesPrice" 
                        stroke="hsl(var(--success))" 
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="noPrice" 
                        stroke="hsl(var(--destructive))" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Market Info Tabs */}
            <Tabs defaultValue="details" className="space-y-4">
              <TabsList className="bg-card border border-border">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="resolution">Resolution</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <Card className="gradient-card border-border/50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Market Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Created by:</span>
                            <p className="font-mono">{market.creator}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Resolution Date:</span>
                            <p>{format(new Date(market.endDate), 'PPP')}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Time Remaining:</span>
                            <p>{timeToResolution()}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Status:</span>
                            <Badge variant="outline" className="ml-2">
                              {market.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {market.tags.length > 0 && (
                        <div>
                          <h3 className="font-semibold mb-2">Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {market.tags.map((tag) => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="resolution">
                <Card className="gradient-card border-border/50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Resolution Criteria</h3>
                      <p className="text-muted-foreground">
                        {market.description}
                      </p>
                      <div className="p-4 border border-border/50 rounded-lg">
                        <h4 className="font-medium mb-2">Data Sources</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Official exchange data (Coinbase, Binance, Kraken)</li>
                          <li>• CoinGecko and CoinMarketCap aggregated prices</li>
                          <li>• Market resolution at 23:59:59 UTC on resolution date</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussion">
                <Card className="gradient-card border-border/50">
                  <CardContent className="p-6">
                    <div className="text-center py-8 text-muted-foreground">
                      <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Discussion feature coming soon</p>
                      <p className="text-sm mt-2">Share your thoughts and analysis with other traders</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - Trading Interface */}
          <div className="space-y-6">
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Place Your Prediction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={selectedPrediction === true ? "default" : "outline"}
                    onClick={() => setSelectedPrediction(true)}
                    className={selectedPrediction === true ? "bg-success hover:bg-success/90" : ""}
                  >
                    YES {(market.yesPrice * 100).toFixed(0)}%
                  </Button>
                  <Button
                    variant={selectedPrediction === false ? "default" : "outline"}
                    onClick={() => setSelectedPrediction(false)}
                    className={selectedPrediction === false ? "bg-destructive hover:bg-destructive/90" : ""}
                  >
                    NO {(market.noPrice * 100).toFixed(0)}%
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Stake Amount (BTC)</label>
                  <Input
                    type="number"
                    step="0.001"
                    placeholder="0.01"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                  {wallet.isConnected && (
                    <p className="text-xs text-muted-foreground">
                      Available: ₿{mockUser.balance.sbtc.toFixed(4)}
                    </p>
                  )}
                </div>

                {stakeAmount && selectedPrediction !== null && (
                  <div className="p-3 border border-border/50 rounded-lg text-sm">
                    <div className="flex justify-between">
                      <span>Potential Return:</span>
                      <span className="font-semibold">
                        ₿{(parseFloat(stakeAmount) / (selectedPrediction ? market.yesPrice : market.noPrice)).toFixed(4)}
                      </span>
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleStake}
                  className="w-full gradient-bitcoin text-primary-foreground font-semibold shadow-bitcoin hover:shadow-glow transition-smooth"
                  disabled={!wallet.isConnected || !selectedPrediction === null || !stakeAmount}
                >
                  {!wallet.isConnected ? 'Connect Wallet' : 'Place Prediction'}
                </Button>
              </CardContent>
            </Card>

            {/* Market Stats */}
            <Card className="gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="text-lg">Market Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>YES Volume</span>
                    <span>₿{(market.totalVolume * market.yesPrice).toFixed(3)}</span>
                  </div>
                  <Progress value={market.yesPrice * 100} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>NO Volume</span>
                    <span>₿{(market.totalVolume * market.noPrice).toFixed(3)}</span>
                  </div>
                  <Progress value={market.noPrice * 100} className="h-2" />
                </div>

                <div className="pt-2 border-t border-border/50 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Volume</span>
                    <span>₿{market.totalVolume}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>24h Change</span>
                    <span className="text-success">+2.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDetail;