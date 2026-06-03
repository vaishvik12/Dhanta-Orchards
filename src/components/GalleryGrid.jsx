import { useState, useEffect } from 'react';
import './GalleryGrid.css';

function GalleryGrid({ images }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.classList.add('lightbox-open');
    } else {
      document.body.classList.remove('lightbox-open');
    }

    return () => {
      document.body.classList.remove('lightbox-open');
    };
  }, [lightboxIndex]);

  const goPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i > 0 ? i - 1 : images.length - 1));
  };

  const goNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((i) => (i < images.length - 1 ? i + 1 : 0));
  };

  return (
    <>
      <div className="gallery-grid">
        {images.map((img, index) => (
          <button
            key={img.id || index}
            type="button"
            className="gallery-item"
            onClick={() => openLightbox(index)}
            aria-label={`View ${img.alt || 'orchard image'}`}
          >
            <img src={img.src} alt={img.alt || 'Orchard gallery'} loading="lazy" />
            {img.caption && <span className="gallery-caption">{img.caption}</span>}
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <div
          className="gallery-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            ×
          </button>
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={goPrev}
            aria-label="Previous image"
          >
            ‹
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt || 'Gallery'}
            />
            {images[lightboxIndex].caption && (
              <p className="lightbox-caption">{images[lightboxIndex].caption}</p>
            )}
          </div>
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={goNext}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}

export default GalleryGrid;
