import React, { useState } from 'react';
import styled from 'styled-components';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

const FormContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: var(--text-light);
  font-size: 1.3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-light);
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.8rem;
  color: var(--text-light);
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 112, 240, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const TextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 0.8rem;
  color: var(--text-light);
  font-size: 1rem;
  transition: all 0.3s ease;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 112, 240, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Button = styled.button`
  background: ${props => props.primary ? 'var(--primary-color)' : 'transparent'};
  color: var(--text-light);
  border: ${props => props.primary ? 'none' : '1px solid var(--primary-color)'};
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.primary ? 'var(--secondary-color)' : 'rgba(0, 112, 240, 0.1)'};
    transform: translateY(-2px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.div`
  color: #51cf66;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
  padding: 1rem;
  background: rgba(81, 207, 102, 0.1);
  border-radius: 8px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-bottom: 2rem;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background: var(--primary-color);
  width: ${props => props.value}%;
  transition: width 0.5s ease;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Step = styled.div`
  flex: 1;
  text-align: center;
  position: relative;
  
  &:not(:last-child):after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: 100%;
    height: 1px;
    background: rgba(255, 255, 255, 0.1);
    z-index: -1;
  }
`;

const StepNumber = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${props => props.active ? 'var(--primary-color)' : 'rgba(255, 255, 255, 0.1)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-light);
  margin: 0 auto;
  font-weight: bold;
  transition: all 0.3s ease;
`;

const StepLabel = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: ${props => props.active ? 'var(--text-light)' : 'var(--text-dim)'};
`;

const QuestionnaireForm = () => {
  const { saveQuestionnaireData, saveDreamLifeText, loading, error } = useData();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    email: '',
    age: '',
    
    // Income
    monthlyIncome: '',
    otherIncome: '',
    
    // Expenses
    housing: '',
    utilities: '',
    food: '',
    transportation: '',
    healthcare: '',
    entertainment: '',
    otherExpenses: '',
    
    // Assets and Liabilities
    cashSavings: '',
    investments: '',
    realEstate: '',
    otherAssets: '',
    creditCardDebt: '',
    studentLoans: '',
    mortgages: '',
    otherDebts: '',
    
    // Future Goals
    shortTermGoals: '',
    longTermGoals: '',
    retirementPlans: '',
    
    // Dream Life Text
    dreamLifeText: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    // Allow only numbers, commas, periods, and empty string
    if (/^[0-9,.]*$/.test(value)) {
      const numericValue = value.replace(/[^0-9.]/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    }
  };
  
  const calculateTotals = () => {
    // Parse all financial values to floats for calculation
    const monthlyIncome = parseFloat(formData.monthlyIncome) || 0;
    const otherIncome = parseFloat(formData.otherIncome) || 0;
    
    const housing = parseFloat(formData.housing) || 0;
    const utilities = parseFloat(formData.utilities) || 0;
    const food = parseFloat(formData.food) || 0;
    const transportation = parseFloat(formData.transportation) || 0;
    const healthcare = parseFloat(formData.healthcare) || 0;
    const entertainment = parseFloat(formData.entertainment) || 0;
    const otherExpenses = parseFloat(formData.otherExpenses) || 0;
    
    const cashSavings = parseFloat(formData.cashSavings) || 0;
    const investments = parseFloat(formData.investments) || 0;
    const realEstate = parseFloat(formData.realEstate) || 0;
    const otherAssets = parseFloat(formData.otherAssets) || 0;
    
    const creditCardDebt = parseFloat(formData.creditCardDebt) || 0;
    const studentLoans = parseFloat(formData.studentLoans) || 0;
    const mortgages = parseFloat(formData.mortgages) || 0;
    const otherDebts = parseFloat(formData.otherDebts) || 0;
    
    // Calculate totals
    const totalMonthlyIncome = monthlyIncome + otherIncome;
    
    const totalMonthlyExpenses = housing + utilities + food + 
      transportation + healthcare + entertainment + otherExpenses;
    
    const totalAssets = cashSavings + investments + realEstate + otherAssets;
    
    const totalLiabilities = creditCardDebt + studentLoans + mortgages + otherDebts;
    
    const netWorth = totalAssets - totalLiabilities;
    
    const monthlyCashFlow = totalMonthlyIncome - totalMonthlyExpenses;
    
    // Create spending categories
    const spendingCategories = [
      { name: 'Housing', amount: housing, percentage: housing / totalMonthlyExpenses * 100, color: 'rgba(255, 128, 66, 0.8)' },
      { name: 'Utilities', amount: utilities, percentage: utilities / totalMonthlyExpenses * 100, color: 'rgba(255, 187, 40, 0.8)' },
      { name: 'Food', amount: food, percentage: food / totalMonthlyExpenses * 100, color: 'rgba(136, 132, 216, 0.8)' },
      { name: 'Transportation', amount: transportation, percentage: transportation / totalMonthlyExpenses * 100, color: 'rgba(0, 136, 254, 0.8)' },
      { name: 'Healthcare', amount: healthcare, percentage: healthcare / totalMonthlyExpenses * 100, color: 'rgba(0, 196, 159, 0.8)' },
      { name: 'Entertainment', amount: entertainment, percentage: entertainment / totalMonthlyExpenses * 100, color: 'rgba(238, 82, 83, 0.8)' },
      { name: 'Other', amount: otherExpenses, percentage: otherExpenses / totalMonthlyExpenses * 100, color: 'rgba(72, 52, 212, 0.8)' }
    ];
    
    return {
      totalMonthlyIncome,
      totalMonthlyExpenses,
      totalAssets,
      totalLiabilities,
      netWorth,
      monthlyCashFlow,
      spendingCategories
    };
  };
  
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const formatCurrency = (value) => {
    if (!value) return '';
    return `$${parseFloat(value).toLocaleString()}`;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Calculate all the financial totals and metrics
    const financialTotals = calculateTotals();
    
    // Create the financial data object to be saved
    const financialData = {
      personalInfo: {
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age) || 0
      },
      
      income: {
        monthlyIncome: parseFloat(formData.monthlyIncome) || 0,
        otherIncome: parseFloat(formData.otherIncome) || 0,
        totalIncome: financialTotals.totalMonthlyIncome
      },
      
      expenses: {
        housing: parseFloat(formData.housing) || 0,
        utilities: parseFloat(formData.utilities) || 0,
        food: parseFloat(formData.food) || 0,
        transportation: parseFloat(formData.transportation) || 0,
        healthcare: parseFloat(formData.healthcare) || 0,
        entertainment: parseFloat(formData.entertainment) || 0,
        otherExpenses: parseFloat(formData.otherExpenses) || 0,
        totalExpenses: financialTotals.totalMonthlyExpenses
      },
      
      assets: {
        cashSavings: parseFloat(formData.cashSavings) || 0,
        investments: parseFloat(formData.investments) || 0,
        realEstate: parseFloat(formData.realEstate) || 0,
        otherAssets: parseFloat(formData.otherAssets) || 0,
        totalAssets: financialTotals.totalAssets
      },
      
      liabilities: {
        creditCardDebt: parseFloat(formData.creditCardDebt) || 0,
        studentLoans: parseFloat(formData.studentLoans) || 0,
        mortgages: parseFloat(formData.mortgages) || 0,
        otherDebts: parseFloat(formData.otherDebts) || 0,
        totalLiabilities: financialTotals.totalLiabilities
      },
      
      goals: {
        shortTermGoals: formData.shortTermGoals,
        longTermGoals: formData.longTermGoals,
        retirementPlans: formData.retirementPlans
      },
      
      // Calculated metrics
      netWorth: financialTotals.netWorth,
      monthlyCashFlow: financialTotals.monthlyCashFlow,
      debtToIncomeRatio: financialTotals.totalLiabilities / 
        (financialTotals.totalMonthlyIncome * 12) * 100,
      
      // Spending categories for visualization
      spendingCategories: financialTotals.spendingCategories,
      
      // Add the creation timestamp
      createdAt: new Date()
    };
    
    try {
      // Save the questionnaire data
      await saveQuestionnaireData(financialData);
      
      // Save the dream life text separately
      if (formData.dreamLifeText) {
        await saveDreamLifeText(formData.dreamLifeText);
      }
      
      setSuccessMessage('Your financial data has been saved successfully!');
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (err) {
      console.error('Error saving data:', err);
    }
  };
  
  // Calculate progress percentage
  const progress = (currentStep / 5) * 100;
  
  return (
    <FormContainer>
      <StepIndicator>
        <Step>
          <StepNumber active={currentStep >= 1}>1</StepNumber>
          <StepLabel active={currentStep >= 1}>Basic Info</StepLabel>
        </Step>
        <Step>
          <StepNumber active={currentStep >= 2}>2</StepNumber>
          <StepLabel active={currentStep >= 2}>Income & Expenses</StepLabel>
        </Step>
        <Step>
          <StepNumber active={currentStep >= 3}>3</StepNumber>
          <StepLabel active={currentStep >= 3}>Assets & Debts</StepLabel>
        </Step>
        <Step>
          <StepNumber active={currentStep >= 4}>4</StepNumber>
          <StepLabel active={currentStep >= 4}>Goals</StepLabel>
        </Step>
        <Step>
          <StepNumber active={currentStep >= 5}>5</StepNumber>
          <StepLabel active={currentStep >= 5}>Dream Life</StepLabel>
        </Step>
      </StepIndicator>
      
      <ProgressBar>
        <Progress value={progress} />
      </ProgressBar>
      
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Form onSubmit={handleSubmit}>
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <FormSection>
            <SectionTitle>Personal Information</SectionTitle>
            <FormGroup>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="email">Email Address</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="age">Age</Label>
              <Input 
                type="number" 
                id="age" 
                name="age" 
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter your age"
                min="18"
                max="120"
                required
              />
            </FormGroup>
          </FormSection>
        )}
        
        {/* Step 2: Income and Expenses */}
        {currentStep === 2 && (
          <FormSection>
            <SectionTitle>Income and Expenses</SectionTitle>
            
            <FormGroup>
              <Label htmlFor="monthlyIncome">Monthly Income (after taxes)</Label>
              <Input 
                type="text" 
                id="monthlyIncome" 
                name="monthlyIncome" 
                value={formData.monthlyIncome}
                onChange={handleNumberChange}
                placeholder="e.g. 5000"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="otherIncome">Other Monthly Income</Label>
              <Input 
                type="text" 
                id="otherIncome" 
                name="otherIncome" 
                value={formData.otherIncome}
                onChange={handleNumberChange}
                placeholder="e.g. 1000"
              />
            </FormGroup>
            
            <SectionTitle>Monthly Expenses</SectionTitle>
            
            <FormGroup>
              <Label htmlFor="housing">Housing (rent/mortgage)</Label>
              <Input 
                type="text" 
                id="housing" 
                name="housing" 
                value={formData.housing}
                onChange={handleNumberChange}
                placeholder="e.g. 1500"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="utilities">Utilities (water, electricity, internet)</Label>
              <Input 
                type="text" 
                id="utilities" 
                name="utilities" 
                value={formData.utilities}
                onChange={handleNumberChange}
                placeholder="e.g. 300"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="food">Food (groceries, dining out)</Label>
              <Input 
                type="text" 
                id="food" 
                name="food" 
                value={formData.food}
                onChange={handleNumberChange}
                placeholder="e.g. 600"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="transportation">Transportation</Label>
              <Input 
                type="text" 
                id="transportation" 
                name="transportation" 
                value={formData.transportation}
                onChange={handleNumberChange}
                placeholder="e.g. 400"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="healthcare">Healthcare</Label>
              <Input 
                type="text" 
                id="healthcare" 
                name="healthcare" 
                value={formData.healthcare}
                onChange={handleNumberChange}
                placeholder="e.g. 200"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="entertainment">Entertainment</Label>
              <Input 
                type="text" 
                id="entertainment" 
                name="entertainment" 
                value={formData.entertainment}
                onChange={handleNumberChange}
                placeholder="e.g. 300"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="otherExpenses">Other Expenses</Label>
              <Input 
                type="text" 
                id="otherExpenses" 
                name="otherExpenses" 
                value={formData.otherExpenses}
                onChange={handleNumberChange}
                placeholder="e.g. 400"
                required
              />
            </FormGroup>
          </FormSection>
        )}
        
        {/* Step 3: Assets and Liabilities */}
        {currentStep === 3 && (
          <FormSection>
            <SectionTitle>Assets</SectionTitle>
            
            <FormGroup>
              <Label htmlFor="cashSavings">Cash and Savings</Label>
              <Input 
                type="text" 
                id="cashSavings" 
                name="cashSavings" 
                value={formData.cashSavings}
                onChange={handleNumberChange}
                placeholder="e.g. 15000"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="investments">Investments (stocks, bonds, etc.)</Label>
              <Input 
                type="text" 
                id="investments" 
                name="investments" 
                value={formData.investments}
                onChange={handleNumberChange}
                placeholder="e.g. 50000"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="realEstate">Real Estate Value</Label>
              <Input 
                type="text" 
                id="realEstate" 
                name="realEstate" 
                value={formData.realEstate}
                onChange={handleNumberChange}
                placeholder="e.g. 300000"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="otherAssets">Other Assets</Label>
              <Input 
                type="text" 
                id="otherAssets" 
                name="otherAssets" 
                value={formData.otherAssets}
                onChange={handleNumberChange}
                placeholder="e.g. 20000"
              />
            </FormGroup>
            
            <SectionTitle>Liabilities (Debts)</SectionTitle>
            
            <FormGroup>
              <Label htmlFor="creditCardDebt">Credit Card Debt</Label>
              <Input 
                type="text" 
                id="creditCardDebt" 
                name="creditCardDebt" 
                value={formData.creditCardDebt}
                onChange={handleNumberChange}
                placeholder="e.g. 5000"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="studentLoans">Student Loans</Label>
              <Input 
                type="text" 
                id="studentLoans" 
                name="studentLoans" 
                value={formData.studentLoans}
                onChange={handleNumberChange}
                placeholder="e.g. 30000"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="mortgages">Mortgage Balance</Label>
              <Input 
                type="text" 
                id="mortgages" 
                name="mortgages" 
                value={formData.mortgages}
                onChange={handleNumberChange}
                placeholder="e.g. 250000"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="otherDebts">Other Debts</Label>
              <Input 
                type="text" 
                id="otherDebts" 
                name="otherDebts" 
                value={formData.otherDebts}
                onChange={handleNumberChange}
                placeholder="e.g. 10000"
              />
            </FormGroup>
          </FormSection>
        )}
        
        {/* Step 4: Financial Goals */}
        {currentStep === 4 && (
          <FormSection>
            <SectionTitle>Financial Goals</SectionTitle>
            
            <FormGroup>
              <Label htmlFor="shortTermGoals">Short-Term Goals (1-2 years)</Label>
              <TextArea 
                id="shortTermGoals" 
                name="shortTermGoals" 
                value={formData.shortTermGoals}
                onChange={handleChange}
                placeholder="What are your financial goals for the next 1-2 years?"
                rows={4}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="longTermGoals">Long-Term Goals (3-10 years)</Label>
              <TextArea 
                id="longTermGoals" 
                name="longTermGoals" 
                value={formData.longTermGoals}
                onChange={handleChange}
                placeholder="What are your financial goals for the next 3-10 years?"
                rows={4}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="retirementPlans">Retirement Plans</Label>
              <TextArea 
                id="retirementPlans" 
                name="retirementPlans" 
                value={formData.retirementPlans}
                onChange={handleChange}
                placeholder="What are your retirement goals and timeline?"
                rows={4}
              />
            </FormGroup>
          </FormSection>
        )}
        
        {/* Step 5: Dream Life */}
        {currentStep === 5 && (
          <FormSection>
            <SectionTitle>Dream Life Description</SectionTitle>
            <p>Describe your ideal life in as much detail as possible. What would your perfect day look like? Where would you live? What work would you do? How would you spend your time? What would your relationships be like?</p>
            
            <FormGroup>
              <TextArea 
                id="dreamLifeText" 
                name="dreamLifeText" 
                value={formData.dreamLifeText}
                onChange={handleChange}
                placeholder="Describe your dream life in detail..."
                rows={10}
                required
              />
            </FormGroup>
          </FormSection>
        )}
        
        <ButtonGroup>
          {currentStep > 1 && (
            <Button type="button" onClick={prevStep}>
              Previous
            </Button>
          )}
          
          {currentStep < 5 ? (
            <Button type="button" primary onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button type="submit" primary disabled={loading}>
              {loading ? 'Saving...' : 'Submit'}
            </Button>
          )}
        </ButtonGroup>
      </Form>
    </FormContainer>
  );
};

export default QuestionnaireForm;