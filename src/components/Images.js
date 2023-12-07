import React, { useState } from 'react';

const placeholderImages = [
  { id: 1, url: 'assets/camp.jpeg', alt: 'camp' },
  { id: 2, url: 'assets/capetown.jpg', alt: 'cape-town'},
  { id: 3, url: 'assets/camp2.jpeg', alt: 'cape-town'},
  { id: 4, url: 'assets/disco.jpg', alt: 'cape-town'},
  { id: 5, url: 'assets/show.jpeg', alt: 'cape-town'},
  { id: 6, url: 'assets/sunset.jpeg', alt: 'cape-town'},
  { id: 7, url: 'assets/snow.jpeg', alt: 'cape-town'},
  { id: 8, url: 'assets/camp3.jpg', alt: 'cape-town'},
  { id: 9, url: 'assets/andycamp.jpg', alt: 'cape-town'},
  { id: 10, url: 'assets/andy2.jpg', alt: 'cape-town'},
];

function ImageGallery () {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // Open modal with the index of the clicked image
  const openModal = (index) => {
    setSelectedImageIndex(index);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  // Navigate to the previous image
  const goToPrevious = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  // Navigate to the next image
  const goToNext = () => {
    if (selectedImageIndex < placeholderImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  return (
    <div className="image-gallery">
      {placeholderImages.map((image, index) => (
        <div key={image.id} className="gallery-item" onClick={() => openModal(index)}>
          <img src={image.url} alt={image.alt} className="gallery-image" />
        </div>
      ))}

      {/* Modal view if an image is selected */}
      {selectedImageIndex !== null && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          {selectedImageIndex > 0 && (
            <a className="prev" onClick={(e) => {e.stopPropagation(); goToPrevious();}}>&#10094;</a>
          )}
          {selectedImageIndex < placeholderImages.length - 1 && (
            <a className="next" onClick={(e) => {e.stopPropagation(); goToNext();}}>&#10095;</a>
          )}
          <img
            className="modal-content"
            src={placeholderImages[selectedImageIndex].url}
            alt={placeholderImages[selectedImageIndex].alt}
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;