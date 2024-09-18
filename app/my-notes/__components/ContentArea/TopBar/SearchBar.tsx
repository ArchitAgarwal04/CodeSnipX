import React from 'react'
import { FaSearch } from "react-icons/fa";
import AddSnippetButton from './AddSnippetButton';

function Sidebar() {
  return (
    <div className='relative pl-3 w-[60%] h-[38px] bg-slate-100 rounded-3xl flex items-center gap-2'>
      <FaSearch className='text-purple-500 text-[13px]'/>
      <input 
          placeholder='Search a Snippet...'
          className='w-[70%] outline-none text-sm bg-slate-100 text-slate-500'
      /> 
      <AddSnippetButton/>   
             
    </div>
  );
}

export default Sidebar