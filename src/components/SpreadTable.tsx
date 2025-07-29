import { useState } from 'react'

export function SpreadTable() {
  const [loading] = useState(false)

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">📱 Калькулятор Календарных Спредов</h1>
        <p className="text-gray-600">Реальная доходность с учётом всех затрат</p>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="text-gray-500">Загрузка...</div>
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">📊 Календарные Спреды</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="font-medium">Монета</div>
                <div className="font-medium">Спот</div>
                <div className="font-medium">Фьючерс</div>
                <div className="font-medium">Дней</div>
                <div className="font-medium">Теор APR</div>
                <div className="font-medium">Реал APR</div>
                <div className="font-medium">Прибыль</div>
              </div>
              
              {[
                { symbol: 'BTC', spot: 43000, future: 43500, days: 60, realAPR: 8.5, profit: 250 },
                { symbol: 'ETH', spot: 2600, future: 2650, days: 60, realAPR: 7.2, profit: 180 },
                { symbol: 'SOL', spot: 102, future: 106, days: 60, realAPR: 12.1, profit: 320 }
              ].map((item, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="font-semibold">{item.symbol}</div>
                  <div className="font-mono">${item.spot.toLocaleString()}</div>
                  <div className="font-mono">${item.future.toLocaleString()}</div>
                  <div className="font-mono">{item.days}</div>
                  <div className="font-mono">{(item.realAPR + 2).toFixed(1)}%</div>
                  <div className={`font-mono font-semibold ${item.realAPR >= 10 ? 'text-green-600' : item.realAPR >= 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                    {item.realAPR.toFixed(1)}%
                  </div>
                  <div className={`font-mono font-semibold ${item.realAPR >= 10 ? 'text-green-600' : item.realAPR >= 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                    ${item.profit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}