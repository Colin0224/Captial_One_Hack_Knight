import React, { createContext, useState, useContext, useEffect } from 'react';
import { db, generateScenarios, calculateFinancialInsights } from '../services/firebase';
import { collection, doc, setDoc, getDoc, getDocs } from 'firebase/firestore';

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [userFinancialData, setUserFinancialData] = useState(null);
  const [futureScenarios, setFutureScenarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dreamLifeText, setDreamLifeText] = useState('');
  
  // Load data from localStorage on initial load
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('userFinancialData');
      const storedDreamText = localStorage.getItem('dreamLifeText');
      
      // During development, we'll clear stored scenarios to force regeneration
      localStorage.removeItem('futureScenarios');
      
      if (storedData) {
        setUserFinancialData(JSON.parse(storedData));
      }
      
      if (storedDreamText) {
        setDreamLifeText(storedDreamText);
      }
      
      // We'll regenerate scenarios when needed rather than loading old ones
      setFutureScenarios([]);
    } catch (err) {
      console.error('Error loading data from localStorage:', err);
    }
  }, []);

  // Save questionnaire data
  async function saveQuestionnaireData(data) {
    setLoading(true);
    try {
      // Store in local state
      setUserFinancialData(data);
      
      // Save to localStorage
      localStorage.setItem('userFinancialData', JSON.stringify(data));
      
      // Save to Firestore if online (anonymous document with a session ID)
      const sessionId = localStorage.getItem('sessionId') || `session-${Date.now()}`;
      localStorage.setItem('sessionId', sessionId);
      
      await setDoc(doc(db, 'anonymousData', sessionId), {
        financialData: data,
        timestamp: new Date()
      }, { merge: true });
      
      // Calculate financial insights using Firebase Functions
      try {
        const result = await calculateFinancialInsights({ financialData: data });
        // Merge insights with the financial data
        const enhancedData = {
          ...data,
          insights: result.data
        };
        setUserFinancialData(enhancedData);
        localStorage.setItem('userFinancialData', JSON.stringify(enhancedData));
      } catch (fnError) {
        console.error('Error calculating insights:', fnError);
        // Continue even if the cloud function fails
      }
      
      return true;
    } catch (err) {
      console.error('Error saving questionnaire data:', err);
      setError('Failed to save questionnaire data');
      return false;
    } finally {
      setLoading(false);
    }
  }

  // Save dream life text and generate scenarios
  async function saveDreamLifeText(text) {
    // Set loading state at the beginning
    setLoading(true);
    setError(null);
    
    try {
      console.log("Starting saveDreamLifeText with:", text);
      setDreamLifeText(text);
      
      // Save to localStorage
      localStorage.setItem('dreamLifeText', text);
      
      // Save to Firestore if online
      const sessionId = localStorage.getItem('sessionId') || `session-${Date.now()}`;
      localStorage.setItem('sessionId', sessionId);
      
      try {
        await setDoc(doc(db, 'anonymousData', sessionId), {
          dreamLifeText: text,
          timestamp: new Date()
        }, { merge: true });
      } catch (firestoreError) {
        console.log('Could not save to Firestore, continuing with local processing:', firestoreError);
      }
      
      // Generate scenarios using the user's financial data and dream life text
      if (userFinancialData) {
        try {
          // Skip Firebase and always generate scenarios locally during development
          console.log('Generating scenarios locally from user financial data...');
          
          // Generate scenarios locally using the user's financial data
          const localScenarios = generateLocalScenarios(userFinancialData, text);
          console.log('Generated local scenarios:', localScenarios);
          
          setFutureScenarios(localScenarios);
          localStorage.setItem('futureScenarios', JSON.stringify(localScenarios));
          
          /* Comment out Firebase for now to test local generation
          try {
            // Try using Firebase Cloud Function if available
            const result = await generateScenarios({ 
              financialData: userFinancialData,
              dreamLifeText: text 
            });
            
            if (result.data && result.data.scenarios) {
              setFutureScenarios(result.data.scenarios);
              localStorage.setItem('futureScenarios', JSON.stringify(result.data.scenarios));
            }
          } catch (fnError) {
            console.log('Generating scenarios locally instead of using Firebase...');
            
            // Generate scenarios locally using the user's financial data
            const localScenarios = generateLocalScenarios(userFinancialData, text);
            setFutureScenarios(localScenarios);
            localStorage.setItem('futureScenarios', JSON.stringify(localScenarios));
          }
          */
        } catch (scenarioError) {
          console.error("Error generating scenarios:", scenarioError);
          // Continue even if scenario generation fails
        }
      }
      
      return true;
    } catch (err) {
      console.error('Error saving dream life text:', err);
      setError('Failed to save dream life text');
      return false;
    } finally {
      setLoading(false);
    }
  }
  
  // Local function to generate scenarios based on user data
  function generateLocalScenarios(financialData, dreamLifeText) {
    console.log("Starting local scenario generation with financial data:", financialData);
    
    // Extract relevant financial information
    const {
      netWorth = 0,
      monthlyCashFlow = 0,
      assets = { totalAssets: 0 },
      liabilities = { totalLiabilities: 0 },
      income = { totalIncome: 0 },
      expenses = { totalExpenses: 0 },
      spendingCategories = []
    } = financialData;
    
    // Create base scenarios
    let scenarios = [
      {
        id: 'scenario-career',
        title: 'Career Advancement Path',
        subtitle: '5-Year Plan: Professional Growth',
        tags: ['Career', 'Education', 'Investment'],
        dreamLifeText: dreamLifeText
      },
      {
        id: 'scenario-entrepreneur',
        title: 'Entrepreneurial Journey',
        subtitle: '7-Year Plan: Building Your Business',
        tags: ['Entrepreneurship', 'Investment', 'Lifestyle'],
        dreamLifeText: dreamLifeText
      },
      {
        id: 'scenario-remote',
        title: 'Remote Work & Geographic Arbitrage',
        subtitle: '3-Year Plan: Lifestyle Design',
        tags: ['Career', 'Travel', 'Lifestyle'],
        dreamLifeText: dreamLifeText
      }
    ];
    
    // Process each scenario with financial projections
    return scenarios.map(scenario => {
      // Different multipliers based on scenario type
      let assetMultiplier, liabilityMultiplier, incomeMultiplier, expenseMultiplier;
      let spendingCategoryAdjustments = {};
      let yearsProjection;
      
      switch(scenario.id) {
        case 'scenario-career':
          // Career advancement: Higher income, moderate expenses, reduced liabilities
          assetMultiplier = 2.5;
          liabilityMultiplier = 0.6;
          incomeMultiplier = 1.9;
          expenseMultiplier = 1.25;
          yearsProjection = 5;
          spendingCategoryAdjustments = {
            'Education': 1.5,    // Increase education spending
            'Housing': 1.2,      // Slightly higher housing cost
            'Entertainment': 1.3, // More entertainment
            'Savings': 2.0       // Much higher savings
          };
          scenario.description = createCareerDescription(financialData, incomeMultiplier);
          break;
          
        case 'scenario-entrepreneur':
          // Entrepreneurship: Much higher assets/income but initially more liabilities
          assetMultiplier = 3.8;
          liabilityMultiplier = 1.0;
          incomeMultiplier = 2.4;
          expenseMultiplier = 1.4;
          yearsProjection = 7;
          spendingCategoryAdjustments = {
            'Business': 3.0,      // New business expenses
            'Housing': 1.2,       // Similar housing
            'Entertainment': 0.8, // Less entertainment initially
            'Savings': 1.5        // Good savings
          };
          scenario.description = createEntrepreneurDescription(financialData, incomeMultiplier);
          break;
          
        case 'scenario-remote':
          // Remote work: Moderate asset growth, reduced expenses due to geographic arbitrage
          assetMultiplier = 1.8;
          liabilityMultiplier = 0.5;
          incomeMultiplier = 1.4;
          expenseMultiplier = 0.7; // Much lower expenses
          yearsProjection = 3;
          spendingCategoryAdjustments = {
            'Housing': 0.5,       // Much lower housing cost
            'Food': 0.7,          // Lower food costs
            'Transportation': 0.5, // Lower transportation
            'Travel': 2.0,        // Much higher travel
            'Utilities': 0.6,     // Lower utilities
            'Savings': 2.0        // Much higher savings
          };
          scenario.description = createRemoteWorkDescription(financialData, expenseMultiplier);
          break;
      }
      
      // Calculate projected financial values
      const projectedAssets = Math.round(assets.totalAssets * assetMultiplier);
      const projectedLiabilities = Math.round(liabilities.totalLiabilities * liabilityMultiplier);
      const projectedNetWorth = projectedAssets - projectedLiabilities;
      const projectedMonthlyIncome = Math.round(income.totalIncome * incomeMultiplier);
      const projectedMonthlyExpenses = Math.round(expenses.totalExpenses * expenseMultiplier);
      
      // Create projected spending categories
      const projectedSpendingCategories = createProjectedSpendingCategories(
        spendingCategories, 
        spendingCategoryAdjustments,
        projectedMonthlyExpenses
      );
      
      return {
        ...scenario,
        financialData: {
          totalAssets: projectedAssets,
          totalLiabilities: projectedLiabilities,
          netWorth: projectedNetWorth,
          monthlyIncome: projectedMonthlyIncome,
          monthlyExpenses: projectedMonthlyExpenses
        },
        spendingCategories: projectedSpendingCategories,
        damTitle: `Projected Financial State (${yearsProjection} Years)`
      };
    });
  }
  
  // Create projected spending categories based on original data and adjustments
  function createProjectedSpendingCategories(originalCategories, adjustments, totalProjectedExpenses) {
    // Default categories if no original data exists
    const defaultCategories = [
      { name: 'Housing', amount: totalProjectedExpenses * 0.35, color: 'rgba(255, 128, 66, 0.8)' },
      { name: 'Food', amount: totalProjectedExpenses * 0.15, color: 'rgba(255, 187, 40, 0.8)' },
      { name: 'Transportation', amount: totalProjectedExpenses * 0.08, color: 'rgba(136, 132, 216, 0.8)' },
      { name: 'Utilities', amount: totalProjectedExpenses * 0.07, color: 'rgba(0, 196, 159, 0.8)' },
      { name: 'Entertainment', amount: totalProjectedExpenses * 0.10, color: 'rgba(238, 82, 83, 0.8)' },
      { name: 'Savings', amount: totalProjectedExpenses * 0.15, color: 'rgba(72, 52, 212, 0.8)' },
      { name: 'Other', amount: totalProjectedExpenses * 0.10, color: 'rgba(0, 136, 254, 0.8)' }
    ];
    
    // If we have original categories, adjust them
    let result = [];
    if (originalCategories && originalCategories.length > 0) {
      // Start with copying original categories
      result = originalCategories.map(category => ({
        ...category,
        amount: Math.round(category.amount * (adjustments[category.name] || 1.0))
      }));
      
      // Add any missing categories from adjustments
      Object.keys(adjustments).forEach(categoryName => {
        if (!result.some(cat => cat.name === categoryName)) {
          // Find a default color for this category
          const defaultCategory = defaultCategories.find(c => c.name === categoryName) || 
                                 { color: 'rgba(0, 136, 254, 0.8)' };
          
          // Add the new category
          result.push({
            name: categoryName,
            amount: Math.round(totalProjectedExpenses * 0.10 * adjustments[categoryName]),
            color: defaultCategory.color
          });
        }
      });
    } else {
      // Use default categories with adjustments
      result = defaultCategories.map(category => ({
        ...category,
        amount: Math.round(category.amount * (adjustments[category.name] || 1.0))
      }));
    }
    
    // Calculate total after adjustments
    const totalAmount = result.reduce((sum, cat) => sum + cat.amount, 0);
    
    // Normalize to ensure total matches projected expenses
    const normalizedResult = result.map(category => {
      const normalizedAmount = Math.round((category.amount / totalAmount) * totalProjectedExpenses);
      return {
        ...category,
        amount: normalizedAmount,
        percentage: ((normalizedAmount / totalProjectedExpenses) * 100).toFixed(1)
      };
    });
    
    return normalizedResult;
  }
  
  // Create descriptions for each scenario
  function createCareerDescription(financialData, incomeMultiplier) {
    const projectedIncome = Math.round(financialData.income.totalIncome * incomeMultiplier);
    const annualIncome = projectedIncome * 12;
    
    return `
      <p>This scenario involves advancing in your career path over the next 5 years, with a focus on professional growth, skill development, and income expansion.</p>
      
      <p><strong>Years 1-2:</strong></p>
      <ul>
        <li>Invest in professional development and certifications relevant to your field</li>
        <li>Actively pursue promotions or higher-paying positions</li>
        <li>Build your professional network through industry events and connections</li>
        <li>Increase retirement contributions as your income grows</li>
      </ul>
      
      <p><strong>Years 3-5:</strong></p>
      <ul>
        <li>Reach a target income of approximately $${Math.round(annualIncome/1000)}k per year</li>
        <li>Accelerate debt repayment with your increased income</li>
        <li>Maximize employer benefits and retirement matching</li>
        <li>Build a robust emergency fund covering 6 months of expenses</li>
        <li>Start diversifying investments beyond retirement accounts</li>
      </ul>
      
      <p>This approach provides a steady, reliable progression toward your financial goals while maintaining work-life balance and job security.</p>
    `;
  }
  
  function createEntrepreneurDescription(financialData, incomeMultiplier) {
    const projectedIncome = Math.round(financialData.income.totalIncome * incomeMultiplier);
    const annualIncome = projectedIncome * 12;
    
    return `
      <p>This scenario involves transitioning to entrepreneurship over a 7-year period, building a business aligned with your skills and interests.</p>
      
      <p><strong>Years 1-2: Planning & Foundation</strong></p>
      <ul>
        <li>Maintain your current job while developing your business plan</li>
        <li>Build skills necessary for your business venture</li>
        <li>Save 25-30% of your income for startup costs</li>
        <li>Begin testing your business concept with minimal investment</li>
      </ul>
      
      <p><strong>Years 3-5: Launch & Growth</strong></p>
      <ul>
        <li>Transition to part-time employment or full entrepreneurship</li>
        <li>Focus on customer acquisition and business development</li>
        <li>Reinvest profits to accelerate growth</li>
        <li>Create systems to maximize efficiency and scalability</li>
      </ul>
      
      <p><strong>Years 6-7: Maturity & Optimization</strong></p>
      <ul>
        <li>Reach a target income of approximately $${Math.round(annualIncome/1000)}k annually</li>
        <li>Build a team or systems that reduce your direct involvement</li>
        <li>Focus on high-value activities that leverage your unique skills</li>
        <li>Create multiple revenue streams within your business</li>
      </ul>
      
      <p>This path offers the greatest long-term income potential and lifestyle flexibility, though with higher initial risk and workload.</p>
    `;
  }
  
  function createRemoteWorkDescription(financialData, expenseMultiplier) {
    const projectedExpenses = Math.round(financialData.expenses.totalExpenses * expenseMultiplier);
    const savings = financialData.income.totalIncome - projectedExpenses;
    const savingsRate = Math.round((savings / financialData.income.totalIncome) * 100);
    
    return `
      <p>This scenario leverages geographic arbitrage and remote work to dramatically reduce your living expenses while maintaining your income, creating a location-independent lifestyle.</p>
      
      <p><strong>Year 1: Remote Transition</strong></p>
      <ul>
        <li>Negotiate remote work with your current employer or find a remote position</li>
        <li>Develop digital skills that support location independence</li>
        <li>Research lower cost-of-living locations that match your lifestyle preferences</li>
        <li>Build a 6-month emergency fund as safety net</li>
      </ul>
      
      <p><strong>Year 2: Relocation & Optimization</strong></p>
      <ul>
        <li>Relocate to an area with 30-50% lower cost of living</li>
        <li>Maintain your current income while reducing expenses</li>
        <li>Achieve a savings rate of approximately ${savingsRate}%</li>
        <li>Create tax-optimized financial structures for expatriate living</li>
      </ul>
      
      <p><strong>Year 3: Lifestyle Enhancement</strong></p>
      <ul>
        <li>Establish a sustainable remote work routine</li>
        <li>Explore multiple "home bases" for varied experiences</li>
        <li>Begin building passive income through investments</li>
        <li>Potentially reduce work hours while maintaining financial goals</li>
      </ul>
      
      <p>This approach allows you to maintain your career while dramatically improving your financial position and creating the freedom to live where you prefer.</p>
    `;
  }

  // Save a new future scenario
  async function saveFutureScenario(scenarioData) {
    setLoading(true);
    try {
      const newScenario = {
        id: `scenario-${Date.now()}`,
        createdAt: new Date(),
        ...scenarioData
      };
      
      // Update local state
      setFutureScenarios(prev => [...prev, newScenario]);
      
      // Save to localStorage
      const savedScenarios = JSON.parse(localStorage.getItem('futureScenarios') || '[]');
      savedScenarios.push(newScenario);
      localStorage.setItem('futureScenarios', JSON.stringify(savedScenarios));
      
      // Save to Firestore if online
      const sessionId = localStorage.getItem('sessionId') || `session-${Date.now()}`;
      localStorage.setItem('sessionId', sessionId);
      
      // Add to a subcollection of scenarios for the anonymous user
      const scenarioRef = doc(collection(db, 'anonymousData', sessionId, 'scenarios'));
      await setDoc(scenarioRef, newScenario);
      
      return true;
    } catch (err) {
      console.error('Error saving future scenario:', err);
      setError('Failed to save future scenario');
      return false;
    } finally {
      setLoading(false);
    }
  }

  const value = {
    userFinancialData,
    futureScenarios,
    dreamLifeText,
    loading,
    setLoading, // Add setLoading to the context value
    error,
    setError, // Add setError to the context value
    saveQuestionnaireData,
    saveDreamLifeText,
    saveFutureScenario
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}