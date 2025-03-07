import React, { useState } from 'react';
import styled from 'styled-components';

const TransactionContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 1.75rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
  color: white;
`;

const TransactionTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 1.5rem;
  
  th, td {
    padding: 0.9rem 1rem;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  th {
    background-color: rgba(0, 24, 57, 0.3);
    font-weight: 500;
    color: rgba(255, 255, 255, 0.9);
    position: sticky;
    top: 0;
    z-index: 10;
  }
  
  th:first-child {
    border-top-left-radius: 8px;
  }
  
  th:last-child {
    border-top-right-radius: 8px;
  }
  
  tr:hover td {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const TransactionAmount = styled.span`
  color: ${props => props.type === 'income' ? '#00C49F' : '#FF8042'};
  font-weight: bold;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  select {
    padding: 0.6rem 1rem;
    border-radius: 8px;
    border: none;
    background-color: rgba(0, 24, 57, 0.4);
    color: white;
    font-size: 0.95rem;
    cursor: pointer;
    appearance: none;
    background-image: linear-gradient(45deg, transparent 50%, rgba(255, 255, 255, 0.6) 50%), 
                      linear-gradient(135deg, rgba(255, 255, 255, 0.6) 50%, transparent 50%);
    background-position: calc(100% - 20px) calc(1em + 2px), calc(100% - 15px) calc(1em + 2px);
    background-size: 5px 5px, 5px 5px;
    background-repeat: no-repeat;
    padding-right: 30px;
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(72, 198, 239, 0.4);
    }
  }
  
  label {
    color: rgba(255, 255, 255, 0.8);
    margin-right: 10px;
    font-size: 0.95rem;
  }
`;

const TransactionHistory = ({ transactions }) => {
  const [filter, setFilter] = useState('all');
  
  // Get unique categories for filter
  const categories = ['All', ...new Set(transactions.map(t => t.category))];
  
  // Filter transactions based on selected category
  const filteredTransactions = filter === 'all' 
    ? transactions 
    : transactions.filter(t => t.category === filter);
  
  return (
    <TransactionContainer>
      <h3>Transaction History</h3>
      
      <FilterContainer>
        <div>
          <label htmlFor="category-filter">Filter by category: </label>
          <select 
            id="category-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.filter(c => c !== 'All').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </FilterContainer>
      
      <TransactionTable>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
              <td>
                <TransactionAmount type={transaction.type}>
                  ${Math.abs(transaction.amount).toLocaleString()}
                </TransactionAmount>
              </td>
              <td>{transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}</td>
            </tr>
          ))}
        </tbody>
      </TransactionTable>
    </TransactionContainer>
  );
};

export default TransactionHistory;