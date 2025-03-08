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
      const storedScenarios = localStorage.getItem('futureScenarios');
      
      if (storedData) {
        setUserFinancialData(JSON.parse(storedData));
      }
      
      if (storedDreamText) {
        setDreamLifeText(storedDreamText);
      }
      
      if (storedScenarios) {
        setFutureScenarios(JSON.parse(storedScenarios));
      }
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
    setLoading(true);
    try {
      setDreamLifeText(text);
      
      // Save to localStorage
      localStorage.setItem('dreamLifeText', text);
      
      // Save to Firestore if online
      const sessionId = localStorage.getItem('sessionId') || `session-${Date.now()}`;
      localStorage.setItem('sessionId', sessionId);
      
      await setDoc(doc(db, 'anonymousData', sessionId), {
        dreamLifeText: text,
        timestamp: new Date()
      }, { merge: true });
      
      // Generate scenarios using the user's financial data and dream life text
      if (userFinancialData) {
        try {
          const result = await generateScenarios({ 
            financialData: userFinancialData,
            dreamLifeText: text 
          });
          
          if (result.data && result.data.scenarios) {
            setFutureScenarios(result.data.scenarios);
            localStorage.setItem('futureScenarios', JSON.stringify(result.data.scenarios));
          }
        } catch (fnError) {
          console.error('Error generating scenarios:', fnError);
          // If cloud function fails, use mock scenarios
          // Set mock scenarios will be handled by the FutureScenarioPage component
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
    error,
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