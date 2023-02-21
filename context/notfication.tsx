import { createContext, useContext, useState } from "react";

export const Context = createContext<string | null>(null);

const GlobalProvider: React.FC<any> = ({ children }) => {
  const [notfication, setNotfication] = useState<string>("");
  return <Context.Provider value={notfication}>{children}</Context.Provider>;
};
