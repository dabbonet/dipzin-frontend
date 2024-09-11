import React from 'react'
import { OtpModal } from '@/components/Account/otp-modal'
import { Card } from '@/components/UI/card';

const Email404 = () => (
  <Card className="size-full flex flex-col items-center justify-center space-y-3 text-yellow-200">
    <h1 className="text-2xl">
      Email not found
    </h1>
    <p>Please go back and enter your email again.</p>
  </Card>
)

const page = ({
  searchParams,
}: {
  searchParams: { email: string };
}) => (searchParams.email ? <OtpModal email={searchParams.email} /> : <Email404 />)

export default page
