import React from 'react'

function NoteDate({creationDate} : {creationDate: string}) {
  return (
    <div className='text-slate-500 text-[11px] flex gap-1 font-light mx-4 mt-1'>
        <span>{ creationDate }</span>
    </div>
  )
}

export default NoteDate