import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useImages } from './ImageContext';
import CustomLoader from './Loader';
import NotFound from './NotFound'

function ImageGallery() {
  const { images, updateImages } = useImages();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);
  const [error, setError] = useState(null); // New state for tracking errors

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
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      const data = await response.json();
      updateImages(data);
      preloadImages(data); // Preload images after fetching
    } catch (error) {
      console.error('Error fetching images:', error);
      setError(error.message);
    }
  };

  const preloadImages = async (imageArray) => {
    setAreImagesLoaded(false); // Reset loading state before preloading

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
      setAreImagesLoaded(true); // Set loading state after all images are loaded
    } catch (error) {
      console.error('Error preloading images:', error);
      setError(error.message);
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
      {error && <NotFound />}

      {!areImagesLoaded && !error && <CustomLoader />}

      {areImagesLoaded && !error && images.map((image, index) => (
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
