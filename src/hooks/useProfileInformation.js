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
          setUserDetails(data.data);
          if (data.data.username) {
            setUserCopyState({
              username: data.data.username,
              name: data.data.name,
            });
          }
        }
      } catch (error) {
        toast.remove();
        toast.error("error fetch data");
      }
    };

    fetchUserDetails();
  }, []);

  const handleChange = (event) => {
    const { id, value, files, src } = event.target;
    if (id === "image") {
      setUserDetails({
        ...userDetails,
        src: src,
      });
      return;
    }
    if (id === "label") {
      const file = files[0];
      const reader = new FileReader();
      if (file) {
        reader.onloadend = () => {
          setUserDetails({
            ...userDetails,
            file: files[0],
          });
        };
        reader.readAsDataURL(file);
      }
      return;
    }
    setUserDetails({
      ...userDetails,
      [id]: value,
    });
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
      userDetails?.name !== "" &&
      userDetails?.username !== "" &&
      userDetails?.name === userCopyState?.name &&
      userDetails?.username === userCopyState?.username &&
      !userDetails?.file
    ) {
      setProfileUpdated(true);
      setNewsLetterUpdated(true);
      return;
    }
    try {
      let formData = new FormData();
      formData.append("auth", getToken());
      formData.append("id", user.id);
      formData.append("username", userDetails.username);
      formData.append("name", userDetails.name);
      if (userDetails.file) {
        formData.append("file", userDetails.file);
      }
      const [updateResponse, newsLetterResponse] = await Promise.all([
        // TODO: add avatar to this body
        fetch(`/api/account/update`, {
          method: "POST",
          body: formData,
        }),

        fetch("/api/user-system-news-letters", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              news_letters: userArr,
              auth: getToken(),
            },
          }),
        }),
      ]);
      const [updateData, newsLetterData] = await Promise.all([
        updateResponse.json(),
        newsLetterResponse.json(),
      ]);
      console.log(updateData, newsLetterData);
      if (!updateResponse.ok) {
        toast.remove();
        if (profileUpdated === false) {
          toast.error(updateData.message);
        }
      } else {
        setProfileUpdated(true);
      }
      if (!newsLetterResponse.ok) {
        toast.remove();
        toast.error("Unable to process the data!");
      } else {
        setNewsLetterUpdated(true);
      }
    } catch (error) {
      toast.remove();
      toast.error("Something went wrong");
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
