import { useGlobalContext } from '@/ContextApi';
import { SingleNoteType } from '@/types';
import React from 'react';

function ContentNoteHeader({ 
  singleNote, 
  setSingleNote 
}: { 
  singleNote: SingleNoteType; 
  setSingleNote: React.Dispatch<React.SetStateAction<SingleNoteType | undefined>>; 
}) {
  
  const { allNotesObject: { allNotes, setAllNotes } } = useGlobalContext();

  function onUpdateTitle(event: React.ChangeEvent<HTMLInputElement>){
    const newSingleNote = { ...singleNote, title: event.target.value };
    setSingleNote(newSingleNote);

    const newAllNotes = allNotes.map((note) => {
      // Properly return either the updated note or the original note
      if (note._id === singleNote._id) {
        return newSingleNote;  // Update the matched note
      }
      return note;  // Return the unchanged note if id doesn't match
    });

    setAllNotes(newAllNotes);
  }

  return (
    <input 
      placeholder="New Title.." 
      value={singleNote.title} 
      onChange={onUpdateTitle} 
    />
  );
}

export default ContentNoteHeader;
