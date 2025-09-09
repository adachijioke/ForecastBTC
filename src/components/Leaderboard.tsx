import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const mockLeaderboardData = [
  {
    rank: 1,
    address: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
    username: 'BitcoinMaxi',
    totalPnL: 2456.78,
    winRate: 87.5,
    totalTrades: 156,
    avatar: 'BM'
  },
  {
    rank: 2,
    address: 'SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE',
    username: 'CryptoOracle',
    totalPnL: 1892.34,
    winRate: 82.1,
    totalTrades: 134,
    avatar: 'CO'
  },
  {
    rank: 3,
    address: 'SP1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O6P7Q8R9S',
    username: 'StacksGuru',
    totalPnL: 1654.92,
    winRate: 79.8,
    totalTrades: 98,
    avatar: 'SG'
  },
  {
    rank: 4,
    address: 'SP987654321ABCDEF987654321ABCDEF98765432',
    username: 'PredictionKing',
    totalPnL: 1234.56,
    winRate: 75.4,
    totalTrades: 67,
    avatar: 'PK'
  },
  {
    rank: 5,
    address: 'SP2468ACE1357BDF0246ACE1357BDF0246ACE13',
    username: 'MarketMaker',
    totalPnL: 987.65,
    winRate: 71.2,
    totalTrades: 89,
    avatar: 'MM'
  },
];

export const Leaderboard = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 2:
        return 'bg-gray-400/10 text-gray-400 border-gray-400/20';
      case 3:
        return 'bg-amber-600/10 text-amber-600 border-amber-600/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Top Predictors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockLeaderboardData.map((user) => (
              <div
                key={user.address}
                className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
              >
                {/* Rank */}
                <div className="flex items-center justify-center w-12">
                  {getRankIcon(user.rank)}
                </div>

                {/* Avatar */}
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-accent/10 text-accent font-semibold">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground truncate">
                      {user.username}
                    </span>
                    <Badge className={getRankBadgeColor(user.rank)}>
                      #{user.rank}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono truncate">
                    {user.address.slice(0, 8)}...{user.address.slice(-6)}
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right space-y-1">
                  <div className="font-bold text-green-400">
                    +{user.totalPnL.toFixed(2)} STX
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user.winRate}% • {user.totalTrades} trades
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card">
        <CardHeader>
          <CardTitle>Your Ranking</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <div className="text-4xl font-bold text-accent mb-2">#42</div>
            <p className="text-muted-foreground mb-4">
              You're in the top 15% of all predictors
            </p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold text-foreground">+125.5 STX</div>
                <div className="text-muted-foreground">Total P&L</div>
              </div>
              <div>
                <div className="font-semibold text-foreground">68.2%</div>
                <div className="text-muted-foreground">Win Rate</div>
              </div>
              <div>
                <div className="font-semibold text-foreground">23</div>
                <div className="text-muted-foreground">Total Trades</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};