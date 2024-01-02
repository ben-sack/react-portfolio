import React, { useState } from 'react';
 import { motion } from 'framer-motion';
 import { useImages } from './ImageContext';
 import CustomLoader from './Loader';
 import NotFound from './NotFound';

 function ImageGallery() {
   const { images, isLoaded, error } = useImages();
   const [selectedImageIndex, setSelectedImageIndex] = useState(null);

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
       {!isLoaded && !error && <CustomLoader />}
       {isLoaded && !error && images.map((image, index) => (
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