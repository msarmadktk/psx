import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Area, ComposedChart } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TechnicalAnalysisDetailProps {
  stockSymbol: string;
  currentPrice: number;
}

const generateTechnicalData = (basePrice: number) => {
  const data = [];
  const days = 90;
  
  for (let i = 0; i < days; i++) {
    const volatility = 0.02;
    const change = (Math.random() - 0.5) * basePrice * volatility;
    const price = i === 0 ? basePrice : data[i - 1].price + change;
    
    // Calculate technical indicators
    const sma20 = data.slice(Math.max(0, i - 19), i + 1).reduce((sum, d) => sum + d.price, price) / Math.min(i + 1, 20);
    const sma50 = data.slice(Math.max(0, i - 49), i + 1).reduce((sum, d) => sum + d.price, price) / Math.min(i + 1, 50);
    
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: parseFloat(price.toFixed(2)),
      sma20: parseFloat(sma20.toFixed(2)),
      sma50: parseFloat(sma50.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000 + 500000)
    });
  }
  
  return data;
};

const calculateIndicators = (data: any[], currentPrice: number) => {
  const prices = data.map(d => d.price);
  const high = Math.max(...prices);
  const low = Math.min(...prices);
  
  // Support and Resistance levels
  const resistance1 = high * 0.98;
  const resistance2 = high * 0.95;
  const support1 = low * 1.02;
  const support2 = low * 1.05;
  
  // RSI calculation (simplified)
  const rsi = 45 + Math.random() * 30;
  
  // MACD (simplified)
  const macd = (Math.random() - 0.5) * 10;
  
  return {
    resistance1: resistance1.toFixed(2),
    resistance2: resistance2.toFixed(2),
    support1: support1.toFixed(2),
    support2: support2.toFixed(2),
    rsi: rsi.toFixed(2),
    macd: macd.toFixed(2),
    bollinger_upper: (currentPrice * 1.05).toFixed(2),
    bollinger_lower: (currentPrice * 0.95).toFixed(2)
  };
};

