'use client';

import { useState } from 'react';
import { Button, ButtonGroup } from '@heroui/button';
import { useAppContext } from '@/context';

interface SwitcherRefProps {
  changeMethod: (method: string) => void;
}

export default function Switcher({ changeMethod }: SwitcherRefProps) {
  const { resetStates } = useAppContext();

  const [firstActive, setFirstActive] = useState<boolean>(true);
  const [secondActive, setSecondActive] = useState<boolean>(false);

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
}
