import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: rgba(0, 0, 0, 0.3);
  padding: 2rem;
  margin-top: 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const FooterSection = styled.div`
  flex: 1;
  min-width: 250px;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;

const FooterTitle = styled.h3`
  color: var(--text-light);
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled(Link)`
  display: block;
  color: var(--text-dim);
  margin-bottom: 0.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const FooterText = styled.p`
  color: var(--text-dim);
  line-height: 1.6;
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-dim);
  width: 100%;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Financial Dam</FooterTitle>
          <FooterText>
            Visualize your finances with interactive water dam simulations.
            Plan your future with intelligent financial forecasting.
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/questionnaire">Get Started</FooterLink>
          <FooterLink to="/dashboard">Dashboard</FooterLink>
          <FooterLink to="/future-scenarios">Future Scenarios</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>Support</FooterTitle>
          <FooterLink to="/">Help Center</FooterLink>
          <FooterLink to="/">Privacy Policy</FooterLink>
          <FooterLink to="/">Terms of Service</FooterLink>
          <FooterLink to="/">Contact Us</FooterLink>
        </FooterSection>
        
        <Copyright>
          &copy; {currentYear} Financial Dam. All rights reserved. Created for Capital One Hackathon.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;