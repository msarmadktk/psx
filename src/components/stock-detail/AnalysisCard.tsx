import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, ChevronRight } from "lucide-react";

export type AnalysisType = "fundamental" | "technical" | "sentiment";

interface AnalysisCardProps {
  type: AnalysisType;
  score: number;
  recommendation: "buy" | "hold" | "sell";
  insights: string[];
  onClick?: () => void;
}

const titles = {
  fundamental: "Fundamental Analysis",
  technical: "Technical Analysis",
  sentiment: "Sentiment Analysis"
};

const icons = {
  buy: TrendingUp,
  hold: Minus,
  sell: TrendingDown
};

const getVariant = (recommendation: string): "default" | "secondary" | "destructive" => {
  if (recommendation === "buy") return "default";
  if (recommendation === "hold") return "secondary";
  return "destructive";
};

export const AnalysisCard = ({ type, score, recommendation, insights, onClick }: AnalysisCardProps) => {
  const Icon = icons[recommendation];
  
  return (
    <Card 
      className="border-border/50 cursor-pointer hover:border-primary/50 transition-colors" 
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{titles[type]}</span>
          <div className="flex items-center gap-2">
            <Badge variant={getVariant(recommendation)} className="flex items-center gap-1 uppercase">
              <Icon className="h-3 w-3" />
              {recommendation}
            </Badge>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">AI Confidence Score</span>
          <span className="text-2xl font-bold text-primary">{score}%</span>
        </div>
        
        <div className="w-full bg-secondary rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-1000"
            style={{ width: `${score}%` }}
          />
        </div>
        
        <div className="space-y-2 pt-2">
          <p className="text-sm font-medium">Key Insights:</p>
          <ul className="space-y-2">
            {insights.map((insight, i) => (
              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-primary">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
