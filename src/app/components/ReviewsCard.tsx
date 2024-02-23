import Link from 'next/link';
import * as React from 'react';

type Props = {
  review: {
    name: string;
    dates: string;
    testimonial: string;
    company: string;
    jobTitle: string;
    rating: number;
  };
};

export const ReviewsCard = (props: Props) => {
  return (
    <div className="h-fit p-8 flex flex-wrap rounded-xl md:min-w-[600px] w-full md:w-2/3 m-auto bg-[#141625]">
      <div className="w-fit h-fit ">
        <Link
          target="_blank"
          className="flex justify-between"
          href={`https://www.upwork.com/freelancers/lunacuevas`}
          passHref>
          <h2 className="text-xl w-fit text-[#118A00] border-b border-[#118A00]">
            {props.review.jobTitle}
          </h2>
          <svg
            height="24"
            viewBox=".26 -.21 500 500"
            width="24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="m92.38-.21c-50.88 0-92.12 41.44-92.12 92.56v314.88c0 51.12 41.25 92.56 92.13 92.56h315.74c50.88 0 92.13-41.44 92.13-92.56v-314.88c0-51.12-41.25-92.56-92.13-92.56h-315.75z"
              fill="#118A00"
            />
            <path
              d="m359.92 303.51c-31.11 0-51.69-24.01-57.45-33.35 7.36-59.01 28.93-77.61 57.45-77.61 28.18 0 50.13 22.53 50.13 55.48s-21.95 55.48-50.13 55.48m0-147.18c-50.71 0-79.13 33.07-87.25 67.12-9.24-17.34-16.04-40.54-21.4-62.1h-70.09v87.24c0 31.7-14.38 55.07-42.59 55.07s-44.37-23.37-44.37-55.06l.3-87.25h-40.4v87.24c0 25.47 8.26 48.56 23.26 65.04 15.48 16.98 36.64 25.95 61.19 25.95 48.78 0 82.81-37.41 82.81-90.96v-58.62c5.14 19.29 17.2 56.39 40.41 88.92l-21.68 123.44h41.08l14.31-87.52c4.7 3.89 9.68 7.41 14.9 10.55a90.604 90.604 0 0 0 45.69 14.09h.08c1.21 0 2.44.07 3.69.07 50.29 0 90.34-38.94 90.34-91.43.01-52.52-40-91.79-90.28-91.79"
              fill="#fff"
            />
          </svg>
        </Link>
        {/* <div>{props.review.rating}</div> */}
        {/* convert the rating number into stars  */}
        <div className="flex gap-1 items-center align-middle my-2">
          {Array.from({ length: Math.floor(props.review.rating) }, (_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#118A00] inline"
              fill="#118A00"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.7 5.82 22l1.18-7.86L2 9.27l6.91-1.01L12 2z"
              />
            </svg>
          ))}
          {props.review.rating % 1 !== 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-[#118A00] inline"
              fill="#118A00"
              viewBox="0 0 50 50"
              width={24}
              height={24}
              stroke="currentColor">
              <linearGradient id="half-fill" x1="0" x2="100%" y1="0" y2="0">
                <stop offset="50%" stop-color="currentColor" />
                <stop offset="50%" stop-color="transparent" />
              </linearGradient>
              <path
                d="M25 38.8l-13.4 7.1 2.5-14.5L1 17.2l14.6-2.1L25 1l5.4 14.1L45 17.2l-12.1 14.2 2.5 14.5z"
                fill="url(#half-fill)"
              />
              <path
                d="M25 38.8l-13.4 7.1 2.5-14.5L1 17.2l14.6-2.1L25 1l5.4 14.1L45 17.2l-12.1 14.2 2.5 14.5z"
                fill="none"
                stroke="currentColor"
              />
            </svg>
          )}
          <p className="my-auto mx-1">{props.review.rating} |</p>
          <p className="opacity-75">{props.review.dates}</p>
        </div>

        <p className="mt-4">{props.review.testimonial}</p>
      </div>
    </div>
  );
};
