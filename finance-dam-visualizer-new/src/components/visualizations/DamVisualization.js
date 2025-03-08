import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';

//
// -- Container & Basic Layout
//
const VisualizationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  padding: 2.5rem;
  border-radius: 20px;
  margin-bottom: 2.5rem;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  color: #fff;
  width: 100%;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  color: #eef2f7;
  text-align: center;
  max-width: 800px;
  margin-bottom: 2.5rem;
  line-height: 1.6;
  font-size: 1.1rem;
`;

//
// -- Enhanced Dashboard Layout
//
const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  gap: 2rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const VisualizationSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BreakdownSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

//
// -- Status Indicators
//
const StatusIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  margin-bottom: 1rem;
  backdrop-filter: blur(8px);
`;

const StatusLabel = styled.div`
  display: flex;
  align-items: center;
  
  span {
    font-weight: 600;
    margin-left: 0.5rem;
  }
`;

const StatusValue = styled.div`
  font-weight: 700;
  font-size: 1.1rem;
  color: ${props => {
    if (props.status === 'positive') return '#4cd964';
    if (props.status === 'negative') return '#ff3b30';
    if (props.status === 'neutral') return '#ffcc00';
    return '#fff';
  }};
`;

//
// -- Reservoir and Dam Visual (Enhanced)
//
const ReservoirWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: ${props => props.height}px;
  margin-bottom: 2rem;
  background: linear-gradient(180deg, #1a1a2e 0%, #1f3a63 100%);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 
    inset 0 0 20px rgba(0, 0, 0, 0.5),
    0 8px 16px rgba(0, 0, 0, 0.2);
`;

const waterShimmer = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

/**
 * Enhanced water with shimmer and waves
 */
const ReservoirWater = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${props => props.level}%;
  background: linear-gradient(
    180deg,
    rgba(0, 150, 255, 0.8) 0%,
    rgba(72, 198, 239, 0.7) 100%
  );
  background-size: 200% 200%;
  animation: ${waterShimmer} 5s ease infinite;
  box-shadow: 
    inset 0 2px 15px rgba(255, 255, 255, 0.3),
    0 0 10px rgba(0, 150, 255, 0.5);
  transition: height 1s ease-in-out;
  clip-path: polygon(
    0% 100%,
    0% 10%,
    25% 5%,
    50% 0%,  /* highest point in the center */
    75% 5%,
    100% 10%,
    100% 100%
  );
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 15px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    filter: blur(3px);
  }
`;

const WaterLevelLabel = styled.div`
  position: absolute;
  right: 80px;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
  padding: 4px 10px;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.3);
  font-size: 0.9rem;
  bottom: ${props => props.level}%;
  transform: translateY(50%);
  transition: bottom 1s ease-in-out;
`;

/**
 * Enhanced dam block with texture and gates
 */
const DamBlock = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 70px;
  height: 100%;
  background: linear-gradient(90deg, #444 0%, #666 50%, #555 100%);
  box-shadow: 
    inset 0 0 20px rgba(0,0,0,0.8), 
    -5px 0 15px rgba(0,0,0,0.5);
  border-top-left-radius: 15px;
  border-bottom-left-radius: 5px;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: repeating-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1) 2px,
      transparent 2px,
      transparent 8px
    );
  }
`;

const DamGate = styled.div`
  position: absolute;
  right: 0;
  width: 70px;
  height: ${props => props.gateSize || 20}px;
  background: #333;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-left: 2px solid rgba(255, 255, 255, 0.2);
  bottom: ${props => props.position}%;
  overflow: visible;
  
  &::before {
    content: '';
    position: absolute;
    left: 10px;
    top: 50%;
    width: 8px;
    height: 8px;
    background: ${props => props.isOpen ? '#4cd964' : '#ff3b30'};
    border-radius: 50%;
    transform: translateY(-50%);
    box-shadow: 0 0 10px ${props => props.isOpen ? 'rgba(76, 217, 100, 0.7)' : 'rgba(255, 59, 48, 0.7)'};
  }
  
  /* Opening in the dam */
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 0.5)
    );
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;

//
// -- Animated Water Flows
//
// No arrow animations needed

