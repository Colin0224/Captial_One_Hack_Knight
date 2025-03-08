import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
// No auth import needed
import ScenarioCard from '../components/scenarios/ScenarioCard';
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

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-light);
`;

const ScenarioGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CurrentStateCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const DreamCard = styled.div`
  background: rgba(0, 112, 240, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border-left: 4px solid var(--primary-color);
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
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

const FutureScenarioPage = () => {
  const { userFinancialData, futureScenarios, dreamLifeText, loading } = useData();
  // No currentUser needed
  const navigate = useNavigate();
  
  // If no data is available yet, use mock scenarios for demonstration
  const mockScenarios = [
    {
      id: 'scenario-1',
      title: 'Career Transition to Tech',
      subtitle: '5-Year Plan: Software Engineering Path',
      tags: ['Career', 'Education', 'Investment'],
      financialData: {
        totalAssets: 250000,
        totalLiabilities: 30000,
        netWorth: 220000,
        monthlyIncome: 9500,
        monthlyExpenses: 5000
      },
      spendingCategories: [
        { name: 'Housing', amount: 2000, percentage: 40, color: 'rgba(255, 128, 66, 0.8)' },
        { name: 'Food', amount: 800, percentage: 16, color: 'rgba(255, 187, 40, 0.8)' },
        { name: 'Transportation', amount: 300, percentage: 6, color: 'rgba(136, 132, 216, 0.8)' },
        { name: 'Education', amount: 500, percentage: 10, color: 'rgba(0, 136, 254, 0.8)' },
        { name: 'Utilities', amount: 400, percentage: 8, color: 'rgba(0, 196, 159, 0.8)' },
        { name: 'Entertainment', amount: 300, percentage: 6, color: 'rgba(238, 82, 83, 0.8)' },
        { name: 'Savings', amount: 700, percentage: 14, color: 'rgba(72, 52, 212, 0.8)' }
      ],
      description: `
        <p>This scenario involves transitioning to a career in technology as a software engineer over the next 5 years. Here's the roadmap:</p>
        
        <p><strong>Years 1-2:</strong></p>
        <ul>
          <li>Complete a coding bootcamp or online degree in computer science ($15,000)</li>
          <li>Build a portfolio of projects while maintaining current job</li>
          <li>Network with professionals in the tech industry</li>
          <li>Find entry-level or junior developer position ($70,000-$85,000/year)</li>
        </ul>
        
        <p><strong>Years 3-5:</strong></p>
        <ul>
          <li>Gain experience and advance to mid-level developer ($90,000-$120,000/year)</li>
          <li>Pay off any remaining education debt</li>
          <li>Maximize employer 401(k) matching and benefits</li>
          <li>Build emergency fund to 6 months of expenses</li>
          <li>Start investing 15-20% of income in index funds</li>
        </ul>
        
        <p>This career path offers strong income growth potential, good work-life balance, and remote work opportunities that align with your dream life goals.</p>
      `,
      damTitle: 'Projected Financial State (5 Years)'
    },
    {
      id: 'scenario-2',
      title: 'Entrepreneurial Path',
      subtitle: '7-Year Plan: Building Your Own Business',
      tags: ['Entrepreneurship', 'Investment', 'Lifestyle'],
      financialData: {
        totalAssets: 380000,
        totalLiabilities: 50000,
        netWorth: 330000,
        monthlyIncome: 12000,
        monthlyExpenses: 7000
      },
      spendingCategories: [
        { name: 'Housing', amount: 2500, percentage: 35.7, color: 'rgba(255, 128, 66, 0.8)' },
        { name: 'Food', amount: 900, percentage: 12.9, color: 'rgba(255, 187, 40, 0.8)' },
        { name: 'Transportation', amount: 400, percentage: 5.7, color: 'rgba(136, 132, 216, 0.8)' },
        { name: 'Business', amount: 1500, percentage: 21.4, color: 'rgba(0, 136, 254, 0.8)' },
        { name: 'Utilities', amount: 500, percentage: 7.1, color: 'rgba(0, 196, 159, 0.8)' },
        { name: 'Entertainment', amount: 400, percentage: 5.7, color: 'rgba(238, 82, 83, 0.8)' },
        { name: 'Savings', amount: 800, percentage: 11.4, color: 'rgba(72, 52, 212, 0.8)' }
      ],
      description: `
        <p>This scenario involves building your own business over a 7-year period, with a focus on creating location-independent income aligned with your dream life goals.</p>
        
        <p><strong>Years 1-2: Planning & Foundation</strong></p>
        <ul>
          <li>Maintain current job while building skills and researching market opportunities</li>
          <li>Save 30% of income for business startup costs ($40,000 target)</li>
          <li>Create detailed business plan for a consulting or digital product business</li>
          <li>Build network and initial client relationships</li>
        </ul>
        
        <p><strong>Years 3-5: Launch & Growth</strong></p>
        <ul>
          <li>Reduce to part-time employment or use savings to support transition</li>
          <li>Launch business with initial clients/products</li>
          <li>Focus on lean operations and minimal overhead</li>
          <li>Reinvest 60% of profits into business growth</li>
          <li>Target income replacement by end of year 4</li>
        </ul>
        
        <p><strong>Years 6-7: Scaling & Automation</strong></p>
        <ul>
          <li>Build systems to automate or delegate core business functions</li>
          <li>Increase profit margins through efficiency and premium offerings</li>
          <li>Establish location-independent operations</li>
          <li>Target $144,000+ annual income with 15-25 hour work weeks</li>
        </ul>
        
        <p>This path carries more risk but offers the greatest alignment with your dream lifestyle goals of flexibility, location independence, and creative control.</p>
      `,
      damTitle: 'Projected Financial State (7 Years)'
    },
    {
      id: 'scenario-3',
      title: 'Remote Work & Geographic Arbitrage',
      subtitle: '3-Year Plan: International Lifestyle Design',
      tags: ['Career', 'Travel', 'Lifestyle'],
      financialData: {
        totalAssets: 180000,
        totalLiabilities: 20000,
        netWorth: 160000,
        monthlyIncome: 7000,
        monthlyExpenses: 3500
      },
      spendingCategories: [
        { name: 'Housing', amount: 1000, percentage: 28.6, color: 'rgba(255, 128, 66, 0.8)' },
        { name: 'Food', amount: 600, percentage: 17.1, color: 'rgba(255, 187, 40, 0.8)' },
        { name: 'Transportation', amount: 300, percentage: 8.6, color: 'rgba(136, 132, 216, 0.8)' },
        { name: 'Travel', amount: 700, percentage: 20.0, color: 'rgba(0, 136, 254, 0.8)' },
        { name: 'Utilities', amount: 200, percentage: 5.7, color: 'rgba(0, 196, 159, 0.8)' },
        { name: 'Entertainment', amount: 300, percentage: 8.6, color: 'rgba(238, 82, 83, 0.8)' },
        { name: 'Savings', amount: 400, percentage: 11.4, color: 'rgba(72, 52, 212, 0.8)' }
      ],
      description: `
        <p>This scenario leverages remote work opportunities and geographic arbitrage to achieve your dream lifestyle in just 3 years. Here's the approach:</p>
        
        <p><strong>Year 1: Remote Transition</strong></p>
        <ul>
          <li>Negotiate remote work arrangement with current employer or find remote position</li>
          <li>Develop in-demand digital skills that support location independence</li>
          <li>Reduce current living expenses by 20% to accelerate savings</li>
          <li>Research lower cost-of-living locations that match your lifestyle preferences</li>
          <li>Build 6-month emergency fund as safety net</li>
        </ul>
        
        <p><strong>Year 2: Relocation & Establishment</strong></p>
        <ul>
          <li>Relocate to a lower cost-of-living area with high quality of life (examples: Portugal, Spain, Mexico, Thailand, etc.)</li>
          <li>Maintain U.S.-based income while reducing living expenses by 40-50%</li>
          <li>Establish local connections and explore temporary accommodations</li>
          <li>Increase savings rate to 40-50% of income</li>
        </ul>
        
        <p><strong>Year 3: Lifestyle Optimization</strong></p>
        <ul>
          <li>Find ideal long-term housing arrangement with significant cost savings</li>
          <li>Implement tax optimization strategies for expats (Foreign Earned Income Exclusion)</li>
          <li>Establish regular travel rhythm between several "home bases"</li>
          <li>Begin building passive income streams through investments</li>
        </ul>
        
        <p>This approach allows you to maintain your career while dramatically reducing expenses, increasing savings, and experiencing the international lifestyle you described in your dream life vision.</p>
      `,
      damTitle: 'Projected Financial State (3 Years)'
    }
  ];
  
  // Determine which scenarios to display - use real data if available, otherwise use mock data
  const displayScenarios = futureScenarios.length > 0 ? futureScenarios : mockScenarios;
  
  // If loading, show spinner
  if (loading && !userFinancialData) {
    return (
      <PageContainer>
        <LoadingSpinner fullScreen text="Loading future scenarios..." />
      </PageContainer>
    );
  }
  
  // If no financial data, show empty state
  if (!userFinancialData) {
    return (
      <PageContainer>
        <PageHeader>
          <Title>Future Scenarios</Title>
          <Subtitle>
            Explore different pathways to achieve your dream life through financial simulations.
          </Subtitle>
        </PageHeader>
        
        <EmptyState>
          <EmptyStateIcon>🔮</EmptyStateIcon>
          <EmptyStateTitle>No Financial Data Yet</EmptyStateTitle>
          <p>
            Complete the financial questionnaire to see personalized scenarios for your dream life.
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
        <Title>Your Future Scenarios</Title>
        <Subtitle>
          Based on your financial data and dream life description, we've created several
          potential pathways to help you achieve your goals.
        </Subtitle>
      </PageHeader>
      
      <CurrentStateCard>
        <SectionTitle>Your Current Financial State</SectionTitle>
        <DamVisualization 
          title="Current Financial Dam"
          description="This is your current financial situation"
          financialData={{
            totalAssets: userFinancialData.assets.totalAssets,
            totalLiabilities: userFinancialData.liabilities.totalLiabilities,
            netWorth: userFinancialData.netWorth,
            monthlyIncome: userFinancialData.income.totalIncome,
            monthlyExpenses: userFinancialData.expenses.totalExpenses
          }}
          spendingCategories={userFinancialData.spendingCategories}
          height={250}
        />
      </CurrentStateCard>
      
      {dreamLifeText && (
        <DreamCard>
          <SectionTitle>Your Dream Life</SectionTitle>
          <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
            {dreamLifeText}
          </p>
        </DreamCard>
      )}
      
      <SectionTitle>Possible Pathways to Your Dream Life</SectionTitle>
      <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>
        Each scenario represents a different approach to achieving your goals based on career paths,
        lifestyle choices, and financial strategies.
      </p>
      
      <ScenarioGrid>
        {displayScenarios.map(scenario => (
          <ScenarioCard 
            key={scenario.id}
            title={scenario.title}
            subtitle={scenario.subtitle}
            tags={scenario.tags}
            financialData={scenario.financialData}
            description={scenario.description}
            damTitle={scenario.damTitle}
          />
        ))}
      </ScenarioGrid>
      
      <Card>
        <SectionTitle>Want More Personalized Scenarios?</SectionTitle>
        <p style={{ color: 'var(--text-dim)', lineHeight: '1.6', marginBottom: '1rem' }}>
          The scenarios above are based on your current financial data and dream life description.
          To get more specific and tailored scenarios, consider providing more details about your
          skills, interests, and specific life goals.
        </p>
        <Button onClick={() => navigate('/questionnaire')}>
          Update Your Information
        </Button>
      </Card>
    </PageContainer>
  );
};

export default FutureScenarioPage;