import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { RefreshCw, Settings, Calculator, TrendingUp, TrendingDown } from '@phosphor-icons/react'
import { useBinanceData } from '@/hooks/useBinanceData'
import { useSpreadCalculations, formatCurrency, formatPercent, formatPrice, getAPRColor, getAPRBadgeColor } from '@/hooks/useSpreadCalculations'
import { SpreadCalculator } from './SpreadCalculator'
import { SettingsPanel } from './SettingsPanel'

export function SpreadTable() {
  const { spreadData, loading, error, lastUpdate, refetch } = useBinanceData()
  const { calculatedSpreads, settings } = useSpreadCalculations(spreadData)
  const [selectedSpread, setSelectedSpread] = useState<any>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [displayCount, setDisplayCount] = useState(10)

  if (showSettings) {
    return <SettingsPanel onClose={() => setShowSettings(false)} />
  }

  if (selectedSpread) {
    return <SpreadCalculator spread={selectedSpread} onBack={() => setSelectedSpread(null)} />
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">📱 Calendar Spread Calculator</h1>
            <p className="text-muted-foreground">Real profitability with all costs included</p>
          </div>
          
          <div className="flex items-center gap-2">
            {lastUpdate && (
              <span className="text-sm text-muted-foreground">
                Updated: {lastUpdate.toLocaleTimeString()}
              </span>
            )}
            <Button variant="outline" size="sm" onClick={refetch} disabled={loading}>
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Controls */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Capital:</label>
                <div className="flex items-center gap-1">
                  <span className="font-mono text-lg font-semibold">
                    {formatCurrency(settings.capital)}
                  </span>
                  <span className="text-sm text-muted-foreground">USD</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Show:</label>
                <select 
                  value={displayCount} 
                  onChange={(e) => setDisplayCount(Number(e.target.value))}
                  className="px-2 py-1 rounded border bg-background text-sm"
                >
                  <option value={10}>10 coins</option>
                  <option value={20}>20 coins</option>
                  <option value={50}>All coins</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error State */}
        {error && (
          <Card className="border-destructive">
            <CardContent className="p-4">
              <p className="text-destructive">{error}</p>
              <Button variant="outline" size="sm" onClick={refetch} className="mt-2">
                Try Again
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Main Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📊 Live Calendar Spreads
              <Badge variant="secondary" className="font-mono">
                {calculatedSpreads.length} opportunities
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Coin</th>
                    <th className="text-right p-4 font-medium">Spot Price</th>
                    <th className="text-right p-4 font-medium">Future Price</th>
                    <th className="text-right p-4 font-medium">Days</th>
                    <th className="text-right p-4 font-medium">Theor APR</th>
                    <th className="text-right p-4 font-medium">Real APR</th>
                    <th className="text-right p-4 font-medium">Real Profit</th>
                    <th className="text-center p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 10 }).map((_, i) => (
                      <tr key={i} className="border-b">
                        <td className="p-4"><Skeleton className="h-5 w-12" /></td>
                        <td className="p-4"><Skeleton className="h-5 w-16 ml-auto" /></td>
                        <td className="p-4"><Skeleton className="h-5 w-16 ml-auto" /></td>
                        <td className="p-4"><Skeleton className="h-5 w-8 ml-auto" /></td>
                        <td className="p-4"><Skeleton className="h-5 w-12 ml-auto" /></td>
                        <td className="p-4"><Skeleton className="h-5 w-12 ml-auto" /></td>
                        <td className="p-4"><Skeleton className="h-5 w-16 ml-auto" /></td>
                        <td className="p-4"><Skeleton className="h-8 w-8 mx-auto" /></td>
                      </tr>
                    ))
                  ) : (
                    calculatedSpreads.slice(0, displayCount).map((spread) => (
                      <tr 
                        key={spread.symbol} 
                        className="border-b hover:bg-muted/30 cursor-pointer transition-colors"
                        onClick={() => setSelectedSpread(spread)}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{spread.symbol}</span>
                            {spread.realAPR >= 10 ? (
                              <TrendingUp className="w-4 h-4 text-success" />
                            ) : spread.realAPR >= 5 ? (
                              <span className="text-warning">⚠️</span>
                            ) : (
                              <TrendingDown className="w-4 h-4 text-danger" />
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right font-mono">
                          {formatPrice(spread.spotPrice)}
                        </td>
                        <td className="p-4 text-right font-mono">
                          {formatPrice(spread.futurePrice)}
                        </td>
                        <td className="p-4 text-right font-mono">
                          {spread.daysToExpiry}
                        </td>
                        <td className="p-4 text-right font-mono text-muted-foreground">
                          {formatPercent(spread.theoreticalAPR)}
                        </td>
                        <td className="p-4 text-right">
                          <Badge className={`font-mono ${getAPRBadgeColor(spread.realAPR)}`}>
                            {formatPercent(spread.realAPR)}
                          </Badge>
                        </td>
                        <td className="p-4 text-right font-mono font-semibold">
                          <span className={getAPRColor(spread.realAPR)}>
                            {formatCurrency(spread.realProfit)}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <Button variant="outline" size="sm">
                            <Calculator className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="font-mono text-2xl font-bold text-success">
                {calculatedSpreads.filter(s => s.realAPR >= 10).length}
              </div>
              <div className="text-sm text-muted-foreground">High Profit (≥10%)</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="font-mono text-2xl font-bold text-warning">
                {calculatedSpreads.filter(s => s.realAPR >= 5 && s.realAPR < 10).length}
              </div>
              <div className="text-sm text-muted-foreground">Medium Profit (5-10%)</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="font-mono text-2xl font-bold text-danger">
                {calculatedSpreads.filter(s => s.realAPR < 5).length}
              </div>
              <div className="text-sm text-muted-foreground">Low Profit (&lt;5%)</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="font-mono text-2xl font-bold">
                {calculatedSpreads.length > 0 ? 
                  formatPercent(calculatedSpreads.reduce((sum, s) => sum + s.realAPR, 0) / calculatedSpreads.length) : 
                  '0%'
                }
              </div>
              <div className="text-sm text-muted-foreground">Average APR</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}