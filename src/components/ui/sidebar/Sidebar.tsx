'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';

import { logout } from '@/actions';
import { titleFont } from '@/config/fonts';
import { useSearchStore, useUIStore } from '@/store';
import placeholder from '../../../../public/imgs/placeholder.jpg';
import { ListItems } from './ListItems';

import styles from '@/css/sidebar.module.css';

export const Sidebar = () => {
  const { push } = useRouter();
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const { searchTerm, setSearchTerm } = useSearchStore();
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === 'admin';

  const onSearchTerm = () => {
    if (searchTerm.trim().length < 3) return;
    closeMenu();
    push(`/search/${searchTerm}`);
  };

  const navStyle = clsx(
    `fixed right-0 top-0 z-20 h-screen w-[400px] transform bg-gradient-theme p-5
      shadow-2xl transition-all duration-300`,
    {
      'translate-x-full': !isSideMenuOpen,
    },
  );

  return (
    <div>
      {/* Background black */}
      {isSideMenuOpen && (
        <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-30" />
      )}

      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fade-in fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-sm
            backdrop-filter"
        />
      )}

      {/* Sidemenu */}
      <nav className={navStyle}>
        {session?.user && (
          <div className="flex">
            <figure className="relative h-24 w-24">
              <Image
                src={session.user.image ?? placeholder}
                alt="user-image"
                sizes="(max-width: 768px) 100vw"
                fill
                className="rounded-full"
              />
            </figure>
            <div className="ml-4 flex w-56 flex-col justify-between py-4">
              <h1 className={`${titleFont.className} truncate text-xl`}>
                {session?.user.name}
              </h1>
              <div
                className="w-full rounded bg-primary text-center opacity-70 transition-all
                  hover:opacity-100"
              >
                <Link
                  href="/profile"
                  className="ml-2 font-medium"
                  onClick={closeMenu}
                >
                  Editar perfil
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Input */}
        <div
          className="relative mt-6 flex w-full items-center rounded-md border-b-2 border-neutral
            bg-secondary px-3 py-2 focus-within:border-primary sm:hidden"
        >
          <button onClick={onSearchTerm}>
            <IoSearchOutline size={20} />
          </button>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
            className="ml-2 w-full bg-transparent outline-none"
          />
          <button
            onClick={() => setSearchTerm('')}
            className={clsx('fade-in', {
              hidden: searchTerm.length < 3,
            })}
          >
            <IoCloseOutline size={20} />
          </button>
        </div>

        {/* Menú */}

        {isAuthenticated && (
          <ListItems
            type="authenticated"
            closeMenu={closeMenu}
            logout={logout}
          />
        )}

        {!isAuthenticated && <ListItems type="login" closeMenu={closeMenu} />}

        {isAdmin && (
          <>
            {/* Line Separator */}
            <div className="my-10 h-px w-full bg-gray-200" />

            <ListItems type="admin" closeMenu={closeMenu} />
          </>
        )}
      </nav>
    </div>
  );
};
