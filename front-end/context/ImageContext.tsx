'use client';

import React, { createContext, useContext, useState } from 'react';

interface ImageContextProps {
  selectedImage: File | null;
  setSelectedImage: (file: File | null) => void;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
  fetchedImageUrl: string | null;
  setFetchedImageUrl: (url: string | null) => void;
  isLoadingImage: boolean;
  setIsLoadingImage: (loading: boolean) => void;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fetchedImageUrl, setFetchedImageUrl] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);

  return (
    <ImageContext.Provider
      value={{
        selectedImage,
        setSelectedImage,
        previewUrl,
        setPreviewUrl,
        fetchedImageUrl,
        setFetchedImageUrl,
        isLoadingImage,
        setIsLoadingImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImageContext = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageContext must be used within an ImageProvider');
  }
  return context;
};