const WaterOutflow = styled.div`
  position: absolute;
  bottom: ${props => props.position}%;
  right: 0; /* Align exactly with the dam wall */
  height: ${props => props.thickness || 8}px;
  width: ${props => props.isZero ? '15px' : '80px'}; /* Shorter bar for zero expenses */
  background: ${props => {
    if (props.isZero) {
      // For zero expenses, use dotted pattern
      return props.color ? 
        `repeating-linear-gradient(90deg, ${props.color.replace('0.8', '0.4')}, ${props.color.replace('0.8', '0.4')} 2px, transparent 2px, transparent 4px)` : 
        'repeating-linear-gradient(90deg, rgba(100, 100, 100, 0.4), rgba(100, 100, 100, 0.4) 2px, transparent 2px, transparent 4px)';
    } else {
      // Normal gradient for expenses > 0
      return props.color ? 
        `linear-gradient(to right, ${props.color.replace('0.8', '0.9')}, ${props.color.replace('0.8', '0.5')})` : 
        'linear-gradient(to right, rgba(60, 180, 255, 0.9), rgba(72, 198, 239, 0.7))';
    }
  }};
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  box-shadow: ${props => props.isZero ? 'none' : `5px 0 8px ${props.color ? props.color.replace('0.8', '0.5') : 'rgba(0, 162, 255, 0.5)'}`};
  opacity: ${props => props.isZero ? 0.7 : 0.9};
  z-index: 5;
  transform: translateX(0); /* Ensure no leaking into dam */
  
  &::after {
    content: attr(data-tooltip);
    position: absolute;
    top: -22px;
    left: 10px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

//
// -- Enhanced Rain for Income
//
const rainFall = keyframes`
  0% { transform: translateY(0); opacity: 0.9; }
  50% { opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
`;

const RainDrop = styled.div`
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  width: ${props => props.size || 2}px;
  height: ${props => (props.size || 2) * 4}px;
  background: rgba(160, 230, 255, 0.9);
  border-radius: 3px;
  animation: ${rainFall} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  box-shadow: 0 0 5px rgba(160, 230, 255, 0.5);
`;

const RainContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

//
// -- Enhanced Money Lines for Outflows (spending)
//
const moneyFlow = keyframes`
  0% { 
    width: 0; 
    opacity: 0.8;
    transform: translateX(0);
  }
  50% { 
    width: 100px; 
    opacity: 1;
    transform: translateX(40px);
  }
  100% { 
    width: 30px; 
    opacity: 0;
    transform: translateX(120px);
  }
`;

const MoneyLine = styled.div`
  height: 5px;
  background: ${props => props.color || 'rgba(255,255,255,0.8)'};
  transform-origin: left;
  animation: ${moneyFlow} ${props => 2 + Math.random()}s linear infinite;
  width: ${props => Math.min(120, props.width || 50)}px;
  border-radius: 3px;
  box-shadow: 0 0 8px ${props => props.color ? props.color.replace('0.8', '0.5') : 'rgba(255,255,255,0.5)'};
  position: relative;
  
  &::after {
    content: '${props => props.label}';
    position: absolute;
    top: -20px;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.7rem;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const MoneyLineContainer = styled.div`
  position: absolute;
  right: 70px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 5px;
  height: 100%;
`;

//
// -- Enhanced Legend and Charts
//
const Legend = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  margin-top: 1.5rem;
  backdrop-filter: blur(8px);
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
  
  span {
    width: 14px;
    height: 14px;
    background: ${props => props.color};
    margin-right: 10px;
    display: inline-block;
    border-radius: 4px;
    box-shadow: 0 0 8px ${props => props.color.replace('0.8', '0.5')};
  }
  
  .amount {
    margin-left: auto;
    font-weight: 700;
    color: #fff;
  }
  
  .percent {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
    margin-left: 8px;
  }
`;

const progressAnimation = keyframes`
  from { width: 0; }
  to { width: var(--target-width); }
`;

const CategoryBreakdown = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
`;

const BreakdownTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
`;

const CategoryBar = styled.div`
  margin-bottom: 0.8rem;
  
  .label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.3rem;
    
    .name {
      font-weight: 500;
    }
    
    .value {
      font-weight: 600;
    }
  }
  
  .bar {
    height: 12px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    
    .fill {
      position: absolute;
      height: 100%;
      background: ${props => props.color};
      border-radius: 6px;
      width: 0;
      --target-width: ${props => props.percentage}%;
      animation: ${progressAnimation} 1.5s ease forwards;
      box-shadow: 0 0 10px ${props => props.color.replace('0.8', '0.4')};
    }
  }
`;

//
// -- Financial Metrics (Enhanced)
//
const FinancialMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  width: 100%;
  margin-top: 1.5rem;
`;

const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  padding: 1.2rem;
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  text-align: center;
  backdrop-filter: blur(8px);
  transition: all 0.3s ease;
  border-top: 3px solid ${props => props.color || 'rgba(0, 162, 255, 0.8)'};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.2);
  }
  
  h4 {
    margin-top: 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${props => props.textColor || '#fff'};
  }
  
  .change {
    font-size: 0.8rem;
    color: ${props => props.changeColor || '#4cd964'};
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
      margin-right: 0.3rem;
    }
  }
