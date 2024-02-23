'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { ReviewsCard } from './ReviewsCard';
import { motion, AnimatePresence, clamp } from 'framer-motion';

type Props = {
  roundedLeft?: boolean;
  roundedRight?: boolean;
  images?: {
    src: string;
    listingNum?: string;
  }[];
  itemsPerSlide?: number | 1;
  contain?: boolean;
  reviews?: {
    name: string;
    dates: string;
    jobTitle: string;
    testimonial: string;
    company: string;
    title: string;
    rating: number;
  }[];
};

const CarouselPage = (props: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
  const [isHovering, setIsHovering] = useState(false); // Track hover state

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    // Automatically change slides every 5 seconds
    if (!isHovering) {
      // Only auto-slide if not hovering
      intervalId = setInterval(() => {
        nextSlide();
      }, 8000);
    }

    return () => {
      // Clear the interval to prevent memory leaks
      clearInterval(intervalId);
    };
  }, [currentSlide, isHovering]);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) =>
      prev === 0 && props.itemsPerSlide != undefined
        ? Math.ceil(
            Math.max(props.images?.length ?? 0, props.reviews?.length ?? 0) /
              props.itemsPerSlide
          ) - 1
        : prev - 1
    );
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => {
      const totalSlides = Math.ceil(
        Math.max(props.images?.length ?? 0, props.reviews?.length ?? 0) /
          (props.itemsPerSlide ?? 1)
      );
      if (props.itemsPerSlide !== undefined && prev < totalSlides - 1) {
        return prev + 1;
      }
      return 0;
    });
  };

  // Handlers for mouse enter and leave
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  const slideAnimation = {
    hidden:
      direction === 1
        ? { x: '100vw', opacity: 0 }
        : { x: '-100vw', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
    exit:
      direction === 1
        ? { x: '-100vw', opacity: 0, transition: { duration: 0.5 } }
        : { x: '100vw', opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative h-full w-full flex overflow-hidden">
      <button
        type="button"
        onClick={() => prevSlide()}
        className="absolute z-[200] bg-[#2c2c2c6a] text-white top-2/4 left-4 -translate-y-2/4 p-2 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#fff">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        type="button"
        onClick={() => nextSlide()}
        className="absolute z-[200] bg-[#2c2c2c6a] text-white top-2/4 right-4 -translate-y-2/4 p-2 rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#fff">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        <motion.div
          key={currentSlide}
          variants={slideAnimation}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 500, damping: 300 },
            opacity: { duration: 0 },
          }}
          onMouseEnter={handleMouseEnter} // Add onMouseEnter handler to the container
          onMouseLeave={handleMouseLeave} // Add onMouseL
          className={`relative h-full gap-8  flex w-full ${
            props.roundedLeft && 'rounded-l-xl'
          } ${props.roundedRight && 'rounded-r-xl'}`}>
          {props.images?.map((image, index) => (
            <div
              key={index}
              className={`h-full w-full overflow-hidden relative ${
                props.itemsPerSlide != undefined &&
                Math.floor(index / props.itemsPerSlide) === currentSlide
                  ? 'block'
                  : 'hidden'
              } transition-transform z-0 duration-[2s] ease-in-out transform ${
                props.itemsPerSlide != undefined &&
                Math.floor(index / props.itemsPerSlide) === currentSlide
                  ? 'translate-x-0'
                  : 'translate-x-full'
              }`}>
              <Image
                className={`rounded-xl z-0 ${
                  props.contain ? 'object-contain' : 'object-cover'
                } h-full`}
                src={image.src || '/placeholder.png'}
                alt="image"
                fill
                sizes=" (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAABYCAYAA"
              />
            </div>
          ))}

          {props.reviews?.map((review, index) => (
            <div
              key={index}
              className={`h-full w-full   relative flex ${
                props.itemsPerSlide != undefined &&
                Math.floor(index / props.itemsPerSlide) === currentSlide
                  ? 'block'
                  : 'hidden'
              } transition-transform z-0 duration-[2s] ease-in-out transform ${
                props.itemsPerSlide != undefined &&
                Math.floor(index / props.itemsPerSlide) === currentSlide
                  ? 'translate-x-0'
                  : 'translate-x-full'
              }`}>
              {' '}
              <ReviewsCard review={review} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CarouselPage;
