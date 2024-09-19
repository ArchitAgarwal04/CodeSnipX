'use client'
import React from 'react'
import TopBar from './TopBar'
import { useGlobalContext } from '@/ContextApi'
import SwiperSelection from '../NotesArea/SwiperSelection'
import AllNotesSelection from '../NotesArea/AllNotesSelection'

function ContentArea() {

  const { darkModeObject: {darkMode} , } = useGlobalContext()
  return (
    <div className={`w-full h-full ${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"} p-5`}>
        <TopBar/>
        <div className='mt-5'>
          <SwiperSelection/>
          <AllNotesSelection/>
        </div>
    </div>
  )
}

export default ContentArea