'use client'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
    const params = useSearchParams()
    
  return (
    <div>page</div>
  )
}

export default page