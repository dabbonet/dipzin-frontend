"use client";

import { verifyOtp } from '@/components/Account/access-modal/src/actions/sign-in-provider';
import { Button } from '@/components/Shared/button';
import { InputOTP, InputOTPSlot } from '@/components/Shared/input';
import { toast } from '@/components/Shared/toaster';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const Otp = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email'); // Get email from query params

  const [otpValue, setOtpValue] = useState(''); // Manage OTP state with useState
  const { handleSubmit } = useForm(); // Initialize useForm for form handling

  const onSubmit = async () => {
    if (!email) {
      toast({
        variant: "error",
        title: "Email is missing in the URL",
      });
      return;
    }

    try {
      const data = await verifyOtp(email, parseInt(otpValue, 10)); // Call verifyOtp function
      const { token } = await data.json()
      // console.log(token);
      if (token) { // TODO : Check if token is valid
        toast({
          variant: "success",
          title: "OTP Verified!",
        });
        // Uncomment and use router.push for navigation after OTP verification
        // router.push(`/access/otp?email=${encodeURIComponent(email)}`);
      } else {
        toast({
          variant: "error",
          title: "Verification Failed",
          description: token.error,
        });
      }
    } catch (error) {
      // console.error("Verification error:", error);
      toast({
        variant: "error",
        title: "An error occurred during verification",
      });
    }
  };

  return (
    <div className="bg-[#000] p-16 rounded-[20px] flex flex-col gap-10 text-white font-outfit ">
      <div className="space-y-[26px] ">
        <div className="space-y-3">
          <h1 className="font-semibold lg:text-[40px] text-3xl">OTP Check</h1>
          <p className="text-[#D8D3C0] lg:text-lg text-sm">Enter The OTP.</p>
        </div>
      </div>

      <InputOTP
        maxLength={6}
        variant="error"
        value={otpValue} // Use value from state
        onChange={(value) => setOtpValue(value)}
      >
        {Array.from({ length: 6 }, (_, index) => (
          <InputOTPSlot variant="default" key={index} index={index} />
        ))}
      </InputOTP>
      <form onSubmit={handleSubmit(onSubmit)}>

        <Button type="submit" size="3xl" className="w-full">
          Send Code
        </Button>
      </form>
    </div>
  );
};

export default Otp;
