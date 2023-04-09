import { createContext, useContext, FC, useState, useEffect } from "react";

const IsAuth = createContext(null!);

export const useAuth = () => useContext(IsAuth);

type props = {
  children: any;
};

const AuthProvider: FC<props> = ({ children }) => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  return (
    <IsAuth.Provider value={{ auth, setAuth }}>{children}</IsAuth.Provider>
  );
};

export default AuthProvider;
