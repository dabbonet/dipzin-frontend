import React from 'react'
import { Button } from '@/components/Shared/button'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/UI/card'
import { Input } from '@/components/Shared/input'

const InviteModal = () => (
  <Card className="bg-slate-900 border-4 border-[#171f31] relative size-full rounded-3xl flex flex-col items-center text-white  ">
    {/* image */}
    <div className="w-full h-[200px] relative">
      <Image className="absolute top-0" width={750} height={220} src="/assets/thumb-print.svg" alt="thumb print visual" />
      <Image className="flex mx-auto backdrop-brightness-100" width={150} height={150} src="/assets/gem.svg" alt="gem" />
    </div>
    <CardContent className="flex flex-col items-center justify-center text-center gap-3">
      <h1 className=" text-slate-200 text-[40px] font-medium">
        Invite and get
        {' '}
        <span className=" text-[#14F3C5]">$20</span>
        {' '}
        discount
      </h1>
      <p className=" text-slate-300 text-base text-center">To Continue using your free trial of our premium features, please upgrade to our premium package.</p>
    </CardContent>
    <CardFooter className="w-full">
      <form className="w-full space-y-6 mt-6">
        <Input
          placeholder="email"
          className="w-full"
          endContent={
            <Button>Copy</Button>
      }
        />
        <div className="flex items-center justify-end">
          <Button
            variant="link"
            size="md"
          >
            skip
          </Button>
          <Button
            variant="link"
            className="text-white"
            size="md"
          >
            or social share
          </Button>
        </div>
      </form>
    </CardFooter>
  </Card>
)

export default InviteModal
