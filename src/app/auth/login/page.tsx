import { titleFont } from '@/config/fonts';
import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex w-full flex-col justify-center sm:w-[350px]">
      <h1 className={`${titleFont.className} mb-5 text-4xl`}>Ingresar</h1>

      <LoginForm />
    </div>
  );
}
