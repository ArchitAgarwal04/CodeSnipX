'use client'

import React from 'react';
import { Button } from './ui/button';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';

const Buttons = () => {

  const { userId } = useAuth();
  return (
    <div className="max-sm:w-full">
      {userId ? (
        <Link href="/my-notes">
          <Button className='max-sm:w-full bg-mainColor p-[8px] text-sm  text-white rounded-md'>
            Access To The App
          </Button>
        </Link>
      ) :(
        <div className="flex gap-2 max-sm:flex-col max-sm:w-f max-sm:mt-8">
        
          <Button
            className="bg-mainColor text-white border border-transparent hover:bg-white hover:text-mainColor transition-colors duration-300 p-[8px] px-6 rounded-md"
          >
            <Link href="/sign-in">Sign In</Link>
          </Button>

            <Button
              className="text-mainColor border border-mainColor bg-white hover:bg-mainColor hover:text-white transition-colors duration-300 p-[8px] px-6 rounded-md"
            >
              <Link href="/sign-up"> Sign Up </Link>
            </Button>
      </div>
      )}
    </div>
  );
};

export default Buttons;
