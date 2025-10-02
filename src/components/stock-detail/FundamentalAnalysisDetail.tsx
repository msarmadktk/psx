import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface FundamentalAnalysisDetailProps {
  stockSymbol: string;
}

// Mock data generators
const generateYearlyDebt = () => {
  const years = [];
  for (let year = 2013; year <= 2025; year++) {
    years.push({
      year,
      totalDebt: (Math.random() * 50000 + 10000).toFixed(2),
      debtToEquity: (Math.random() * 2 + 0.5).toFixed(2),
      interestCoverage: (Math.random() * 10 + 2).toFixed(2)
    });
  }
  return years;
};

const generateQuarterlyReports = (year: number) => {
  return ['Q1', 'Q2', 'Q3', 'Q4'].map(quarter => ({
    quarter: `${quarter} ${year}`,
    revenue: (Math.random() * 50000 + 20000).toFixed(2),
    netIncome: (Math.random() * 10000 + 2000).toFixed(2),
    eps: (Math.random() * 20 + 5).toFixed(2),
    operatingCashFlow: (Math.random() * 15000 + 3000).toFixed(2)
  }));
};

const generateAnnualReports = () => {
  const reports = [];
  for (let year = 2013; year <= 2025; year++) {
    reports.push({
      year,
      revenue: (Math.random() * 200000 + 80000).toFixed(2),
      netIncome: (Math.random() * 40000 + 10000).toFixed(2),
      totalAssets: (Math.random() * 500000 + 200000).toFixed(2),
      totalLiabilities: (Math.random() * 300000 + 100000).toFixed(2),
      shareholderEquity: (Math.random() * 200000 + 80000).toFixed(2)
    });
  }
  return reports;
};

export const FundamentalAnalysisDetail = ({ stockSymbol }: FundamentalAnalysisDetailProps) => {
  const yearlyDebt = generateYearlyDebt();
  const annualReports = generateAnnualReports();
  const recentYears = [2025, 2024, 2023, 2022];

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Free Float</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(Math.random() * 40 + 20).toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Available for trading</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Market Cap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">PKR {(Math.random() * 500 + 100).toFixed(0)}B</div>
            <p className="text-xs text-muted-foreground mt-1">Total market value</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">P/E Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(Math.random() * 20 + 10).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">Price to earnings</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Dividend Yield</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(Math.random() * 5 + 2).toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground mt-1">Annual dividend</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="debt" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="debt">Debt Analysis</TabsTrigger>
          <TabsTrigger value="annual">Annual Reports</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly Reports</TabsTrigger>
          <TabsTrigger value="balance">Balance Sheet</TabsTrigger>
        </TabsList>

        <TabsContent value="debt" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Year-wise Debt Analysis (2013-2025)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Total Debt (PKR M)</TableHead>
                      <TableHead>Debt-to-Equity</TableHead>
                      <TableHead>Interest Coverage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {yearlyDebt.map((data) => (
                      <TableRow key={data.year}>
                        <TableCell className="font-medium">{data.year}</TableCell>
                        <TableCell>{data.totalDebt}</TableCell>
                        <TableCell>{data.debtToEquity}</TableCell>
                        <TableCell>{data.interestCoverage}x</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="annual" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Annual Financial Reports (2013-2025)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Revenue (PKR M)</TableHead>
                      <TableHead>Net Income (PKR M)</TableHead>
                      <TableHead>Total Assets (PKR M)</TableHead>
                      <TableHead>Total Liabilities (PKR M)</TableHead>
                      <TableHead>Equity (PKR M)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {annualReports.map((data) => (
                      <TableRow key={data.year}>
                        <TableCell className="font-medium">{data.year}</TableCell>
                        <TableCell>{data.revenue}</TableCell>
                        <TableCell>{data.netIncome}</TableCell>
                        <TableCell>{data.totalAssets}</TableCell>
                        <TableCell>{data.totalLiabilities}</TableCell>
                        <TableCell>{data.shareholderEquity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quarterly" className="mt-4">
          <div className="space-y-4">
            {recentYears.map(year => (
              <Card key={year}>
                <CardHeader>
                  <CardTitle>Quarterly Reports - {year}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Quarter</TableHead>
                          <TableHead>Revenue (PKR M)</TableHead>
                          <TableHead>Net Income (PKR M)</TableHead>
                          <TableHead>EPS (PKR)</TableHead>
                          <TableHead>Operating Cash Flow (PKR M)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {generateQuarterlyReports(year).map((data) => (
                          <TableRow key={data.quarter}>
                            <TableCell className="font-medium">{data.quarter}</TableCell>
                            <TableCell>{data.revenue}</TableCell>
                            <TableCell>{data.netIncome}</TableCell>
                            <TableCell>{data.eps}</TableCell>
                            <TableCell>{data.operatingCashFlow}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="balance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Balance Sheet Summary (Latest)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 text-success">Assets</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Current Assets</span>
                      <span className="font-medium">PKR {(Math.random() * 100000 + 50000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Fixed Assets</span>
                      <span className="font-medium">PKR {(Math.random() * 200000 + 100000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Intangible Assets</span>
                      <span className="font-medium">PKR {(Math.random() * 50000 + 10000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between py-2 font-semibold">
                      <span>Total Assets</span>
                      <span>PKR {(Math.random() * 500000 + 200000).toFixed(2)}M</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-destructive">Liabilities</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Current Liabilities</span>
                      <span className="font-medium">PKR {(Math.random() * 80000 + 30000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Long-term Debt</span>
                      <span className="font-medium">PKR {(Math.random() * 150000 + 50000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between py-2 font-semibold">
                      <span>Total Liabilities</span>
                      <span>PKR {(Math.random() * 300000 + 100000).toFixed(2)}M</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-primary">Equity</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Share Capital</span>
                      <span className="font-medium">PKR {(Math.random() * 50000 + 20000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/50">
                      <span className="text-muted-foreground">Retained Earnings</span>
                      <span className="font-medium">PKR {(Math.random() * 100000 + 40000).toFixed(2)}M</span>
                    </div>
                    <div className="flex justify-between py-2 font-semibold">
                      <span>Total Equity</span>
                      <span>PKR {(Math.random() * 200000 + 80000).toFixed(2)}M</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
