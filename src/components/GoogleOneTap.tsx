'use client'
import {  setToken, useAuth } from '@/lib/auth'
import { invetaionAndReferralTokens } from '@/lib/tokens'
import React from 'react'
import GoogleOneTapLogin  from 'react-google-one-tap-login'
import { toast } from 'react-hot-toast'


const GoogleOneTap = ({ children }) => {
  const {user} = useAuth()
  
  
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
      
    if (user) {
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