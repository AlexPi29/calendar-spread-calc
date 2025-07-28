import { useMemo } from 'react'
import { useKV } from '@github/spark/hooks'

interface SpreadData {
  symbol: string
  spotPrice: number
  futurePrice: number
  premium: number
  spreadPercent: number
  daysToExpiry: number
  volume24h: number
}

interface CalculatedSpread extends SpreadData {
  theoreticalAPR: number
  realAPR: number
  realProfit: number
  profitBreakdown: {
    theoretical: number
    spotBuyCommission: number
    futureSellCommission: number
    spotSellCommission: number
    futureBuyCommission: number
    bidAskSpread: number
    fundingCost: number
    opportunityCost: number
  }
  positionSize: number
  marginRequired: number
}

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
  spotCommission: 0.001, // 0.1%
  futureCommission: 0.0004, // 0.04%
  bidAskSpread: 0.0005, // 0.05%
  fundingRate: -0.0001, // -0.01% average
  usdtStakingRate: 0.05 // 5% APR
}

export function useSpreadCalculations(spreadData: SpreadData[]) {
  const [settings] = useKV<TradingSettings>('trading-settings', DEFAULT_SETTINGS)
  
  const calculatedSpreads = useMemo(() => {
    return spreadData.map(spread => {
      const { capital, spotCommission, futureCommission, bidAskSpread, fundingRate, usdtStakingRate } = settings
      
      // Calculate position size (use 80% of capital for position, 20% for margin)
      const positionValue = capital * 0.8
      const positionSize = positionValue / spread.spotPrice
      const marginRequired = capital * 0.2
      
      // Theoretical profit
      const theoreticalProfit = spread.premium * positionSize
      const theoreticalAPR = (theoreticalProfit / capital) * (365 / spread.daysToExpiry) * 100
      
      // Calculate all costs
      const spotBuyCommission = positionValue * spotCommission
      const futureSellCommission = (spread.futurePrice * positionSize) * futureCommission
      const spotSellCommission = positionValue * spotCommission  
      const futureBuyCommission = (spread.futurePrice * positionSize) * futureCommission
      
      const bidAskSpreadLoss = positionValue * bidAskSpread * 2 // Entry and exit
      
      // Funding cost (negative funding = we pay)
      const fundingEvents = Math.ceil(spread.daysToExpiry / 1) * 3 // 3 times per day
      const fundingCost = Math.abs(fundingRate) * (spread.futurePrice * positionSize) * fundingEvents
      
      // Opportunity cost (what we could earn staking USDT)
      const opportunityCost = capital * (usdtStakingRate / 365) * spread.daysToExpiry
      
      // Real profit calculation
      const totalCosts = spotBuyCommission + futureSellCommission + spotSellCommission + 
                        futureBuyCommission + bidAskSpreadLoss + fundingCost + opportunityCost
      
      const realProfit = theoreticalProfit - totalCosts
      const realAPR = (realProfit / capital) * (365 / spread.daysToExpiry) * 100
      
      const profitBreakdown = {
        theoretical: theoreticalProfit,
        spotBuyCommission: -spotBuyCommission,
        futureSellCommission: -futureSellCommission,
        spotSellCommission: -spotSellCommission,
        futureBuyCommission: -futureBuyCommission,
        bidAskSpread: -bidAskSpreadLoss,
        fundingCost: -fundingCost,
        opportunityCost: -opportunityCost
      }
      
      return {
        ...spread,
        theoreticalAPR,
        realAPR,
        realProfit,
        profitBreakdown,
        positionSize,
        marginRequired
      } as CalculatedSpread
    })
    .sort((a, b) => b.realAPR - a.realAPR) // Sort by real APR descending
  }, [spreadData, settings])
  
  return {
    calculatedSpreads,
    settings
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export function formatPercent(percent: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  }).format(percent / 100)
}

export function formatPrice(price: number): string {
  if (price >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  } else if (price >= 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price)
  } else {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    }).format(price)
  }
}

export function getAPRColor(apr: number): string {
  if (apr >= 10) return 'text-success'
  if (apr >= 5) return 'text-warning'
  return 'text-danger'
}

export function getAPRBadgeColor(apr: number): string {
  if (apr >= 10) return 'bg-success text-white'
  if (apr >= 5) return 'bg-warning text-white'
  return 'bg-danger text-white'
}