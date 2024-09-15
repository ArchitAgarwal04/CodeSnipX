import React from 'react'
import Logo from './Logo'
import Buttons from './Buttons'

function Navbar() {
  return (
    <div className='flex m-5 max-sm:mt-9 mx-8 items-center justify-between max-sm:flex-col'>
        <Logo/>
        <Buttons/>
    </div>
  )
}

export default Navbar