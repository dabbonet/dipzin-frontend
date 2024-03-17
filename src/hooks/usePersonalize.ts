"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getToken } from "@/lib/auth";

const usePersonalize = () => {
  const [userPositions, setUserPositions] = useState([]);
  const [userInterests, setUserInterests] = useState([]);
  const [openVideo, setOpenVideo] = useState(false);
  const router = useRouter();

  const handleAllSet = async () => {
    const [positionsReq, interestsReq] = await Promise.all([
      fetch("/api/user-positions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            positions: userPositions,
            auth: getToken(),
          },
        }),
      }),
      fetch("/api/user-interests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            interests: userInterests,
            auth: getToken(),
          },
        }),
      }),
    ]);
    if (positionsReq.ok && interestsReq.ok) {
      router.push("/profile/enjoy");
    } else {
      toast.remove();
      toast.error("An error occurred while updating your preferences.");
    }
  };

  return {
    userPositions,
    setUserPositions,
    userInterests,
    setUserInterests,
    handleAllSet,
    openVideo,
    setOpenVideo,
  };
};

export default usePersonalize;
