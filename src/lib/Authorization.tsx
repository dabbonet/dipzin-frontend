import { useContext, useState, useEffect, createContext } from "react";
import { toast } from "react-hot-toast";
import { getToken } from "./auth";

const AuthorizationContext = createContext(null!);

const MemberType = ({ children }) => {
  const [member, setMember] = useState(null);
  const token = getToken() || null;
  useEffect(() => {
      const fetchData = async () => {
        // if the user auth you will check about the type
      if (token) {
        try {
          const req = await fetch("example", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const res = await req.json();

          if (res.type === "paid") {
            setMember('paid');
          } else {
            setMember('free');
          }
        } catch (error) {
            toast.error(error)
        }
      }
    };
    fetchData();
  }, []);



  return (
    <AuthorizationContext.Provider value={{ member }}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export default MemberType;

export const useAuthorized = () => useContext(AuthorizationContext);
