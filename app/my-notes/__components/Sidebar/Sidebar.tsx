'use client'
import Logo from '@/components/Logo'
import React from 'react'
import QuickLinks from './QuickLinks'
import Languages from './Languages'
import { useGlobalContext } from '@/ContextApi'

function Sidebar() {

  const { darkModeObject: {darkMode} , } = useGlobalContext()
  return (
    <div className={`w-full p-5 flex flex-col gap-2 h-screen pt-7 ${darkMode[1].isSelected ? "bg-slate-800" : "bg-white"}`}>
        <Logo/>
        <QuickLinks/>
        <Languages />
    </div>
  )
}

export default Sidebar