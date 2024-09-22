import React from 'react';
import { IoLogoJavascript } from "react-icons/io";
import { MdDelete } from "react-icons/md";

function NoteFooter( {language } : { language: string}) {
  return (
    <div className='flex justify-between text-[13px] text-slate-400 mx-4 mt-3'>
        <div className='flex gap-1 items-center'>
            <IoLogoJavascript className='mb-[2px]' size={15} />
            <span>{ language }</span>
        </div>
        <MdDelete size={17} className='cursor-pointer'/>   
    </div>
  );
}

export default NoteFooter;
