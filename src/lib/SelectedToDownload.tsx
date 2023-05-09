import { createContext, useContext, useEffect, useState } from "react";

const SelectedImagesContext = createContext(null!);

const SelectedProvider = ({ children }) => {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  useEffect(() => {
    if (selectedImages.includes(NaN)) {
      setSelectedImages(selectedImages.filter((el) => !Number.isNaN(el)));
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
