import { createContext, useContext, useState } from 'react';

const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  const updateImages = (newImages) => {
    setImages(newImages);
  };

  return (
    <ImagesContext.Provider value={{ images, updateImages }}>
      {children}
    </ImagesContext.Provider>
  );
};

export const useImages = () => {
  return useContext(ImagesContext);
};
