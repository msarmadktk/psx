import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, AlertCircle } from "lucide-react";
import { useState } from "react";

interface NewsItem {
  title: string;
  source: string;
  date: string;
  sentiment: "positive" | "neutral" | "negative";
  summary: string;
  correctnessScore: number;
  importanceScore: number;
  impact: "high" | "medium" | "low";
}

interface SentimentAnalysisDetailProps {
  stockSymbol: string;
  stockName: string;
}

const generateDetailedNews = (stockSymbol: string, stockName: string): NewsItem[] => {
  const newsTemplates = [
    {
      title: `${stockName} Reports Record Quarterly Earnings`,
      source: "Business Recorder",
      sentiment: "positive" as const,
      summary: "Company exceeded analyst expectations with strong revenue growth and improved margins.",
      correctnessScore: 92,
      importanceScore: 95,
      impact: "high" as const
    },
    {
      title: `${stockSymbol} Announces Major Strategic Partnership`,
      source: "Dawn News",
      sentiment: "positive" as const,
      summary: "New alliance expected to expand market reach and drive long-term growth.",
      correctnessScore: 88,
      importanceScore: 85,
      impact: "high" as const
    },
    {
      title: `Analysts Upgrade ${stockSymbol} Price Target`,
      source: "The News",
      sentiment: "positive" as const,
      summary: "Multiple brokerage firms increase price targets citing strong fundamentals.",
      correctnessScore: 85,
      importanceScore: 78,
      impact: "medium" as const
    },
    {
      title: `${stockName} Faces Regulatory Scrutiny`,
      source: "Express Tribune",
      sentiment: "negative" as const,
      summary: "Authorities investigating compliance issues, company maintains all practices are proper.",
      correctnessScore: 75,
      importanceScore: 82,
      impact: "high" as const
    },
    {
      title: `Industry Outlook: ${stockSymbol} Sector Analysis`,
      source: "Financial Times Pakistan",
      sentiment: "neutral" as const,
      summary: "Sector faces mixed conditions with both opportunities and challenges ahead.",
      correctnessScore: 80,
      importanceScore: 65,
      impact: "medium" as const
    },
    {
      title: `${stockName} Increases Dividend Payout`,
      source: "Profit by Pakistan Today",
      sentiment: "positive" as const,
      summary: "Board approves higher dividend reflecting strong cash flow and shareholder commitment.",
      correctnessScore: 95,
      importanceScore: 72,
      impact: "medium" as const
    },
    {
      title: `Market Volatility Affects ${stockSymbol} Trading`,
      source: "Business Recorder",
      sentiment: "negative" as const,
      summary: "Broader market concerns create short-term pressure on stock price.",
      correctnessScore: 78,
      importanceScore: 55,
      impact: "low" as const
    },
    {
      title: `${stockName} Launches Digital Transformation Initiative`,
      source: "Tech in Pakistan",
      sentiment: "positive" as const,
      summary: "Company investing heavily in technology to improve operations and customer experience.",
      correctnessScore: 82,
      importanceScore: 70,
      impact: "medium" as const
    },
    {
      title: `CEO of ${stockName} Discusses Growth Strategy`,
      source: "Dawn News",
      sentiment: "neutral" as const,
      summary: "Leadership outlines vision for sustainable growth and market expansion.",
      correctnessScore: 86,
      importanceScore: 68,
      impact: "medium" as const
    },
    {
      title: `${stockSymbol} Insider Trading Activity Reported`,
      source: "PSX Insights",
      sentiment: "neutral" as const,
      summary: "Several executives purchased shares, signaling confidence in company prospects.",
      correctnessScore: 90,
      importanceScore: 75,
      impact: "medium" as const
    }
  ];

  return newsTemplates.map((template, index) => ({
    ...template,
    date: `${index + 1} ${index === 0 ? 'day' : index < 7 ? 'days' : 'weeks'} ago`
  }));
};

const getSentimentIcon = (sentiment: string) => {
  if (sentiment === "positive") return TrendingUp;
  if (sentiment === "negative") return TrendingDown;
  return Minus;
};

const getSentimentColor = (sentiment: string) => {
  if (sentiment === "positive") return "text-success";
  if (sentiment === "negative") return "text-destructive";
  return "text-warning";
};

