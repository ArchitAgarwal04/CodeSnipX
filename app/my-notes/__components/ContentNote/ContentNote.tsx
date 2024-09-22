'use client'
import { useGlobalContext } from '@/ContextApi'
import { SingleNoteType } from '@/types';
import React, { useEffect, useState } from 'react'
import ContentNoteHeader from './ContentNoteHeader';

function ContentNote() {

    const { openContentNoteObject: { openContentNote,setOpenContentNote}, isNewNoteObject: { isNewNote, setIsNewNote}, allNotesObject: { allNotes , setAllNotes} , } = useGlobalContext();
    const { isMobileObject: { isMobile , setIsMobile}, } = useGlobalContext();
    const { selectedNoteObject : { selectedNote , setSelectedNote}, } = useGlobalContext();

    const [singleNote , setSingleNote] = useState<SingleNoteType | undefined>(
        undefined
    );

    useEffect(()=>{
        if(openContentNote){
            if(selectedNote){
                setSingleNote(selectedNote)
            }
        }
    },[openContentNote,selectedNote]);

    useEffect(() => {
        if(isNewNote){
            if(singleNote && singleNote.title !== ""){
                setAllNotes([...allNotes, singleNote])
                setIsNewNote(false);
            }
        }
    },[singleNote])
  return (
    <div className={` ${ isMobile ? "w-4/5" : "w-1/2"} z-50 bg-white p-3 rounded-lg ${openContentNote ? "block" : "hidden"} h-[700px] ${
        isMobile ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : "" }`}>
       { singleNote && ( <ContentNoteHeader singleNote={singleNote} setSingleNote={setSingleNote} />)}
        <div onClick={() => setOpenContentNote(false)}> close </div>
    </div>
  )
}

export default ContentNote