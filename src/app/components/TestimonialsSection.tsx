'use client';
import Image from 'next/image';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReviewsCard } from './ReviewsCard';
import CarouselPage from './Carousel';

type Props = {};

const TestimonialsSection = (props: Props) => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: testimonialsRef,
    offset: ['start end', '-25vh start'],
  });
  return (
    <div className="mt-[10vh] text-white w-full flex max-w-[1000px] flex-wrap mx-auto">
      <div
        ref={testimonialsRef}
        className="relative h-fit  flex justify-between w-full">
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0, 0.5], [-1000, 0]),
            opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="relative">
          <h2 className="uppercase text-[#292040] text-8xl font-bold tracking-wide">
            Testimonials
          </h2>
          <p className="absolute text-right right-0 bottom-2 font-light w-2/3 text-sm text-white">
            What people are saying about me
          </p>
        </motion.div>
        <motion.div
          style={{
            x: useTransform(scrollYProgress, [0, 0.5], [1000, 0]),
            opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
          className="my-auto">
          <Image
            src="/images/reviews-icon.png"
            alt="Skills"
            width={80}
            height={80}
          />
        </motion.div>
      </div>
      <motion.div
        ref={testimonialsRef}
        style={{
          y: useTransform(scrollYProgress, [0, 0.5], [1000, 0]),
          opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
        }}
        className="relative flex mt-12 items-center justify-center m-auto h-[40vh] w-full">
        <CarouselPage
          itemsPerSlide={1}
          reviews={[
            {
              name: 'Dave',
              dates: 'Dec 17, 2023 - Jan 23, 2024',
              jobTitle: ' Full Stack SaaS work using Next.js/Prisma/Tailwind',
              title: 'CEO',
              company: 'Rolldeep',
              testimonial:
                'I hired Luna to improve the admin section of my travel application. She was able to get up and running in my codebase quickly. With very little visual design from me, she was able to elevate complex sections of my admin system from very basic and raw screens to beautifully designed and usable interfaces. I highly recommend working with he. I will be recaching out to her as I have more work to be done',
              rating: 5,
            },
            {
              name: 'Carlos Roldan',
              dates: 'Apr 9, 2023 - Jan 20, 2024',
              jobTitle: 'Part-Time Web Developer for Medical Lab',
              title: 'CEO',
              company: 'Company',
              testimonial:
                'I had change developers many times encountering many problems, finding Luna via upwork made the difference. The job was done quickly and professional. the comunication was constant and direct. What a pleasant way of working.',
              rating: 4.85,
            },
            {
              name: 'Jazz N Print',
              title: 'CEO',
              dates: 'Oct 20, 2021 - Nov 17, 2021',
              jobTitle: 'CSS Customization',
              company: 'Company',
              testimonial:
                'It is truly a pleasure to work with Luna, I truly appreciate a person with great integrity and confidence in their skills. Luna is a great communicator and a person you can trust. She got back to me quickly with a proposal and only after researching the platform and understanding the feasibility of the project. In addition to her technical skills, Luna has a great artistic side and a solid sense of marketing. Luna has exceeded my expectations by enhancing the look and esthetics of the site we were customizing. It is great to have such a talent and a person you can trust on your side. thank you for a job well done!',
              rating: 5,
            },
            {
              name: 'Cordelia',
              dates: 'Dec 10, 2020 - Feb 28, 2021',
              jobTitle: 'Front End Developer for Social Media Content',
              title: 'CEO',
              company: 'Cordelia Media',
              testimonial:
                'I hired Luna to build a web portfolio for my social media content. The website they build for me was effective, informative, well designed, and fit my personal brand very well! I appreciate their attention to detail and they care and consolation of my brand voice. Luna also completed this task in a very timely manner despite there being no deadline from me. 10/10 recommend this kind & very smart developer',
              rating: 5,
            },
          ]}
        />
      </motion.div>
    </div>
  );
};

export default TestimonialsSection;
