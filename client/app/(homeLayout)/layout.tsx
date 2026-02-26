import AsideBar from '@/components/layout/asidebar/asideBar';
import BottomBar from "@/components/layout/bottomBar"
import SuggestedPeopleList from '@/components/layout/SuggestedPeopleList';
import TrendingList from '@/components/layout/trendingList';
import HomeSearchBar from '@/components/ui/home/HomeSearchBar';
import React from 'react'
import { isDesktop } from "react-device-detect"
function layout({ children }: { children: React.ReactNode; }) {
  return (
    <div className='w-screen flex justify-center gap-3 px-1'>
      <AsideBar />
      <section className='w-full max-w-xl min-h-screen border-x-[1px] border-solid border-zinc-600 '>
        {children}
        <BottomBar />
      </section>
      {isDesktop && <section className="hidden lg:flex  w-80 p-2  gap-3 flex-col max-h-screen">
        {/* search bar */}
        <HomeSearchBar />
        {/* Trending now What’s happening */}
        <TrendingList />
        {/* Suggested people */}
        <SuggestedPeopleList />
      </section>}
    </div>
  )
}

export default layout