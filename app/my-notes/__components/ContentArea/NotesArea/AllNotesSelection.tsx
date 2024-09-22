'use client'
import React from 'react'
import SingleNote from './Notes/SingleNote'
import { useGlobalContext } from '@/ContextApi'

function AllNotesSelection() {

  const { allNotesObject: {  allNotes }, } = useGlobalContext();
  return (
    <div className='mt-5 flex flex-wrap  gap-4'>
      { allNotes.map((note,index) => (
        <div key={index}>
          <SingleNote note={note} />
        </div>
      ))}
     
    </div>
  )
}

export default AllNotesSelection