const getImpactVariant = (impact: string): "default" | "secondary" | "destructive" => {
  if (impact === "high") return "default";
  if (impact === "medium") return "secondary";
  return "destructive";
};

export const SentimentAnalysisDetail = ({ stockSymbol, stockName }: SentimentAnalysisDetailProps) => {
  const newsItems = generateDetailedNews(stockSymbol, stockName);
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const visibleNews = showAll ? newsItems : newsItems.slice(0, 5);
  
  const avgCorrectness = (newsItems.reduce((sum, item) => sum + item.correctnessScore, 0) / newsItems.length).toFixed(1);
  const avgImportance = (newsItems.reduce((sum, item) => sum + item.importanceScore, 0) / newsItems.length).toFixed(1);
  
  const sentimentBreakdown = {
    positive: newsItems.filter(n => n.sentiment === "positive").length,
    neutral: newsItems.filter(n => n.sentiment === "neutral").length,
    negative: newsItems.filter(n => n.sentiment === "negative").length
  };

  return (
    <div className="space-y-6">
      {/* Sentiment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Correctness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{avgCorrectness}%</div>
            <p className="text-xs text-muted-foreground mt-1">News accuracy rating</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Importance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{avgImportance}%</div>
            <p className="text-xs text-muted-foreground mt-1">Impact significance</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newsItems.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Recent news items</p>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Sentiment Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  Positive
                </span>
                <span className="text-sm text-muted-foreground">
                  {sentimentBreakdown.positive} articles ({((sentimentBreakdown.positive / newsItems.length) * 100).toFixed(0)}%)
                </span>
              </div>
              <Progress value={(sentimentBreakdown.positive / newsItems.length) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2">
                  <Minus className="h-4 w-4 text-warning" />
                  Neutral
                </span>
                <span className="text-sm text-muted-foreground">
                  {sentimentBreakdown.neutral} articles ({((sentimentBreakdown.neutral / newsItems.length) * 100).toFixed(0)}%)
                </span>
              </div>
              <Progress value={(sentimentBreakdown.neutral / newsItems.length) * 100} className="h-2" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-destructive" />
                  Negative
                </span>
                <span className="text-sm text-muted-foreground">
                  {sentimentBreakdown.negative} articles ({((sentimentBreakdown.negative / newsItems.length) * 100).toFixed(0)}%)
                </span>
              </div>
              <Progress value={(sentimentBreakdown.negative / newsItems.length) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Items with Ratings */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Latest News Analysis</h3>
        {visibleNews.map((news, index) => {
          const absoluteIndex = showAll ? index : index;
          const SentimentIcon = getSentimentIcon(news.sentiment);
          return (
            <Card key={absoluteIndex} className="hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-[15px] md:text-base font-semibold tracking-tight mb-1 leading-snug line-clamp-2">{news.title}</CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/80">
                      <span className="truncate">{news.source}</span>
                      <span>•</span>
                      <span className="whitespace-nowrap">{news.date}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className={`text-sm text-muted-foreground ${expandedItems.has(absoluteIndex) ? "" : "line-clamp-2"}`}>{news.summary}</p>
                <div className="mt-2">
                  <button
                    className="text-xs font-medium text-primary hover:underline"
                    onClick={() => {
                      const next = new Set(expandedItems);
                      if (next.has(absoluteIndex)) next.delete(absoluteIndex); else next.add(absoluteIndex);
                      setExpandedItems(next);
                    }}
                  >
                    {expandedItems.has(absoluteIndex) ? "Show less" : "Show more"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Correctness
                      </span>
                      <span className="text-sm font-bold text-primary">{news.correctnessScore}%</span>
                    </div>
                    <Progress value={news.correctnessScore} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Importance
                      </span>
                      <span className="text-sm font-bold text-primary">{news.importanceScore}%</span>
                    </div>
                    <Progress value={news.importanceScore} className="h-2" />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <Badge variant={getImpactVariant(news.impact)} className="uppercase">
                    {news.impact} impact
                  </Badge>
                  <div className={`inline-flex items-center gap-1 ${getSentimentColor(news.sentiment)}`}>
                    <SentimentIcon className="h-4 w-4" />
                    <span className="font-medium capitalize">{news.sentiment}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {newsItems.length > 5 && (
          <div className="pt-2">
            <button
              className="text-sm font-medium text-primary hover:underline"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show less articles" : "Show more articles"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
