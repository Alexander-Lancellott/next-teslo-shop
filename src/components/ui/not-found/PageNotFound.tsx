'use client';

import { revalidatePath } from 'next/cache';
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { titleFont } from '@/config/fonts';

export const PageNotFound = ({ isError }: { isError?: boolean }) => {
  const { back, refresh } = useRouter();

  return (
    <div className="flex w-full flex-1 flex-col-reverse items-center justify-center md:flex-row">
      <div className="mx-5 px-5 text-center">
        <h2 className={`${titleFont.className} text-9xl antialiased`}>
          {isError ? 505 : 404}
        </h2>
        <p className="text-xl font-semibold">Whoops! Lo sentimos mucho.</p>
        <p className="font-light">
          {isError ? (
            <>
              <span>Puedes intentar </span>
              <button
                onClick={() => window.location.reload()}
                className="font-normal transition-all hover:text-primary hover:underline"
              >
                recargar
              </button>
            </>
          ) : (
            <>
              <span>Puedes regresar al </span>
              <Link
                href="/"
                className="font-normal transition-all hover:text-primary hover:underline"
              >
                inicio
              </Link>
            </>
          )}
        </p>
      </div>

      <div className="mx-5 px-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="Starman"
          className="min-h-[390px] min-w-[390px] p-5 sm:p-0  "
          width={450}
          height={450}
          priority
        />
      </div>
    </div>
  );
};
