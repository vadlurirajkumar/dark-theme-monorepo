import React from 'react'
import dynamic from 'next/dynamic'

const HomeWrapper = dynamic(() => import("@/app/(user)/layout"), {});
const Dashboard = dynamic(() => import("@/app/(user)/dashboard/page"))
const Home = () => {
  return (
    <HomeWrapper>
      <Dashboard />
    </HomeWrapper>
  )
}

export default Home