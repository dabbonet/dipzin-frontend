import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/Shared/button'
import { Logo } from '@/components/UI/logo'

const Enjoy = () => (
  <div className="w-screen h-screen flex items-center text-center justify-center">
    <a className="text-[#C9FFED] size-fit absolute inset-0 top-5 mr-auto px-4 pt-5 md:px-8 md:pt-7" href="/" aria-label="Home">
      <Logo.Dipzin className="text-white" />
    </a>
    <div className="size-full flex flex-col items-center text-center justify-center max-w-screen-sm">
      <Image className="flex mx-auto backdrop-brightness-100" width={150} height={150} src="/assets/gem.svg" alt="gem" />
      <h1 className="text-2xl sm:text-4xl font-medium sm:font-semibold mb-2">
        All Set! Kick Off with a Free Trial
      </h1>
      <p className="text-slate-400 text-base sm:text-lg">
        Congratulations on completing your profile! Now it&apos;s time to explore Dipzin&apos;s vast collection of mobile app designs from the best teams worldwide. Click Start Your Free Trial below and enjoy a personalized, inspiring experience. Happy browsing!
      </p>
      <Button href="/" size="xl" className="w-[150px] mt-4">Try It Now</Button>
    </div>
    <Button variant="ghost" className="h-fit text-[#C9FFED] absolute left-1/2 -translate-x-1/2 bottom-5">Invite to Dipzin 💰</Button>
  </div>
)

export default Enjoy
