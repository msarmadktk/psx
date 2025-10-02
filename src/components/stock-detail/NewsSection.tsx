import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper, ExternalLink } from "lucide-react";

interface NewsItem {
  title: string;
  source: string;
  date: string;
  sentiment: "positive" | "neutral" | "negative";
  summary: string;
}

interface NewsSectionProps {
  news: NewsItem[];
}

export const NewsSection = ({ news }: NewsSectionProps) => {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Newspaper className="h-5 w-5 text-primary" />
          Latest News & Reports
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {news.map((item, i) => (
          <div 
            key={i} 
            className="p-4 rounded-lg border border-border/50 hover:border-primary/50 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-sm group-hover:text-primary transition-colors flex-1">
                {item.title}
              </h4>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 ml-2" />
            </div>
            
            <p className="text-xs text-muted-foreground mb-3">{item.summary}</p>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">{item.source}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-muted-foreground">{item.date}</span>
              </div>
              <Badge 
                variant={item.sentiment === "positive" ? "default" : item.sentiment === "neutral" ? "secondary" : "destructive"}
                className="text-xs"
              >
                {item.sentiment}
              </Badge>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
