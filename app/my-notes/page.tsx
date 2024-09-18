import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Sidebar from './__components/Sidebar/Sidebar'
import ContentArea from './__components/ContentArea/TopBar/ContentArea'

function Page() {
  return (
    <div className="flex h-screen">
      <div className="w-[20%] h-full border-r bg-white">
        <Sidebar />
      </div>

      {/* Content Area Section */}
      <div className="flex-grow h-full">
        <ContentArea />
      </div>
    </div>
  )
}

export default Page
