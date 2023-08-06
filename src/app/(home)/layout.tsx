import Banner from '@/components/Banner'
import HomeNavigator from '@/components/HomeNavigator'
import React from 'react'

const layout = ({children}) => {
  return (
    <main>
        <Banner />
        <HomeNavigator/>
        {children}
    </main>
  )
}

export default layout
