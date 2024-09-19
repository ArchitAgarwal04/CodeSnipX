'use client'
import React from 'react'
import ProfileUser from './ProfileUser'
import SearchBar from './SearchBar'
import DarkMode from './DarkMode'
import { useGlobalContext } from '@/ContextApi'
import SideBarMenuIcon from './SideBarMenuIcon'

function TopBar() {

  const { darkModeObject: {darkMode} , } = useGlobalContext()
  
  return (
    <div className={` ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white text-black"} rounded-lg flex justify-between items-center p-3 `}>
        <ProfileUser/>
        <SearchBar/>
        <div className='flex gap-4 items-center'>
          <DarkMode/>
          <SideBarMenuIcon/>
        </div>
    </div>
  )
}

export default TopBar
