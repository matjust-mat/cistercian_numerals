'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { EyeIcon, EyeOffIcon, Trash2 } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { generateKeyboardHash, revertKeyboardLayout } from '@/utils/funcs';

export default function VirtualKeyboard() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [keyboard, setKeyboard] =
    useState<{ text: string; value: number[] }[]>();
  const [sessionId, setSessionId] = useState<string>();
  const [selectedOptions, setSelectedOptions] = useState<number[][]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [name, setName] = useState<string>();
  const [hash, setHash] = useState<string>();
  const hasFetched = useRef<boolean>(false);

  async function startSession(previousSessionId: string | null): Promise<{
    sessionId: string;
    keyboard: { text: string; value: number[] }[];
  }> {
    const response = await fetch('http://localhost:7575/session/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ previousSessionId }),
    });

    if (!response.ok) throw new Error('Failed to start session');

    return await response.json();
  }

  const getSession = async () => {
    try {
      const storedSessionId = localStorage.getItem("sessionId");
      console.log(storedSessionId);
      const { sessionId: newSessionId, keyboard } = await startSession(storedSessionId);
      const values = revertKeyboardLayout(keyboard);
      const newHash = await generateKeyboardHash(values);
      setHash(newHash);
      setSessionId(newSessionId);
      setKeyboard(keyboard);
      localStorage.setItem("sessionId", newSessionId);
    } catch (error) {
      console.error(error);
    }
  };

  const invalidateSession = async () => {
    try {
      if (!sessionId) return;
      const response = await fetch('http://localhost:7575/session/invalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      });

      if (!response.ok) throw new Error('Failed to invalidate session');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      hasFetched.current = true;
      getSession();
    }
  }, []);

  const logIn = useCallback(async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);

    try {
      if (!username) {
        alert('Please enter your username.');
        return;
      }
      if (!sessionId) {
        alert('Session not initialized.');
        return;
      }
      if (!hash){
        alert('Hash not initialized.');
        return;
      }

      const passwordTyped = selectedOptions;
      const response = await fetch('http://localhost:7575/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, sessionId, passwordTyped, hash }),
      });

      if (!response.ok) {
        throw new Error(await response.json());
      }

      const { name } = await response.json();
      setName(name);
      alert('Login successful!');
    } catch (e) {
      console.error('Login error:', e);
      alert(e);
      await invalidateSession();
      await getSession();
    } finally {
      setIsLoggingIn(false);
      setSelectedOptions([]);
    }
  }, [username, sessionId, selectedOptions, isLoggingIn]);

  const handleSelect = (value: number[]) => {
    setSelectedOptions((prev) => [...prev, value]);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const getOptions = () => {
    return keyboard?.map(({ text, value }) => (
      <Button
        key={text}
        onPress={() => handleSelect(value)}
        className="p-3 rounded-lg text-lg font-semibold"
        disableRipple={true}
        color="primary"
        variant="flat"
      >
        {text}
      </Button>
    ));
  };

  return (
    <div className="flex h-screen items-center justify-center bg-off-white dark:bg-shade-gray w-full flex-col gap-8">
      {name && (
        <div className="absolute top-0 right-0 p-4">
          <span className="text-sm text-gray dark:text-tint-gray">
            Logged as {name}
          </span>
        </div>
      )}
      <Card className="p-6 rounded-2xl shadow-lg bg-white dark:bg-shade-black w-96 text-center">
        <CardHeader className="flex justify-center mb-4">
          <h2 className="text-2xl font-semibold dark:text-tint-gray text-shade-gray">
            Virtual Keyboard
          </h2>
        </CardHeader>
        <CardBody>
          <div className="relative mb-4 flex items-center">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 rounded text-shade-gray text-lg"
            />
          </div>
          <div className="relative mb-4 flex items-center">
            <Input
              type={showPassword ? 'text' : 'password'}
              value={selectedOptions
                ?.map((op) => op.map(String).join(''))
                .join(' ')}
              readOnly
              className="w-full p-2 rounded text-shade-gray text-lg"
            />
            <Button
              onPress={togglePasswordVisibility}
              className="relative text-gray hover:text-dark-gray"
              size="sm"
              disableRipple={true}
            >
              {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {getOptions()}
            <Button
              onPress={() => setSelectedOptions([])}
              className="w-full p-3 rounded-lg text-lg font-semibold"
              variant="flat"
              color="secondary"
            >
              <Trash2 size={24} className="text-secondary" />
            </Button>
          </div>
          <div className="flex w-full">
            <Button
              className="w-full p-3 rounded-lg text-lg font-semibold"
              onPress={logIn}
              variant="solid"
              color="primary"
            >
              Acessar
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
