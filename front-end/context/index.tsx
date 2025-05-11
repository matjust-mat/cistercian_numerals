'use client';

import React, { createContext, useContext, useState } from 'react';

interface FetchedImage {
  image_url: string;
  filename: string;
  message?: string;
}

interface FetchedNumber {
  number: number;
  message?: string;
}

interface ContextProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  fetchedImage: FetchedImage | null;
  setFetchedImage: (image: FetchedImage | null) => void;
  fetchedNumber: FetchedNumber | null;
  setFetchedNumber: (number: FetchedNumber | null) => void;
  resetStates: () => void;
}

const Context = createContext<ContextProps | undefined>(undefined);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchedImage, setFetchedImage] = useState<FetchedImage | null>(null);
  const [fetchedNumber, setFetchedNumber] = useState<FetchedNumber | null>(
    null
  );

  const resetStates = () => {
    setIsLoading(false);
    setFetchedImage(null);
    setFetchedNumber(null);
  };

  return (
    <Context.Provider
      value={{
        isLoading,
        setIsLoading,
        fetchedImage,
        setFetchedImage,
        fetchedNumber,
        setFetchedNumber,
        resetStates,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error('useAppContext must be used within a ContextProvider');
  }
  return context;
};
