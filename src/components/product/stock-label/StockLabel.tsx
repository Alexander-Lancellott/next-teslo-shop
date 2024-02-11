'use client';

import { useEffect, useState } from 'react';

import { getStockBySlug } from '@/actions';
import { titleFont } from '@/config/fonts';

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getStock = async () => {
      const inStock = await getStockBySlug(slug);
      setStock(inStock);
      setIsLoading(false);
    };

    getStock();
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <h1
          className={` ${titleFont.className} animate-pulse bg-neutral text-lg font-bold antialiased `}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={` ${titleFont.className} text-lg font-bold antialiased`}>
          Stock: {stock}
        </h1>
      )}
    </>
  );
};
