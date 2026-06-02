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
              src="https://images.unsplash.com/photo-1514735555661-d3278da9d5ca?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Himalayan orchard terraces in Jubbal"
            />
          </div>
          <div className="intro-content">
            <span className="intro-label">Our Orchard</span>
            <h2>A Century of Fruit in the Himalayas</h2>
            <p>
              Nestled in the misty hills of Jubbal, Himachal Pradesh, Dhanta Orchards has been
              cultivating premium fruits for over 100 years. Pankaj and Manjeet Dhanta continue
              the legacy of their ancestors — growing apples, pears, and peaches with patience,
              care, and respect for the land.
            </p>
            <p>
              Our orchards benefit from cool mountain air, pure spring water, and rich soil —
              creating fruits of exceptional flavour and quality that cannot be replicated
              elsewhere.
            </p>
            <Link to="/about" className="btn btn-secondary">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-banner">
          <h2>Experience Himalayan Freshness</h2>
          <p>
            Whether you are a wholesaler, retailer, or fruit lover — we welcome your inquiry.
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
    </div>
  );
}

export default Home;
