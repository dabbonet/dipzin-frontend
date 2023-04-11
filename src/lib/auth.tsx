import { createContext, useContext, FC, useState, useEffect } from "react";

const IsAuth = createContext(null!);

export const useAuth = () => useContext(IsAuth);

type props = {
  children: any;
};

const AuthProvider: FC<props> = ({ children }) => {
  const [auth, setAuth] = useState<any>();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(localStorage.getItem('token'));
    } else {
      setAuth(false);
    }
  }, [auth]);

  return (
    <IsAuth.Provider value={{ auth, setAuth }}>{children}</IsAuth.Provider>
  );
};

export default AuthProvider;
