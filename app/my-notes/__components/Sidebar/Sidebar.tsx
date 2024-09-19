'use client'
import Logo from '@/components/Logo'
import React from 'react'
import QuickLinks from './QuickLinks'
import Languages from './Languages'
import { useGlobalContext } from '@/ContextApi'

function Sidebar() {


  const { darkModeObject: {darkMode} , openSideBarObject: { openSideBar , setOpenSideBar},} = useGlobalContext()
  return (
    <div className={` ${ openSideBar ? " fixed z-50 shadow-lg" : "max-md:hidden"} pr-10 p-6  flex flex-col gap-2 h-screen pt-7 ${darkMode[1].isSelected ? "bg-slate-800" : "bg-white"}`}>
        <Logo/>
        <QuickLinks/>
        <Languages />
    </div>
  )
}

export default Sidebar