import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-6xl font-bold text-foreground mb-6">
              ForecastBTC
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bitcoin-backed prediction markets on Stacks. 
              Predict the future and earn rewards.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;