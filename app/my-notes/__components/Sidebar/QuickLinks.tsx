'use client'

import React from 'react'
import { useGlobalContext } from '@/ContextApi';

function QuickLinks() {

    const { sideBarMenuObject: {sideBarMenu , setSideBarMenu} } = useGlobalContext();

    console.log(sideBarMenu);
    
    function clickedMenu(index: number){
        const updatedSideBarMenu = sideBarMenu.map((menu,i) => {
            return {...menu, isSelected: i === index};  // Select the clicked menu and deselect others
        });

        setSideBarMenu(updatedSideBarMenu);
    }

    return (
        <div className='mt-20 text-sm'>
          <div className='font-bold text-slate-400'>Quick Links</div>
          <ul className='text-slate-400 mt-4 flex flex-col gap-2'>
            {sideBarMenu.map((menu, index) => (
              <li
                key={index}
                onClick={() => clickedMenu(index)}
                // Apply 'bg-purple-600 text-white' conditionally if menu.isSelected is true
                className={`flex gap-1 items-center p-[7px] px-2 rounded-md w-[60%] ${menu.isSelected ? 'bg-purple-600 text-white' : ''}`}
              >
                {menu.icons}
                <span>{menu.name}</span>
              </li>
            ))}
          </ul>
        </div>
      );
      
}

export default QuickLinks;
