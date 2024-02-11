'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { motion } from 'framer-motion';

import { setThemeCookie } from '@/actions/cookies';
import { useThemeStore } from '@/store';
import { IconMoon, IconSun } from './Icons';

import styles from '@/css/switch.module.css';

const ThemeIcon = () => {
  const { isDarkMode, setIsDarkMode } = useThemeStore();
  const ref = useRef<HTMLDivElement>(null);

  const toggleDarkMode = async () => {
    if (
      !ref.current ||
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsDarkMode(!isDarkMode);
      return;
    }

    await document.startViewTransition(() => {
      flushSync(() => {
        setIsDarkMode(!isDarkMode);
      });
    }).ready;

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    const clipPath = [
      `circle(${maxRadius}px at ${x}px ${y}px)`,
      `circle(0px at ${x}px ${y}px)`,
    ];

    document.documentElement.animate(
      {
        clipPath: isDarkMode ? clipPath : clipPath.reverse(),
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: `::view-transition-${isDarkMode ? 'old' : 'new'}(root)`,
      },
    );
  };

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  };

  return (
    <div className="flex justify-end">
      <div
        className={styles.switch}
        data-state={isDarkMode}
        onClick={() => {
          toggleDarkMode();
          setThemeCookie(isDarkMode ? 'light' : 'dark');
        }}
      >
        <motion.div
          className={styles.handle}
          layout
          transition={spring}
          ref={ref}
        >
          {isDarkMode ? <IconMoon /> : <IconSun />}
        </motion.div>
      </div>

      <div className={styles.tooltip} role="tooltip">
        <span>Switch to {isDarkMode ? 'light' : 'dark'} theme</span>
      </div>
    </div>
  );
};

export default ThemeIcon;
