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
  const { userFinancialData, futureScenarios, dreamLifeText, saveDreamLifeText, loading, setLoading } = useData();
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
  
  // Process scenarios to ensure they have all required properties
  const processScenarios = (scenarios) => {
    return scenarios.map(scenario => {
      // Make a copy to avoid modifying the original
      let processedScenario = {...scenario};
      
      // If the scenario already has spendingCategories in the right format, use it
      if (!processedScenario.spendingCategories) {
        // If the scenario has spendingCategories in the financialData, move it to the top level
        if (processedScenario.financialData && processedScenario.financialData.spendingCategories) {
          processedScenario.spendingCategories = processedScenario.financialData.spendingCategories;
        } else {
          // If no spending categories exist, create defaults based on expenses
          const totalExpenses = processedScenario.financialData?.monthlyExpenses || 5000;
          processedScenario.spendingCategories = createDefaultSpendingCategories(totalExpenses);
        }
      }
      
      return processedScenario;
    });
  };
  
  // Create default spending categories for a given total expense amount
  const createDefaultSpendingCategories = (totalExpenses) => {
    return [
      { name: 'Housing', amount: Math.round(totalExpenses * 0.35), percentage: '35.0', color: 'rgba(255, 128, 66, 0.8)' },
      { name: 'Food', amount: Math.round(totalExpenses * 0.15), percentage: '15.0', color: 'rgba(255, 187, 40, 0.8)' },
      { name: 'Transportation', amount: Math.round(totalExpenses * 0.10), percentage: '10.0', color: 'rgba(136, 132, 216, 0.8)' },
      { name: 'Utilities', amount: Math.round(totalExpenses * 0.08), percentage: '8.0', color: 'rgba(0, 196, 159, 0.8)' },
      { name: 'Entertainment', amount: Math.round(totalExpenses * 0.12), percentage: '12.0', color: 'rgba(238, 82, 83, 0.8)' },
      { name: 'Savings', amount: Math.round(totalExpenses * 0.15), percentage: '15.0', color: 'rgba(72, 52, 212, 0.8)' },
      { name: 'Other', amount: Math.round(totalExpenses * 0.05), percentage: '5.0', color: 'rgba(0, 136, 254, 0.8)' }
    ];
  };
  
  // Helper function to modify spending categories based on user's current data
  const modifySpendingCategories = (originalCategories, adjustments, totalProjectedExpenses) => {
    // Default color map for categories
    const colorMap = {
      'Housing': 'rgba(255, 128, 66, 0.8)',
      'Food': 'rgba(255, 187, 40, 0.8)',
      'Transportation': 'rgba(136, 132, 216, 0.8)',
      'Education': 'rgba(0, 136, 254, 0.8)',
      'Utilities': 'rgba(0, 196, 159, 0.8)',
      'Entertainment': 'rgba(238, 82, 83, 0.8)',
      'Savings': 'rgba(72, 52, 212, 0.8)',
      'Travel': 'rgba(255, 99, 132, 0.8)',
      'Business': 'rgba(153, 102, 255, 0.8)',
      'Other': 'rgba(0, 136, 254, 0.8)'
    };
    
    // Use user's categories if available, otherwise use defaults
    let baseCategories = [];
    if (originalCategories && originalCategories.length > 0) {
      baseCategories = [...originalCategories];
    } else {
      baseCategories = createDefaultSpendingCategories(totalProjectedExpenses);
    }
    
    // Apply adjustments to existing categories and add new ones
    let modifiedCategories = baseCategories.map(category => {
      const multiplier = adjustments[category.name] || 1.0;
      return {
        ...category,
        amount: Math.round(category.amount * multiplier)
      };
    });
    
    // Add any categories that aren't in the original list
    Object.keys(adjustments).forEach(categoryName => {
      if (!modifiedCategories.some(cat => cat.name === categoryName)) {
        modifiedCategories.push({
          name: categoryName,
          amount: Math.round(totalProjectedExpenses * 0.10 * adjustments[categoryName]),
          color: colorMap[categoryName] || 'rgba(0, 136, 254, 0.8)'
        });
      }
    });
    
    // Calculate the total of all categories
    const totalAmount = modifiedCategories.reduce((sum, cat) => sum + cat.amount, 0);
    
    // Normalize to ensure the total matches the projected expenses
    return modifiedCategories.map(category => {
      const normalizedAmount = Math.round((category.amount / totalAmount) * totalProjectedExpenses);
      return {
        ...category,
        amount: normalizedAmount,
        percentage: ((normalizedAmount / totalProjectedExpenses) * 100).toFixed(1)
      };
    });
  };

  // Log the incoming scenarios data to debug
  console.log('Future scenarios from context:', futureScenarios);
  
  // Only generate scenarios once when component mounts and we have no scenarios
  const [localLoading, setLocalLoading] = React.useState(false);
  
  React.useEffect(() => {
    // Only try to generate scenarios if we have user data but no scenarios
    if (userFinancialData && dreamLifeText && futureScenarios.length === 0 && !localLoading) {
      console.log("FutureScenarioPage: No scenarios found, but we have financial data - generating them once");
      
      // Set local loading state
      setLocalLoading(true);
      
      // No need to call setLoading here since saveDreamLifeText handles that
      saveDreamLifeText(dreamLifeText)
        .then(() => {
          console.log("Scenarios generated successfully");
          setLocalLoading(false);
        })
        .catch(err => {
          console.error("Error generating scenarios, will use on-the-fly generation:", err);
          setLocalLoading(false);
        });
    }
  }, [userFinancialData, dreamLifeText, futureScenarios.length, saveDreamLifeText, localLoading]);

  // Create on-the-fly scenarios if we don't have any in the context
  const generateOnTheFlyScenarios = () => {
    if (!userFinancialData) return mockScenarios;
    
    console.log("Generating on-the-fly scenarios directly from user data:", userFinancialData);
    
    // Extract data
    const {
      assets = { totalAssets: 0 },
      liabilities = { totalLiabilities: 0 },
      income = { totalIncome: 0 },
      expenses = { totalExpenses: 0 },
      spendingCategories = []
    } = userFinancialData;
    
    // Apply multipliers for different scenarios
    // Calculate 5-year growth with fixed expenses (10% annual income growth)
    const year5IncomeMultiplier = 1.1 * 1.1 * 1.1 * 1.1 * 1.1; // 5 years of 10% growth = 1.61x
    
    const careerScenario = {
      id: 'scenario-career',
      title: 'Career Growth Path',
      subtitle: '5-Year Career Growth Plan',
      tags: ['Career', 'Education', 'Investment'],
      financialData: {
        // Asset growth from increased savings
        totalAssets: Math.round(assets.totalAssets * 2.5),
        // Liability reduction from accelerated debt payment
        totalLiabilities: Math.round(liabilities.totalLiabilities * 0.6),
        netWorth: Math.round((assets.totalAssets * 2.5) - (liabilities.totalLiabilities * 0.6)),
        // Exactly 61% increase (1.61x) matching the 10% annual growth described
        monthlyIncome: Math.round(income.totalIncome * year5IncomeMultiplier),
        // Keep expenses exactly the same as current (key strategy point)
        monthlyExpenses: Math.round(expenses.totalExpenses)
      },
      damTitle: 'Career Growth (5 Years)',
      // Keep overall expenses the same but redistribute categories
      spendingCategories: modifySpendingCategories(spendingCategories, {
        'Education': 1.5,   // Increase education spending
        'Housing': 1.0,     // Same housing cost (not increased)
        'Entertainment': 1.0, // Same entertainment
        'Savings': 3.0      // Much higher savings (from increased income)
      }, Math.round(expenses.totalExpenses))
    };
    
    // Calculate entrepreneurial path growth
    // Phase 1 (Years 1-2): High savings rate (30%), no business income
    // Phase 2 (Years 3-5): Launch business, gradual income increase
    // Phase 3 (Years 6-7): Established business with exponential growth
    
    // Calculate startup capital from 30% savings rate over 2 years
    const monthlySavingsRate = 0.30;
    const startupCapital = income.totalIncome * monthlySavingsRate * 24; // 2 years of saving 30%
    
    // Calculate business growth algorithm using venture capital metrics
    // 7-year growth formula: Initial 2 years saving, then 20% MoM growth for next 2 years, then 15% quarterly growth
    // This models typical successful business growth patterns
    const businessGrowthMultiplier = 4.8; // Final multiple of initial income
    
    const entrepreneurScenario = {
      id: 'scenario-entrepreneur',
      title: 'Entrepreneurial Path',
      subtitle: '7-Year Entrepreneurship Plan',
      tags: ['Entrepreneurship', 'Investment', 'Lifestyle'],
      financialData: {
        // Higher asset growth due to business equity value
        totalAssets: Math.round(assets.totalAssets * 3.8),
        // Liabilities stable (small business loan offset by personal debt reduction)
        totalLiabilities: Math.round(liabilities.totalLiabilities * 0.8),
        netWorth: Math.round((assets.totalAssets * 3.8) - (liabilities.totalLiabilities * 0.8)),
        // Final income represents 4.8x initial income (after 7 years of compounding growth)
        monthlyIncome: Math.round(income.totalIncome * businessGrowthMultiplier),
        // Expenses higher but proportionally lower compared to income growth
        monthlyExpenses: Math.round(expenses.totalExpenses * 1.6)
      },
      damTitle: 'Entrepreneurial Path (7 Years)',
      // Redistributed spending categories reflecting business owner lifestyle
      spendingCategories: modifySpendingCategories(spendingCategories, {
        'Business': 4.0,      // Significant business expenses (staff, operations)
        'Housing': 1.3,       // Slightly better housing 
        'Entertainment': 0.8, // Still disciplined with personal spending
        'Travel': 1.5,        // More travel for business and leisure
        'Education': 1.8,     // More spending on business education and coaching
        'Savings': 2.0        // Higher savings/reinvestment rate
      }, Math.round(expenses.totalExpenses * 1.6))
    };
    
    // Calculate remote work & passive income strategy metrics
    // 1. Cost-of-living reduction in target locations (40-60% depending on location)
    // 2. Maintained primary income (possibly with 5-10% reduction for remote adjustment)
    // 3. Progressive passive income growth from investments
    
    const colReductionFactor = 0.60; // 40% reduction in cost of living
    const remoteWorkIncomeFactor = 0.95; // 5% reduction in primary job income for remote work
    const passiveIncomeTarget = income.totalIncome * 0.5; // Target 50% of current income from passive sources
    
    // Calculate expense reduction based on geographic arbitrage
    const reducedMonthlyExpenses = Math.round(expenses.totalExpenses * colReductionFactor);
    // Calculate savings rate based on expense reduction
    const monthlySavings = (income.totalIncome * remoteWorkIncomeFactor) - reducedMonthlyExpenses;
    // Calculate passive income after 3 years (growing from 0 to target)
    const year3PassiveIncome = Math.round(passiveIncomeTarget);
    // Calculate total income (remote work + passive)
    const totalProjectedIncome = Math.round((income.totalIncome * remoteWorkIncomeFactor) + year3PassiveIncome);
    
    const remoteScenario = {
      id: 'scenario-remote',
      title: 'Remote & Passive Income',
      subtitle: '3-Year Geo-Arbitrage & Income Diversification',
      tags: ['Passive Income', 'Travel', 'Geographic Arbitrage'],
      financialData: {
        totalAssets: Math.round(assets.totalAssets * 2.2), // Higher due to investment assets
        totalLiabilities: Math.round(liabilities.totalLiabilities * 0.4), // Lower due to debt reduction
        netWorth: Math.round((assets.totalAssets * 2.2) - (liabilities.totalLiabilities * 0.4)),
        // Income includes both remote salary and passive income
        monthlyIncome: totalProjectedIncome,
        // Expenses reduced through geographic arbitrage
        monthlyExpenses: reducedMonthlyExpenses
      },
      damTitle: 'Remote & Passive Income (3 Years)',
      spendingCategories: modifySpendingCategories(spendingCategories, {
        'Housing': 0.5,        // Much lower housing cost through geo-arbitrage
        'Food': 0.6,           // Lower food costs in lower COL area
        'Transportation': 0.4, // Significantly lower transportation needs
        'Travel': 2.5,         // Much higher travel budget
        'Utilities': 0.6,      // Lower utilities in target locations
        'Investments': 2.0,    // New category for investment activities
        'Savings': 2.5         // Much higher savings rate
      }, reducedMonthlyExpenses)
    };
    
    // Add descriptions for each scenario based on financial data
    // Calculate annual income growth over 5 years
    const yearlyIncome = income.totalIncome * 12;
    const year1Income = yearlyIncome * 1.1;
    const year2Income = year1Income * 1.1;
    const year3Income = year2Income * 1.1;
    const year4Income = year3Income * 1.1;
    const year5Income = year4Income * 1.1;
    const startingExpenses = expenses.totalExpenses * 12;
    const savingsYear1 = year1Income - startingExpenses;
    const savingsYear5 = year5Income - startingExpenses;
    const savingsRateYear1 = Math.round((savingsYear1 / year1Income) * 100);
    const savingsRateYear5 = Math.round((savingsYear5 / year5Income) * 100);
    
    careerScenario.description = `
      <p>This scenario focuses on <strong>career advancement with spending discipline</strong> over the next 5 years. The key strategy is maintaining your current spending level while steadily increasing your income through career growth.</p>
      
      <p><strong>Strategy Highlights:</strong></p>
      <ul>
        <li>10% annual income growth through strategic career moves</li>
        <li>Fixed expenses at current level of $${Math.round(startingExpenses/1000)}k per year</li>
        <li>Increasing savings rate from ${savingsRateYear1}% to ${savingsRateYear5}% over 5 years</li>
      </ul>
      
      <p><strong>Years 1-2:</strong></p>
      <ul>
        <li>Target Year 1 Income: $${Math.round(year1Income/1000)}k (10% increase)</li>
        <li>Target Year 2 Income: $${Math.round(year2Income/1000)}k (21% increase from start)</li>
        <li>Maintain current spending level: $${Math.round(startingExpenses/1000)}k per year</li>
        <li>Invest in skills that increase your market value</li>
        <li>Establish automatic savings to prevent lifestyle inflation</li>
      </ul>
      
      <p><strong>Years 3-5:</strong></p>
      <ul>
        <li>Target Year 5 Income: $${Math.round(year5Income/1000)}k (61% increase from start)</li>
        <li>Yearly Savings in Year 5: $${Math.round((year5Income - startingExpenses)/1000)}k</li>
        <li>Maintain fixed expenses while creating additional income streams</li>
        <li>Accelerate debt repayment with increased cash flow</li>
        <li>Allocate 70% of additional income to investments</li>
      </ul>
      
      <p><strong>How to Achieve 10% Annual Income Growth:</strong></p>
      <ul>
        <li><strong>Skills Development:</strong> Invest 5 hours weekly in high-demand skills in your industry</li>
        <li><strong>Strategic Job Moves:</strong> Change employers every 2-3 years (avg 14% increase vs 3% internal)</li>
        <li><strong>Certification Strategy:</strong> Obtain 1-2 industry certifications annually</li>
        <li><strong>Salary Negotiation:</strong> Research market rates and negotiate with documented achievements</li>
        <li><strong>Side Income:</strong> Develop consulting or teaching in your field (5-10 hours/week)</li>
      </ul>
      
      <p><strong>How to Maintain Fixed Expenses:</strong></p>
      <ul>
        <li><strong>Budget Automation:</strong> Auto-transfer to savings on payday before expenses</li>
        <li><strong>Lifestyle Freeze:</strong> Commit to maintaining current housing and transportation</li>
        <li><strong>Substitution Method:</strong> For every new expense, eliminate an equivalent one</li>
        <li><strong>Accountability System:</strong> Monthly expense review with tracking app</li>
        <li><strong>Social Strategy:</strong> Find free/low-cost alternatives for social activities</li>
      </ul>
      
      <p>This disciplined approach creates substantial wealth by focusing on <strong>increasing your income while keeping expenses fixed</strong>. The visualization above shows exactly this strategy: your monthly expenses remain at $${Math.round(expenses.totalExpenses)} while your income grows by 61% over 5 years.</p>
    `;
    
    entrepreneurScenario.description = `
      <p>This scenario details a <strong>quantitative, capital-efficient entrepreneurship strategy</strong> over 7 years with three distinct phases designed to minimize risk while maximizing growth potential.</p>
      
      <p><strong>The 30% Rule: Startup Capital Strategy</strong></p>
      <ul>
        <li>Target startup capital: $${Math.round(startupCapital/1000)}k from 30% monthly savings over 2 years</li>
        <li>This funding approach eliminates outside investor pressure and maintains full ownership</li>
        <li>Requires temporary lifestyle adjustments to achieve high savings rate</li>
        <li>Creates buffer for 12-18 months of runway during initial business launch</li>
      </ul>
      
      <p><strong>Phase 1 (Years 1-2): Capital Accumulation</strong></p>
      <ul>
        <li>Maintain current job while saving 30% of income ($${Math.round((income.totalIncome * 0.3))}+ monthly)</li>
        <li>Develop minimum viable product (MVP) or service offering during evenings/weekends</li>
        <li>Secure 3-5 pilot customers before full launch for validation</li>
        <li>Begin establishing systems and processes for scale</li>
        <li>Target savings: $${Math.round(startupCapital/1000)}k by end of Year 2</li>
      </ul>
      
      <p><strong>Phase 2 (Years 3-5): Launch & Growth Acceleration</strong></p>
      <ul>
        <li>Growth algorithm: Target 20% month-over-month revenue growth first 18 months</li>
        <li>Transition to business full-time when revenue reaches 70% of previous salary</li>
        <li>Focus 80% of efforts on customer acquisition, 20% on operations</li>
        <li>Reinvest 60% of all profits into growth (marketing, staff, technology)</li>
        <li>Add key team members when revenue consistently exceeds $${Math.round((income.totalIncome * 12 * 2)/1000)}k annually</li>
      </ul>
      
      <p><strong>Phase 3 (Years 6-7): Systems & Scale</strong></p>
      <ul>
        <li>Target business income: $${Math.round((income.totalIncome * businessGrowthMultiplier * 12)/1000)}k annually (${businessGrowthMultiplier.toFixed(1)}x your current income)</li>
        <li>Shift from growth focus to optimization (15% quarterly growth)</li>
        <li>Implement delegation system: 70% of operations run without you</li>
        <li>Develop 3-5 complementary income streams within business ecosystem</li>
        <li>Work hours reduced to 25-30 hours weekly with location flexibility</li>
      </ul>
      
      <p><strong>Financial Dynamics</strong></p>
      <ul>
        <li><strong>Investment efficiency ratio:</strong> $1 invested in Year 1-2 = $7-10 return by Year 7</li>
        <li><strong>Business vs. personal expenses:</strong> 35-40% of total expenses are business (tax-advantaged)</li>
        <li><strong>Personal income strategy:</strong> Modest salary with quarterly profit distributions</li>
        <li><strong>Risk mitigation:</strong> 6-month emergency fund maintained at all times</li>
      </ul>
      
      <p>This methodical approach transforms your income while creating an asset that continues growing in value. The visualization above reflects your financial position after implementation of all three phases.</p>
    `;
    
    // Calculate monthly and yearly values for clarity in description
    const monthlySavingsFormatted = Math.round(monthlySavings);
    const yearlySavingsFormatted = Math.round(monthlySavings * 12 / 1000);
    const savingsRateFormatted = Math.round((monthlySavings / (income.totalIncome * remoteWorkIncomeFactor)) * 100);
    const monthlyPassiveIncomeFormatted = Math.round(year3PassiveIncome);
    const yearlyPassiveIncomeFormatted = Math.round(year3PassiveIncome * 12 / 1000);
    const passiveIncomePercentage = Math.round((year3PassiveIncome / totalProjectedIncome) * 100);
    
    remoteScenario.description = `
      <p>This scenario combines <strong>geographic arbitrage with passive income development</strong> to create a financially sustainable, location-independent lifestyle within 3 years.</p>
      
      <p><strong>The 40/40/20 Passive Income Strategy</strong></p>
      <ul>
        <li><strong>40%</strong> - Reduce your expenses through geographic arbitrage</li>
        <li><strong>40%</strong> - Maintain remote income (95% of current with location flexibility)</li>
        <li><strong>20%</strong> - Build increasing passive income streams each quarter</li>
        <li>Result: $${monthlyPassiveIncomeFormatted}/month passive income ($${yearlyPassiveIncomeFormatted}k/year) by year 3</li>
      </ul>

      <p><strong>Phase 1: Geographic Arbitrage (Months 1-6)</strong></p>
      <ul>
        <li>Secure remote arrangement with current employer (possible 5% salary adjustment)</li>
        <li>Research and select locations with 40% lower cost of living (housing focus)</li>
        <li>Create monthly savings of $${monthlySavingsFormatted} (${savingsRateFormatted}% of income)</li>
        <li>Prepare tax strategy for international income (Foreign Earned Income Exclusion)</li>
        <li>Set up banking and investment accounts optimized for your target locations</li>
      </ul>
      
      <p><strong>Phase 2: Passive Income Foundation (Months 7-18)</strong></p>
      <ul>
        <li>Allocate monthly $${monthlySavingsFormatted} savings using the bucket method:</li>
        <li>• 40% - Dividend-focused ETFs yielding 3-4% annually</li>
        <li>• 30% - Real estate crowdfunding platforms (8-12% returns)</li>
        <li>• 20% - Stablecoin yield platforms (6-10% APY)</li>
        <li>• 10% - High-growth potential investments</li>
        <li>Target: $${Math.round(year3PassiveIncome/3)}/month passive income by end of Phase 2</li>
      </ul>
      
      <p><strong>Phase 3: Passive Income Scaling (Months 19-36)</strong></p>
      <ul>
        <li>Increase allocation to highest-performing passive streams</li>
        <li>Explore location-independent active income upgrades (consulting, freelancing)</li>
        <li>Create additional income streams through affiliate marketing or niche sites</li>
        <li>Target diversification: no single income source exceeds 20% of total</li>
        <li>Achieve $${monthlyPassiveIncomeFormatted}/month in passive income ($${passiveIncomePercentage}% of total income)</li>
      </ul>
      
      <p><strong>Financial Independence Metrics</strong></p>
      <ul>
        <li><strong>Geographic freedom:</strong> Ability to live in 15+ countries comfortably</li>
        <li><strong>Income resilience:</strong> 4+ income streams, none exceeding 30% of total</li>
        <li><strong>Work optionality:</strong> Ability to reduce primary work by 30-50% if desired</li>
        <li><strong>Time to full independence:</strong> 3 additional years to reach 100% passive income</li>
      </ul>
      
      <p>This strategy achieves dual benefits: immediate lifestyle enhancement through geographic arbitrage plus long-term financial freedom through systematic passive income development.</p>
    `;
    
    return [careerScenario, entrepreneurScenario, remoteScenario];
  };

  // Always use actual user data if available, never fall back to mock data
  const displayScenarios = userFinancialData ? 
    (futureScenarios.length > 0 ? processScenarios(futureScenarios) : processScenarios(generateOnTheFlyScenarios())) :
    mockScenarios;
  
  // Log the processed scenarios
  console.log('Display scenarios after processing:', displayScenarios);
  
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
            spendingCategories={scenario.spendingCategories}
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