`;

const DonutChart = styled.div`
  width: 100%;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DonutSvg = styled.svg`
  width: 160px;
  height: 160px;
  transform: rotate(-90deg);
`;

//
// -- Main Component (Enhanced)
//
const DamVisualization = ({
    title = "Financial Dam",
    description = "A stylized 2D reservoir with a dam, animated water outflow, rain representing income, and money lines representing outflows.",
    financialData = {},
    spendingCategories = [],
    showMetrics = true,
    showLegend = true,
    height = 350
}) => {
    const [waterLevel, setWaterLevel] = useState(50);
    const [incomeRate, setIncomeRate] = useState(5);
    const [expenseRate, setExpenseRate] = useState(3);
    const [rainDrops, setRainDrops] = useState([]);
    const [damGates, setDamGates] = useState([]);
    const [waterFlows, setWaterFlows] = useState([]);
    const [cashFlowStatus, setCashFlowStatus] = useState('neutral');

    // Extract financial metrics
    const {
        totalAssets = 100000,
        totalLiabilities = 40000,
        netWorth = totalAssets - totalLiabilities,
        monthlyIncome = 5000,
        monthlyExpenses = 3000
    } = financialData;

    // Calculate monthly cash flow
    const monthlyCashFlow = monthlyIncome - monthlyExpenses;
    const cashFlowRatio = (monthlyCashFlow / monthlyIncome * 100).toFixed(1);

    // Default spending categories (outflows)
    const defaultSpendingCategories = [
        { name: 'Housing', color: 'rgba(255, 128, 66, 0.8)', amount: 1200 },
        { name: 'Food', color: 'rgba(255, 187, 40, 0.8)', amount: 800 },
        { name: 'Transportation', color: 'rgba(136, 132, 216, 0.8)', amount: 400 },
        { name: 'Entertainment', color: 'rgba(0, 136, 254, 0.8)', amount: 300 },
        { name: 'Utilities', color: 'rgba(0, 196, 159, 0.8)', amount: 500 }
    ];
    
    // Always use default categories as a base, then override/add with any provided categories
    // This ensures all standard categories are always present
    let categories = [...defaultSpendingCategories];
    
    // If custom categories were provided, merge them with defaults
    if (spendingCategories.length > 0) {
        // For each provided category, replace the default or add it
        spendingCategories.forEach(customCat => {
            const existingIndex = categories.findIndex(cat => cat.name === customCat.name);
            if (existingIndex >= 0) {
                // Replace existing category
                categories[existingIndex] = customCat;
            } else {
                // Add new category
                categories.push(customCat);
            }
        });
    }
    
    // Make sure Entertainment is always included
    if (!categories.some(cat => cat.name === 'Entertainment')) {
        categories.push({
            name: 'Entertainment',
            color: 'rgba(0, 136, 254, 0.8)',
            amount: 300 // Default amount
        });
    }
        
    // Calculate percentages for each spending category
    const totalSpending = categories.reduce((sum, cat) => sum + cat.amount, 0);
    const categoriesWithPercentage = categories.map(cat => ({
        ...cat,
        percentage: ((cat.amount / totalSpending) * 100).toFixed(1)
    }));
    
    // Sort categories by amount (descending)
    const sortedCategories = [...categoriesWithPercentage].sort((a, b) => b.amount - a.amount);

    // Helper: compute money line width using a log scale with better distribution
    const computeMoneyLineWidth = amount => {
        const maxWidth = 120; // Maximum width of the flow
        const maxAmount = Math.max(...categories.map(c => c.amount));
        return Math.max(30, (amount / maxAmount) * maxWidth);
    };

    // Generate rain drops based on income (more income = more rain)
    const generateRainDrops = () => {
        const drops = [];
        // Increase rain density based on income rate
        const count = Math.min(30, incomeRate * 4);
        for (let i = 0; i < count; i++) {
            drops.push({
                id: `rain-${i}`,
                top: Math.random() * 20, // top 20% of the reservoir area
                left: Math.random() * 100, // anywhere horizontally
                duration: 0.8 + Math.random(), // fall duration between 0.8-1.8s
                delay: Math.random() * 2,
                size: Math.random() > 0.7 ? 3 : 2 // Some drops are larger
            });
        }
        return drops;
    };

    // Generate dam gates based on all spending categories with equal spacing along entire dam height
    const generateDamGates = () => {
        // Define key required categories
        const requiredCategories = [
            'Housing', 
            'Food', 
            'Transportation', 
            'Entertainment', 
            'Utilities'
        ];
        
        // Start with all categories
        let categoriesToUse = [...sortedCategories];
        
        // If Entertainment is not in the sorted categories, make sure to explicitly add it
        const hasEntertainment = categoriesToUse.some(cat => cat.name === 'Entertainment');
        if (!hasEntertainment) {
            // Add entertainment with 0 amount by default
            categoriesToUse.push({
                name: 'Entertainment',
                color: 'rgba(0, 136, 254, 0.8)',
                amount: 0, // Set to 0 to fix the bug
                percentage: '0.0'
            });
        }
        
        // Ensure all required categories are included
        for (const reqCategory of requiredCategories) {
            if (!categoriesToUse.some(cat => cat.name === reqCategory)) {
                // Find default values for this category
                const defaultCategory = defaultSpendingCategories.find(c => c.name === reqCategory);
                if (defaultCategory) {
                    categoriesToUse.push({
                        ...defaultCategory,
                        percentage: ((defaultCategory.amount / totalSpending) * 100).toFixed(1)
                    });
                }
            }
        }
        
        // Use all available categories
        const gates = [];
        
        // Calculate the usable height of the dam (using full height, no margins)
        const usableHeight = 100; // Use 100% of the dam height
        const startPosition = 0; // Start at 0% from the bottom
        
        // Calculate equal spacing for the gates
        const totalSpace = usableHeight;
        const spacing = totalSpace / categoriesToUse.length;
        
        // Create a gate for each spending category with equal distribution
        for (let i = 0; i < categoriesToUse.length; i++) {
            const category = categoriesToUse[i];
            
            // Size gate based on a fixed percentage of spacing
            const gateSize = Math.max(10, Math.min(spacing * 0.7, 20));
            
            // Calculate position with equal spacing
            const position = startPosition + (i * spacing) + (spacing / 2) - (gateSize / 2);
            
            gates.push({
                id: `gate-${i+1}`,
                position: position,
                isOpen: category.amount > 0, // Only open if amount > 0
                gateSize: gateSize,
                category: category.name,
                amount: category.amount,
                color: category.color
            });
        }
        
        return gates;
    };

    // Generate water outflows for ALL gates, showing different appearances based on amount
    const generateWaterFlows = (gates) => {
        const flows = [];
        
        gates.forEach(gate => {
            const basePosition = gate.position;
            
            // Make sure the bar is exactly the same height as the gate opening
            const thickness = gate.gateSize * 0.96; // Slightly smaller than gate height to fit perfectly
            
            // Center the bar vertically in the gate
            const adjustedPosition = basePosition + (gate.gateSize - thickness) / 2;

            // For zero amount expenses, display a gate without flow
            if (gate.amount <= 0) {
                // Create a special "zero flow" indicator
                flows.push({
                    id: `flow-${gate.id}`,
                    position: adjustedPosition,
                    thickness: thickness,
                    color: gate.color,
                    label: gate.category,
                    amount: 0,
                    isZero: true
                });
            } else {
                // Create normal flow for non-zero expenses
                flows.push({
                    id: `flow-${gate.id}`,
                    position: adjustedPosition,
                    thickness: thickness,
                    color: gate.color,
                    label: gate.category,
                    amount: gate.amount,
                    isZero: false
                });
            }
        });
        
        console.log("Generated flows:", flows.map(f => `${f.label}: ${f.amount}${f.isZero ? ' (zero)' : ''}`));
        
        return flows;
    };

    // Set initial values and update water level to represent net worth (assets - liabilities)
    useEffect(() => {
        // Calculate water level based on net worth as percentage of total assets
        // If net worth is negative, water level will be very low
        if (totalAssets > 0) {
            // Net worth as percentage of total assets (clamp between 10-90%)
            const netWorthPercentage = (netWorth / totalAssets) * 100;
            setWaterLevel(Math.max(10, Math.min(90, netWorthPercentage)));
        } else {
            setWaterLevel(10); // Minimum level if no assets
        }
        
        setIncomeRate(Math.min(10, Math.ceil(monthlyIncome / 1000)));
        setExpenseRate(Math.min(10, Math.ceil(monthlyExpenses / 1000)));
        setRainDrops(generateRainDrops());
        
        const gates = generateDamGates();
        setDamGates(gates);
        setWaterFlows(generateWaterFlows(gates));
        
        // Set cash flow status for color indicators
        if (monthlyCashFlow > 0) {
            setCashFlowStatus('positive');
        } else if (monthlyCashFlow < 0) {
            setCashFlowStatus('negative');
        } else {
            setCashFlowStatus('neutral');
        }

        // No need for animated level changes since we're showing actual net worth
        // Just update raindrops periodically
        const interval = setInterval(() => {
            setRainDrops(generateRainDrops());
        }, 2000);

        return () => clearInterval(interval);
    }, [totalAssets, netWorth, monthlyIncome, monthlyExpenses, monthlyCashFlow]);

    // Format currency for display
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Setup donut chart data and calculations
    const prepareDonutChartData = () => {
        let currentOffset = 0;
        return sortedCategories.map(category => {
            const percentage = parseFloat(category.percentage);
            const dashArray = 2 * Math.PI * 25 * percentage / 100;
            const gap = 2 * Math.PI * 25 * (100 - percentage) / 100;
            const startOffset = -currentOffset;
            currentOffset += dashArray;
            
            return {
                ...category,
                dashArray,
                gap,
                strokeDasharray: `${dashArray} ${gap}`,
                strokeDashoffset: startOffset
            };
        });
    };

    const donutData = prepareDonutChartData();

    return (
        <VisualizationContainer>
            <Title>{title}</Title>
            <Description>{description}</Description>

            <DashboardLayout>
                <VisualizationSection>
                    <StatusIndicator>
                        <StatusLabel>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 5.07C16.93 5.56 20 8.92 20 13C20 17.42 16.42 21 12 21C7.58 21 4 17.42 4 13C4 8.92 7.07 5.56 11 5.07V3H13V5.07Z" stroke="white" strokeWidth="2" />
                                <path d="M12 8V13H17" stroke="white" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <span>Cash Flow Status</span>
                        </StatusLabel>
                        <StatusValue status={cashFlowStatus}>
                            {cashFlowStatus === 'positive' ? `+${formatCurrency(monthlyCashFlow)} (+${cashFlowRatio}%)` : 
                            cashFlowStatus === 'negative' ? `${formatCurrency(monthlyCashFlow)} (${cashFlowRatio}%)` : 
                            `${formatCurrency(monthlyCashFlow)} (0%)`}
                        </StatusValue>
                    </StatusIndicator>

                    <ReservoirWrapper height={height}>
                        {/* Rain overlay for income */}
                        <RainContainer>
                            {rainDrops.map(drop => (
                                <RainDrop
                                    key={drop.id}
                                    top={drop.top}
                                    left={drop.left}
                                    duration={drop.duration}
                                    delay={drop.delay}
                                    size={drop.size}
                                />
                            ))}
                        </RainContainer>

                        {/* Water inside the reservoir */}
                        <ReservoirWater level={waterLevel} />
                        <WaterLevelLabel level={waterLevel}>
                            Net Worth: {waterLevel.toFixed(0)}%
                        </WaterLevelLabel>

                        {/* The dam block with gates */}
                        <DamBlock />
                        
                        {/* Dam gates */}
                        {damGates.map(gate => (
                            <DamGate
                                key={gate.id}
                                position={gate.position}
                                isOpen={gate.isOpen}
                                gateSize={gate.gateSize}
                            />
                        ))}

                        {/* Water outflow bars for all expenses (showing pattern for zero amounts) */}
                        {waterFlows.map(flow => (
                            <WaterOutflow
                                key={flow.id}
                                position={flow.position}
                                thickness={flow.thickness}
                                color={flow.color}
                                isZero={flow.isZero}
                                data-tooltip={`${flow.label}: ${formatCurrency(flow.amount)}`}
                            />
                        ))}

                        {/* We've removed the duplicated money lines since water is now flowing through the dam gates */}
                    </ReservoirWrapper>

                    {showMetrics && (
                        <FinancialMetrics>
                            <MetricCard color="rgba(0, 196, 159, 0.8)" textColor={netWorth >= 0 ? '#4cd964' : '#ff3b30'}>
                                <h4>Net Worth</h4>
                                <p>{formatCurrency(netWorth)}</p>
                                <div className="change">
                                    {netWorth >= 0 ? 
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 17L12 12L17 17" stroke="#4cd964" strokeWidth="2" />
                                            <path d="M12 12V20" stroke="#4cd964" strokeWidth="2" />
                                        </svg> : 
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 7L12 12L17 7" stroke="#ff3b30" strokeWidth="2" />
                                            <path d="M12 12V4" stroke="#ff3b30" strokeWidth="2" />
                                        </svg>
                                    }
                                    {((netWorth / totalAssets) * 100).toFixed(1)}% of Assets
                                </div>
                            </MetricCard>
                            <MetricCard color="rgba(0, 136, 254, 0.8)">
                                <h4>Total Assets</h4>
                                <p>{formatCurrency(totalAssets)}</p>
                                <div className="change" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                    Net Positive
                                </div>
                            </MetricCard>
                            <MetricCard color="rgba(255, 128, 66, 0.8)" textColor="#ff3b30">
                                <h4>Total Liabilities</h4>
                                <p>{formatCurrency(totalLiabilities)}</p>
                                <div className="change" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                    {((totalLiabilities / totalAssets) * 100).toFixed(1)}% of Assets
                                </div>
                            </MetricCard>
                            <MetricCard color="rgba(72, 198, 239, 0.8)" textColor="#4cd964">
                                <h4>Monthly Income</h4>
                                <p>{formatCurrency(monthlyIncome)}</p>
                                <div className="change" style={{color: 'rgba(255, 255, 255, 0.6)'}}>
                                    Regular Inflow
                                </div>
                            </MetricCard>
                            <MetricCard color="rgba(255, 187, 40, 0.8)" textColor="#ffcc00">
                                <h4>Monthly Expenses</h4>
                                <p>{formatCurrency(monthlyExpenses)}</p>
                                <div className="change" style={{color: cashFlowStatus === 'positive' ? '#4cd964' : '#ff3b30'}}>
                                    {((monthlyExpenses / monthlyIncome) * 100).toFixed(1)}% of Income
                                </div>
                            </MetricCard>
                        </FinancialMetrics>
                    )}
                </VisualizationSection>

                <BreakdownSection>
                    <DonutChart>
                        <BreakdownTitle>Expense Distribution</BreakdownTitle>
                        <DonutSvg viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
                            {donutData.map((item, index) => (
                                <circle 
                                    key={item.name} 
                                    cx="50" 
                                    cy="50" 
                                    r="25" 
                                    fill="none" 
                                    stroke={item.color} 
                                    strokeWidth="10"
                                    strokeDasharray={item.strokeDasharray}
                                    strokeDashoffset={item.strokeDashoffset}
                                    strokeLinecap="round"
                                />
                            ))}
                            <text x="50" y="50" textAnchor="middle" dy=".3em" fill="white" fontSize="10" fontWeight="bold" transform="rotate(90 50 50)">
                                {formatCurrency(totalSpending)}
                            </text>
                        </DonutSvg>
                        
                        {showLegend && (
                            <Legend>
                                {sortedCategories.map(category => (
                                    <LegendItem key={category.name} color={category.color}>
                                        <span />
                                        {category.name}
                                        <div className="amount">{formatCurrency(category.amount)}</div>
                                        <div className="percent">{category.percentage}%</div>
                                    </LegendItem>
                                ))}
                            </Legend>
                        )}
                    </DonutChart>

                    <CategoryBreakdown>
                        <BreakdownTitle>Monthly Spending Breakdown</BreakdownTitle>
                        {sortedCategories.map(category => (
                            <CategoryBar key={category.name} color={category.color} percentage={category.percentage}>
                                <div className="label">
                                    <div className="name">{category.name}</div>
                                    <div className="value">{formatCurrency(category.amount)}</div>
                                </div>
                                <div className="bar">
                                    <div className="fill"></div>
                                </div>
                            </CategoryBar>
                        ))}
                    </CategoryBreakdown>

                    <StatusIndicator>
                        <StatusLabel>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 4V20" stroke="white" strokeWidth="2"/>
                                <path d="M19 12L12 20L5 12" stroke="white" strokeWidth="2"/>
                            </svg>
                            <span>Savings Rate</span>
                        </StatusLabel>
                        <StatusValue status={monthlyCashFlow > 0 ? 'positive' : 'negative'}>
                            {monthlyCashFlow > 0 ? cashFlowRatio + '%' : '0%'}
                        </StatusValue>
                    </StatusIndicator>
                </BreakdownSection>
            </DashboardLayout>
        </VisualizationContainer>
    );
};

export default DamVisualization;
