import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { MarketList } from '@/components/MarketList';
import type { Market } from '@/services/contractService';
import marketsData from '@/data/mock/markets.json';

const Markets = () => {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading mock data
    const loadMarkets = async () => {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setMarkets(marketsData as Market[]);
      setLoading(false);
    };
    
    loadMarkets();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading markets...</p>
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
                  Prediction Markets
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  Discover and trade on the future of Bitcoin, crypto, and beyond
                </p>
              </div>
              <Button asChild size="lg" className="gap-2 self-start">
                <Link to="/create-market">
                  <Plus className="h-5 w-5" />
                  Create Market
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Markets List */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <MarketList markets={markets} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Markets;