import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeroSection = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  
  @media (min-width: 768px) {
    padding: 6rem 2rem;
  }
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-dim);
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  margin-top: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 112, 240, 0.3);
  
  &:hover {
    background: var(--secondary-color);
    transform: translateY(-3px);
    box-shadow: 0 6px 25px rgba(0, 112, 240, 0.4);
    text-decoration: none;
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  background: transparent;
  color: var(--text-light);
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 500;
  text-decoration: none;
  margin-top: 1rem;
  margin-left: 1rem;
  transition: all 0.3s ease;
  border: 1px solid var(--primary-color);
  
  &:hover {
    background: rgba(0, 112, 240, 0.1);
    transform: translateY(-3px);
    text-decoration: none;
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

const FeaturesSection = styled.div`
  padding: 4rem 2rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  margin: 2rem auto;
  max-width: 1200px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2rem;
  color: var(--text-light);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 16px;
  backdrop-filter: blur(5px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const FeatureTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.3rem;
`;

const FeatureDescription = styled.p`
  color: var(--text-dim);
  line-height: 1.6;
`;

const HowItWorksSection = styled.div`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const StepsContainer = styled.div`
  margin-top: 3rem;
`;

const Step = styled.div`
  display: flex;
  margin-bottom: 3rem;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const StepNumber = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  margin-right: 2rem;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
`;

const StepDescription = styled.p`
  color: var(--text-dim);
  line-height: 1.6;
`;

const HomePage = () => {
  return (
    <div className="container">
      <HeroSection>
        <HeroTitle>Visualize Your Financial Future</HeroTitle>
        <HeroSubtitle>
          Transform your financial data into interactive water dam visualizations. 
          See how your income and expenses flow, and explore different scenarios for your dream life.
        </HeroSubtitle>
        <CTAButton to="/questionnaire">Get Started</CTAButton>
        <SecondaryButton to="/dashboard">See Demo</SecondaryButton>
      </HeroSection>
      
      <FeaturesSection>
        <SectionTitle>Key Features</SectionTitle>
        <FeaturesGrid>
          <FeatureCard>
            <FeatureIcon>💧</FeatureIcon>
            <FeatureTitle>Visual Financial Dashboard</FeatureTitle>
            <FeatureDescription>
              See your finances as an intuitive water dam. Watch how income flows in as rain and expenses flow out as streams.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔮</FeatureIcon>
            <FeatureTitle>Future Scenario Planning</FeatureTitle>
            <FeatureDescription>
              Describe your dream life and get multiple financial scenarios with different career trajectories to achieve it.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📊</FeatureIcon>
            <FeatureTitle>Spending Breakdown</FeatureTitle>
            <FeatureDescription>
              Visualize your expenses by category to identify where your money is going and opportunities to save.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>📈</FeatureIcon>
            <FeatureTitle>Progress Tracking</FeatureTitle>
            <FeatureDescription>
              Monitor changes in your financial dam level over time to see how you're progressing toward your goals.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>💡</FeatureIcon>
            <FeatureTitle>AI-Powered Insights</FeatureTitle>
            <FeatureDescription>
              Receive personalized financial insights and recommendations based on your data and goals.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>Secure & Private</FeatureTitle>
            <FeatureDescription>
              Your financial data is encrypted and securely stored. We never share your information with third parties.
            </FeatureDescription>
          </FeatureCard>
        </FeaturesGrid>
      </FeaturesSection>
      
      <HowItWorksSection>
        <SectionTitle>How It Works</SectionTitle>
        <StepsContainer>
          <Step>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Enter Your Financial Information</StepTitle>
              <StepDescription>
                Fill out our simple questionnaire about your income, expenses, assets, and liabilities.
                All your data is kept secure and private.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>Describe Your Dream Life</StepTitle>
              <StepDescription>
                Tell us about the life you aspire to live. Where would you live? What would you do for work?
                How would you spend your time? Be as detailed as possible.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>View Your Financial Dam</StepTitle>
              <StepDescription>
                See your current financial state visualized as an interactive water dam.
                Watch how income flows in and expenses flow out in real time.
              </StepDescription>
            </StepContent>
          </Step>
          
          <Step>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>Explore Future Scenarios</StepTitle>
              <StepDescription>
                Browse through different career and financial scenarios that could help you achieve
                your dream life. Each scenario includes a projected financial dam and detailed steps.
              </StepDescription>
            </StepContent>
          </Step>
        </StepsContainer>
        
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <CTAButton to="/questionnaire">Start Your Journey Now</CTAButton>
        </div>
      </HowItWorksSection>
    </div>
  );
};

export default HomePage;