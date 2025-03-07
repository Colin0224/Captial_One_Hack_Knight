import React from 'react';
import styled from 'styled-components';

const InsightsContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
  backdrop-filter: blur(5px);
  color: white;
`;

const InsightCard = styled.div`
  border-left: 4px solid ${props => props.color};
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  background: rgba(0, 24, 57, 0.3);
  border-radius: 0 8px 8px 0;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateX(5px);
    background: rgba(0, 24, 57, 0.5);
  }
`;

const InsightTitle = styled.h4`
  margin: 0 0 0.75rem 0;
  color: ${props => props.color};
  font-weight: 500;
  font-size: 1.1rem;
`;

const InsightDescription = styled.p`
  margin: 0;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.85);
`;

const FinancialInsights = ({ balances, transactions, spendingCategories }) => {
  // Calculate some basic financial metrics
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
  const savingsRate = (totalIncome - totalExpenses) / totalIncome * 100;
  
  // Find highest spending category
  const highestSpendingCategory = [...spendingCategories].sort((a, b) => b.amount - a.amount)[0];
  
  // Generate insights based on financial data
  const insights = [
    {
      title: "Dam Level Status",
      description: `Your financial dam is currently at ${balances.netWorth > 0 ? 'a healthy level' : 'a low level'}. ${
        balances.netWorth > 0 
          ? 'Your assets exceed your liabilities, which is a good position to be in.' 
          : 'You should focus on reducing liabilities and increasing assets.'
      }`,
      color: "#0088FE"
    },
    {
      title: "Water Flow Analysis",
      description: `Your monthly cash flow is ${totalIncome > totalExpenses ? 'positive' : 'negative'}. ${
        totalIncome > totalExpenses
          ? `You're saving ${savingsRate.toFixed(1)}% of your income each month.`
          : 'Your expenses exceed your income, which is depleting your reserves.'
      }`,
      color: "#00C49F"
    },
    {
      title: "Gate Control Recommendation",
      description: `Based on your spending patterns, you might want to adjust your spending in the ${highestSpendingCategory.name} category, which accounts for your highest expenses.`,
      color: "#FFBB28"
    },
    {
      title: "Financial Pressure Points",
      description: `Your dam integrity is affected by your debt-to-asset ratio of ${(balances.totalLiabilities / balances.totalAssets * 100).toFixed(1)}%. ${
        balances.totalLiabilities / balances.totalAssets < 0.5
          ? 'This is a healthy ratio.'
          : 'Consider strategies to reduce this ratio for better financial stability.'
      }`,
      color: "#FF8042"
    }
  ];

  return (
    <InsightsContainer>
      <h3>Financial Dam Insights</h3>
      
      {insights.map((insight, index) => (
        <InsightCard key={index} color={insight.color}>
          <InsightTitle color={insight.color}>{insight.title}</InsightTitle>
          <InsightDescription>{insight.description}</InsightDescription>
        </InsightCard>
      ))}
    </InsightsContainer>
  );
};

export default FinancialInsights;