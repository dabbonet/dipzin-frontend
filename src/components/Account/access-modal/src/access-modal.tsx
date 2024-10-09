'use client'

import React, { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"; // Import Zod
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Shared/input";
import { Button } from "@/components/Shared/button";
import { useToast } from "@/components/Shared/toaster";
import { useRouter } from "next/navigation";
import { generateOtp } from "@/utils/auth/generateOtp";
import { Logo } from "@/components/UI/logo";

// Zod schema to validate email
const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email({ message: "Invalid email address" }),
});

type FormValues = z.infer<typeof schema>; // Infer type from schema

const AccessModal = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false); // Loading state for the button

  // Initialize useForm with zodResolver and schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setIsLoading(true); // Set loading to true when sending the email
    const email = formData.email?.trim() || ""; // Ensure email is defined and sanitized
    if (!email) {
      toast({
        variant: "error",
        title: "Error",
        description: "Email is required",
      });
      setIsLoading(false); // Set loading to false if validation fails
      return;
    }

    try {
      await generateOtp(email);
      toast({
        variant: "success",
        title: "Email sent",
      });
      router.push(`/access/otp?email=${encodeURIComponent(email)}`);
    } catch (error) {
      toast({
        variant: "error",
        title: "Failed to send OTP",
        description: "An error occurred while sending the OTP. Please try again.",
      });
    } finally {
      setIsLoading(false); // Set loading to false after the request is completed
    }
  };

  return (
    <main className="mx-auto size-full" role="main" aria-labelledby="access-modal-title">
      <div className="space-y-[26px] z-10 opacity-100 ">
        <header className="space-y-1">
          <h1 id="access-modal-title" className="font-bold !leading-normal bg-clip-text lg:text-4xl text-xl">
            Login or Signup
          </h1>
          <p className="text-[#d8d3c0] font-light lg:text-base text-sm mb-7">
            Welcome back! Please enter your details.
          </p>
        </header>

        <section aria-labelledby="third-party-login">
          <div className="flex flex-col xl:flex-row mt-4 w-full space-y-3 xl:space-y-0 xl:space-x-3 mx-auto font-medium">
            <Button
              href="#"
              variant="strocked"
              size="2xl"
              className="w-full flex gap-4 items-center justify-center"
              aria-label="Continue with Google"
            >
              <Logo.Google />
              Continue with Google
            </Button>

            <Button
              href="#"
              variant="strocked"
              size="2xl"
              className="w-full flex gap-4 items-center justify-center"
              aria-label="Continue with Facebook"
            >
              <Logo.Facebook />
              Continue with Facebook
            </Button>
          </div>
        </section>
      </div>

      <div className="flex flex-row items-center justify-center gap-[3px] w-[130px] mx-auto z-20 my-6" aria-label="or continue with email">
        <span className="bg-gray-700 h-px w-full" aria-hidden="true" />
        <p className="text-gray-700" id="or-text">OR</p>
        <span className="bg-gray-700 h-px w-full" aria-hidden="true" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 z-0" aria-labelledby="email-form-title">
        <Input
          id="email"
          className="w-full h-[56px]"
          placeholder="Email"
          state={errors.email ? "error" : "default"}
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? "email-error" : undefined}
          helpText={errors.email?.message ? errors.email.message : ""}
          errorMessage={errors.email ? errors.email.message : ""}
          {...register("email")}
          type="default"
        />

        <Button
          type="submit"
          size="2xl"
          className="w-full flex items-center justify-center"
          loading={isLoading}
          aria-busy={isLoading}
        >
          Submit Email
        </Button>
      </form>
    </main>
  );
};

export default AccessModal;
