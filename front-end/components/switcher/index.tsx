'use client';

import { useState } from 'react';
import { Button, ButtonGroup } from '@heroui/button';
import { useImageContext, useNumberContext } from '@/context';

interface SwictherRefProps {
  changeMethod: (method: string) => void;
}

export default function Swicther({changeMethod}: SwictherRefProps) {
  const {
    setInputValue,
    setFetchedValue,
    setIsLoadingNumber,
  } = useNumberContext();
  const { 
    setSelectedImage, 
    setPreviewUrl, 
    setFetchedImageUrl, 
    setIsLoadingImage 
  } = useImageContext();

  const [firstActive, setFirstActive] = useState<boolean>(true);
  const [secondActive, setSecondActive] = useState<boolean>(false);

  const resetStates = () => {
    setInputValue('');
    setFetchedValue(null);
    setIsLoadingNumber(false);
    setSelectedImage(null);
    setPreviewUrl(null);
    setFetchedImageUrl(null);
    setIsLoadingImage(false);
  };

  return (
    <div className="w-full flex justify-center h-fit p-7">
      <ButtonGroup size="lg" color="primary" radius="sm">
        <Button
          disableRipple={true}
          className={`dark:bg-tint-blue dark:text-tint-black ${
            firstActive
              ? 'bg-shade-blue dark:bg-primary dark:text-white'
              : 'bg-primary dark:bg-tint-blue'
          } text-white font-medium`}
          onPress={() => {
            if (firstActive) return;
            resetStates();
            setFirstActive(true);
            setSecondActive(false);
            changeMethod('aviadar');
          }}
        >
          Aviadar
        </Button>
        <Button
          disableRipple={true}
          className={`dark:text-tint-black ${
            secondActive
              ? 'bg-shade-blue dark:bg-primary dark:text-white'
              : 'bg-primary dark:bg-tint-blue'
          } text-white font-medium`}
          onPress={() => {
            if (secondActive) return;
            resetStates();
            setFirstActive(false);
            setSecondActive(true);
            changeMethod('desaviadar');
          }}
        >
          Desviadar
        </Button>
      </ButtonGroup>
    </div>
  );
};
