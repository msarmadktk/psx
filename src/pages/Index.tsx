import { Header } from "@/components/Header";
import { SectorSection } from "@/components/SectorSection";
import { stocksBySector } from "@/data/stocks";
import { Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">AI-Powered Analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
            PSX Stock Analyzer
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time analysis of 25 top Pakistani stocks with AI-driven insights across fundamental, 
            technical, and sentiment indicators
          </p>
          
          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">25</div>
              <div className="text-sm text-muted-foreground">Stocks Tracked</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Sectors Covered</div>
            </div>
            <div className="h-12 w-px bg-border"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">Real-time</div>
              <div className="text-sm text-muted-foreground">AI Analysis</div>
            </div>
          </div>
        </div>

        {/* Sectors */}
        <div className="space-y-16">
          {Object.entries(stocksBySector).map(([sectorName, stocks]) => (
            <SectorSection key={sectorName} sectorName={sectorName} stocks={stocks} />
          ))}
        </div>
      </main>
      
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© 2025 PSX Analyzer. AI-powered stock analysis platform for Pakistan Stock Exchange.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
