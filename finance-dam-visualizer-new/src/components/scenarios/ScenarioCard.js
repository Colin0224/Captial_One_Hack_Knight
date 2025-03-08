import React from 'react';
import styled from 'styled-components';
import DamVisualization from '../visualizations/DamVisualization';

const Card = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  color: var(--text-light);
  font-size: 1.5rem;
  text-align: center;
`;

const Subtitle = styled.div`
  color: var(--text-dim);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Description = styled.div`
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  line-height: 1.6;
  
  p {
    margin-bottom: 1rem;
  }
  
  ul {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
`;

const ScenarioTag = styled.span`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background: ${props => props.color || 'rgba(0, 112, 240, 0.2)'};
  color: white;
  border-radius: 20px;
  font-size: 0.85rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TagContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
`;

const ScenarioCard = ({ 
  title,
  subtitle,
  tags = [],
  financialData,
  description,
  damTitle
}) => {
  // Generate tag colors based on content
  const getTagColor = (tagName) => {
    const colors = {
      Career: 'rgba(0, 196, 159, 0.7)',
      Finance: 'rgba(0, 112, 240, 0.7)',
      Investment: 'rgba(255, 187, 40, 0.7)',
      Education: 'rgba(136, 132, 216, 0.7)',
      Lifestyle: 'rgba(238, 82, 83, 0.7)',
      Entrepreneurship: 'rgba(72, 52, 212, 0.7)',
      Travel: 'rgba(255, 128, 66, 0.7)',
      Retirement: 'rgba(0, 136, 254, 0.7)',
      default: 'rgba(100, 100, 100, 0.7)'
    };
    
    return colors[tagName] || colors.default;
  };
  
  return (
    <Card>
      <Title>{title}</Title>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      
      {tags.length > 0 && (
        <TagContainer>
          {tags.map((tag, index) => (
            <ScenarioTag key={index} color={getTagColor(tag)}>
              {tag}
            </ScenarioTag>
          ))}
        </TagContainer>
      )}
      
      <DamVisualization 
        title={damTitle || "Financial Projection"} 
        description="This visualization shows the projected financial state for this scenario"
        financialData={financialData}
        height={250}
      />
      
      {description && (
        <Description>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </Description>
      )}
    </Card>
  );
};

export default ScenarioCard;