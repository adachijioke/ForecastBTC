export interface Market {
  id: string;
  title: string;
  description: string;
  category: MarketCategory;
  yesPrice: number;
  noPrice: number;
  totalVolume: number;
  participants: number;
  endDate: string;
  status: 'active' | 'resolved' | 'cancelled';
  outcome?: boolean;
  imageUrl?: string;
  tags: string[];
  creator: string;
}

export interface Position {
  id: string;
  marketId: string;
  prediction: boolean;
  stakeAmount: number;
  tokenAmount: number;
  entryPrice: number;
  currentValue: number;
  pnl: number;
  pnlPercentage: number;
  createdAt: string;
}

export interface User {
  address: string;
  balance: {
    stx: number;
    sbtc: number;
  };
  totalStaked: number;
  totalWinnings: number;
  winRate: number;
  positions: Position[];
  isConnected: boolean;
}

export enum MarketCategory {
  POLITICS = 'Politics',
  SPORTS = 'Sports', 
  ECONOMICS = 'Economics',
  TECHNOLOGY = 'Technology',
  CLIMATE = 'Climate',
  ENTERTAINMENT = 'Entertainment'
}

export interface PricePoint {
  timestamp: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
}

export interface StakeRequest {
  marketId: string;
  prediction: boolean;
  amount: number;
}