import { createContext, useContext, useState, useEffect } from 'react';


const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchImages = async () => {
            try {
                const baseUrl = 'http://192.168.4.29:8000';  // Replace with prod API
                const response = await fetch(`${baseUrl}/images`);

                if (!response.ok) {
                    throw new Error('Failed to fetch images');
                }

                const data = await response.json();

                // Update the URLs in the data with the full URLs
                const imagesWithFullUrls = data.map((image) => ({
                    ...image,
                    url: process.env.REACT_APP_LOCAL_DEVELOPMENT ? `${baseUrl}${image.url}` : image.url,
                }));

                setImages(imagesWithFullUrls);

                // Create an array of promises, each resolving when an image is loaded
                const imageLoadPromises = imagesWithFullUrls.map((image) => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = image.url;
                        img.onload = () => resolve();
                        img.onerror = (error) => reject(error);
                    });
                });

                // Wait for all image loading promises to resolve
                await Promise.all(imageLoadPromises);

                // Ensure isLoaded is set to true only if the component is still mounted
                if (isMounted) {
                    setIsLoaded(true);
                }
            } catch (error) {
                console.error('Error fetching images:', error);

                // Ensure isLoaded is set to true even if there's an error
                if (isMounted) {
                    setError(error.message);
                    setIsLoaded(true);
                }
            }
        };

        fetchImages();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <ImagesContext.Provider value={{ images, isLoaded, error }}>
            {children}
            <div style={{ display: 'none' }}>
                {images.map((image) => (
                    <img key={image.id} src={image.url} alt={image.alt} />
                ))}
            </div>
        </ImagesContext.Provider>
    );
};

export const useImages = () => {
    return useContext(ImagesContext);
};
