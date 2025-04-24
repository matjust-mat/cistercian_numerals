'use client';

import { useState } from 'react';
import { Converter, Header, Swicther } from '@/components';
import { ImageProvider } from '@/context/ImageContext';
import { NumberProvider } from '@/context/NumberContext';

export default function Home() {
  const [method, setMethod] = useState<string>('aviadar');

  const handleChangeMethods = (newMethod: string) => {
    if (newMethod === method) return;
    setMethod(newMethod);
  };

  return (
    <>
      <Header />
      <ImageProvider>
        <NumberProvider>
          <div className="bg-off-white w-full h-full dark:bg-shade-black flex flex-col items-center">
            <Swicther changeMethod={handleChangeMethods} />
            <Converter method={method} />
          </div>
        </NumberProvider>
      </ImageProvider>
    </>
  );
}
