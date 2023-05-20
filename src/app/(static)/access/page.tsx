"use client";
import AccessComponent from "@/components/AccessComponent";
import { FC } from "react";



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


const Access: FC = () => {


  return <AccessComponent  />;
};

export default Access;
