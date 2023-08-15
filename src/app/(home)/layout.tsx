import Banner from '@/components/Banner'
import HomeNavigator from '@/components/HomeNavigator'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const layout = ({children}) => {
  return (
    <main>
        <Banner />
        <HomeNavigator/>
        <Toaster position='bottom-right'/>
        {children}
    </main>
  )
}

export default layout
