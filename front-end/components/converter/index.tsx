'use client';

import Cirtecian from './cirtecian';
import Numbers from './numbers';

interface ConverterProps {
  method: string;
}

export default function Converter({ method }: ConverterProps) {
  return (
    <div className="flex flex-row items-center justify-center w-full h-full gap-16">
      {method === 'aviadar' ? (
        <>
        <Numbers from/>
        <Cirtecian to/>
      </>
      ) : (
        <>
        <Cirtecian from/>
        <Numbers to/>
      </>
      )}
    </div>
  );
}
