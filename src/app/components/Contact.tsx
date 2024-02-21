'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import {
  CircleMenu,
  CircleMenuItem,
  TooltipPlacement,
} from 'react-circular-menu';

import {
  InboxIcon,
  ChatBubbleLeftEllipsisIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';

type Props = {};

const Contact = (props: Props) => {
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [messageContents, setMessageContents] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [messageSent, setMessageSent] = useState(false);
  const { scrollYProgress } = useScroll({
    target: testimonialsRef,
    offset: ['start end', '-25vh start'],
  });

  const submit = () => {
    // if (name && email && message) {
    //   const serviceId = 'service_neh1oii';
    //   const templateId = 'template_vdw3ffh';
    //   const userId = 'user_JcD1331LVSdIeKGHTgDqA';
    //   const templateParams = {
    //     name,
    //     email,
    //     message,
    //   };
    //   // If variable isn't set or input is missing, error will be console logged
    //   emailjs
    //     .send(serviceId, templateId, templateParams, userId)
    //     .then((response) => console.log(response))
    //     .then((error) => console.log(error));
    //   // After email has been sent, all variables are now set to blank again.
    //   setName('');
    //   setEmail('');
    //   setMessage('');
    //   setEmailSent(true);
    // } else {
    //   // if no data is input, error will alert user
    //   alert('Please fill in all fields.');
    // }
  };
  return (
    <div className="my-[10vh] align-middle  text-white w-full flex max-w-[1000px]  mx-auto">
      <div ref={testimonialsRef} className="relative h-fit w-fit  flex  ">
        <div
          // style={{
          //   x: useTransform(scrollYProgress, [0, 0.5], [-1000, 0]),
          //   opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
          // }}
          // transition={{
          //   duration: 2,
          //   delay: 0.5,
          //   ease: [0, 0.71, 0.2, 1.01],
          // }}
          className="relative">
          <h2 className="uppercase w-fit  text-[#bb84e8] text-7xl font-bold tracking-wide">
            Let's Work <br /> Together
          </h2>
        </div>
      </div>
      <div className="h-fit m-auto flex flex-grow flex-initial justify-center">
        {messageModalOpen ? (
          <div
            style={{ boxShadow: '0 5px 10px 0 #000' }}
            className=" items-center h-[450px] mx-8 m-auto p-10  bg-[#141625] rounded-xl flex-grow">
            <div className="h-full">
              <div className="flex flex-col gap-6 m-auto">
                {/* input fields for name and email */}
                <input
                  style={{
                    borderImage:
                      'linear-gradient(90deg,#4568dc,#b06ab3) 1 1 10%',
                  }}
                  className="p-2 bg-transparent border-[3px]"
                  type="text"
                  placeholder="Your Name"
                  value={messageContents.name}
                  onChange={(e) =>
                    setMessageContents({
                      ...messageContents,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  style={{
                    borderImage:
                      'linear-gradient(90deg,#4568dc,#b06ab3) 1 1 10%',
                  }}
                  className="p-2 bg-transparent border-[3px]"
                  type="email"
                  placeholder="Your email address"
                  value={messageContents.email}
                  onChange={(e) =>
                    setMessageContents({
                      ...messageContents,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="my-6">Message</div>
              {/* Input field for message */}
              <textarea
                style={{
                  borderImage: 'linear-gradient(90deg,#4568dc,#b06ab3) 1 1 10%',
                }}
                className="p-2 w-full bg-transparent border-[3px] h-1/3"
                placeholder="Your message"
                value={messageContents.message}
                onChange={(e) =>
                  setMessageContents({
                    ...messageContents,
                    message: e.target.value,
                  })
                }></textarea>
              <div className="flex gap-4 mx-auto w-fit">
                <button id="bn30" type="button" onClick={() => submit()}>
                  Send Message
                </button>
                <button
                  id="bn30"
                  type="button"
                  onClick={() => setMessageModalOpen(false)}
                  className="mt-4">
                  Cancel
                </button>
              </div>
              <span className={messageSent ? 'visible' : 'hidden'}>
                Thank you for your message, we will be in touch in no time!
              </span>
            </div>
          </div>
        ) : (
          <CircleMenu
            menuToggleElement={
              <button
                id="bn30"
                className="border-2   text-[#bb84e8] p-2 border-[#bb84e8] ">
                {/* <p className="text-lg">Contact</p> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12 m-auto">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </button>
            }
            startAngle={-90}
            rotationAngle={360}
            itemSize={2}
            radius={6}
            rotationAngleInclusive={false}>
            <CircleMenuItem
              style={{
                backgroundColor: '#292040',
                color: '#bb84e8',
                border: '1px solid #bb84e8',
              }}
              tooltip="Email: s.cuevas14@gmail.com"
              tooltipPlacement={TooltipPlacement.Top}>
              <Link
                href="mailto:s.cuevas14@gmail.com"
                className="w-full h-full">
                <InboxIcon />
              </Link>
            </CircleMenuItem>
            <CircleMenuItem
              style={{
                backgroundColor: '#292040',
                color: '#bb84e8',
                border: '1px solid #bb84e8',
              }}
              tooltipPlacement={TooltipPlacement.Right}
              onClick={() => setMessageModalOpen(true)}
              tooltip="Send a message">
              <ChatBubbleLeftEllipsisIcon />
            </CircleMenuItem>
            <CircleMenuItem
              style={{
                backgroundColor: '#292040',
                color: '#bb84e8',
                border: '1px solid #bb84e8',
              }}
              tooltipPlacement={TooltipPlacement.Bottom}
              tooltip="LinkedIn">
              <Link href="https://www.linkedin.com/in/luna-cuevas/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#bb84e8"
                  viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </CircleMenuItem>
            <CircleMenuItem
              style={{
                backgroundColor: '#292040',
                color: '#bb84e8',
                border: '1px solid #bb84e8',
              }}
              tooltipPlacement={TooltipPlacement.Left}
              tooltip="Github">
              <Link href="https://github.com/luna-cuevas">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#bb84e8"
                  viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-4.466 19.59c-.405.078-.534-.171-.534-.384v-2.195c0-.747-.262-1.233-.55-1.481 1.782-.198 3.654-.875 3.654-3.947 0-.874-.312-1.588-.823-2.147.082-.202.356-1.016-.079-2.117 0 0-.671-.215-2.198.82-.64-.18-1.324-.267-2.004-.271-.68.003-1.364.091-2.003.269-1.528-1.035-2.2-.82-2.2-.82-.434 1.102-.16 1.915-.077 2.118-.512.56-.824 1.273-.824 2.147 0 3.064 1.867 3.751 3.645 3.954-.229.2-.436.552-.508 1.07-.457.204-1.614.557-2.328-.666 0 0-.423-.768-1.227-.825 0 0-.78-.01-.055.487 0 0 .525.246.889 1.17 0 0 .463 1.428 2.688.944v1.489c0 .211-.129.459-.528.385-3.18-1.057-5.472-4.056-5.472-7.59 0-4.419 3.582-8 8-8s8 3.581 8 8c0 3.533-2.289 6.531-5.466 7.59z" />
                </svg>
              </Link>
            </CircleMenuItem>
          </CircleMenu>
        )}
      </div>
    </div>
  );
};

export default Contact;
