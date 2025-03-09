import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useData } from '../../context/DataContext';

const NavContainer = styled.nav`
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-weight: bold;
  font-size: 1.5rem;
  color: var(--text-light);
  text-decoration: none;
  display: flex;
  align-items: center;
  
  &:hover {
    text-decoration: none;
  }
`;

const LogoIcon = styled.span`
  margin-right: 0.5rem;
  color: var(--primary-color);
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.9);
    padding: 1rem;
    z-index: 10;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-light);
  text-decoration: none;
  margin-left: 2rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
    text-decoration: none;
  }
  
  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: var(--text-light);
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userFinancialData } = useData();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavContainer>
      <NavContent>
        <Logo to="/questionnaire">
          <LogoIcon>💧</LogoIcon>
          Financial Dam
        </Logo>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'}
        </MobileMenuButton>
        
        <NavLinks isOpen={isOpen}>
          <NavLink to="/questionnaire">Questionnaire</NavLink>
          {userFinancialData && (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/future-scenarios">Future Scenarios</NavLink>
            </>
          )}
        </NavLinks>
      </NavContent>
    </NavContainer>
  );
};

export default Navbar;