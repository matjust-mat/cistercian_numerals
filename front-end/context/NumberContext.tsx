// context/NumberContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';

interface NumberContextProps {
  inputValue: string | '';
  setInputValue: (value: string | '') => void;
  fetchedValue: number | null;
  setFetchedValue: (value: number | null) => void;
  isLoadingNumber: boolean;
  setIsLoadingNumber: (value: boolean) => void;
}

const NumberContext = createContext<NumberContextProps | undefined>(undefined);

export const NumberProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputValue, setInputValue] = useState<string | ''>('');
  const [fetchedValue, setFetchedValue] = useState<number | null>(null);
  const [isLoadingNumber, setIsLoadingNumber] = useState<boolean>(false);

  return (
    <NumberContext.Provider
      value={{
        inputValue,
        setInputValue,
        fetchedValue,
        setFetchedValue,
        isLoadingNumber,
        setIsLoadingNumber,
      }}
    >
      {children}
    </NumberContext.Provider>
  );
};

export const useNumberContext = () => {
  const context = useContext(NumberContext);
  if (!context) {
    throw new Error('useNumberContext must be used within a NumberProvider');
  }
  return context;
};