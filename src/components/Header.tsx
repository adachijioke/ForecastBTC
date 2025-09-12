import { Link } from 'react-router-dom';
import { Bitcoin } from 'lucide-react';
import { WalletConnectButton } from './WalletConnectButton';

export const Header = () => {
  return (
    <header className="border-b border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Bitcoin className="h-8 w-8 text-accent" />
          <span className="text-xl font-bold text-foreground">ForecastBTC</span>
        </Link>

        {/* Navigation & Wallet */}
        <div className="flex items-center space-x-6">
          <nav className="flex space-x-8">
            <Link to="/" className="text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/markets" className="text-muted-foreground hover:text-accent transition-colors">
              Markets
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-accent transition-colors">
              About
            </Link>
          </nav>
          <WalletConnectButton />
        </div>
      </div>
    </header>
  );
};
