'use client'
import { useGlobalContext } from '@/ContextApi';
import React from 'react'
import { MdFavoriteBorder } from "react-icons/md";
function NoteHeader({title , isFavourite,} : {title: string; isFavourite: boolean;}) {

  const { openContentNoteObject: {setOpenContentNote}, } = useGlobalContext();
  return (
    <div className='flex justify-between mx-4'>
        <span onClick={() => setOpenContentNote( true )} className='font-bold text-lg w-[87%] cursor-pointer hover:text-purple-600'>
            {title}
        </span>
        <MdFavoriteBorder className='text-slate-400 cursor-pointer '/>


    </div>
  )
}

export default NoteHeader