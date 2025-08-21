import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, Menu, X } from 'lucide-react';
import { ForecastIcon } from '@/components/icons/ForecastIcon';
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  user?: {
    address: string;
    balance: { stx: number; sbtc: number };
    isConnected: boolean;
  };
  onConnectWallet?: () => void;
  onDisconnectWallet?: () => void;
}

export function Header({ user, onConnectWallet, onDisconnectWallet }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Markets', href: '/markets' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Settings', href: '/settings' },
    { name: 'Create', href: '/create-market' }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-smooth">
            <ForecastIcon className="h-8 w-8" />
            <span className="text-xl font-bold bg-gradient-bitcoin bg-clip-text text-transparent">
              ForecastBTC
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-muted-foreground hover:text-foreground transition-smooth font-medium ${
                  location.pathname === item.href ? 'text-primary' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center space-x-4">
            {user?.isConnected ? (
              <div className="hidden sm:flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm font-medium">
                    {user.balance.stx.toFixed(2)} STX
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user.address.slice(0, 6)}...{user.address.slice(-4)}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onDisconnectWallet}
                  className="border-border hover:border-primary"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button 
                onClick={onConnectWallet}
                className="gradient-bitcoin text-primary-foreground font-semibold shadow-bitcoin hover:shadow-glow transition-smooth"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-md transition-smooth ${
                    location.pathname === item.href ? 'text-primary bg-muted/30' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user?.isConnected && (
                <div className="sm:hidden px-3 py-2 border-t border-border/50 mt-2 pt-4">
                  <div className="text-sm font-medium mb-1">
                    {user.balance.stx.toFixed(2)} STX
                  </div>
                  <div className="text-xs text-muted-foreground mb-3">
                    {user.address.slice(0, 6)}...{user.address.slice(-4)}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onDisconnectWallet}
                    className="w-full"
                  >
                    Disconnect Wallet
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}