'use client'
import React from 'react'
import DarkMode from '../../TopBar/DarkMode'
import { useGlobalContext } from '@/ContextApi'

function NotesDescription( { description } : { description: string}) {

    const { darkModeObject: {darkMode} , } = useGlobalContext()
  return (
    <div className={`${ darkMode[1].isSelected ? "text-slate-300" : ""} text-slate-600 text-[13px] mt-4 mx-4`}>
        { description }
    </div>
  )
}

export default NotesDescription