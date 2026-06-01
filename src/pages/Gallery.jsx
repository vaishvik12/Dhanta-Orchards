import Hero from '../components/Hero';
import GalleryGrid from '../components/GalleryGrid';
import { galleryImages } from '../data/galleryImages';
import './Gallery.css';

function Gallery() {
  return (
    <div className="gallery-page">
      <Hero
        title="Orchard Gallery"
        subtitle="A glimpse into life among the Himalayan fruit trees of Jubbal."
        showCta={false}
        compact
      />

      <section className="section gallery-section">
        <div className="container">
          <p className="gallery-intro">
            From spring blossoms to autumn harvest, these images capture the beauty and
            dedication behind every fruit we grow at Dhanta Orchards.
          </p>
          <GalleryGrid images={galleryImages} />
        </div>
      </section>
    </div>
  );
}

export default Gallery;
