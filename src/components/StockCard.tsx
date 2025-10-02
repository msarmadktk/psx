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
      <Card className="group relative overflow-hidden border-border/60 bg-gradient-to-br from-card to-secondary/10 hover:to-secondary/20 transition-all duration-300 hover:shadow-[0_10px_40px_hsl(var(--primary)/0.15)] cursor-pointer">
        <div className="absolute inset-x-0 -top-24 h-48 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
        <CardContent className="p-7">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">{stock.symbol}</h3>
              <p className="text-sm text-muted-foreground/80 line-clamp-1">{stock.name}</p>
            </div>
            <Badge variant={isPositive ? "default" : "destructive"} className="flex items-center gap-1 px-2.5 py-1 text-[11px]">
              {isPositive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
              {Math.abs(stock.changePercent).toFixed(2)}%
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-end justify-between">
              <span className="text-[22px] md:text-2xl font-semibold tracking-tight">PKR {stock.currentPrice.toFixed(2)}</span>
              <span className={`${isPositive ? 'text-success' : 'text-destructive'} text-sm font-medium`}>
                {isPositive ? '+' : ''}{stock.change.toFixed(2)}
              </span>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground/80 line-clamp-2">{stock.description}</p>

            <div className="pt-3 flex items-center justify-between text-xs text-muted-foreground/70">
              <span>Founded: <span className="font-medium text-foreground/90">{stock.founded}</span></span>
              <span className="text-primary group-hover:translate-x-1 transition-transform font-medium">View Details →</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
