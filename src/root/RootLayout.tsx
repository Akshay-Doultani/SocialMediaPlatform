import Bottombar from '@/components/shared/Bottombar'
import Leftbar from '@/components/shared/Leftbar'
import Topbar from '@/components/shared/Topbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className="w-full flex flex-col md:flex-row">
      <Topbar />
      <Leftbar />

      <section className="flex-1 w-full">
        <Outlet />
      </section>

      <Bottombar />

    </div>
  )
}

export default RootLayout
