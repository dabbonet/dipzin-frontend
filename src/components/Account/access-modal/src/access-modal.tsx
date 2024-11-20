"use client";

import React, { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"; // Import Zod
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/Shared/input";
import { Button } from "@/components/Shared/button";
import { useRouter } from "next/navigation";
import { generateOtp } from "@/utils/auth/generateOtp";
import { Logo } from "@/components/UI/logo";
import { useToast } from "@/hooks/use-toast";

// Zod schema to validate email
const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
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
        description:
          "An error occurred while sending the OTP. Please try again.",
      });
    } finally {
      setIsLoading(false); // Set loading to false after the request is completed
    }
  };

  return (
    <main
      className="mx-auto size-full"
      role="main"
      aria-labelledby="access-modal-title"
    >
      <header className="w-full h-fit items-center p-4 md:p-0 text-center md:text-start md:justify-start space-y-1 mb-2 sm:mb-7">
        <h1
          className="font-medium leading-normal sm:font-bold text-2xl lg:text-4xl"
        >
          Login in to your account
        </h1>
        <p className="text-white/60 font-light text-sm sm:text-base">
          Welcome back! Please enter your details.
        </p>
      </header>
      <div className="flex gap-3 sm:gap-[26px] flex-col-reverse md:flex-col">
        <div className="flex gap-3 sm:gap-[26px] flex-col-reverse md:flex-col">
          <section
            aria-labelledby="third-party-login"
            className="flex flex-row items-center justify-center w-full space-x-3 mb-3 mx-auto font-medium"
          >
            <Button
              href="#"
              variant="strocked"
              size="2xl"
              aria-label="Continue with Google"
            >
              <Logo.Google className="size-6 sm:size-8 shrink-0" />
              <p className="hidden sm:flex">Continue with Google</p>
            </Button>

            <Button
              href="#"
              variant="strocked"
              size="2xl"
              aria-label="Continue with Facebook"
            >
              <Logo.Facebook className="size-6 sm:size-8 shrink-0" />
              <p className="hidden sm:flex">Continue with Facebook</p>
            </Button>
          </section>

          <div
            className="flex flex-row items-center justify-center gap-[3px] w-[130px] mx-auto"
            aria-label="or continue with email"
          >
            <span className="bg-gray-700 h-px w-full" aria-hidden="true" />
            <p className="text-gray-700" id="or-text">
              OR
            </p>
            <span className="bg-gray-700 h-px w-full" aria-hidden="true" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 sm:space-y-6 z-0"
          aria-labelledby="email-form-title"
        >
          <Input
            id="email"
            placeholder="enter your Email"
            label="Email"
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
            fullWidth
            loading={isLoading}
            aria-busy={isLoading}
          >
            Send Code
          </Button>
        </form>
      </div>
    </main>
  );
};

export default AccessModal;
