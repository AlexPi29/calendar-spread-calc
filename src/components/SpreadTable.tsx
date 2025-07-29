import { useState } from 'react'
import { TrendingUp, DollarSign, Calendar, Activity } from '@phosphor-icons/react'

export function SpreadTable() {
  const [loading] = useState(false)
  const [capital, setCapital] = useState(10000)

  const spreads = [
    { symbol: '💰 BTC', spot: 43000, future: 43500, days: 60, theorAPR: 10.5, realAPR: 8.5, profit: 250, emoji: '🚀' },
    { symbol: '🌟 ETH', spot: 2600, future: 2650, days: 60, theorAPR: 9.2, realAPR: 7.2, profit: 180, emoji: '📊' },
    { symbol: '🔗 SOL', spot: 102, future: 106, days: 60, theorAPR: 14.1, realAPR: 12.1, profit: 320, emoji: '⚡' },
    { symbol: '🟡 ADA', spot: 0.45, future: 0.47, days: 60, theorAPR: 13.2, realAPR: 10.8, profit: 280, emoji: '⭐' },
    { symbol: '🔵 DOT', spot: 8.2, future: 8.5, days: 60, theorAPR: 11.0, realAPR: 8.9, profit: 200, emoji: '💎' }
  ]

  const getAPRColor = (apr: number) => {
    if (apr >= 10) return 'text-success'
    if (apr >= 5) return 'text-warning'
    return 'text-danger'
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Заголовок */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-foreground flex items-center justify-center gap-3">
            📱 Калькулятор Календарных Спредов
          </h1>
          <p className="text-muted-foreground text-lg">Реальная доходность с учётом всех затрат</p>
        </div>

        {/* Панель управления */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <DollarSign size={24} className="text-primary" />
              <span className="text-lg font-medium">Капитал:</span>
              <input
                type="number"
                value={capital}
                onChange={(e) => setCapital(Number(e.target.value))}
                className="bg-input border border-border rounded-md px-3 py-2 w-32 text-foreground"
              />
              <span className="text-muted-foreground">USD</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={20} className="text-accent" />
              <span className="text-sm text-muted-foreground">Показать 10 монет</span>
            </div>
          </div>
        </div>

        {/* Таблица спредов */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <TrendingUp size={24} className="text-primary" />
              📊 Календарные Спреды
            </h2>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="text-muted-foreground text-lg">🔄 Загрузка данных...</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              {/* Заголовки таблицы */}
              <div className="grid grid-cols-8 gap-4 p-4 bg-muted border-b border-border text-sm font-medium">
                <div>Монета</div>
                <div>Спот цена</div>
                <div>Фьючерс цена</div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  Дней
                </div>
                <div>Теор APR</div>
                <div>Реал APR</div>
                <div>Реал прибыль</div>
                <div>Действие</div>
              </div>
              
              {/* Строки данных */}
              <div className="space-y-1">
                {spreads.map((item, index) => (
                  <div key={index} className="grid grid-cols-8 gap-4 p-4 hover:bg-muted/50 transition-colors border-b border-border/50">
                    <div className="font-semibold text-lg">{item.symbol}</div>
                    <div className="font-mono text-muted-foreground">${item.spot.toLocaleString()}</div>
                    <div className="font-mono text-muted-foreground">${item.future.toLocaleString()}</div>
                    <div className="font-mono text-muted-foreground">{item.days}</div>
                    <div className="font-mono text-muted-foreground">{item.theorAPR.toFixed(1)}%</div>
                    <div className={`font-mono font-bold text-lg ${getAPRColor(item.realAPR)}`}>
                      {item.realAPR.toFixed(1)}%
                    </div>
                    <div className={`font-mono font-bold ${getAPRColor(item.realAPR)}`}>
                      ${item.profit}
                    </div>
                    <div className="text-2xl">{item.emoji}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Панель управления внизу */}
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
            ⚙️ Настройки
          </button>
          <button className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
            📥 Экспорт
          </button>
          <button className="bg-accent text-accent-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
            🔄 Обновить
          </button>
          <button className="bg-muted text-muted-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
            ❓ Помощь
          </button>
        </div>
      </div>
    </div>
  )
}