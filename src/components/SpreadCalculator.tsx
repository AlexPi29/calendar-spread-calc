import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, TrendingUp, Calculator, DollarSign, Clock } from '@phosphor-icons/react'
import { formatCurrency, formatPercent, formatPrice, getAPRColor } from '@/hooks/useSpreadCalculations'

interface SpreadCalculatorProps {
  spread: any
  onBack: () => void
}

export function SpreadCalculator({ spread, onBack }: SpreadCalculatorProps) {
  const profitBreakdown = spread.profitBreakdown

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">📊 {spread.symbol} Calendar Spread Details</h1>
            <p className="text-muted-foreground">Complete cost breakdown and analysis</p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="font-mono text-xl font-bold">
                {formatPrice(spread.spotPrice)}
              </div>
              <div className="text-sm text-muted-foreground">Spot Price</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="font-mono text-xl font-bold">
                {formatPrice(spread.futurePrice)}
              </div>
              <div className="text-sm text-muted-foreground">Future Price</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Calculator className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="font-mono text-xl font-bold">
                {formatPrice(spread.premium)}
              </div>
              <div className="text-sm text-muted-foreground">Premium</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="font-mono text-xl font-bold">
                {spread.daysToExpiry}
              </div>
              <div className="text-sm text-muted-foreground">Days to Expiry</div>
            </CardContent>
          </Card>
        </div>

        {/* Position Details */}
        <Card>
          <CardHeader>
            <CardTitle>💰 Position Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Position Size</div>
                <div className="font-mono text-lg font-semibold">
                  {spread.positionSize.toFixed(4)} {spread.symbol}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Margin Required</div>
                <div className="font-mono text-lg font-semibold">
                  {formatCurrency(spread.marginRequired)}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Spread Percentage</div>
                <div className="font-mono text-lg font-semibold">
                  {formatPercent(spread.spreadPercent)}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">24h Volume</div>
                <div className="font-mono text-lg font-semibold">
                  {formatCurrency(spread.volume24h)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profit Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>📈 Profit Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
              <span className="font-medium">📈 Theoretical Profit:</span>
              <span className="font-mono font-semibold text-lg">
                {formatCurrency(profitBreakdown.theoretical)} 
                <span className="text-sm text-muted-foreground ml-2">
                  ({formatPercent(spread.theoreticalAPR)} APR)
                </span>
              </span>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">💸 Spot Buy Commission (0.1%):</span>
                <span className="font-mono text-danger">
                  {formatCurrency(profitBreakdown.spotBuyCommission)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">💸 Future Sell Commission (0.04%):</span>
                <span className="font-mono text-danger">
                  {formatCurrency(profitBreakdown.futureSellCommission)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">💸 Spot Sell Commission (0.1%):</span>
                <span className="font-mono text-danger">
                  {formatCurrency(profitBreakdown.spotSellCommission)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">💸 Future Buy Commission (0.04%):</span>
                <span className="font-mono text-danger">
                  {formatCurrency(profitBreakdown.futureBuyCommission)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">💸 Bid-Ask Spread Loss (est.):</span>
                <span className="font-mono text-danger">
                  {formatCurrency(profitBreakdown.bidAskSpread)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">💸 Funding Cost ({spread.daysToExpiry}d):</span>
                <span className="font-mono text-danger">
                  {formatCurrency(profitBreakdown.fundingCost)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">💸 Opportunity Cost (USDT staking):</span>
                <span className="font-mono text-danger">
                  {formatCurrency(profitBreakdown.opportunityCost)}
                </span>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded">
              <span className="font-bold text-lg">🎯 REAL NET PROFIT:</span>
              <div className="text-right">
                <div className={`font-mono font-bold text-xl ${getAPRColor(spread.realAPR)}`}>
                  {formatCurrency(spread.realProfit)}
                </div>
                <div className={`font-mono text-sm ${getAPRColor(spread.realAPR)}`}>
                  ({formatPercent(spread.realAPR)} APR)
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-accent/10 rounded">
              <span className="font-medium">🎯 ROI on Capital:</span>
              <span className="font-mono font-semibold">
                {formatPercent((spread.realProfit / 10000) * 100)} ({spread.daysToExpiry} days)
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Scenario Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Scenario Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="font-medium mb-3">Price Movement Impact:</div>
                <div className="flex justify-between p-2 bg-muted/20 rounded">
                  <span>If {spread.symbol} = {formatPrice(spread.spotPrice * 0.8)}:</span>
                  <span className="font-mono text-success">
                    {formatCurrency(spread.realProfit)} ✅
                  </span>
                </div>
                <div className="flex justify-between p-2 bg-muted/20 rounded">
                  <span>If {spread.symbol} = {formatPrice(spread.spotPrice * 1.3)}:</span>
                  <span className="font-mono text-success">
                    {formatCurrency(spread.realProfit)} ✅
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  * Calendar spreads are market-neutral - profit is fixed regardless of price movement
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="font-medium mb-3">Risk Factors:</div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Liquidity Risk:</span>
                    <Badge variant="outline" className="text-success">Low</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Funding Risk:</span>
                    <Badge variant="outline" className="text-warning">Medium</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Execution Risk:</span>
                    <Badge variant="outline" className="text-success">Low</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Opportunity Risk:</span>
                    <Badge variant="outline" className="text-warning">Medium</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button className="flex-1" size="lg">
            🚀 Execute Trade
          </Button>
          <Button variant="outline" className="flex-1" size="lg">
            📋 Save Analysis
          </Button>
          <Button variant="outline" className="flex-1" size="lg">
            📤 Share Results
          </Button>
        </div>

        {/* Warning */}
        <Card className="border-warning/50 bg-warning/5">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <span className="text-warning text-xl">⚠️</span>
              <div className="text-sm">
                <div className="font-medium text-warning mb-1">Important Disclaimer</div>
                <p className="text-muted-foreground">
                  This calculator provides estimates based on current market conditions. 
                  Actual results may vary due to market volatility, execution timing, and other factors. 
                  Always DYOR (Do Your Own Research) before executing any trades.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}