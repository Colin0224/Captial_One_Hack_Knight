import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  min-height: 60vh;
  padding: 2rem;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  margin: 0;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  
  @media (max-width: 768px) {
    font-size: 6rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: var(--text-dim);
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const WaterDropIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Button = styled(Link)`
  display: inline-block;
  background: var(--primary-color);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: var(--secondary-color);
    transform: translateY(-3px);
    text-decoration: none;
  }
`;

const NotFoundPage = () => {
  return (
    <Container>
      <WaterDropIcon>💧</WaterDropIcon>
      <ErrorCode>404</ErrorCode>
      <Title>Dam, Page Not Found</Title>
      <Description>
        The page you're looking for seems to have dried up or doesn't exist.
        Let's navigate back to safer waters.
      </Description>
      <Button to="/">Return to Home</Button>
    </Container>
  );
};

export default NotFoundPage;