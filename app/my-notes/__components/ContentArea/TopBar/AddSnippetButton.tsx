'use client'
import { useGlobalContext } from '@/ContextApi';
import React from 'react'
import { v4 as uuidv4 } from 'uuid';

function AddSnippetButton() {

  const { openContentNoteObject: {setOpenContentNote }, allNotesObject: { allNotes , setAllNotes} , selectedNoteObject: { setSelectedNote} ,} = useGlobalContext();

  function openTheContentNote(){
    const newSingleNote = {
      _id: uuidv4(),
      title: "",
      creationDate: "",
      tags: [],
      description: "",
      code: "",
      isFavourite: false,
      language: "",
    };

    setAllNotes([...allNotes, newSingleNote]);
    setSelectedNote(newSingleNote);
    setOpenContentNote(true);
  }
  return (
    <div className='absolute flex gap-1 px-2 rounded-3xl max-md:px-1 bg-purple-600 p-1 text-[13px] text-white top-[6px] right-[6px] items-center cursor-pointer select-none'>
        <div className='font-bold'>+</div>
        <div onClick= {openTheContentNote} className='max-md:hidden'>Snippet</div>
    </div>
  )
}

export default AddSnippetButton