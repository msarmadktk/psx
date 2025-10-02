import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Clock } from "lucide-react";

interface Signal {
  timeframe: string;
  action: "buy" | "hold" | "sell";
  confidence: number;
}

interface RecommendationCardProps {
  overallRecommendation: "buy" | "hold" | "sell";
  buyPercentage: number;
  holdPercentage: number;
  sellPercentage: number;
  signals: Signal[];
}

export const RecommendationCard = ({ 
  overallRecommendation, 
  buyPercentage, 
  holdPercentage, 
  sellPercentage,
  signals 
}: RecommendationCardProps) => {
  return (
    <Card className="border-border/50 bg-gradient-to-br from-card to-secondary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          AI Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-2">
          <Badge 
            variant={overallRecommendation === "buy" ? "default" : overallRecommendation === "hold" ? "secondary" : "destructive"}
            className="text-lg px-4 py-2 uppercase"
          >
            {overallRecommendation}
          </Badge>
          <p className="text-sm text-muted-foreground">Overall Recommendation</p>
        </div>
        
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-success">Buy Signal</span>
              <span className="font-bold">{buyPercentage}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-success h-2 rounded-full" style={{ width: `${buyPercentage}%` }} />
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-warning">Hold Signal</span>
              <span className="font-bold">{holdPercentage}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-warning h-2 rounded-full" style={{ width: `${holdPercentage}%` }} />
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-destructive">Sell Signal</span>
              <span className="font-bold">{sellPercentage}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-destructive h-2 rounded-full" style={{ width: `${sellPercentage}%` }} />
            </div>
          </div>
        </div>
        
        <div className="space-y-3 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4 text-primary" />
            Time-Based Signals
          </div>
          {signals.map((signal, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
              <div>
                <p className="text-sm font-medium">{signal.timeframe}</p>
                <p className="text-xs text-muted-foreground">Confidence: {signal.confidence}%</p>
              </div>
              <Badge 
                variant={signal.action === "buy" ? "default" : signal.action === "hold" ? "secondary" : "destructive"}
                className="uppercase"
              >
                {signal.action}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
