'use client';

import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { motion, Variants } from 'framer-motion';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';

import { theme } from '@/utils';

interface Props {
  searchRef: MutableRefObject<any>;
  isSearchVisible: boolean;
  setIsSearchVisible: (state: boolean) => void;
  searchTerm: string;
  setSearchTerm: (state: string) => void;
}

export const SearchBar = ({
  searchRef,
  searchTerm,
  setSearchTerm,
  isSearchVisible,
  setIsSearchVisible,
}: Props) => {
  const { push } = useRouter();

  const onSearchTerm = () => {
    if (searchTerm.trim().length < 3) return;
    if (!isSearchVisible) return;
    push(`/search/${searchTerm}`);
  };

  const handleClickOutside = (e: any) => {
    if (searchRef.current && !searchRef?.current?.contains(e.target)) {
      setIsSearchVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ContainerVariants: Variants = {
    close: { backgroundColor: 'rgb(0,0,0,0)' },
    open: {
      paddingLeft: 10,
      backgroundColor: theme.colors.neutral,
    },
  };

  const InputVariants: Variants = {
    close: {
      width: 0,
      opacity: 0.2,
      transition: {
        width: {
          duration: 0.37,
        },
      },
    },
    open: {
      width: 300,
      opacity: 1,
      marginLeft: 10,
      transition: {
        width: {
          duration: 0.37,
        },
      },
    },
  };

  return (
    <motion.div
      className="flex h-full w-full items-center justify-center rounded-full"
      initial="close"
      variants={ContainerVariants}
      animate={isSearchVisible ? 'open' : 'close'}
      onClick={() => setIsSearchVisible(true)}
      ref={searchRef}
    >
      <button onClick={onSearchTerm}>
        <IoSearchOutline className="h-5 w-5" />
      </button>
      <motion.div
        initial="close"
        variants={InputVariants}
        animate={isSearchVisible ? 'open' : 'close'}
        className="flex items-center"
      >
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full bg-transparent outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) => (e.key === 'Enter' ? onSearchTerm() : null)}
        />

        <button
          onClick={() => setSearchTerm('')}
          className={clsx('fade-in mr-2 h-[9%] w-[9%]', {
            hidden: searchTerm.length < 3,
          })}
        >
          <IoCloseOutline className="h-full w-full" />
        </button>
      </motion.div>
    </motion.div>
  );
};
