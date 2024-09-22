'use client'
import { useGlobalContext } from '@/ContextApi'
import React from 'react'
import NoteHeader from './NoteHeader'
import NoteDate from './NoteDate'
import NoteTags from './NoteTags'
import NotesDescription from './NotesDescription'
import CodeBlock from './CodeBlock'
import NoteFooter from './NoteFooter'
import { SingleNoteType } from '@/types'

function SingleNote( {note} : {note: SingleNoteType}) {

    const { darkModeObject: {darkMode} , } = useGlobalContext()
    const { openContentNoteObject: { openContentNote,setOpenContentNote}, } = useGlobalContext();

    const {title , creationDate , tags, description , code , isFavourite , language} = note;
  return (
    <div onClick={() => setOpenContentNote(!openContentNote)} className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : " bg-white"} ${ openContentNote ? "w-full" : "w-[380px]"} max-sm:w-full w-[400px] rounded-md py-4`}>
        <NoteHeader title={title} isFavourite={ isFavourite }/>
        <NoteDate creationDate={creationDate}/>
        <NoteTags tags={tags}/>
        <NotesDescription description={description}/>
        <CodeBlock language={language} code={ code }/>
        <NoteFooter language={ language }/>
    </div>
  )
}

export default SingleNote