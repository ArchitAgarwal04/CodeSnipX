'use client'
import React from 'react'
import TopBar from './TopBar'
import { useGlobalContext } from '@/ContextApi'

function ContentArea() {

  const { darkModeObject: {darkMode} , } = useGlobalContext()
  return (
    <div className={`h-full ${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"} p-5`}>
        <TopBar/>
    </div>
  )
}

export default ContentArea