import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Save } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'

interface TradingSettings {
  capital: number
  spotCommission: number
  futureCommission: number
  bidAskSpread: number
  fundingRate: number
  usdtStakingRate: number
}

const DEFAULT_SETTINGS: TradingSettings = {
  capital: 10000,
  spotCommission: 0.001,
  futureCommission: 0.0004,
  bidAskSpread: 0.0005,
  fundingRate: -0.0001,
  usdtStakingRate: 0.05
}

interface SettingsPanelProps {
  onClose: () => void
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [settings, setSettings] = useKV<TradingSettings>('trading-settings', DEFAULT_SETTINGS)
  const [localSettings, setLocalSettings] = useState(settings)

  const handleSave = () => {
    setSettings(localSettings)
    toast.success('Settings saved successfully!')
    onClose()
  }

  const handleReset = () => {
    setLocalSettings(DEFAULT_SETTINGS)
    toast.info('Settings reset to defaults')
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onClose}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">⚙️ Settings</h1>
            <p className="text-muted-foreground">Configure trading parameters and preferences</p>
          </div>
        </div>

        {/* Trading Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>💰 Trading Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capital">Default Capital (USD)</Label>
                <Input
                  id="capital"
                  type="number"
                  value={localSettings.capital}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    capital: Number(e.target.value)
                  })}
                  className="font-mono"
                />
              </div>

              <div>
                <Label htmlFor="spot-commission">Spot Commission (%)</Label>
                <Input
                  id="spot-commission"
                  type="number"
                  step="0.001"
                  value={localSettings.spotCommission * 100}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    spotCommission: Number(e.target.value) / 100
                  })}
                  className="font-mono"
                />
              </div>

              <div>
                <Label htmlFor="future-commission">Future Commission (%)</Label>
                <Input
                  id="future-commission"
                  type="number"
                  step="0.001"
                  value={localSettings.futureCommission * 100}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    futureCommission: Number(e.target.value) / 100
                  })}
                  className="font-mono"
                />
              </div>

              <div>
                <Label htmlFor="bid-ask-spread">Bid-Ask Spread (%)</Label>
                <Input
                  id="bid-ask-spread"
                  type="number"
                  step="0.001"
                  value={localSettings.bidAskSpread * 100}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    bidAskSpread: Number(e.target.value) / 100
                  })}
                  className="font-mono"
                />
              </div>

              <div>
                <Label htmlFor="funding-rate">Average Funding Rate (% per event)</Label>
                <Input
                  id="funding-rate"
                  type="number"
                  step="0.0001"
                  value={localSettings.fundingRate * 100}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    fundingRate: Number(e.target.value) / 100
                  })}
                  className="font-mono"
                />
              </div>

              <div>
                <Label htmlFor="staking-rate">USDT Staking Rate (% APR)</Label>
                <Input
                  id="staking-rate"
                  type="number"
                  step="0.01"
                  value={localSettings.usdtStakingRate * 100}
                  onChange={(e) => setLocalSettings({
                    ...localSettings,
                    usdtStakingRate: Number(e.target.value) / 100
                  })}
                  className="font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commission Details */}
        <Card>
          <CardHeader>
            <CardTitle>📊 Commission Structure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span>Binance Spot (VIP 0):</span>
                <span className="font-mono">0.1% maker/taker</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span>Binance Futures (VIP 0):</span>
                <span className="font-mono">0.04% maker/taker</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span>Typical Bid-Ask Spread:</span>
                <span className="font-mono">0.05-0.1% per side</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span>Funding Frequency:</span>
                <span className="font-mono">3x per day (every 8h)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>⚠️ Risk Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-warning/10 border border-warning/20 rounded">
                <div className="font-medium text-warning mb-1">Position Sizing</div>
                <p className="text-muted-foreground">
                  The calculator uses 80% of capital for position size and reserves 20% for margin requirements. 
                  Adjust your capital input to match your risk tolerance.
                </p>
              </div>
              
              <div className="p-3 bg-accent/10 border border-accent/20 rounded">
                <div className="font-medium text-accent mb-1">Funding Rate Impact</div>
                <p className="text-muted-foreground">
                  Negative funding rates mean long positions pay shorts. This cost is included in all calculations.
                  Monitor funding rates as they can change significantly during volatile periods.
                </p>
              </div>
              
              <div className="p-3 bg-muted/10 border border-border rounded">
                <div className="font-medium mb-1">Opportunity Cost</div>
                <p className="text-muted-foreground">
                  The calculator includes the opportunity cost of not staking your USDT. 
                  Current Binance USDT staking yields approximately 5% APR.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleSave} className="flex-1" size="lg">
            <Save className="w-4 h-4 mr-2" />
            💾 Save Settings
          </Button>
          <Button variant="outline" onClick={handleReset} className="flex-1" size="lg">
            🔄 Reset to Defaults
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1" size="lg">
            ❌ Cancel
          </Button>
        </div>

        {/* Data Sources */}
        <Card>
          <CardHeader>
            <CardTitle>🔄 Data Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Spot Prices:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Binance API</span>
                  <span className="w-2 h-2 bg-success rounded-full"></span>
                  <span className="text-xs text-success">Connected</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Future Prices:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Binance API</span>
                  <span className="w-2 h-2 bg-success rounded-full"></span>
                  <span className="text-xs text-success">Connected</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Update Interval:</span>
                <span className="text-sm text-muted-foreground">30 seconds</span>
              </div>
              
              <Separator />
              
              <div className="text-xs text-muted-foreground">
                <p>
                  All price data is fetched directly from Binance public APIs. 
                  No API keys required for read-only market data access.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}