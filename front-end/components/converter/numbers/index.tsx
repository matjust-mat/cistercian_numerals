'use client';

import Loading from '@/components/Loading';
import { useImageContext } from '@/context/ImageContext';
import { useNumberContext } from '@/context/NumberContext';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useEffect, useState } from 'react';

interface NumbersProps {
  from?: boolean;
  to?: boolean;
}

export default function Numbers({ from, to }: NumbersProps) {
  const {
    inputValue,
    setInputValue,
    fetchedValue,
    setFetchedValue,
    isLoadingNumber,
    setIsLoadingNumber,
  } = useNumberContext();
  const { isLoadingImage } = useImageContext();

  useEffect(() => {
    if (isLoadingImage) {
      // Aqui você vai chamar o endpoint real futuramente
      // Simulando um valor retornado
      const fetchData = async () => {
        // const res = await fetch('/api/get-number');
        // const data = await res.json();
        // setFetchedValue(data.value);
        setTimeout(() => setFetchedValue(12345), 1000); // Simulado
      };
      fetchData();
    }
  }, [isLoadingImage]);

  return (
    <div className="min-w-[30rem] min-h-[30rem] mt-4 p-6 rounded-2xl dark:bg-orange-200 bg-orange-400 shadow-md flex flex-col justify-center items-center gap-10">
      {from && (
        <>
          <h2 className="text-4xl font-semibold dark:text-shade-gray text-white">
            Insira um número
          </h2>
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value || '')}
            className="rounded-md focus:outline-none max-w-80"
            placeholder="Digite um número"
            min={0}
            max={9999}
          />
          <Button
            onPress={async () => {
              setIsLoadingNumber(true);
              setTimeout(() => setIsLoadingNumber(false), 2000);
            }}
            isLoading={isLoadingNumber}
            isDisabled={inputValue === ''}
            disableRipple={true}
            size="lg"
            className="bg-tint-blue dark:bg-shade-blue mt-4"
          >
            {isLoadingNumber ? 'Lacrando...' : 'Lacrar'}
          </Button>
        </>
      )}

      {to && (
        <>
          <h2 className="text-4xl font-semibold dark:text-shade-gray text-white">
            Valor numérico
          </h2>
          {isLoadingImage ? (
            <Loading />
          ) : fetchedValue === null ? (
            <></>
          ) : (
            <div className="p-4 bg-white border rounded-md text-xl font-mono text-center dark:bg-shade-gray">
              {fetchedValue}
            </div>
          )}
        </>
      )}
    </div>
  );
}
