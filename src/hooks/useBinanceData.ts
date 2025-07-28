import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'

interface BinanceTickerData {
  symbol: string
  price: string
  volume: string
  count: number
}

interface SpreadData {
  symbol: string
  spotPrice: number
  futurePrice: number
  premium: number
  spreadPercent: number
  daysToExpiry: number
  volume24h: number
}

const MAJOR_SYMBOLS = [
  'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'XRPUSDT',
  'SOLUSDT', 'DOTUSDT', 'DOGEUSDT', 'AVAXUSDT', 'LINKUSDT',
  'LTCUSDT', 'MATICUSDT', 'ATOMUSDT', 'NEARUSDT', 'ALGOUSDT'
]

// Mock data generator for demonstration
function generateMockSpreadData(): SpreadData[] {
  const baseData = [
    { symbol: 'BTC', basePrice: 43000, volatility: 0.02, volume: 2500000000 },
    { symbol: 'ETH', basePrice: 2600, volatility: 0.025, volume: 1200000000 },
    { symbol: 'BNB', basePrice: 320, volatility: 0.03, volume: 800000000 },
    { symbol: 'ADA', basePrice: 0.52, volatility: 0.035, volume: 400000000 },
    { symbol: 'XRP', basePrice: 0.61, volatility: 0.032, volume: 600000000 },
    { symbol: 'SOL', basePrice: 102, volatility: 0.04, volume: 500000000 },
    { symbol: 'DOT', basePrice: 7.8, volatility: 0.038, volume: 250000000 },
    { symbol: 'DOGE', basePrice: 0.087, volatility: 0.045, volume: 300000000 },
    { symbol: 'AVAX', basePrice: 38, volatility: 0.042, volume: 350000000 },
    { symbol: 'LINK', basePrice: 15.2, volatility: 0.036, volume: 280000000 },
    { symbol: 'LTC', basePrice: 73, volatility: 0.03, volume: 220000000 },
    { symbol: 'MATIC', basePrice: 0.91, volatility: 0.04, volume: 180000000 },
    { symbol: 'ATOM', basePrice: 10.5, volatility: 0.037, volume: 150000000 },
    { symbol: 'NEAR', basePrice: 2.1, volatility: 0.043, volume: 120000000 },
    { symbol: 'ALGO', basePrice: 0.19, volatility: 0.041, volume: 80000000 }
  ]

  return baseData.map(coin => {
    // Add some randomization to prices
    const priceVariation = (Math.random() - 0.5) * coin.volatility * 2
    const spotPrice = coin.basePrice * (1 + priceVariation)
    
    // Future price with premium (calendar spread)
    const annualSpread = 0.08 + (Math.random() - 0.5) * 0.12 // 2% to 14% annual spread
    const daysToExpiry = 30 + Math.floor(Math.random() * 60) // 30-90 days
    const premium = spotPrice * (annualSpread * daysToExpiry / 365)
    const futurePrice = spotPrice + premium
    
    const spreadPercent = (premium / spotPrice) * 100
    
    return {
      symbol: coin.symbol,
      spotPrice,
      futurePrice,
      premium,
      spreadPercent,
      daysToExpiry,
      volume24h: coin.volume * (0.8 + Math.random() * 0.4) // Vary volume ±20%
    }
  })
}

export function useBinanceData() {
  const [spreadData, setSpreadData] = useState<SpreadData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchBinanceData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Generate mock data
      const mockData = generateMockSpreadData()
      
      setSpreadData(mockData)
      setLastUpdate(new Date())
    } catch (err) {
      setError('Не удалось получить рыночные данные')
      console.error('Ошибка получения данных:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBinanceData()
    
    // Обновление каждые 30 секунд
    const interval = setInterval(fetchBinanceData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  return {
    spreadData,
    loading,
    error,
    lastUpdate,
    refetch: fetchBinanceData
  }
}