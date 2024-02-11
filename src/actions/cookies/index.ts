'use server';

import { cookies } from 'next/headers';

export async function setThemeCookie(theme: 'system' | 'light' | 'dark') {
  cookies().set('theme', theme);
}
