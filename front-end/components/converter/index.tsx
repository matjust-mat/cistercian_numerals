'use client';

import Cirtecian from './cirtecian';
import Numbers from './numbers';

interface ConverterProps {
  method: string;
}

export default function Converter({ method }: ConverterProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full gap-4 md:gap-16">
      {method === 'aviadar' ? (
        <>
          <Numbers from />  
          <Cirtecian to />
        </>
      ) : (
        <>
          <Cirtecian from />
          <Numbers to />
        </>
      )}
    </div>
  );
}
