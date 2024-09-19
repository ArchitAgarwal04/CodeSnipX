'use client'
import { useGlobalContext } from '@/ContextApi';
import React from 'react'
import { IoMenuSharp } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
function SideBarMenuIcon() {

   const { openSideBarObject: { openSideBar , setOpenSideBar}, } = useGlobalContext();
  return (
    <>
    {!openSideBar ? (
        <IoMenuSharp onClick={() => setOpenSideBar(!openSideBar)} className='text-slate-500 cursor-pointer hidden max-md:block'/>
     ):(
        <IoCloseOutline onClick={() => setOpenSideBar(!openSideBar)} className='text-slate-500 cursor-pointer hidden max-md:block' />
     )
     }
  </>

  )
}

export default SideBarMenuIcon