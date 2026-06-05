import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import api from '../api/client';
import { fallbackProducts } from '../data/fallbackProducts';
import './Home.css';

function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/products');
        setFeatured(data.slice(0, 3));
      } catch {
        setFeatured(fallbackProducts.slice(0, 3));
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="home-page">
      <Hero />

      <section className="section featured-section">
        <div className="container">
          <h2 className="section-title">Seasonal Harvest</h2>
          <p className="section-subtitle">
            Hand-picked apples, pears, and peaches from our family orchards in the Himalayas.
          </p>
          {loading ? (
            <p className="loading-state">Loading fresh picks...</p>
          ) : (
            <div className="featured-grid">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="section-cta">
            <Link to="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="section intro-section">
        <div className="container intro-grid">
          <div className="intro-image">
            <img
              src="Images/Orchard.jpg"
              alt="Himalayan orchard terraces in Jubbal"
            />
          </div>
          <div className="intro-content">
            <span className="intro-label">Our Orchard</span>
            <h2>A Century of Fruit in the Himalayas</h2>
            <p>
              Nestled in the misty hills of Jubbal, Himachal Pradesh, Dwarkadhish Orchards has been cultivating premium fruits for over a century. Today, Pankaj and Manjeet Dhanta proudly continue the legacy of generations before them, nurturing apples, pears, peaches, persimmons, and high quality rootstocks with patience, care, and deep respect for the land.
            </p>
            <p>
              Blessed with cool mountain air, pure spring water, and fertile Himalayan soil, our orchards produce fruits renowned for their exceptional flavour, crisp texture, and natural sweetness. Combining traditional orcharding practices with modern horticultural expertise, we remain committed to sustainable cultivation, careful stewardship of our environment, and the highest standards of quality.

            </p>
            <p>
              Beyond growing fruit, we cultivate trust. From selecting premium rootstocks and managing healthy orchards to carefully grading, packing, and delivering our harvest, every step reflects our family's dedication to excellence. For more than 100 years, Dwarkadhish Orchards has been rooted in the values of hard work, integrity, and a passion for bringing the finest produce from the Himalayas to customers across India.
            </p>
            <p>
              This version feels more premium, tells the story of the orchard, highlights Pankaj's horticultural expertise and the rootstock business, and fits well in an "Our Orchard" section.</p>
            <Link to="/about" className="btn btn-secondary">
              Read Our Story
            </Link>
          </div>
        </div >
      </section >

      <section className="section cta-section">
        <div className="container cta-banner">
          <h2>Experience Himalayan Freshness</h2>
          <p>
            Whether you are a wholesaler, retailer, or fruit lover, we welcome your inquiry.
            Taste the difference of truly orchard-fresh fruit.
          </p>
          <div className="cta-buttons">
            <Link to="/products" className="btn btn-primary">
              Browse Products
            </Link>
            <Link to="/contact" className="btn btn-outline-light">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div >
  );
}

export default Home;
