'use client'
import { getUser, setToken } from '@/lib/auth'
import React, { useEffect, useState } from 'react'
import GoogleOneTapLogin  from 'react-google-one-tap-login'
import { toast } from 'react-hot-toast'
import { invetaionAndReferralTokens } from './AccessComponent'

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
    const {referralToken , invitationToken} = invetaionAndReferralTokens()
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
            referralCode: referralToken,
            invitationToken: invitationToken
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
      <GoogleOneTapLogin googleAccountConfigs={{client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}} onSuccess={handleSuccess}>
          {children}
    </GoogleOneTapLogin>
  )
}

export default GoogleOneTap