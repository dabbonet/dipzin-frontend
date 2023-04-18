import { createContext, useContext, FC, useState, useEffect } from "react";
import Router from "next/router";
import { toast } from "react-hot-toast";
const IsAuth = createContext(null!);

export const useAuth = () => useContext(IsAuth);

type props = {
  children: any;
};

const AuthProvider: FC<props> = ({ children }) => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {

    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser({});
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
  }, []);

  return (
    <IsAuth.Provider value={{ user, loading }}>{children}</IsAuth.Provider>
  );
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
  return;
};

export const getUser = async () => {
  if (localStorage.getItem("token")) {
    const req = await fetch("/api/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

export async function SignIn(email: string) {
  const req = await fetch("/api/user/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: {
        email,
      },
    }),
  });
  if (!req.ok) return { message: "Something went wrong", status: 404 };
  const data = await req.json();

  return data;
}

export async function verifyOtp(email: string, otp: number) {
  const req = await fetch("/api/user/verify", {
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
  if (!req.ok) return { message: "something went wrong 1", status: 404 };
  const data = await req.json();

  return data;
}

export default AuthProvider;
