import { useState, useEffect } from "react";
import { getToken, useAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const useProfileInformation = (newsLetter) => {
  const router = useRouter();
  const { user } = useAuth();
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [newsLetterUpdated, setNewsLetterUpdated] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    username: "",
    file: null,
    src: null,
  });
  const [userCopyState, setUserCopyState] = useState(null);
  const [userArr, setUserArr] = useState([1, 2, 3, 4]);

  useEffect(() => {
    const fetchUserDetails = async () => {
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
          setUserDetails({
            name: data.name || "",
            username: data.username || "",
            file: null,
            src: data.image || "",
          });
          setUserCopyState({
            username: data.username || "",
            name: data.name || "",
          });
        }
      } catch (error) {
        toast.error("Error fetching data");
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (event) => {
    const { id, value, files } = event.target;
    if (files && files[0] && id === "file") {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          file: file,
          src: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [id]: value,
      }));
    }
  };

  const addNewsLetter = (id) => {
    setUserArr((prevArr) =>
      prevArr.includes(id)
        ? prevArr.filter((el) => el !== id)
        : [...prevArr, id]
    );
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (
      userDetails.name === userCopyState.name &&
      userDetails.username === userCopyState.username &&
      !userDetails.file
    ) {
      setProfileUpdated(true);
      return;
    }

    try {
      let formData = new FormData();
      formData.append("name", userDetails.name);
      formData.append("username", userDetails.username);
      if (userDetails.file) {
        formData.append("file", userDetails.file);
      }

      // Update user details
      const updateUserResponse = await fetch("/api/account/update", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      // Update newsletter subscriptions
      const updateNewsletterResponse = await fetch(
        "/api/user-system-news-letters",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ news_letters: userArr }),
        }
      );

      const [updateUser, updateNewsletter] = await Promise.all([
        updateUserResponse.json(),
        updateNewsletterResponse.json(),
      ]);

      if (updateUserResponse.ok && updateNewsletterResponse.ok) {
        setProfileUpdated(true);
        setNewsLetterUpdated(true);
        router.push("/profile/personalize");
      } else {
        toast.error(updateUser.message || "Failed to update profile");
        toast.error(
          updateNewsletter.message || "Failed to update newsletter preferences"
        );
      }
    } catch (error) {
      toast.error("An error occurred while updating profile information");
    }
  };

  return {
    userDetails,
    setUserDetails,
    profileUpdated,
    setProfileUpdated,
    newsLetterUpdated,
    setNewsLetterUpdated,
    openVideo,
    setOpenVideo,
    userArr,
    setUserArr,
    userCopyState,
    setUserCopyState,
    handleChange,
    addNewsLetter,
    submitForm,
    router,
  };
};
