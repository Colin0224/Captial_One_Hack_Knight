import React, { useEffect, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// Import commented out until API is ready to use
// import { getAccountBalances, getTransactions, getSpendingCategories } from '../services/api';

const VisualizationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  color: #fff;
`;

const PondContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  background: linear-gradient(180deg, #0f2027 0%, #203a43 50%, #2c5364 100%);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
`;

const Pond = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${props => props.level}%;
  background: linear-gradient(0deg, rgba(0, 112, 240, 0.8) 0%, rgba(72, 198, 239, 0.6) 100%);
  transition: height 1s ease-in-out;
  border-radius: 0 0 16px 16px;
  box-shadow: inset 0 2px 10px rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
`;

const ripple = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const PondRipple = styled.div`
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  animation: ${ripple} 3s infinite ease-out;
  animation-delay: ${props => props.delay}s;
`;

const float = keyframes`
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-3px) translateX(3px); }
  50% { transform: translateY(-5px) translateX(-2px); }
  75% { transform: translateY(-3px) translateX(1px); }
`;

const CloudContainer = styled.div`
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  animation: ${float} ${props => props.floatDuration}s infinite ease-in-out;
  opacity: ${props => props.opacity};
  transform: scale(${props => props.scale});
  z-index: 10;
`;

const Cloud = styled.div`
  position: relative;
  width: 50px;
  height: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:before, &:after {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
  }
  
  &:before {
    width: 25px;
    height: 25px;
    top: -10px;
    left: 10px;
  }
  
  &:after {
    width: 20px;
    height: 20px;
    top: -8px;
    right: 10px;
  }
`;

const rainDrop = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.8;
  }
  80% {
    transform: translateY(${props => props.distance}px) scale(0.9);
    opacity: 0.6;
  }
  100% {
    transform: translateY(${props => props.distance}px) scale(0);
    opacity: 0;
  }
`;

const RainDrop = styled.div`
  position: absolute;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  width: 2px;
  height: 8px;
  background: rgba(120, 213, 255, 0.8);
  border-radius: 3px;
  animation: ${rainDrop} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
`;

const flowOut = keyframes`
  0% {
    width: 0;
    opacity: 0.8;
  }
  100% {
    width: ${props => props.length}px;
    opacity: 0;
  }
`;

const SpendingStream = styled.div`
  position: absolute;
  bottom: ${props => props.bottom}px;
  right: 0;
  height: ${props => props.height}px;
  background: ${props => props.color};
  border-radius: 4px 0 0 4px;
  animation: ${flowOut} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  opacity: 0.7;
`;

const FinancialMetrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  margin-top: 2rem;
`;

const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 12px;
  margin: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  h3 {
    margin-top: 0;
    font-size: 1rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
  }
  
  p {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 0;
    color: #fff;
  }
`;

const FlowControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  margin: 2rem 0;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  backdrop-filter: blur(5px);
`;

const ControlSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h4 {
    margin: 0 0 1rem 0;
    font-weight: 500;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .controls {
    display: flex;
    align-items: center;
  }
  
  span {
    margin: 0 1rem;
    font-weight: bold;
    font-size: 1.2rem;
    min-width: 2rem;
    text-align: center;
  }
`;

const ControlButton = styled.button`
  background: ${props => props.income ? "rgba(0, 196, 159, 0.7)" : "rgba(255, 128, 66, 0.7)"};
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.income ? "rgba(0, 196, 159, 1)" : "rgba(255, 128, 66, 1)"};
    transform: scale(1.1);
  }
`;

const LegendContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  width: 90%;
  backdrop-filter: blur(5px);
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
  
  span {
    width: 12px;
    height: 12px;
    background: ${props => props.color};
    margin-right: 8px;
    display: inline-block;
    border-radius: 3px;
  }
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  width: 90%;
  margin-top: 2rem;
  backdrop-filter: blur(5px);
  
  h3 {
    margin-top: 0;
    font-weight: 500;
    text-align: center;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const FinancialDashboard = () => {
  const [waterLevel, setWaterLevel] = useState(70);
  const [incomeRate, setIncomeRate] = useState(5);
  const [expenseRate, setExpenseRate] = useState(3);
  const [balances, setBalances] = useState({
    totalAssets: 0,
    totalLiabilities: 0,
    netWorth: 0
  });
  const [transactions, setTransactions] = useState([]);
  
  // Generate fixed position clouds
  const cloudPositions = [
    { top: 5, left: 15 },
    { top: 8, left: 35 },
    { top: 6, left: 55 },
    { top: 10, left: 75 },
    { top: 15, left: 25 },
    { top: 12, left: 65 },
    { top: 18, left: 45 },
    { top: 7, left: 85 }
  ];
  
  // Use fixed positions with some randomness for animation
  const clouds = cloudPositions.slice(0, 3 + Math.min(incomeRate, 5)).map((pos, i) => ({
    id: i,
    top: pos.top,
    left: pos.left,
    floatDuration: 10 + Math.random() * 20,
    scale: 0.8 + Math.random() * 0.4,
    opacity: 0.6 + Math.random() * 0.4
  }));
  
  // Generate raindrops from clouds with better alignment
  const generateRaindrops = () => {
    const drops = [];
    clouds.forEach(cloud => {
      const dropCount = incomeRate * 2;
      for (let i = 0; i < dropCount; i++) {
        drops.push({
          id: `${cloud.id}-${i}`,
          top: cloud.top * 4 + 20, // Position below the cloud
          left: cloud.left + (Math.random() * 6 - 3), // Much less randomization
          duration: 1 + Math.random() * 0.5,
          delay: Math.random() * 3,
          distance: 400 - (waterLevel * 3.2) // Make rain stop at water surface
        });
      }
    });
    return drops;
  };
  
  const raindrops = generateRaindrops();
  
  // Generate spending streams
  const spendingCategories = [
    { name: 'Housing', color: 'rgba(255, 128, 66, 0.8)', amount: 1200, percentage: 30 },
    { name: 'Food', color: 'rgba(255, 187, 40, 0.8)', amount: 800, percentage: 20 },
    { name: 'Transportation', color: 'rgba(136, 132, 216, 0.8)', amount: 400, percentage: 10 },
    { name: 'Entertainment', color: 'rgba(0, 136, 254, 0.8)', amount: 300, percentage: 7 },
    { name: 'Utilities', color: 'rgba(0, 196, 159, 0.8)', amount: 500, percentage: 12 }
  ];
  
  const spendingStreams = spendingCategories.map((category, index) => ({
    id: index,
    bottom: 20 + (index * 50),
    height: Math.max(2, category.percentage / 3), // Scale height based on percentage
    duration: 3 + Math.random() * 2,
    delay: Math.random() * 2,
    color: category.color,
    length: 150 + (category.percentage * 3) // Longer streams for larger expenses
  }));
  
  // Generate ripples
  const ripples = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    top: 100 - waterLevel + Math.random() * (waterLevel - 10), // Position at water level
    left: Math.floor(Math.random() * 100),
    delay: Math.random() * 5
  }));
  
  // Mock financial data for the demo
  const mockFinancialData = {
    totalAssets: 120000,
    totalLiabilities: 45000,
    netWorth: 75000,
    monthlyIncome: 8500,
    monthlyExpenses: 5200,
    savings: 3300,
    transactions: [
      { date: '2025-01-01', amount: 2500, type: 'income', category: 'Salary' },
      { date: '2025-01-05', amount: -150, type: 'expense', category: 'Groceries' },
      { date: '2025-01-10', amount: -200, type: 'expense', category: 'Utilities' },
      { date: '2025-01-15', amount: 2500, type: 'income', category: 'Salary' },
      { date: '2025-01-18', amount: -800, type: 'expense', category: 'Rent' },
      { date: '2025-01-22', amount: -120, type: 'expense', category: 'Entertainment' },
      { date: '2025-01-25', amount: -250, type: 'expense', category: 'Dining' },
      { date: '2025-01-28', amount: -180, type: 'expense', category: 'Transportation' },
      { date: '2025-02-01', amount: 2500, type: 'income', category: 'Salary' },
      { date: '2025-02-05', amount: -160, type: 'expense', category: 'Groceries' },
      { date: '2025-02-10', amount: -210, type: 'expense', category: 'Utilities' },
    ]
  };

  // Function to fetch real data from API
  const fetchFinancialData = useCallback(async () => {
    try {
      // Uncomment the following when the actual API is available
      // const balancesData = await getAccountBalances();
      // setBalances(balancesData);
      
      // const accountId = balancesData.accounts[0]?.id;
      // const transactionsData = await getTransactions(accountId);
      // setTransactions(transactionsData);
      
      // const categoriesData = await getSpendingCategories(accountId);
      // Use categoriesData here
      
      // For now, use mock data
      setBalances({
        totalAssets: mockFinancialData.totalAssets,
        totalLiabilities: mockFinancialData.totalLiabilities,
        netWorth: mockFinancialData.netWorth
      });
      
      setTransactions(mockFinancialData.transactions);
      
      // Calculate water level based on net worth / total assets (as a percentage)
      const calculatedLevel = (mockFinancialData.netWorth / mockFinancialData.totalAssets) * 100;
      setWaterLevel(calculatedLevel);
      
      // Calculate flow rates based on income vs expenses
      const incomeFlowRate = Math.round((mockFinancialData.monthlyIncome / 1000));
      const expenseFlowRate = Math.round((mockFinancialData.monthlyExpenses / 1000));
      
      setIncomeRate(incomeFlowRate);
      setExpenseRate(expenseFlowRate);
      
    } catch (error) {
      console.error('Error fetching financial data:', error);
    }
  }, [mockFinancialData]);

  useEffect(() => {
    fetchFinancialData();
    
    // Simulate water level changes based on income and expense rates
    const interval = setInterval(() => {
      setWaterLevel(prev => {
        const change = (incomeRate - expenseRate) * 0.1;
        const newLevel = prev + change;
        return Math.min(Math.max(newLevel, 10), 90); // Keep between 10% and 90%
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [incomeRate, expenseRate, fetchFinancialData]);

  // Generate chart data from transactions
  const chartData = transactions.map(transaction => ({
    date: transaction.date,
    amount: transaction.amount
  }));

  // Calculate cumulative balance for chart
  let runningBalance = 0;
  const cumulativeChartData = chartData.map(item => {
    runningBalance += item.amount;
    return {
      date: item.date,
      balance: runningBalance
    };
  });

  return (
    <VisualizationContainer>
      <h2>Financial Flow Visualization</h2>
      <p>Net Worth: ${balances.netWorth.toLocaleString()}</p>
      
      <PondContainer>
        {/* Clouds */}
        {clouds.map(cloud => (
          <CloudContainer 
            key={cloud.id} 
            top={cloud.top} 
            left={cloud.left} 
            floatDuration={cloud.floatDuration}
            scale={cloud.scale}
            opacity={cloud.opacity}
          >
            <Cloud />
          </CloudContainer>
        ))}
        
        {/* Pond water */}
        <Pond level={waterLevel} />
        
        {/* Ripples on pond surface */}
        {ripples.map(ripple => (
          <PondRipple 
            key={ripple.id} 
            top={ripple.top} 
            left={ripple.left} 
            delay={ripple.delay}
          />
        ))}
        
        {/* Income rain drops */}
        {raindrops.map(drop => (
          <RainDrop 
            key={drop.id} 
            top={drop.top} 
            left={drop.left} 
            duration={drop.duration} 
            delay={drop.delay} 
            distance={drop.distance}
          />
        ))}
        
        {/* Spending streams */}
        {spendingStreams.map(stream => (
          <SpendingStream 
            key={stream.id} 
            bottom={stream.bottom} 
            height={stream.height} 
            duration={stream.duration} 
            delay={stream.delay} 
            color={stream.color} 
            length={stream.length} 
          />
        ))}
      </PondContainer>
      
      <LegendContainer>
        <Legend>
          {spendingCategories.map(category => (
            <LegendItem key={category.name} color={category.color}>
              <span></span> {category.name}: ${category.amount}
            </LegendItem>
          ))}
        </Legend>
      </LegendContainer>
      
      <FlowControls>
        <ControlSection>
          <h4>Income Flow</h4>
          <div className="controls">
            <ControlButton income onClick={() => setIncomeRate(prev => Math.max(prev - 1, 1))}>-</ControlButton>
            <span>{incomeRate}</span>
            <ControlButton income onClick={() => setIncomeRate(prev => Math.min(prev + 1, 10))}>+</ControlButton>
          </div>
        </ControlSection>
        
        <ControlSection>
          <h4>Expense Flow</h4>
          <div className="controls">
            <ControlButton onClick={() => setExpenseRate(prev => Math.max(prev - 1, 1))}>-</ControlButton>
            <span>{expenseRate}</span>
            <ControlButton onClick={() => setExpenseRate(prev => Math.min(prev + 1, 10))}>+</ControlButton>
          </div>
        </ControlSection>
      </FlowControls>
      
      <FinancialMetrics>
        <MetricCard>
          <h3>Total Assets</h3>
          <p>${balances.totalAssets.toLocaleString()}</p>
        </MetricCard>
        <MetricCard>
          <h3>Total Liabilities</h3>
          <p>${balances.totalLiabilities.toLocaleString()}</p>
        </MetricCard>
        <MetricCard>
          <h3>Monthly Income</h3>
          <p>${mockFinancialData.monthlyIncome.toLocaleString()}</p>
        </MetricCard>
        <MetricCard>
          <h3>Monthly Expenses</h3>
          <p>${mockFinancialData.monthlyExpenses.toLocaleString()}</p>
        </MetricCard>
      </FinancialMetrics>
      
      <ChartContainer>
        <h3>Cash Flow Over Time</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={cumulativeChartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#48c6ef" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#48c6ef" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
            <YAxis stroke="rgba(255,255,255,0.5)" />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(0,24,57,0.8)', 
                border: 'none', 
                borderRadius: '8px',
                color: 'white' 
              }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']} 
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke="#48c6ef" 
              fill="url(#colorBalance)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </VisualizationContainer>
  );
};

export default FinancialDashboard;