'use client'
import { getUser, setToken } from '@/lib/auth'
import React, { useEffect, useState } from 'react'
import GoogleOneTapLogin  from 'react-google-one-tap-login'
import { toast } from 'react-hot-toast'

const GoogleOneTap = ({ children }) => {
  const [isUserAuth, setIsUserAuth] = useState(false)
  useEffect(() => {
    async function isUserAuthintcated() {
      const isAuthented = await getUser()
      if (isAuthented) {
        setIsUserAuth(true)
      }
    }
    isUserAuthintcated()
  }, [])
  
  
  const handleSuccess =  async (res) => {
    const cookies = document.cookie.split(";").map(x => {
      const [name, value] = x.trim().split("=");
      return { name, value };
    });
    const referralToken = cookies?.filter(x => x.name == 'referral-token')[0]?.value ?? null;
    try {
      const req = await fetch('/api/user/google-one-tap', {
        method: 'post',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          data: {
            email: res.email,
            name: res.name,
            referralCode: referralToken
          }
        })
      })
      const response = await req.json()
      if (req.ok) {
        setToken(response.token)
      }
    } catch (error) {
      toast.remove()
      toast.error('somthing went wrong')
    }
    }
      
    if (isUserAuth) {
      return <>
        {children}
      </>
  }
  return (
      <GoogleOneTapLogin googleAccountConfigs={{client_id: process.env.GOOGLE_CLIENT_ID}} onSuccess={handleSuccess}>
          {children}
    </GoogleOneTapLogin>
  )
}

export default GoogleOneTap