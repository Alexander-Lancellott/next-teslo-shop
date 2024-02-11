import type { Metadata } from 'next';
import { cookies } from 'next/headers';

import { setThemeCookie } from '@/actions/cookies';
import { Footer, Providers, Sidebar, TopMenu } from '@/components';
import { inter } from '@/config/fonts';
import { theme } from '../utils/theme';

import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop',
  },
  description: 'Una tienda virtual de productos',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = (await cookies().get('theme')?.value) ?? '';

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-theme`}>
        <Providers theme={theme}>
          <main className="flex min-h-[100svh] flex-col justify-between pt-3">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
