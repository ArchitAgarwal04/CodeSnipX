import React from 'react'
import { IoLogoJavascript } from "react-icons/io";
import { FaPython } from "react-icons/fa6";
import { SiTypescript } from "react-icons/si";

function Languages() {
  return (
    <div className='mt-12 text-sm'>
        <div className="font-bold text-slate-400">Languages</div>
        <div className='mt-5 ml-2 text-slate-400 flex flex-col gap-4'>
            <div className='flex justify-between'>
                <div className='flex gap-1 items-center'>
                    <IoLogoJavascript /> Javascript
                </div>
                <span className='font-bold'>3</span>
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-1 items-center'>
                    <FaPython /> Python
                </div>
                <span className='font-bold'>5</span>
            </div>

            <div className='flex justify-between'>
                <div className='flex gap-1 items-center'>
                    <SiTypescript /> Typescript
                </div>
                <span className='font-bold'>10</span>
            </div>

        </div>
    </div>
  )
}

export default Languages