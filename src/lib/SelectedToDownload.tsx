import { createContext, useContext, useEffect, useState } from "react";

const SelectedImagesContext = createContext(null!);

const SelectedProvider = ({ children }) => {
  const [selectedImages, setSelectedImages] = useState({
    appName: '',
    images: []
  });
  

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
