import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

//
// -- Container & Basic Layout
//
const VisualizationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #16213e;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  color: #fff;
  width: 100%;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  color: #ccc;
  text-align: center;
  max-width: 800px;
  margin-bottom: 2rem;
`;

//
// -- Reservoir and Dam Visual
//
const ReservoirWrapper = styled.div`
  position: relative;
  width: 80%;
  max-width: 800px;
  height: ${props => props.height}px;
  margin-bottom: 2rem;
  background: linear-gradient(180deg, #1a1a2e 0%, #15213b 70%);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.5);
`;

/**
 * The water inside the reservoir uses a clip-path to approximate a curved (parabolic) top.
 */
const ReservoirWater = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${props => props.level}%;
  background: linear-gradient(
    180deg,
    rgba(0, 112, 240, 0.8) 0%,
    rgba(72, 198, 239, 0.6) 100%
  );
  box-shadow: inset 0 2px 10px rgba(255, 255, 255, 0.2);
  transition: height 1s ease-in-out;
  clip-path: polygon(
    0% 100%,
    0% 10%,
    50% 0%,  /* highest point in the center */
    100% 10%,
    100% 100%
  );
`;

/**
 * The dam block is placed on the right side.
 */
const DamBlock = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 60px;
  height: 100%;
  background: #555;
  box-shadow: inset 0 0 10px rgba(0,0,0,0.6), 0 0 10px rgba(0,0,0,0.8);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

//
// -- Animated Water Outflow (vertical line)
//
const flowDown = keyframes`
  0% { height: 0; opacity: 0.8; }
  50% { height: 80%; opacity: 1; }
  100% { height: 0; opacity: 0; }
`;

const WaterOutflow = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 6px;
  background: rgba(0, 162, 255, 0.8);
  border-radius: 3px;
  animation: ${flowDown} 2s linear infinite;
  transform: translateX(100%);
`;

//
// -- Rain for Income
//
const rainFall = keyframes`
  0% { transform: translateY(0); opacity: 0.8; }
  100% { transform: translateY(100%); opacity: 0; }
`;

const RainDrop = styled.div`
  position: absolute;
  top: ${props => props.top}%;
  left: ${props => props.left}%;
  width: 2px;
  height: 8px;
  background: rgba(120, 213, 255, 0.8);
  border-radius: 3px;
  animation: ${rainFall} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
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
// -- Money Lines for Outflows (spending)
//
const moneyFlow = keyframes`
  0% { transform: scaleY(0); opacity: 0.8; }
  50% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(0); opacity: 0; }
`;

const MoneyLine = styled.div`
  width: 4px;
  background: ${props => props.color || 'rgba(255,255,255,0.8)'};
  transform-origin: bottom;
  animation: ${moneyFlow} 2s linear infinite;
  height: ${props => props.height}px;
`;

const MoneyLineContainer = styled.div`
  position: absolute;
  right: 0; /* align with dam block */
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 5px;
`;

//
// -- Legend + Metrics (remain unchanged)
//
const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  margin-top: 1rem;
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

const FinancialMetrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  margin-top: 1rem;
`;

const MetricCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  margin: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 180px;
  text-align: center;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  h4 {
    margin-top: 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
  }
  
  p {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 0;
    color: #fff;
  }
`;

//
// -- Main Component
//
const DamVisualization = ({
                              title = "Financial Dam",
                              description = "A stylized 2D reservoir with a dam, animated water outflow, rain representing income, and money lines representing outflows.",
                              financialData = {},
                              spendingCategories = [],
                              showMetrics = true,
                              showLegend = true,
                              height = 300
                          }) => {
    const [waterLevel, setWaterLevel] = useState(50);
    const [incomeRate, setIncomeRate] = useState(5);
    const [expenseRate, setExpenseRate] = useState(3);
    const [rainDrops, setRainDrops] = useState([]);

    // Extract financial metrics
    const {
        totalAssets = 100000,
        totalLiabilities = 40000,
        netWorth = totalAssets - totalLiabilities,
        monthlyIncome = 5000,
        monthlyExpenses = 3000
    } = financialData;

    // Default spending categories (outflows)
    const defaultSpendingCategories = [
        { name: 'Housing', color: 'rgba(255, 128, 66, 0.8)', amount: 1200 },
        { name: 'Food', color: 'rgba(255, 187, 40, 0.8)', amount: 800 },
        { name: 'Transportation', color: 'rgba(136, 132, 216, 0.8)', amount: 400 },
        { name: 'Entertainment', color: 'rgba(0, 136, 254, 0.8)', amount: 300 },
        { name: 'Utilities', color: 'rgba(0, 196, 159, 0.8)', amount: 500 }
    ];
    const categories = spendingCategories.length > 0
        ? spendingCategories
        : defaultSpendingCategories;

    // Helper: compute money line height using a log scale
    const computeMoneyLineHeight = amount => Math.max(10, Math.log(amount + 1) * 10);

    // Generate rain drops based on income (more income = more rain)
    const generateRainDrops = () => {
        const drops = [];
        // For example, 3 drops per income rate point:
        const count = incomeRate * 3;
        for (let i = 0; i < count; i++) {
            drops.push({
                id: `rain-${i}`,
                top: Math.random() * 30, // top 30% of the reservoir area
                left: Math.random() * 100, // anywhere horizontally
                duration: 1 + Math.random(), // fall duration between 1-2s
                delay: Math.random() * 2
            });
        }
        return drops;
    };

    // Set initial values and update water level over time
    useEffect(() => {
        if (totalAssets > 0) {
            const calculatedLevel = (netWorth / totalAssets) * 100;
            setWaterLevel(Math.max(10, Math.min(90, calculatedLevel)));
        }
        setIncomeRate(Math.min(10, Math.ceil(monthlyIncome / 1000)));
        setExpenseRate(Math.min(10, Math.ceil(monthlyExpenses / 1000)));
        setRainDrops(generateRainDrops());

        // Simulate water level changes based on income and expenses difference
        const interval = setInterval(() => {
            setWaterLevel(prev => {
                const change = (incomeRate - expenseRate) * 0.1;
                const newLevel = prev + change;
                return Math.min(Math.max(newLevel, 10), 90);
            });
            setRainDrops(generateRainDrops());
        }, 2000);

        return () => clearInterval(interval);
    }, [totalAssets, netWorth, monthlyIncome, monthlyExpenses, incomeRate, expenseRate]);

    return (
        <VisualizationContainer>
            <Title>{title}</Title>
            <Description>{description}</Description>

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
                        />
                    ))}
                </RainContainer>

                {/* Water inside the reservoir */}
                <ReservoirWater level={waterLevel} />

                {/* The dam block */}
                <DamBlock />

                {/* Animated water outflow */}
                <WaterOutflow />

                {/* Money lines representing spending (outflows) */}
                <MoneyLineContainer>
                    {categories.map(category => (
                        <MoneyLine
                            key={category.name}
                            color={category.color}
                            height={computeMoneyLineHeight(category.amount)}
                        />
                    ))}
                </MoneyLineContainer>
            </ReservoirWrapper>

            {showLegend && (
                <Legend>
                    {categories.map(category => (
                        <LegendItem key={category.name} color={category.color}>
                            <span /> {category.name}: ${category.amount}
                        </LegendItem>
                    ))}
                </Legend>
            )}

            {showMetrics && (
                <FinancialMetrics>
                    <MetricCard>
                        <h4>Net Worth</h4>
                        <p>${netWorth.toLocaleString()}</p>
                    </MetricCard>
                    <MetricCard>
                        <h4>Total Assets</h4>
                        <p>${totalAssets.toLocaleString()}</p>
                    </MetricCard>
                    <MetricCard>
                        <h4>Total Liabilities</h4>
                        <p>${totalLiabilities.toLocaleString()}</p>
                    </MetricCard>
                    <MetricCard>
                        <h4>Monthly Income</h4>
                        <p>${monthlyIncome.toLocaleString()}</p>
                    </MetricCard>
                    <MetricCard>
                        <h4>Monthly Expenses</h4>
                        <p>${monthlyExpenses.toLocaleString()}</p>
                    </MetricCard>
                </FinancialMetrics>
            )}
        </VisualizationContainer>
    );
};

export default DamVisualization;
