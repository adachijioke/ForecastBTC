import { Wallet, ChevronDown, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useWallet } from '@/hooks/useWallet';
import { toast } from '@/hooks/use-toast';

export const WalletConnectButton = () => {
  const { 
    connected, 
    connecting, 
    walletType, 
    balance, 
    getShortAddress, 
    connectLeather, 
    connectXverse, 
    disconnect 
  } = useWallet();

  const handleConnect = async (type: 'leather' | 'xverse') => {
    try {
      if (type === 'leather') {
        await connectLeather();
        toast({
          title: "Wallet Connected",
          description: "Successfully connected to Leather wallet",
        });
      } else {
        await connectXverse();
        toast({
          title: "Wallet Connected", 
          description: "Successfully connected to Xverse wallet",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  if (connected) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Wallet className="h-4 w-4" />
            <div className="hidden sm:flex flex-col items-start">
              <span className="text-xs text-muted-foreground capitalize">{walletType}</span>
              <span className="text-sm">{getShortAddress()}</span>
            </div>
            <div className="sm:hidden">
              {getShortAddress()}
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-3 py-2">
            <p className="text-sm font-medium">Connected Wallet</p>
            <p className="text-xs text-muted-foreground capitalize">{walletType} Wallet</p>
          </div>
          <DropdownMenuSeparator />
          <div className="px-3 py-2">
            <p className="text-sm font-medium">{balance.toFixed(2)} STX</p>
            <p className="text-xs text-muted-foreground">Available Balance</p>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDisconnect} className="text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={connecting} className="gap-2">
          <Wallet className="h-4 w-4" />
          {connecting ? 'Connecting...' : 'Connect Wallet'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleConnect('leather')}>
          <div className="flex flex-col">
            <span className="font-medium">Leather Wallet</span>
            <span className="text-xs text-muted-foreground">Browser extension wallet</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleConnect('xverse')}>
          <div className="flex flex-col">
            <span className="font-medium">Xverse Wallet</span>
            <span className="text-xs text-muted-foreground">Mobile & desktop wallet</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};