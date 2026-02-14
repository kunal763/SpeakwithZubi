import React, { useState, useEffect } from 'react';
import '../styles/ImageDisplay.css';

interface ImageDisplayProps {
  onImageChange?: (imageName: string, description: string) => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ onImageChange }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of engaging educational images for children
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=800&h=600&fit=crop',
      title: 'Friendly Dog',
      description: 'A happy golden retriever playing outdoors'
    },
    {
      src: 'https://images.unsplash.com/photo-1572930621288-014e490da469?w=800&h=600&fit=crop',
      title: 'Starry Night Sky',
      description: 'There are houses and trees under a beautiful starry night sky also mountain is in the background'
    },
    {
      src: 'https://images.unsplash.com/photo-1769788873505-c2d2f570ae0c?w=800&h=600&fit=crop',
      title: 'Mountain Landscape',
      description: 'Beautiful mountain scenery'
    },
    {
      src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
      title: 'Ocean Waves',
      description: 'Peaceful ocean landscape'
    },
    {
      src: 'https://images.unsplash.com/photo-1558898478-9ac0461266c1?w=800&h=600&fit=crop',
      title: 'Butterfly Garden',
      description: 'Orange colored butterflies sitting in a garden'
    }
  ];

  const currentImage = images[currentImageIndex];

  useEffect(() => {
    onImageChange?.(currentImage.title, currentImage.description);
  }, [currentImageIndex, currentImage.title, currentImage.description, onImageChange]);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleRandomImage = () => {
    setCurrentImageIndex(Math.floor(Math.random() * images.length));
  };

  return (
    <div className="image-display-container">
      <div className="image-wrapper">
        <div className="image-frame">
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className="main-image"
            loading="lazy"
          />
          <div className="image-overlay">
            <h3 className="image-title">{currentImage.title}</h3>
            <p className="image-description">{currentImage.description}</p>
          </div>
        </div>
      </div>

      <div className="image-controls">
        <button 
          onClick={handlePrevious}
          className="control-btn prev-btn"
          title="Previous image"
          aria-label="Previous image"
        >
          ← Previous
        </button>
        
        <button 
          onClick={handleRandomImage}
          className="control-btn random-btn"
          title="Random image"
          aria-label="Random image"
        >
          🎲 Random
        </button>
        
        <button 
          onClick={handleNext}
          className="control-btn next-btn"
          title="Next image"
          aria-label="Next image"
        >
          Next →
        </button>
      </div>

      <div className="image-counter">
        Image {currentImageIndex + 1} of {images.length}
      </div>
    </div>
  );
};

export default ImageDisplay;
