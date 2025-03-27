'use client';

import { useState } from 'react';
import { Converter, Header, Swicther } from '@/components';

export default function Home() {
  const [method, setMethod] = useState<string>('aviadar');

  const handleChangeMethods = (newMethod: string) => {
    if (newMethod === method) return;
    setMethod(newMethod);
  };

  return (
    <>
      <Header />
      <div className="bg-off-white w-full h-full dark:bg-shade-black flex flex-col items-center">
        <Swicther changeMethod={handleChangeMethods} />
        <Converter method={method} />
      </div>
    </>
  );
}
