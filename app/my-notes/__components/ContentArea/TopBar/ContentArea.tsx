'use client'
import React from 'react'
import TopBar from './TopBar'
import { useGlobalContext } from '@/ContextApi'
import NotesArea from '../NotesArea/NotesArea'

function ContentArea() {
  const { darkModeObject: { darkMode } } = useGlobalContext()
  return (
    <div className={`w-full h-full ${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"} p-5 overflow-auto`}>
      <TopBar />
      <NotesArea/>
    </div>
  )
}

export default ContentArea
