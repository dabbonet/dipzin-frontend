'use client'
import { useAuth } from '@/lib/auth'
import React from 'react'

const UserData = () => {
    const {user} = useAuth()
  return (
    user && <div className=' flex flex-col'>
        <h3>{user.name}</h3>
        <p>{user.userName}</p>
    </div>
  )
}

export default UserData