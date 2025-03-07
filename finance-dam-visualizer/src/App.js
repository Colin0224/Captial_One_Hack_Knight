import React, { useState } from 'react';
import styled from 'styled-components';
import FinancialDashboard from './components/DamVisualization';
import SpendingCategoryChart from './components/SpendingCategoryChart';
import TransactionHistory from './components/TransactionHistory';
import FinancialInsights from './components/FinancialInsights';
import './App.css';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', 'Roboto', sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1.2rem;
    max-width: 600px;
    margin: 0 auto;
  }
`;

const TwoColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  width: 100%;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
  
  > * {
    min-width: 0;
  }
`;

function App() {
  const [mockData] = useState({
    balances: {
      totalAssets: 120000,
      totalLiabilities: 45000,
      netWorth: 75000
    },
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
    ],
    spendingCategories: [
      { name: 'Housing', amount: 1200 },
      { name: 'Food', amount: 800 },
      { name: 'Transportation', amount: 400 },
      { name: 'Entertainment', amount: 300 },
      { name: 'Utilities', amount: 500 },
      { name: 'Healthcare', amount: 200 },
      { name: 'Other', amount: 400 }
    ]
  });

  return (
    <AppContainer>
      <Header>
        <h1>Financial Pond Visualizer</h1>
        <p>Visualize your finances as a pond with rainfall (income) and outflows (expenses)</p>
      </Header>
      
      <FinancialDashboard />
      
      <TwoColumnLayout>
        <SpendingCategoryChart categories={mockData.spendingCategories} />
        <FinancialInsights 
          balances={mockData.balances} 
          transactions={mockData.transactions}
          spendingCategories={mockData.spendingCategories}
        />
      </TwoColumnLayout>
      
      <TransactionHistory transactions={mockData.transactions} />
    </AppContainer>
  );
}

export default App;