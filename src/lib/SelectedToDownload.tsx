import { createContext, useContext, useEffect, useState } from "react";

const SelectedImagesContext = createContext(null!);

const SelectedProvider = ({ children }) => {
  const [selectedImages, setSelectedImages] = useState([null]);
  useEffect(() => {
    if (selectedImages.includes(null)) {
      setSelectedImages(selectedImages.filter((el) => el !== null));
    }
  }, [selectedImages]);

  return (
    <SelectedImagesContext.Provider
      value={{ selectedImages, setSelectedImages }}
    >
      {children}
    </SelectedImagesContext.Provider>
  );
};

export default SelectedProvider;

export const useSelcetedImages = () => useContext(SelectedImagesContext);
