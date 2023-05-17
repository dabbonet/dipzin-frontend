"use client";
import AccessComponent from "@/components/AccessComponent";

import { setToken, SignIn } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import { useGoogleOneTapLogin } from 'react-google-one-tap-login'

const Access: FC = () => {
  const router = useRouter();

  // react google one-tap
  useGoogleOneTapLogin({
    onSuccess: async (response) => {
      const req = await fetch('/api/user/google-one-tap', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(response)
      })
      const res = await req.json()
      if (req.ok) {
        setToken(res.token)
        router.push('/')
      }
    },
    googleAccountConfigs: {
      client_id: '',
    }
  })

  const [email, setEmail] = useState("");
  const [disableProcess, setDisableProcess] = useState(false);
  const handleChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async () => {
    setDisableProcess(true);
    const regextMatchEmail =
      /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

    if (!email.match(regextMatchEmail)) {
      setTimeout(() => {
        setDisableProcess(false);
      }, 2000);
      return toast.error("please enter a valid email", {
        style: {
          backgroundColor: "orange",
          color: "white",
        },
        duration: 2000,
      });
    }

    const res = await SignIn(email);
    if (res) {
      router.push(`/access/otp?email=${email}`);
    } else {
      setDisableProcess(false);
      return toast.error("Something Went wrong");
    }
  };

  return <AccessComponent handleChange={handleChange} handleSubmit={handleSubmit} disableProcess={disableProcess} />;
};

export default Access;
