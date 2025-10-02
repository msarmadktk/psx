import { Header } from "@/components/Header";
import { SectorSection } from "@/components/SectorSection";
import { stocksBySector } from "@/data/stocks";
import { Sparkles, TrendingUp, BarChart3, Zap, Activity } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        {/* Enhanced Hero Section */}
        <div className="relative text-center mb-20 space-y-8">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          </div>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 border border-primary/20 mb-6 hover:border-primary/40 transition-colors">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              AI-Powered Analysis
            </span>
          </div>
          
          {/* Main Heading with enhanced gradient */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-blue-600 bg-clip-text text-transparent">
                PSX Stock Analyzer
              </span>
            </h1>
            <div className="h-1.5 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
          </div>
          
          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Real-time analysis of 25 top Pakistani stocks with AI-driven insights across fundamental, 
            technical, and sentiment indicators. Make smarter investment decisions with data-backed intelligence.
          </p>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8">
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
              <div className="flex flex-col items-center gap-2">
                <BarChart3 className="h-8 w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold bg-gradient-to-br from-primary to-blue-600 bg-clip-text text-transparent">25</div>
                <div className="text-sm font-medium text-muted-foreground">Stocks Tracked</div>
              </div>
            </div>
            
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all hover:scale-105">
              <div className="flex flex-col items-center gap-2">
                <TrendingUp className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-primary bg-clip-text text-transparent">5</div>
                <div className="text-sm font-medium text-muted-foreground">Sectors Covered</div>
              </div>
            </div>
            
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition-all hover:scale-105">
              <div className="flex flex-col items-center gap-2">
                <Zap className="h-8 w-8 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-4xl font-bold bg-gradient-to-br from-emerald-600 to-primary bg-clip-text text-transparent">AI</div>
                <div className="text-sm font-medium text-muted-foreground">Powered Insights</div>
              </div>
            </div>
            
            <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:scale-105">
              <div className="flex flex-col items-center gap-2">
                <Activity className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold bg-gradient-to-br from-purple-600 to-primary bg-clip-text text-transparent">Live</div>
                <div className="text-sm font-medium text-muted-foreground">Real-time Data</div>
              </div>
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