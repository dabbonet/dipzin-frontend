'use client'
import React from 'react'
import { useGoogleOneTapLogin } from 'react-google-one-tap-login'

const GoogleOneTap = ({ children }) => {
    useGoogleOneTapLogin({
        googleAccountConfigs:{
          client_id: '240831230179-e7t797p09bh0bdhhk9gm5bt45cdddmt2.apps.googleusercontent.com'
        },
        onSuccess: (res)=> console.log(res)
      })
  return (
      <>
          {children}
    </>
  )
}

export default GoogleOneTap