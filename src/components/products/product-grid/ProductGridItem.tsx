'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/interfaces';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="fade-in overflow-hidden rounded-md">
      <Link href={`/product/${product.slug}`}>
        <Image
          onMouseLeave={() => setDisplayImage(product.images[0])}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          className="w-full rounded object-cover"
          src={`/products/${displayImage}`}
          alt={product.title}
          height={500}
          width={500}
          placeholder="blur"
          blurDataURL={`/products/${displayImage}`}
        />
      </Link>

      <div className="flex flex-col p-4">
        <Link className="hover:text-primary" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};
