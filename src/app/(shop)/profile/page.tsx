import { redirect } from 'next/navigation';

import { auth } from '@/auth.config';
import { Title } from '@/components';
import { ProfileForm } from './ui/ProfileForm';

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    // redirect('/auth/login?returnTo=/perfil');
    redirect('/');
  }
  return (
    <div className="mb-48 flex flex-col px-10 sm:items-center sm:justify-center sm:px-0">
      <div className="flex w-full flex-col justify-center text-left xl:w-[1000px]">
        <Title title="Perfil" />
        <ProfileForm />
      </div>
    </div>
  );
}
