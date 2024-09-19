import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Sidebar from './__components/Sidebar/Sidebar'
import ContentArea from './__components/ContentArea/TopBar/ContentArea'

function Page() {
  return (
    <div className="flex h-screen">
      <Sidebar/>
      <ContentArea />
    </div>
  )
}

export default Page
