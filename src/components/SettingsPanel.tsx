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
    toast.success('Настройки успешно сохранены!')
    onClose()
  }

  const handleReset = () => {
    setLocalSettings(DEFAULT_SETTINGS)
    toast.info('Настройки сброшены к стандартным значениям')
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
            <h1 className="text-3xl font-bold">⚙️ Настройки</h1>
            <p className="text-muted-foreground">Настройка торговых параметров и предпочтений</p>
          </div>
        </div>

        {/* Trading Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>💰 Торговые Параметры</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capital">Стандартный Капитал (USD)</Label>
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
                <Label htmlFor="spot-commission">Комиссия Спот (%)</Label>
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
                <Label htmlFor="future-commission">Комиссия Фьючерс (%)</Label>
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
                <Label htmlFor="bid-ask-spread">Спред Bid-Ask (%)</Label>
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
                <Label htmlFor="funding-rate">Средний Фандинг (% за событие)</Label>
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
                <Label htmlFor="staking-rate">Ставка Стейкинга USDT (% APR)</Label>
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
            <CardTitle>📊 Структура Комиссий</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span>Binance Спот (VIP 0):</span>
                <span className="font-mono">0.1% мейкер/тейкер</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span>Binance Фьючерс (VIP 0):</span>
                <span className="font-mono">0.04% мейкер/тейкер</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span>Типичный Bid-Ask Спред:</span>
                <span className="font-mono">0.05-0.1% за сторону</span>
              </div>
              <div className="flex justify-between p-2 bg-muted/20 rounded">
                <span>Частота Фандинга:</span>
                <span className="font-mono">3 раза/день (каждые 8ч)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Parameters */}
        <Card>
          <CardHeader>
            <CardTitle>⚠️ Управление Рисками</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-warning/10 border border-warning/20 rounded">
                <div className="font-medium text-warning mb-1">Размер Позиции</div>
                <p className="text-muted-foreground">
                  Калькулятор использует 80% капитала для размера позиции и резервирует 20% для маржинальных требований. 
                  Скорректируйте ввод капитала в соответствии с вашей толерантностью к риску.
                </p>
              </div>
              
              <div className="p-3 bg-accent/10 border border-accent/20 rounded">
                <div className="font-medium text-accent mb-1">Влияние Фандинга</div>
                <p className="text-muted-foreground">
                  Отрицательные ставки фандинга означают, что длинные позиции платят коротким. Эта стоимость включена во все расчёты.
                  Следите за ставками фандинга, поскольку они могут значительно изменяться в периоды волатильности.
                </p>
              </div>
              
              <div className="p-3 bg-muted/10 border border-border rounded">
                <div className="font-medium mb-1">Альтернативная Стоимость</div>
                <p className="text-muted-foreground">
                  Калькулятор включает альтернативную стоимость отказа от стейкинга USDT. 
                  Текущая доходность стейкинга USDT на Binance составляет приблизительно 5% APR.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleSave} className="flex-1" size="lg">
            <Save className="w-4 h-4 mr-2" />
            💾 Сохранить Настройки
          </Button>
          <Button variant="outline" onClick={handleReset} className="flex-1" size="lg">
            🔄 Сбросить к Стандартным
          </Button>
          <Button variant="outline" onClick={onClose} className="flex-1" size="lg">
            ❌ Отмена
          </Button>
        </div>

        {/* Data Sources */}
        <Card>
          <CardHeader>
            <CardTitle>🔄 Источники Данных</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>Спот Цены:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Binance API</span>
                  <span className="w-2 h-2 bg-success rounded-full"></span>
                  <span className="text-xs text-success">Подключено</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Фьючерсные Цены:</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Binance API</span>
                  <span className="w-2 h-2 bg-success rounded-full"></span>
                  <span className="text-xs text-success">Подключено</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>Интервал Обновления:</span>
                <span className="text-sm text-muted-foreground">30 секунд</span>
              </div>
              
              <Separator />
              
              <div className="text-xs text-muted-foreground">
                <p>
                  Все ценовые данные получаются напрямую из публичных API Binance. 
                  API ключи не требуются для доступа к рыночным данным только для чтения.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}