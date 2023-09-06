import React, { createContext, useContext, useState } from 'react';
import mockData from '../mock-data.json';  // adjust the path as needed

type TransactionContextType = {
  transactions: typeof mockData.transactions;
  setTransactionApproval: (transactionId: string, approved: boolean) => void;
};

type TransactionProviderProps = {
    children: React.ReactNode;
  };

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState(mockData.transactions);

  const setTransactionApproval = (transactionId: string, approved: boolean) => {
    setTransactions((prevTransactions) => {
      return prevTransactions.map((transaction) => {
        if (transaction.id === transactionId) {
          return { ...transaction, approved };
        }
        return transaction;
      });
    });
  };

  return (
    <TransactionContext.Provider value={{ transactions, setTransactionApproval }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
