import React from 'react';
import styled from 'styled-components';
import QuestionnaireForm from '../components/questionnaire/QuestionnaireForm';

const PageContainer = styled.div`
  padding: 3rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    padding: 4rem 2rem;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--text-light);
`;

const Subtitle = styled.p`
  color: var(--text-dim);
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const InfoBox = styled.div`
  background: rgba(0, 112, 240, 0.1);
  border-left: 4px solid var(--primary-color);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 0.5rem;
    color: var(--text-dim);
  }
  
  ul {
    margin-left: 1.5rem;
    margin-top: 0.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
    color: var(--text-dim);
  }
`;

const QuestionnairePage = () => {
  return (
    <PageContainer>
      <PageHeader>
        <Title>Financial Questionnaire</Title>
        <Subtitle>
          Fill out this questionnaire to create your personalized financial dam visualization
          and explore scenarios to achieve your dream life.
        </Subtitle>
      </PageHeader>
      
      <InfoBox>
        <p><strong>Why we need this information:</strong></p>
        <p>This data helps us create a detailed visualization of your financial situation and provide meaningful insights.</p>
        <p><strong>What you'll need to provide:</strong></p>
        <ul>
          <li>Basic personal information</li>
          <li>Monthly income and expenses</li>
          <li>Assets and liabilities</li>
          <li>Financial goals</li>
          <li>A description of your dream life</li>
        </ul>
        <p><strong>Privacy:</strong> Your data is stored locally in your browser and not sent to any server.</p>
      </InfoBox>
      
      <QuestionnaireForm />
    </PageContainer>
  );
};

export default QuestionnairePage;