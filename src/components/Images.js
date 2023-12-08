import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useImages } from './ImageContext';
import CustomLoader from './Loader';


function ImageGallery() {
  const { images, updateImages } = useImages();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);

  useEffect(() => {
    if (images.length === 0) {
      fetchImages();
    } else {
      preloadImages(images);
    }
  }, [images]);

  const fetchImages = async () => {
    try {
      const response = await fetch('http://192.168.4.29:8000/images');
      const data = await response.json();
      updateImages(data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const preloadImages = async (imageArray) => {
    const promises = imageArray.map(image => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.url;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    try {
      await Promise.all(promises);
      setAreImagesLoaded(true);
    } catch (error) {
      console.error('Error preloading images:', error);
    }
  };

  // Animation variants for framer-motion
  const itemVariants = {
    hidden: { opacity: 0 },
    visible: i => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const openModal = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const goToPrevious = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <div className="image-gallery">
      {!areImagesLoaded && <CustomLoader />}

      {areImagesLoaded && images.map((image, index) => (
        <motion.div
          key={image.id}
          className="gallery-item"
          onClick={() => openModal(index)}
          variants={itemVariants}
          initial="hidden"
          custom={index}
          animate="visible"
        >
          <img src={image.url} alt={image.alt} className="gallery-image" />
        </motion.div>
      ))}

      {selectedImageIndex !== null && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          {selectedImageIndex > 0 && (
            <a className="prev" onClick={(e) => { e.stopPropagation(); goToPrevious(); }}>&#10094;</a>
          )}
          {selectedImageIndex < images.length - 1 && (
            <a className="next" onClick={(e) => { e.stopPropagation(); goToNext(); }}>&#10095;</a>
          )}
          <img
            className="modal-content"
            src={images[selectedImageIndex].url}
            alt={images[selectedImageIndex].alt}
          />
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
