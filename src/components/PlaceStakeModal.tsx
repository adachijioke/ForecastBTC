import { useState } from 'react';
import { TrendingUp, TrendingDown, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useWallet } from '@/hooks/useWallet';
import { useToast } from '@/hooks/use-toast';
import { placeStake, type Market } from '@/services/contractService';

interface PlaceStakeModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  market: Market;
  outcome: 'yes' | 'no';
}

export const PlaceStakeModal = ({ open, onOpenChange, market, outcome }: PlaceStakeModalProps) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const { connected, balance } = useWallet();
  const { toast } = useToast();

  const stakeAmount = parseFloat(amount) || 0;
  const currentPrice = outcome === 'yes' ? market.yesPrice : market.noPrice;
  const potentialShares = stakeAmount / currentPrice;
  const potentialPayout = potentialShares * 1; // Max payout is 1 STX per share
  const potentialProfit = potentialPayout - stakeAmount;

  const isValidAmount = stakeAmount >= market.minStake && 
                       stakeAmount <= market.maxStake && 
                       stakeAmount <= balance;

  const handleSubmit = async () => {
    if (!connected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to place a stake.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidAmount) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid stake amount within the allowed range.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      const result = await placeStake({
        marketId: market.id,
        outcome,
        amount: stakeAmount,
      });

      if (result.success) {
        toast({
          title: "Stake Placed Successfully",
          description: `You staked ${stakeAmount} STX on ${outcome.toUpperCase()}`,
        });
        onOpenChange(false);
        setAmount('');
      } else {
        throw new Error('Failed to place stake');
      }
    } catch (error) {
      toast({
        title: "Failed to Place Stake",
        description: "There was an error placing your stake. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const outcomeColor = outcome === 'yes' ? 'text-green-400' : 'text-red-400';
  const OutcomeIcon = outcome === 'yes' ? TrendingUp : TrendingDown;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <OutcomeIcon className={`h-5 w-5 ${outcomeColor}`} />
            Stake on {outcome.toUpperCase()}
          </DialogTitle>
          <DialogDescription className="text-left">
            {market.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Price */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Current Price</div>
            <div className={`text-lg font-semibold ${outcomeColor}`}>
              {(currentPrice * 100).toFixed(0)}¢
            </div>
          </div>

          {/* Stake Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount">Stake Amount (STX)</Label>
            <Input
              id="amount"
              type="number"
              placeholder={`${market.minStake} - ${market.maxStake}`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min={market.minStake}
              max={Math.min(market.maxStake, balance)}
              step="0.1"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Min: {market.minStake} STX</span>
              <span>Max: {Math.min(market.maxStake, balance).toFixed(1)} STX</span>
            </div>
            {!connected && (
              <p className="text-xs text-destructive">Connect wallet to see balance</p>
            )}
            {connected && (
              <p className="text-xs text-muted-foreground">
                Available: {balance.toFixed(2)} STX
              </p>
            )}
          </div>

          {/* Calculation Preview */}
          {stakeAmount > 0 && (
            <div className="space-y-3 p-4 bg-card/50 rounded-lg border">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Calculator className="h-4 w-4" />
                Potential Outcome
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Shares</div>
                  <div className="font-medium">{potentialShares.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">If Correct</div>
                  <div className="font-medium text-green-400">
                    +{potentialProfit.toFixed(2)} STX
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground border-t pt-2">
                Max payout: {potentialPayout.toFixed(2)} STX
              </div>
            </div>
          )}

          {/* Validation Messages */}
          {amount && !isValidAmount && (
            <div className="space-y-1">
              {stakeAmount < market.minStake && (
                <Badge variant="destructive" className="text-xs">
                  Minimum stake is {market.minStake} STX
                </Badge>
              )}
              {stakeAmount > market.maxStake && (
                <Badge variant="destructive" className="text-xs">
                  Maximum stake is {market.maxStake} STX
                </Badge>
              )}
              {stakeAmount > balance && connected && (
                <Badge variant="destructive" className="text-xs">
                  Insufficient balance
                </Badge>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!isValidAmount || loading || !connected}
            className={outcome === 'yes' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
          >
            {loading ? 'Placing Stake...' : `Stake ${amount || '0'} STX`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};