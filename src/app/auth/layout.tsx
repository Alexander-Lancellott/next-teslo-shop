import { redirect } from 'next/navigation';

import { auth } from '@/auth.config';

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session?.user) {
    redirect('/');
  }

  return (
    <div className="flex w-full flex-1 items-center justify-center px-10">
      {children}
    </div>
  );
}
