'use client';

import { Button } from '@/components/Shared/button';
import { InputOTP, InputOTPSlot } from '@/components/Shared/input';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useToast } from '@/components/Shared/toaster/src/use-toast';
import { generateOtp } from '@/utils/auth/generateOtp';

type OtpVariant = 'default' | 'error' | 'success' | null | undefined;

const OtpModal = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const { toast } = useToast();
  const [otpValue, setOtpValue] = useState('');
  const [variant, setVariant] = useState<OtpVariant>('default');
  const [isVerifying, setIsVerifying] = useState(false); // Loading state for verification
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    if (!email) {
      toast({
        variant: 'error',
        title: 'Email is missing in the URL',
        duration: 1000,
      });
      return;
    }

    setIsVerifying(true); // Set loading state to true

    try {
      const result = await signIn('credentials', {
        email,
        otp: parseInt(otpValue, 10),
        redirect: false,
      });

      if (result?.error || result?.status !== 200) {
        toast({
          variant: 'error',
          title: 'Verification Failed',
          description: 'Invalid OTP',
          duration: 1000,
        });
        setVariant('error');
      } else if (result?.ok) {
        toast({
          variant: 'success',
          title: "OTP Verified! You're logged in.",
          duration: 1000,
        });
        setVariant('success');
      }
    } catch (error) {
      toast({
        variant: 'error',
        title: 'An error occurred during verification',
        duration: 1000,
      });
      setVariant('error');
    } finally {
      setIsVerifying(false); // Reset loading state to false after verification
    }
  };

  // Function to handle OTP resend
  const onResend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        variant: 'error',
        title: 'Email is missing in the URL',
        duration: 1000,
      });
      return;
    }

    try {
      await generateOtp(email); // Call the generateOtp function to send a new OTP

      toast({
        variant: 'success',
        title: 'OTP Resent!',
        description: 'A new OTP has been sent to your email.',
        duration: 1000,
      });
      setVariant('default'); // Reset variant to default
    } catch (error) {
      toast({
        variant: 'error',
        title: 'Failed to resend OTP',
        description: 'An error occurred while resending the OTP. Please try again.',
        duration: 1000,
      });
    }
  };

  return (
    <div className="size-full rounded-[20px] flex flex-col justify-center gap-8 text-white font-outfit ">
      <div className="space-y-1">
        <h1 className="font-bold !leading-normal bg-clip-text lg:text-4xl text-xl">
          Account Verification
        </h1>
        <p className="text-[#d8d3c0] font-light lg:text-base text-sm mb-7">
          Welcome back! Please enter your details.

        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 ">
        <InputOTP
          maxLength={6}
          value={otpValue}
          onChange={(value) => setOtpValue(value)}
        >
          {Array.from({ length: 6 }, (_, index) => (
            <InputOTPSlot
              variant={variant}
              key={index}
              index={index}
            />
          ))}
        </InputOTP>

        <Button loading={isVerifying} type="submit" size="2xl" className="w-full flex items-center justify-center" disabled={isVerifying}>
          Verify
        </Button>
      </form>

      <div className="flex gap-x-3">
        <p className="text-[#d8d3c0] text-lg font-normal font-['Poppins'] leading-snug">Didn’t get the code ?</p>
        <form onSubmit={onResend}>
          <button type="submit" className="text-[#00dbae] text-lg font-normal font-['Poppins'] leading-snug cursor-pointer">
            Resend
          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpModal;
