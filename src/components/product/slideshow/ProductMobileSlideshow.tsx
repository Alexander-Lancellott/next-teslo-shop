'use client';

import Image from 'next/image';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import './slideshow.css';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{ height: 678, maxWidth: 700 }}
        pagination
        autoplay={{
          delay: 2500,
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2 rounded-md"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={`/products/${image}`}
              alt={title}
              sizes="(max-width: 768px) 100vw"
              fill
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
