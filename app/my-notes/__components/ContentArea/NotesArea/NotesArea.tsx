'use client'
import { useGlobalContext } from '@/ContextApi';
import React from 'react'
import SwiperSelection from './SwiperSelection';
import AllNotesSelection from './AllNotesSelection';
import ContentNote from '../../ContentNote/ContentNote';

function NotesArea() {

    const { openContentNoteObject: { openContentNote}, } = useGlobalContext();
    const { isMobileObject: { isMobile}, } = useGlobalContext();
  return (
    <div className='flex gap-2 mt-5 border'>
        <div className={`${openContentNote ? `${isMobile ? "w-full" : "w-[50%]"}` : "w-full"}`}>
            <SwiperSelection/>
            <AllNotesSelection/>
        </div>
        <ContentNote/>
    </div>
  )
}

export default NotesArea