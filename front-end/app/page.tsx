'use client';

import { useState } from 'react';
import { Converter, Header, Switcher, Theme } from '@/components';
import { ContextProvider } from '@/context';

export default function Home() {
  const [method, setMethod] = useState<string>('aviadar');

  const handleChangeMethods = (newMethod: string) => {
    if (newMethod === method) return;
    setMethod(newMethod);
  };

  return (
    <>
      <Theme>
        <Header />
        <ContextProvider>
          <div className="bg-off-white w-full dark:bg-shade-black flex flex-col items-center pb-8">
            <Switcher changeMethod={handleChangeMethods} />
            <Converter method={method} />
          </div>
        </ContextProvider>
      </Theme>
    </>
  );
}