export const TechnicalAnalysisDetail = ({ stockSymbol, currentPrice }: TechnicalAnalysisDetailProps) => {
  const chartData = generateTechnicalData(currentPrice);
  const indicators = calculateIndicators(chartData, currentPrice);
  
  const technicalScores = [
    { indicator: "RSI (14)", value: indicators.rsi, signal: parseFloat(indicators.rsi) > 50 ? "Bullish" : "Bearish", score: parseFloat(indicators.rsi) > 50 ? 75 : 45 },
    { indicator: "MACD", value: indicators.macd, signal: parseFloat(indicators.macd) > 0 ? "Bullish" : "Bearish", score: parseFloat(indicators.macd) > 0 ? 70 : 40 },
    { indicator: "Moving Avg (20)", value: chartData[chartData.length - 1].sma20, signal: currentPrice > chartData[chartData.length - 1].sma20 ? "Buy" : "Sell", score: currentPrice > chartData[chartData.length - 1].sma20 ? 80 : 35 },
    { indicator: "Moving Avg (50)", value: chartData[chartData.length - 1].sma50, signal: currentPrice > chartData[chartData.length - 1].sma50 ? "Buy" : "Sell", score: currentPrice > chartData[chartData.length - 1].sma50 ? 78 : 38 },
    { indicator: "Support Level", value: indicators.support1, signal: currentPrice > parseFloat(indicators.support1) ? "Strong" : "Weak", score: currentPrice > parseFloat(indicators.support1) ? 85 : 30 },
    { indicator: "Resistance Level", value: indicators.resistance1, signal: currentPrice < parseFloat(indicators.resistance1) ? "Room to grow" : "Overbought", score: currentPrice < parseFloat(indicators.resistance1) ? 72 : 42 }
  ];

  const overallScore = (technicalScores.reduce((sum, t) => sum + t.score, 0) / technicalScores.length).toFixed(0);

  return (
    <div className="space-y-6">
      {/* Overall Technical Score */}
      <Card className="bg-gradient-to-br from-card to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Overall Technical Score</span>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">{overallScore}/100</span>
              {parseFloat(overallScore) >= 60 ? (
                <TrendingUp className="h-6 w-6 text-success" />
              ) : (
                <TrendingDown className="h-6 w-6 text-destructive" />
              )}
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Price Chart with Indicators */}
      <Card>
        <CardHeader>
          <CardTitle>Price Chart with Technical Indicators (90 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                interval={Math.floor(chartData.length / 10)}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              
              {/* Resistance Lines */}
              <ReferenceLine 
                y={parseFloat(indicators.resistance1)} 
                stroke="hsl(var(--destructive))" 
                strokeDasharray="3 3" 
                label={{ value: `R1: ${indicators.resistance1}`, position: 'right', fill: 'hsl(var(--destructive))' }}
              />
              <ReferenceLine 
                y={parseFloat(indicators.resistance2)} 
                stroke="hsl(var(--destructive))" 
                strokeDasharray="5 5" 
                label={{ value: `R2: ${indicators.resistance2}`, position: 'right', fill: 'hsl(var(--destructive))' }}
                strokeOpacity={0.6}
              />
              
              {/* Support Lines */}
              <ReferenceLine 
                y={parseFloat(indicators.support1)} 
                stroke="hsl(var(--success))" 
                strokeDasharray="3 3" 
                label={{ value: `S1: ${indicators.support1}`, position: 'right', fill: 'hsl(var(--success))' }}
              />
              <ReferenceLine 
                y={parseFloat(indicators.support2)} 
                stroke="hsl(var(--success))" 
                strokeDasharray="5 5" 
                label={{ value: `S2: ${indicators.support2}`, position: 'right', fill: 'hsl(var(--success))' }}
                strokeOpacity={0.6}
              />
              
              {/* Moving Averages */}
              <Line 
                type="monotone" 
                dataKey="sma20" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                dot={false}
                name="SMA 20"
              />
              <Line 
                type="monotone" 
                dataKey="sma50" 
                stroke="hsl(var(--chart-3))" 
                strokeWidth={2}
                dot={false}
                name="SMA 50"
              />
              
              {/* Price Line */}
              <Area 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fill="url(#colorPrice)"
                name="Price"
              />
            </ComposedChart>
          </ResponsiveContainer>
          
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-primary"></div>
              <span className="text-sm text-muted-foreground">Price</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-chart-2"></div>
              <span className="text-sm text-muted-foreground">SMA 20</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-chart-3"></div>
              <span className="text-sm text-muted-foreground">SMA 50</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-destructive border-dashed"></div>
              <span className="text-sm text-muted-foreground">Resistance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-success border-dashed"></div>
              <span className="text-sm text-muted-foreground">Support</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical Indicators Details */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Indicators Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {technicalScores.map((indicator, index) => (
              <div key={index} className="border-b border-border/50 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{indicator.indicator}</h4>
                    <p className="text-sm text-muted-foreground">Value: {indicator.value}</p>
                  </div>
                  <div className="text-right">
                    <Badge 
                      variant={indicator.signal.includes("Buy") || indicator.signal.includes("Bullish") || indicator.signal.includes("Strong") || indicator.signal.includes("grow") ? "default" : "secondary"}
                      className="mb-1"
                    >
                      {indicator.signal}
                    </Badge>
                    <div className="text-sm font-medium text-primary">{indicator.score}%</div>
                  </div>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${indicator.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-success">Support Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Support 1</span>
              <span className="font-medium">PKR {indicators.support1}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Support 2</span>
              <span className="font-medium">PKR {indicators.support2}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Resistance Levels</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Resistance 1</span>
              <span className="font-medium">PKR {indicators.resistance1}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Resistance 2</span>
              <span className="font-medium">PKR {indicators.resistance2}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
