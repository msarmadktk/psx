import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Header } from "@/components/Header";
import { PriceChart } from "@/components/stock-detail/PriceChart";
import { AnalysisCard, AnalysisType } from "@/components/stock-detail/AnalysisCard";
import { RecommendationCard } from "@/components/stock-detail/RecommendationCard";
import { NewsSection } from "@/components/stock-detail/NewsSection";
import { FundamentalAnalysisDetail } from "@/components/stock-detail/FundamentalAnalysisDetail";
import { TechnicalAnalysisDetail } from "@/components/stock-detail/TechnicalAnalysisDetail";
import { SentimentAnalysisDetail } from "@/components/stock-detail/SentimentAnalysisDetail";
import { getStockBySymbol } from "@/data/stocks";

const StockDetail = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const stock = symbol ? getStockBySymbol(symbol) : undefined;
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisType | null>(null);

  if (!stock) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Stock not found</h1>
          <Link to="/">
            <Button>Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isPositive = stock.change >= 0;

  // Mock data for analysis
  const fundamentalAnalysis = {
    type: "fundamental" as const,
    score: 78,
    recommendation: "buy" as const,
    insights: [
      "Strong revenue growth of 15% YoY",
      "P/E ratio below industry average",
      "Increasing profit margins over last 3 quarters",
      "Solid balance sheet with low debt-to-equity ratio"
    ]
  };

  const technicalAnalysis = {
    type: "technical" as const,
    score: 72,
    recommendation: "buy" as const,
    insights: [
      "Price above 50-day moving average",
      "RSI indicates momentum is building",
      "Volume trending upward",
      "Breaking through key resistance level"
    ]
  };

  const sentimentAnalysis = {
    type: "sentiment" as const,
    score: 65,
    recommendation: "hold" as const,
    insights: [
      "Positive social media sentiment trending",
      "Analyst upgrades outnumber downgrades 3:1",
      "Institutional ownership increasing",
      "Market sentiment cautiously optimistic"
    ]
  };

  const recommendation = {
    overallRecommendation: "buy" as const,
    buyPercentage: 68,
    holdPercentage: 22,
    sellPercentage: 10,
    signals: [
      { timeframe: "Short-term (1-7 days)", action: "buy" as const, confidence: 72 },
      { timeframe: "Medium-term (1-4 weeks)", action: "buy" as const, confidence: 68 },
      { timeframe: "Long-term (1-6 months)", action: "hold" as const, confidence: 65 }
    ]
  };

  const news = [
    {
      title: `${stock.name} Reports Strong Quarterly Results`,
      source: "Business Recorder",
      date: "2 days ago",
      sentiment: "positive" as const,
      summary: "Company exceeds analyst expectations with impressive earnings growth."
    },
    {
      title: `Sector Analysis: ${stock.sector} Outlook for 2025`,
      source: "Dawn News",
      date: "5 days ago",
      sentiment: "neutral" as const,
      summary: "Industry experts weigh in on growth prospects and challenges ahead."
    },
    {
      title: `${stock.symbol} Announces Strategic Partnership`,
      source: "The News",
      date: "1 week ago",
      sentiment: "positive" as const,
      summary: "New collaboration expected to drive innovation and market expansion."
    },
    {
      title: "Market Volatility Affects Banking Sector",
      source: "Express Tribune",
      date: "1 week ago",
      sentiment: "negative" as const,
      summary: "Broader market concerns create short-term uncertainty for sector stocks."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6 group">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Stock Header */}
        <div className="mb-8 p-6 rounded-lg border border-border/50 bg-gradient-to-br from-card to-secondary/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{stock.symbol}</h1>
                <Badge variant="secondary">{stock.sector}</Badge>
              </div>
              <h2 className="text-xl text-muted-foreground mb-2">{stock.name}</h2>
              <p className="text-sm text-muted-foreground">Founded: {stock.founded}</p>
            </div>
            
            <div className="text-right">
              <div className="text-4xl font-bold mb-2">PKR {stock.currentPrice.toFixed(2)}</div>
              <div className={`flex items-center gap-2 justify-end ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {isPositive ? <TrendingUp className="h-5 w-5" /> : <TrendingDown className="h-5 w-5" />}
                <span className="text-lg font-medium">
                  {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({Math.abs(stock.changePercent).toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-muted-foreground">{stock.description}</p>
        </div>

        {/* Price Chart */}
        <div className="mb-8">
          <PriceChart symbol={stock.symbol} currentPrice={stock.currentPrice} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Analysis Cards */}
          <div className="lg:col-span-2 space-y-6">
            <AnalysisCard {...fundamentalAnalysis} onClick={() => setSelectedAnalysis("fundamental")} />
            <AnalysisCard {...technicalAnalysis} onClick={() => setSelectedAnalysis("technical")} />
            <AnalysisCard {...sentimentAnalysis} onClick={() => setSelectedAnalysis("sentiment")} />
          </div>

          {/* Recommendation */}
          <div>
            <RecommendationCard {...recommendation} />
          </div>
        </div>

        {/* News Section */}
        <NewsSection news={news} />
      </div>

      {/* Analysis Detail Dialogs */}
      <Dialog open={selectedAnalysis !== null} onOpenChange={() => setSelectedAnalysis(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedAnalysis === "fundamental" && "Fundamental Analysis Details"}
              {selectedAnalysis === "technical" && "Technical Analysis Details"}
              {selectedAnalysis === "sentiment" && "Sentiment Analysis Details"}
            </DialogTitle>
          </DialogHeader>
          
          {selectedAnalysis === "fundamental" && (
            <FundamentalAnalysisDetail stockSymbol={stock.symbol} />
          )}
          {selectedAnalysis === "technical" && (
            <TechnicalAnalysisDetail stockSymbol={stock.symbol} currentPrice={stock.currentPrice} />
          )}
          {selectedAnalysis === "sentiment" && (
            <SentimentAnalysisDetail stockSymbol={stock.symbol} stockName={stock.name} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StockDetail;
