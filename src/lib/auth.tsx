import { createContext, useContext, FC, useState, useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
const IsAuth = createContext(null!);

export const useAuth = () => useContext(IsAuth);

type props = {
  children: any;
};

const AuthProvider: FC<props> = ({ children }) => {
  const [auth, setAuth] = useState<any>();
  
  return (
    <IsAuth.Provider value={{ auth, setAuth }}>{children}</IsAuth.Provider>
  );
};

export const setToken = (token: string) => {
  Cookies.set("token", token);
  return;
};

export const userLogin =  async () => {
  if (Cookies.get("token")) {
    const req = await fetch("https://rah.dipzin.com/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
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

export const userLogout = () => {
  Cookies.remove("token");
  Router.reload()
  return;
};

export const user = () => {
  return Cookies.get("token");
};

export async function getOtp(email: string) {
  const req = await fetch("/api/otp", {
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
  if (!req.ok) return { message: "something went wrong", status: 404 };
  const data = await req.json();

  return data;
}
  

export default AuthProvider;
