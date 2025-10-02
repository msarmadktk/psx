import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stock } from "@/data/stocks";
import { Link } from "react-router-dom";

interface StockCardProps {
  stock: Stock;
}

export const StockCard = ({ stock }: StockCardProps) => {
  const isPositive = stock.change >= 0;
  
  return (
    <Link to={`/stock/${stock.symbol}`}>
      <Card className="group hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{stock.symbol}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{stock.name}</p>
            </div>
            <Badge variant={isPositive ? "default" : "destructive"} className="flex items-center gap-1">
              {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(stock.changePercent).toFixed(2)}%
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold">PKR {stock.currentPrice.toFixed(2)}</span>
              <span className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-destructive'}`}>
                {isPositive ? '+' : ''}{stock.change.toFixed(2)}
              </span>
            </div>
            
            <p className="text-xs text-muted-foreground line-clamp-2">{stock.description}</p>
            
            <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Founded: {stock.founded}</span>
              <span className="text-primary group-hover:translate-x-1 transition-transform">View Details →</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
