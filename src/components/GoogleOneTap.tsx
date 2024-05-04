'use client'
import { useGoogleOneTapLogin } from '@react-oauth/google';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import jwt_decode from "jwt-decode";
import { invetaionAndReferralTokens } from '@/lib/tokens';
import { getToken, setToken, useAuth } from '@/lib/auth';
import { toast } from 'react-hot-toast';

const GoogleOneTap = () => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    const parentDiv = ref.current;
    if (!parentDiv) return;

    if (getToken()) {
      setShow(false);
    } else {
      setShow(true);
    }

  }, [ref, user]);

  const { referralToken, invitationToken } = invetaionAndReferralTokens();

  useGoogleOneTapLogin({
    prompt_parent_id: "google_tap_prompt",
    cancel_on_tap_outside: true,
    onSuccess: async (credentialResponse) => {
      let { name, email }: { name: string, email: string } = jwt_decode(credentialResponse.credential);

      try {
        const req = await fetch('/api/user/google-one-tap', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            data: {
              email: email,
              name: name,
              referralCode: referralToken,
              invitationToken: invitationToken
            }
          })
        });

        const response = await req.json();
        if (req.ok) {
          setToken(response.token);
          window.location.reload();
        }
      } catch (error) {
        toast.remove();
        toast.error('Something went wrong');
      }

      setShow(false);
    },
    onError: () => {
      setShow(false);
    },
  });

  return (
    <div
      ref={ref}
      id="google_tap_prompt"
      className={clsx(
        'w-[25.5rem] fixed top-20 rounded-lg right-10 bg-aqua-500 p-2 z-50 hidden',
        show && '!block'
      )}
    >
      <h2 className='text-center mb-2 text-lg font-bold'>
        Search, Filter and get <br /> inspired with our free plan.
      </h2>
    </div>
  );
}

export default GoogleOneTap;
