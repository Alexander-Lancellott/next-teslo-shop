import { titleFont } from '@/config/fonts';
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {
  return (
    <div className="flex w-full flex-col justify-center sm:w-[350px]">
      <h1 className={`${titleFont.className} mb-5 text-4xl`}>Nueva cuenta</h1>

      <RegisterForm />
    </div>
  );
}
