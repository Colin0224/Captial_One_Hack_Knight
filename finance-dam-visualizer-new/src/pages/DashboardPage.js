import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
// No auth import needed
import DamVisualization from '../components/visualizations/DamVisualization';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const PageContainer = styled.div`
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    padding: 3rem 2rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: var(--text-light);
`;

const Subtitle = styled.p`
  color: var(--text-dim);
  font-size: 1rem;
  max-width: 800px;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 992px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const DashboardSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-light);
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const InsightCard = styled(Card)`
  border-left: 4px solid ${props => props.color || 'var(--primary-color)'};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const InsightTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.color || 'var(--text-light)'};
`;

const InsightContent = styled.p`
  color: var(--text-dim);
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background: ${props => props.positive ? 'rgba(0, 196, 159, 0.1)' : props.negative ? 'rgba(255, 128, 66, 0.1)' : 'rgba(255, 255, 255, 0.05)'};
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: var(--text-dim);
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.positive ? 'var(--success-color)' : props.negative ? 'var(--warning-color)' : 'var(--text-light)'};
`;

const Button = styled.button`
  background: var(--primary-color);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  width: 100%;
  margin-top: 1rem;
  
  &:hover {
    background: var(--secondary-color);
    transform: translateY(-3px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  backdrop-filter: blur(10px);
`;

const EmptyStateTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const DashboardPage = () => {
  const { userFinancialData, dreamLifeText, loading, error } = useData();
  // No currentUser needed
  const navigate = useNavigate();
  
  // Helper function to format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Generate insights based on financial data
  const generateInsights = (data) => {
    if (!data) return [];
    
    const insights = [];
    
    // Dam level insight (based on net worth)
    let damLevelStatus = '';
    let damLevelColor = '';
    
    if (data.netWorth <= 0) {
      damLevelStatus = 'Critical';
      damLevelColor = 'rgba(255, 99, 71, 1)'; // Red
      insights.push({
        title: 'Dam Level Status: Critical',
        content: 'Your dam is nearly empty. Focus on reducing debt and building savings to prevent financial drought.',
        color: damLevelColor
      });
    } else if (data.netWorth < data.assets.totalAssets * 0.3) {
      damLevelStatus = 'Low';
      damLevelColor = 'rgba(255, 165, 0, 1)'; // Orange
      insights.push({
        title: 'Dam Level Status: Low',
        content: 'Your dam level is low. Consider increasing income sources and reducing non-essential expenses to build your financial reservoir.',
        color: damLevelColor
      });
    } else if (data.netWorth < data.assets.totalAssets * 0.6) {
      damLevelStatus = 'Moderate';
      damLevelColor = 'rgba(255, 255, 0, 1)'; // Yellow
      insights.push({
        title: 'Dam Level Status: Moderate',
        content: 'Your dam is at a moderate level. You\'re doing well, but could benefit from increasing savings and investments to prepare for future needs.',
        color: damLevelColor
      });
    } else {
      damLevelStatus = 'Good';
      damLevelColor = 'rgba(0, 196, 159, 1)'; // Green
      insights.push({
        title: 'Dam Level Status: Good',
        content: 'Your dam is well-filled. Consider strategies to optimize your investments and plan for long-term goals with your strong financial foundation.',
        color: damLevelColor
      });
    }
    
    // Water flow insight (based on cash flow)
    if (data.monthlyCashFlow < 0) {
      insights.push({
        title: 'Water Flow Analysis: Negative Flow',
        content: `Your dam is losing water at a rate of ${formatCurrency(Math.abs(data.monthlyCashFlow))} per month. Look for expenses to reduce or ways to increase your income.`,
        color: 'rgba(255, 99, 71, 1)'
      });
    } else if (data.monthlyCashFlow < data.income.totalIncome * 0.1) {
      insights.push({
        title: 'Water Flow Analysis: Minimal Flow',
        content: `You're retaining water but at a minimal rate (${formatCurrency(data.monthlyCashFlow)} per month). Try to increase your savings rate to at least 20% of income.`,
        color: 'rgba(255, 165, 0, 1)'
      });
    } else if (data.monthlyCashFlow < data.income.totalIncome * 0.3) {
      insights.push({
        title: 'Water Flow Analysis: Positive Flow',
        content: `Good job! Your dam is filling at a rate of ${formatCurrency(data.monthlyCashFlow)} per month. Consider investing this surplus for long-term growth.`,
        color: 'rgba(255, 255, 0, 1)'
      });
    } else {
      insights.push({
        title: 'Water Flow Analysis: Excellent Flow',
        content: `Excellent! Your dam is filling rapidly at ${formatCurrency(data.monthlyCashFlow)} per month. Ensure you're investing this surplus optimally to maximize growth.`,
        color: 'rgba(0, 196, 159, 1)'
      });
    }
    
    // Spending recommendation
    const highestExpenseCategory = Object.entries(data.expenses)
      .filter(([key]) => key !== 'totalExpenses')
      .sort(([, a], [, b]) => b - a)[0];
    
    if (highestExpenseCategory) {
      const [category, amount] = highestExpenseCategory;
      const percentage = ((amount / data.expenses.totalExpenses) * 100).toFixed(1);
      
      insights.push({
        title: 'Gate Control Recommendation',
        content: `Your highest expense is ${category} at ${formatCurrency(amount)} (${percentage}% of total expenses). Consider if there are opportunities to reduce this outflow.`,
        color: 'rgba(0, 136, 254, 1)'
      });
    }
    
    // Debt ratio insight
    if (data.debtToIncomeRatio > 50) {
      insights.push({
        title: 'Financial Pressure Points',
        content: `Your debt-to-income ratio is ${data.debtToIncomeRatio.toFixed(1)}%, which is high. Focus on reducing high-interest debt to relieve pressure on your financial dam.`,
        color: 'rgba(255, 99, 71, 1)'
      });
    } else if (data.debtToIncomeRatio > 30) {
      insights.push({
        title: 'Financial Pressure Points',
        content: `Your debt-to-income ratio is ${data.debtToIncomeRatio.toFixed(1)}%, which is moderate. Continue paying down debt while maintaining savings.`,
        color: 'rgba(255, 165, 0, 1)'
      });
    } else if (data.debtToIncomeRatio > 0) {
      insights.push({
        title: 'Financial Pressure Points',
        content: `Your debt-to-income ratio is ${data.debtToIncomeRatio.toFixed(1)}%, which is healthy. Your debt load is manageable and you're in a good position.`,
        color: 'rgba(0, 196, 159, 1)'
      });
    } else {
      insights.push({
        title: 'Financial Pressure Points',
        content: 'You have no debt! Your financial dam has no pressure points. Focus on growing your assets and planning for the future.',
        color: 'rgba(0, 196, 159, 1)'
      });
    }
    
    return insights;
  };
  
  const insights = generateInsights(userFinancialData);
  
  // If loading, show spinner
  if (loading && !userFinancialData) {
    return (
      <PageContainer>
        <LoadingSpinner fullScreen text="Loading your financial dashboard..." />
      </PageContainer>
    );
  }
  
  // If no data, show empty state
  if (!userFinancialData) {
    return (
      <PageContainer>
        <PageHeader>
          <Title>Financial Dashboard</Title>
          <Subtitle>
            Your personal financial dam visualization and insights will appear here.
          </Subtitle>
        </PageHeader>
        
        <EmptyState>
          <EmptyStateIcon>💧</EmptyStateIcon>
          <EmptyStateTitle>No Financial Data Yet</EmptyStateTitle>
          <p>
            Complete the financial questionnaire to see your personalized financial dam and insights.
          </p>
          <Button onClick={() => navigate('/questionnaire')}>
            Complete Questionnaire
          </Button>
        </EmptyState>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <PageHeader>
        <Title>Your Financial Dashboard</Title>
        <Subtitle>
          Here's a visualization of your current financial state as a water dam.
          Income flows in as rain while expenses flow out through streams.
        </Subtitle>
      </PageHeader>
      
      <DamVisualization 
        title="Your Financial Dam"
        description="A visualization of your current financial situation"
        financialData={{
          totalAssets: userFinancialData.assets.totalAssets,
          totalLiabilities: userFinancialData.liabilities.totalLiabilities,
          netWorth: userFinancialData.netWorth,
          monthlyIncome: userFinancialData.income.totalIncome,
          monthlyExpenses: userFinancialData.expenses.totalExpenses
        }}
        spendingCategories={userFinancialData.spendingCategories}
      />
      
      <DashboardGrid>
        <DashboardSection>
          <SectionTitle>Financial Insights</SectionTitle>
          {insights.map((insight, index) => (
            <InsightCard key={index} color={insight.color}>
              <InsightTitle color={insight.color}>{insight.title}</InsightTitle>
              <InsightContent>{insight.content}</InsightContent>
            </InsightCard>
          ))}
          
          {dreamLifeText && (
            <Card>
              <SectionTitle>Your Dream Life</SectionTitle>
              <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
                {dreamLifeText}
              </p>
              <Button onClick={() => navigate('/future-scenarios')}>
                View Future Scenarios
              </Button>
            </Card>
          )}
        </DashboardSection>
        
        <DashboardSection>
          <SectionTitle>Key Metrics</SectionTitle>
          <StatsGrid>
            <StatCard>
              <StatLabel>Net Worth</StatLabel>
              <StatValue>
                {formatCurrency(userFinancialData.netWorth)}
              </StatValue>
            </StatCard>
            
            <StatCard positive={userFinancialData.monthlyCashFlow > 0} negative={userFinancialData.monthlyCashFlow < 0}>
              <StatLabel>Monthly Cash Flow</StatLabel>
              <StatValue positive={userFinancialData.monthlyCashFlow > 0} negative={userFinancialData.monthlyCashFlow < 0}>
                {formatCurrency(userFinancialData.monthlyCashFlow)}
              </StatValue>
            </StatCard>
            
            <StatCard>
              <StatLabel>Total Assets</StatLabel>
              <StatValue>
                {formatCurrency(userFinancialData.assets.totalAssets)}
              </StatValue>
            </StatCard>
            
            <StatCard negative={userFinancialData.liabilities.totalLiabilities > 0}>
              <StatLabel>Total Debt</StatLabel>
              <StatValue negative={userFinancialData.liabilities.totalLiabilities > 0}>
                {formatCurrency(userFinancialData.liabilities.totalLiabilities)}
              </StatValue>
            </StatCard>
          </StatsGrid>
          
          <Card>
            <SectionTitle>Monthly Income</SectionTitle>
            <StatCard>
              <StatLabel>Total Monthly Income</StatLabel>
              <StatValue positive>
                {formatCurrency(userFinancialData.income.totalIncome)}
              </StatValue>
            </StatCard>
            
            {userFinancialData.income.monthlyIncome > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <StatLabel>Primary Income</StatLabel>
                <p style={{ color: 'var(--text-dim)' }}>
                  {formatCurrency(userFinancialData.income.monthlyIncome)}
                </p>
              </div>
            )}
            
            {userFinancialData.income.otherIncome > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <StatLabel>Other Income</StatLabel>
                <p style={{ color: 'var(--text-dim)' }}>
                  {formatCurrency(userFinancialData.income.otherIncome)}
                </p>
              </div>
            )}
          </Card>
          
          <Button onClick={() => navigate('/questionnaire')}>
            Update Financial Data
          </Button>
          
          <Button onClick={() => navigate('/future-scenarios')} style={{ marginTop: '1rem', background: 'rgba(0, 196, 159, 0.8)' }}>
            Explore Future Scenarios
          </Button>
        </DashboardSection>
      </DashboardGrid>
    </PageContainer>
  );
};

export default DashboardPage;