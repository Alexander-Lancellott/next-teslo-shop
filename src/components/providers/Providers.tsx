'use client';

import { useEffect, useState } from 'react';
import { SessionProvider } from 'next-auth/react';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { useThemeStore } from '@/store';

interface Props {
  theme: string;
  children: React.ReactNode;
}

export const Providers = ({ children, theme }: Props) => {
  const [mount, setMount] = useState(false);

  const { isDarkMode, setIsDarkMode } = useThemeStore();

  useEffect(() => {
    const getPreferredScheme = window?.matchMedia?.(
      '(prefers-color-scheme:dark)',
    )?.matches;

    if (theme !== '') {
      setIsDarkMode(theme === 'dark');
    } else {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          setIsDarkMode(event.matches);
        });

      setIsDarkMode(getPreferredScheme);
    }

    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dark' : 'light',
    );

    setMount(true);
  }, [theme, setIsDarkMode, isDarkMode]);

  return (
    mount && (
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
          intent: 'capture',
          currency: 'USD',
        }}
      >
        <SessionProvider>{children}</SessionProvider>
      </PayPalScriptProvider>
    )
  );
};
