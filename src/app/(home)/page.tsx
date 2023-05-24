'use client'
import Stream from "@/components/Stream";
import { Toaster } from "react-hot-toast"
import googleOneTap from 'google-one-tap';
import { useRouter } from "next/navigation";
const options = {
	client_id: '652241927504-ti2o2h9q70j22g9h1pag8d6r259vksrb.apps.googleusercontent.com', 
	auto_select: false, 
	cancel_on_tap_outside: false, 
	context: 'signin', 
};

export default function Home() {
  const router = useRouter()
  googleOneTap(options, async (res) => {
    // there is two ways to post access token
    /*the first one*/router.push('/api/user/connect?provider=google')
    /*the second one*/ const req = await fetch('/api/user/connect/google-one-tap',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: res.credential
      })
    })
  });
  return (
    <>
      <Stream />
      <Toaster position="top-center" />
    </>
  );
}