'use client'
import React from 'react'
import ProfileUser from './ProfileUser'
import SearchBar from './SearchBar'
import DarkMode from './DarkMode'
import { useGlobalContext } from '@/ContextApi'

function TopBar() {

  const { darkModeObject: {darkMode} , } = useGlobalContext()
  
  return (
    <div className={` ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white text-black"} rounded-lg flex justify-between items-center p-3 `}>
        <ProfileUser/>
        <SearchBar/>
        <DarkMode/>
    </div>
  )
}

export default TopBar