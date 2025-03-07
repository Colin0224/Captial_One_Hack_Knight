import React from 'react';
import styled from 'styled-components';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  margin-bottom: 2rem;
  backdrop-filter: blur(5px);
  color: white;
`;

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ 
        backgroundColor: 'rgba(0, 24, 57, 0.8)', 
        padding: '12px', 
        border: 'none',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        color: 'white'
      }}>
        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>{`${payload[0].name}`}</p>
        <p style={{ margin: '0 0 5px 0' }}>{`$${payload[0].value.toLocaleString()}`}</p>
        <p style={{ margin: '0', opacity: 0.8 }}>{`${(payload[0].value / payload[0].payload.total * 100).toFixed(1)}% of budget`}</p>
      </div>
    );
  }
  return null;
};

const SpendingCategoryChart = ({ categories }) => {
  // Calculate total spending
  const totalSpending = categories.reduce((sum, category) => sum + category.amount, 0);
  
  // Add total to each category for percentage calculation in tooltip
  const categoriesWithTotal = categories.map(category => ({
    ...category,
    total: totalSpending
  }));

  return (
    <ChartContainer>
      <h3>Monthly Spending by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoriesWithTotal}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="amount"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {categoriesWithTotal.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <h4>Total Monthly Spending: ${totalSpending.toLocaleString()}</h4>
      </div>
    </ChartContainer>
  );
};

export default SpendingCategoryChart;