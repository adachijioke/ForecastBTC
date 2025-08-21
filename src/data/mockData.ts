import { Market, Position, User, MarketCategory } from '@/types/market';

export const mockMarkets: Market[] = [
  {
    id: '1',
    title: 'Will Bitcoin reach $100,000 by end of 2024?',
    description: 'Market resolves YES if Bitcoin (BTC) reaches or exceeds $100,000 USD on any major exchange (Coinbase, Binance, Kraken) before January 1, 2025. Price must be sustained for at least 1 hour.',
    category: MarketCategory.ECONOMICS,
    yesPrice: 0.73,
    noPrice: 0.27,
    totalVolume: 24.75,
    participants: 12470,
    endDate: '2024-12-31T23:59:59Z',
    status: 'active',
    tags: ['bitcoin', 'price', 'crypto'],
    creator: 'SP1234...ABCD'
  },
  {
    id: '2',
    title: 'Will Donald Trump win the 2024 US Presidential Election?',
    description: 'Market resolves YES if Donald Trump wins the 2024 United States Presidential Election and is sworn in as the 47th President in January 2025. Based on official election results certified by states.',
    category: MarketCategory.POLITICS,
    yesPrice: 0.52,
    noPrice: 0.48,
    totalVolume: 89.23,
    participants: 34210,
    endDate: '2024-11-05T23:59:59Z',
    status: 'active',
    tags: ['election', 'trump', 'usa'],
    creator: 'SP5678...EFGH'
  },
  {
    id: '3',
    title: 'Will SpaceX successfully land humans on Mars by 2030?',
    description: 'Market resolves YES if SpaceX successfully lands at least one human crew on Mars and they survive for 30+ days before December 31, 2030. Mission must be confirmed by NASA or equivalent space agency.',
    category: MarketCategory.TECHNOLOGY,
    yesPrice: 0.28,
    noPrice: 0.72,
    totalVolume: 15.67,
    participants: 8920,
    endDate: '2030-12-31T23:59:59Z',
    status: 'active',
    tags: ['spacex', 'mars', 'space'],
    creator: 'SP9012...IJKL'
  },
  {
    id: '4',
    title: 'Will Ethereum transition to full POS by Q2 2024?',
    description: 'Market resolves YES if Ethereum completely transitions to Proof of Stake consensus mechanism, ending all Proof of Work mining by June 30, 2024.',
    category: MarketCategory.TECHNOLOGY,
    yesPrice: 0.95,
    noPrice: 0.05,
    totalVolume: 12.34,
    participants: 5670,
    endDate: '2024-06-30T23:59:59Z',
    status: 'active',
    tags: ['ethereum', 'pos', 'crypto'],
    creator: 'SP3456...MNOP'
  },
  {
    id: '5',
    title: 'Will Taylor Swift win Grammy Album of the Year 2025?',
    description: 'Market resolves YES if Taylor Swift wins the Grammy Award for Album of the Year at the 67th Annual Grammy Awards ceremony in 2025.',
    category: MarketCategory.ENTERTAINMENT,
    yesPrice: 0.61,
    noPrice: 0.39,
    totalVolume: 8.92,
    participants: 12340,
    endDate: '2025-02-01T23:59:59Z',
    status: 'active',
    tags: ['taylor-swift', 'grammy', 'music'],
    creator: 'SP7890...QRST'
  },
  {
    id: '6',
    title: 'Will China GDP growth exceed 5% in 2024?',
    description: 'Market resolves YES if China reports annual GDP growth rate exceeding 5.0% for the year 2024, based on official government statistics.',
    category: MarketCategory.ECONOMICS,
    yesPrice: 0.73,
    noPrice: 0.27,
    totalVolume: 21.45,
    participants: 7890,
    endDate: '2024-12-31T23:59:59Z',
    status: 'active',
    tags: ['china', 'gdp', 'economy'],
    creator: 'SP1357...UVWX'
  },
  {
    id: '7',
    title: 'Will global CO2 levels exceed 430ppm by end of 2024?',
    description: 'Market resolves YES if atmospheric CO2 concentration reaches or exceeds 430 parts per million as measured by NOAA at Mauna Loa Observatory by December 31, 2024.',
    category: MarketCategory.CLIMATE,
    yesPrice: 0.84,
    noPrice: 0.16,
    totalVolume: 6.78,
    participants: 3210,
    endDate: '2024-12-31T23:59:59Z',
    status: 'active',
    tags: ['climate', 'co2', 'environment'],
    creator: 'SP2468...ABCD'
  },
  {
    id: '8',
    title: 'Will Manchester City win the Champions League 2024?',
    description: 'Market resolves YES if Manchester City FC wins the UEFA Champions League final in 2024. Based on official UEFA match results.',
    category: MarketCategory.SPORTS,
    yesPrice: 0.34,
    noPrice: 0.66,
    totalVolume: 18.92,
    participants: 15670,
    endDate: '2024-06-01T23:59:59Z',
    status: 'active',
    tags: ['football', 'champions-league', 'manchester-city'],
    creator: 'SP3691...EFGH'
  },
  {
    id: '9',
    title: 'Will the Fed cut interest rates 3+ times in 2024?',
    description: 'Market resolves YES if the Federal Reserve cuts the federal funds rate 3 or more times during 2024, regardless of the size of each cut.',
    category: MarketCategory.ECONOMICS,
    yesPrice: 0.42,
    noPrice: 0.58,
    totalVolume: 31.24,
    participants: 9870,
    endDate: '2024-12-31T23:59:59Z',
    status: 'active',
    tags: ['fed', 'interest-rates', 'monetary-policy'],
    creator: 'SP4815...IJKL'
  },
  {
    id: '10',
    title: 'Will Apple release AR glasses by Q4 2024?',
    description: 'Market resolves YES if Apple officially announces and begins selling consumer AR glasses (not VR) by December 31, 2024.',
    category: MarketCategory.TECHNOLOGY,
    yesPrice: 0.19,
    noPrice: 0.81,
    totalVolume: 14.56,
    participants: 6540,
    endDate: '2024-12-31T23:59:59Z',
    status: 'active',
    tags: ['apple', 'ar', 'glasses'],
    creator: 'SP1627...MNOP'
  }
];

export const mockUser: User = {
  address: 'SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7',
  balance: {
    stx: 1250.75,
    sbtc: 0.0234
  },
  totalStaked: 0.856,
  totalWinnings: 1.234,
  winRate: 67.8,
  positions: [
    {
      id: 'pos-1',
      marketId: '1',
      prediction: true,
      stakeAmount: 0.25,
      tokenAmount: 342.46,
      entryPrice: 0.70,
      currentValue: 0.28,
      pnl: 0.03,
      pnlPercentage: 12.0,
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      id: 'pos-2',
      marketId: '2',
      prediction: false,
      stakeAmount: 0.15,
      tokenAmount: 312.50,
      entryPrice: 0.55,
      currentValue: 0.14,
      pnl: -0.01,
      pnlPercentage: -6.7,
      createdAt: '2024-01-20T14:45:00Z'
    }
  ],
  isConnected: false
};

export const mockPriceHistory = Array.from({ length: 30 }, (_, i) => ({
  timestamp: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
  yesPrice: 0.6 + Math.random() * 0.3,
  noPrice: 0.4 - Math.random() * 0.3,
  volume: Math.random() * 0.5
}));

// Platform statistics for hero section
export const platformStats = {
  totalVolume: 1567.2,
  activeMarkets: 28470,
  totalUsers: 124590,
  resolvedMarkets: 19230
};