import { PiBracketsCurlyBold } from "react-icons/pi";
import React from 'react';

function Logo() {
  return (
    <div className='flex gap-2 items-center'>
     
      <div  className='p-[6px] bg-purple-600 rounded-md'>
        <PiBracketsCurlyBold size={27} color="white" />
      </div>

      <div className='flex gap-1 text-[19px]'>
        <span className="font-bold text text-purple-600">Code</span>
        <span className='text-slate-400'>Snipx</span>
      </div>
    </div>
  );
}

export default Logo;
