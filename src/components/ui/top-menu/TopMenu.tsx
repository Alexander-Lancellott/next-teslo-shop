'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { IoCartOutline, IoMenu, IoSearchOutline } from 'react-icons/io5';

import { titleFont } from '@/config/fonts';
import { useCartStore, useSearchStore, useUIStore } from '@/store';
import { theme } from '../../../utils/theme';
import { SearchBar } from '../search-bar/SearchBar';
import ThemeIcon from './theme-icon';

import styles from '@/css/top-menu.module.css';

export const TopMenu = () => {
  const params = useParams();
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const totalItemsInCart = useCartStore((state) => state.getTotalItems());
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { searchTerm, setSearchTerm } = useSearchStore();

  const { term = '' } = params;

  const searchRef = useRef<any>(null);

  const [loaded, setLoaded] = useState(false);

  const variants: Variants = {
    hidden: {
      display: 'none',
      opacity: 0,
    },
    show: {
      width: 'auto',
      display: 'block',
      opacity: 1,
      transition: {
        delay: 0.3,
      },
    },
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (term !== '') setSearchTerm(`${term}`);
  }, [term, setSearchTerm]);

  return (
    <nav
      className="flex min-h-9 w-full items-center justify-between px-5"
      ref={searchRef}
    >
      <>
        <Link href="/" className="hover:text-primary">
          <span className={`${titleFont.className} font-bold antialiased`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>

        {/* Center Menu */}

        <div className="hidden sm:block">
          <motion.div
            variants={variants}
            animate={isSearchVisible ? 'hidden' : 'show'}
          >
            <Link
              className={styles['rectangular-container']}
              href="/gender/men"
            >
              Hombres
            </Link>
            <Link
              className={styles['rectangular-container']}
              href="/gender/women"
            >
              Mujeres
            </Link>
            <Link
              className={styles['rectangular-container']}
              href="/gender/kid"
            >
              Niños
            </Link>
          </motion.div>
        </div>

        {/* Search, Cart, Menu */}
        <div className="flex items-center">
          <div
            className={`${styles['circular-container']} mr-1 hidden sm:grid`}
          >
            <SearchBar
              isSearchVisible={isSearchVisible}
              setIsSearchVisible={setIsSearchVisible}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              searchRef={searchRef}
            />
          </div>

          <div
            className={`${styles['circular-container']} mr-1 grid sm:hidden`}
            onClick={openSideMenu}
          >
            <IoSearchOutline className="h-5 w-5" />
          </div>

          <Link
            href={totalItemsInCart === 0 && loaded ? '/empty' : '/cart'}
            className={`${styles['circular-container']} mr-1 grid`}
          >
            <div className="relative">
              {loaded && totalItemsInCart > 0 && (
                <span className={`${styles['cart-number']} fade-in`}>
                  {totalItemsInCart}
                </span>
              )}
              <IoCartOutline className="h-5 w-5" />
            </div>
          </Link>

          <button
            onClick={() => {
              openSideMenu();
              setIsSearchVisible(false);
            }}
            className={`${styles['circular-container']} grid`}
          >
            <IoMenu className="h-6 w-6" />
          </button>
          <ThemeIcon />
        </div>
      </>
    </nav>
  );
};
