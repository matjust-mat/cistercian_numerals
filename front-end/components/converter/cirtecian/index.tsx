'use client';

import Loading from '@/components/Loading';
import { useImageContext } from '@/context/ImageContext';
import { useNumberContext } from '@/context/NumberContext';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { TrashIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CirtecianProps {
  from?: boolean;
  to?: boolean;
}

export default function Cirtecian({ from, to }: CirtecianProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    selectedImage,
    setSelectedImage,
    previewUrl,
    setPreviewUrl,
    fetchedImageUrl,
    setFetchedImageUrl,
    isLoadingImage,
    setIsLoadingImage,
  } = useImageContext();
  const { isLoadingNumber, setFetchedValue } = useNumberContext();

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url); 
    }
  }, [selectedImage]);

  useEffect(() => {
    if (isLoadingNumber) {
      const fetchImage = async () => {
        setTimeout(() => {
          setFetchedImageUrl(
            'https://via.placeholder.com/100x100.png?text=Imagem+Carregada'
          );
        }, 2000);
      };
      fetchImage();
    }
  }, [isLoadingNumber]);

  return (
    <div className="min-w-[30rem] min-h-[30rem] mt-4 p-6 rounded-2xl dark:bg-orange-200 bg-orange-400 shadow-md flex flex-col justify-center items-center gap-10">
      {from && (
        <>
          <h2 className="text-4xl font-semibold dark:text-shade-gray text-white">
            Selecione a imagem
          </h2>
          <div className="flex items-center gap-4">
            <Input
              ref={fileInputRef}
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && ['image/png', 'image/jpeg'].includes(file.type)) {
                  setSelectedImage(file);
                } else {
                  alert('Apenas imagens PNG ou JPEG são permitidas.');
                  setSelectedImage(null);
                }
              }}
              className=" max-w-80 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600"
            />
            {selectedImage && (
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setPreviewUrl(null);
                  setFetchedImageUrl(null);
                  setFetchedValue(null);
                  fileInputRef.current?.value &&
                    (fileInputRef.current.value = '');
                }}
                className="px-3 py-2 rounded-md hover:bg-orange-100"
              >
                <TrashIcon className="w-4 h-4 inline bg-transparent text-red-600" />
              </button>
            )}
          </div>
          {previewUrl && (
            <img src={previewUrl} alt="Preview" className="w-40 rounded-md" />
          )}
          <Button
            className="bg-tint-blue dark:bg-shade-blue mt-4"
            onPress={() => {
              setIsLoadingImage(true);
              setTimeout(() => {
                setIsLoadingImage(false);
                alert('Imagem enviada! (simulado)');
              }, 2000);
            }}
            disableRipple={true}
            size="lg"
            isDisabled={!selectedImage}
            isLoading={isLoadingImage}
          >
            {isLoadingImage ? 'Removendo kit gay...' : 'Cura gay'}
          </Button>
        </>
      )}

      {to && (
        <>
          <h2 className="text-4xl font-semibold dark:text-shade-gray text-white">
            Valor cisterciense
          </h2>
          {fetchedImageUrl ? (
            <img
              src={fetchedImageUrl}
              alt="Imagem Recebida"
              className="w-72 rounded-md border"
            />
          ) : isLoadingNumber ? (
            <Loading text='Carregando imagem...' />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
