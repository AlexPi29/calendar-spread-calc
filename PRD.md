# 📱 Calendar Spread Calculator

*Real profitability calculator for calendar spreads with all hidden costs included*

## Mission Statement
Calculate the **real** profitability of calendar spreads by accounting for trading fees, funding costs, bid-ask spreads, and opportunity costs that traditional calculators ignore.

**Experience Qualities**:
1. **Precise** - Shows actual profits after all real-world costs and fees
2. **Immediate** - Real-time data updates with sub-second responsiveness  
3. **Professional** - Clean, data-dense interface for serious traders

**Complexity Level**: Light Application (multiple features with basic state)
The calculator focuses on real-time data presentation and calculations without requiring user accounts or complex state management.

## Essential Features

### Real-Time Spread Table
- **Functionality**: Display top profitable calendar spreads with real vs theoretical returns
- **Purpose**: Quickly identify best opportunities across multiple cryptocurrencies
- **Trigger**: Page load and auto-refresh every 30 seconds
- **Progression**: Load data → Calculate spreads → Sort by real APR → Display in table → Auto-refresh
- **Success criteria**: Shows accurate real-time data with sub-3 second initial load

### Detailed Spread Calculator  
- **Functionality**: Break down exact profit/loss components for selected spread
- **Purpose**: Understand true costs and validate profitability before executing
- **Trigger**: Click on any spread row from main table
- **Progression**: Select spread → Load detailed data → Calculate breakdown → Show scenario analysis → Return to table
- **Success criteria**: All cost components clearly itemized with accurate calculations

### Capital & Settings Management
- **Functionality**: Configure trading parameters, capital allocation, and display preferences
- **Purpose**: Customize calculations for individual trading setup and risk tolerance
- **Trigger**: Settings button or first-time setup
- **Progression**: Open settings → Adjust parameters → Save locally → Apply to calculations → Return to main view
- **Success criteria**: Settings persist between sessions and immediately update calculations

## Edge Case Handling
- **No API Connection**: Show cached data with timestamp warning
- **Invalid Symbols**: Filter out delisted or low-volume pairs automatically  
- **Extreme Spreads**: Flag potentially erroneous data (>50% APR) with warnings
- **Mobile Data**: Reduce update frequency on slow connections
- **Calculation Errors**: Graceful fallback to theoretical calculations if real data unavailable

## Design Direction
The interface should feel **professional and data-focused** like a Bloomberg terminal - serious, information-dense, with subtle elegant touches that don't distract from the numbers. Minimal interface better serves traders who need to quickly scan multiple opportunities.

## Color Selection
**Triadic color scheme** emphasizing financial data visualization with clear profit/loss indicators and professional aesthetic.

- **Primary Color**: Deep Navy `oklch(0.15 0.05 240)` - Communicates reliability and professionalism
- **Secondary Colors**: Charcoal `oklch(0.25 0.02 240)` for cards/surfaces, Light Gray `oklch(0.95 0.01 240)` for backgrounds  
- **Accent Color**: Electric Blue `oklch(0.65 0.25 240)` for CTAs and interactive elements
- **Foreground/Background Pairings**:
  - Background (Deep Navy): White text `oklch(0.98 0 0)` - Ratio 12.3:1 ✓
  - Card (Charcoal): Light Gray text `oklch(0.85 0.02 240)` - Ratio 8.1:1 ✓  
  - Primary (Deep Navy): White text `oklch(0.98 0 0)` - Ratio 12.3:1 ✓
  - Accent (Electric Blue): White text `oklch(0.98 0 0)` - Ratio 4.7:1 ✓
  - Success Green: `oklch(0.7 0.25 145)` for profitable spreads
  - Warning Orange: `oklch(0.75 0.15 65)` for marginal spreads
  - Danger Red: `oklch(0.65 0.25 25)` for unprofitable spreads

## Font Selection
Typography should convey **precision and clarity** using a modern monospace font for numbers and clean sans-serif for labels to ensure financial data is easily scannable.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter Semibold/24px/normal spacing
  - H3 (Data Labels): Inter Medium/16px/normal spacing  
  - Body (General Text): Inter Regular/14px/relaxed spacing
  - Numbers (All Financial Data): JetBrains Mono Regular/14px/tabular spacing
  - Small (Timestamps/Notes): Inter Regular/12px/normal spacing

## Animations
**Subtle and functional** - animations should communicate data changes and state transitions without slowing down the trading workflow.

- **Purposeful Meaning**: Data updates fade in smoothly, profit changes pulse briefly green/red
- **Hierarchy of Movement**: Price updates get priority animation, UI transitions are secondary

## Component Selection

- **Components**: 
  - Tables with sortable headers for spread data
  - Cards for detailed calculator breakdown
  - Inputs with live validation for capital/settings
  - Badges for APR classification (high/medium/low profit)
  - Skeleton loaders for data fetching states
  - Toast notifications for errors/updates

- **Customizations**: 
  - Custom data table with financial number formatting
  - Real-time sparkline charts for price trends
  - Percentage change indicators with color coding

- **States**: 
  - Tables: hover highlights, sort indicators, loading shimmer
  - Buttons: pressed states with subtle shadows
  - Inputs: focus rings, validation feedback
  - Cards: hover elevation, selected state borders

- **Icon Selection**: 
  - TrendingUp/TrendingDown for profit indicators
  - RefreshCw for data updates
  - Settings for configuration
  - Calculator for detailed view
  - DollarSign for profit metrics

- **Spacing**: 
  - Container padding: p-6 for desktop, p-4 for mobile
  - Component gaps: gap-4 for related elements, gap-8 for sections
  - Table cells: px-4 py-3 for comfortable data density

- **Mobile**: 
  - Stack table columns vertically on <768px
  - Collapsible detailed breakdown sections
  - Sticky header with essential controls
  - Touch-friendly button sizing (min 44px)
  - Progressive disclosure of advanced features