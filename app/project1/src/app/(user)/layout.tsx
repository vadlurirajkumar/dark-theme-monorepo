"use client"
import React, { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

const HomeWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className='d-flex'>
      <div className="">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      </div>
      <div className="w-100" style={{ marginLeft: isCollapsed ? "65px" : "250px", transition: "width 0.3s" }}>
        <Header />
        <div className="m-2 p-1">
          <main>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default HomeWrapper