import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { getToken } from "@/lib/auth";

export function useUserDetails() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    file: null,
    src: null,
  });

  useEffect(() => {
    async function getUserDetails() {
      try {
        const response = await fetch("/api/account/info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            auth: getToken(),
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setUserDetails(data.data);
        } else {
          throw new Error(data.message || "An error occurred");
        }
      } catch (error) {
        toast.error(error.message || "Error fetching data");
      }
    }
    getUserDetails();
  }, []);

  return [userDetails, setUserDetails];
}
