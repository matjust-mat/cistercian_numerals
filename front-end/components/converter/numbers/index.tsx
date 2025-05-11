'use client';

import Loading from '@/components/Loading';
import { useAppContext } from '@/context';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { useState } from 'react';

interface NumbersProps {
  from?: boolean;
  to?: boolean;
}

export default function Numbers({ from, to }: NumbersProps) {
  const { isLoading, setIsLoading, setFetchedImage, fetchedNumber } =
    useAppContext();
  const [inputValue, setInputValue] = useState<string | ''>('');

  const isDisabled =
    inputValue === '' ||
    !(Number(inputValue) > 0 && Number(inputValue) < 10000);

  const fetchNumerical = async () => {
    try {
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 1000));
      const response = await fetch(
        `http://localhost:5000/converter/to-numerical/${Number(inputValue)}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch number');
      }
      const data = await response.json();
      setFetchedImage(data);
    } catch (error) {
      console.error('Error fetching number:', error);
      setFetchedImage(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-w-[30rem] min-h-[30rem] mt-4 p-6 rounded-2xl dark:bg-orange-200 bg-orange-400 shadow-md flex flex-col justify-center items-center gap-10">
      {from && (
        <>
          <h2 className="text-4xl font-semibold dark:text-shade-gray text-white">
            Insira um número
          </h2>
          {isDisabled && (
            <p className="dark:text-shade-gray text-white">
              Insira um número entre 1 e 9999 para lacrar.
            </p>
          )}
          <Input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value || '')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isDisabled) fetchNumerical();
            }}
            className="rounded-md focus:outline-none max-w-80"
            placeholder="Digite um número"
            min={1}
            max={9999}
          />
          <Button
            onPress={fetchNumerical}
            isLoading={isLoading}
            isDisabled={isDisabled}
            disableRipple={true}
            size="lg"
            className="bg-tint-blue dark:bg-shade-blue mt-4"
          >
            {isLoading ? 'Lacrando...' : 'Lacrar'}
          </Button>
        </>
      )}

      {to && (
        <>
          <h2 className="text-4xl font-semibold dark:text-shade-gray text-white">
            Valor numérico
          </h2>
          {isLoading ? (
            <Loading />
          ) : fetchedNumber === null ? (
            <></>
          ) : (
            <div className="p-4 bg-white border rounded-md text-xl font-mono text-center dark:bg-shade-gray">
              {fetchedNumber.number}
            </div>
          )}
        </>
      )}
    </div>
  );
}
