'use client';

import Loading from '@/components/Loading';
import { useAppContext } from '@/context';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { TrashIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CirtecianProps {
  from?: boolean;
  to?: boolean;
}

export default function Cirtecian({ from, to }: CirtecianProps) {
  const { isLoading, setIsLoading, setFetchedNumber, fetchedImage } =
    useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedImage) {
      const url = URL.createObjectURL(selectedImage);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [selectedImage]);

  const fetchNumerical = async () => {
    try {
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 1000));
      const formData = new FormData();
      formData.append('file', selectedImage as Blob);
      const response = await fetch(
        `http://localhost:5000/converter/to-number`,
        {
          method: 'POST',
          body: formData,
        }
      );
      if (!response.ok) {
        throw new Error('Failed to fetch number');
      }
      const data = await response.json();
      setFetchedNumber(data);
    } catch (error) {
      console.error('Error fetching number:', error);
      setFetchedNumber(null);
    } finally {
      setIsLoading(false);
    }
  };

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
                if (file && ['image/png'].includes(file.type)) {
                  setSelectedImage(file);
                } else {
                  alert('Apenas imagens PNG são permitidas.');
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
                  setFetchedNumber(null);
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
            onPress={fetchNumerical}
            disableRipple={true}
            size="lg"
            isDisabled={!selectedImage}
            isLoading={isLoading}
          >
            {isLoading ? 'Removendo kit gay...' : 'Cura gay'}
          </Button>
        </>
      )}

      {to && (
        <>
          <h2 className="text-4xl font-semibold dark:text-shade-gray text-white">
            Valor cisterciense
          </h2>
          {isLoading ? (
            <Loading text="Carregando imagem..." />
          ) : fetchedImage?.image_url && fetchedImage?.filename ? (
            <div>
              <img
                src={fetchedImage.image_url}
                alt="Imagem Recebida"
                className="w-72 rounded-md border"
              />
              <br />
              <a
                href={fetchedImage.image_url}
                download={fetchedImage.filename}
                className="text-white dark:text-shade-gray"
              >
                Download {fetchedImage.filename}
              </a>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}
