import { createContext, useContext, FC, useState, useEffect } from "react";
import Router from "next/router";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { invetaionAndReferralTokens } from "./tokens";

const IsAuth = createContext(null!);

export const useAuth = () => useContext(IsAuth);

type props = {
  children: any;
};

const AuthProvider: FC<props> = ({ children }) => {
  const searchParams = useSearchParams()
  const provider = searchParams.get('provider')
  const token = searchParams.get('?id_token') || searchParams.get('?access_token')
  const router = useRouter()
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { referralToken, invitationToken } = invetaionAndReferralTokens()
  const [checker, setChecker] = useState(false)
  useEffect(() => {
    // Send Provider Token to get User Data and strapi JWT Token.
    if (token) {
      const getUserData = async () => {
        setLoading(true)
        const userData = await redirectToken(provider, token, referralToken, invitationToken)
        router.replace('/')
        setUser(userData.user)
        setToken(userData.jwt)
        setLoading(false)
      }
      getUserData()
    }

    const checkUser = async () => {
      const token = getToken();
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const req = await fetch("/api/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await req.json();
        setUser(data);
      } catch (error) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [checker, invitationToken, provider, referralToken, router, token]);

  return (
    <IsAuth.Provider value={{ user, loading, setChecker }}>{children}</IsAuth.Provider>
  );
};

export const setToken = (token: string) => {
  document.cookie = `token=${token}; path=/`;
  return;
};

export const getToken = () => {
  const cookies = document.cookie.split(";").map(cookie => cookie.trim());
  for (const cookie of cookies) {
    if (cookie.startsWith("token=")) {
      return cookie.substring("token=".length);
    }
  }
  return null;
};

export const getUser = async () => {
  if (getToken()) {
    const req = await fetch("/api/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await req.json();
    if (data.error) {
      return false;
    } else {
      return true;
    }
  }
  return false;
};

export const SignOut = () => {
  localStorage.removeItem("token");
  Router.reload();
  return;
};

type SignInParams = {
  email: string,
  referralToken?: string,
  invitationToken?: string,
}

export async function SignIn({ email, referralToken, invitationToken }: SignInParams) {
  const req = await fetch("/api/user/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        email,
        referralToken,
        invitationToken
      },
    }),
  });
  if (!req.ok) return { message: "Something went wrong", status: 404 };
  const data = await req.json();

  return data;
}

export async function verifyOtp(email: string, otp: number) {
  return fetch("/api/user/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        email,
        otp,
      },
    }),
  });
}

export async function redirectToken(provider: string, access_token: string, referral_token, invitation_token) {
  const params = new URLSearchParams({
    provider: provider ?? '',
    access_token: access_token ?? '',
    referral_token: referral_token ?? '',
    invitation_token: invitation_token ?? '',
  });
  const req = await fetch(`/api/user/redirect?${params}`);
  const data = await req.json();
  return data;

}


export default AuthProvider;
