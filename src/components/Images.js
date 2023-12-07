import React, { useState, useEffect } from 'react';
import { useImages } from './ImageContext';

function ImageGallery() {
  const { images, updateImages } = useImages();
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    // Fetch images only if the context does not have any
    if (images.length === 0) {
      const fetchImages = async () => {
        try {
          const response = await fetch('http://localhost:8000/images');
          const data = await response.json();
          updateImages(data);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };

      fetchImages();
    }
  }, [images, updateImages]);


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
      {images.map((image, index) => (
        <div key={image.id} className="gallery-item" onClick={() => openModal(index)}>
          <img src={image.url} alt={image.alt} className="gallery-image" />
        </div>
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
