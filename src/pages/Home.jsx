import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import CurrentlyInSeason from '../components/CurrentlyInSeason';
import HarvestCalendar from '../components/HarvestCalendar';
import ProductCard from '../components/ProductCard';
import { loadProducts } from '../data/productsSource';
import { isProductInSeason } from '../utils/seasonUtils';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const featured = [...products]
    .sort((a, b) => {
      const aIn = isProductInSeason(a) ? 0 : 1;
      const bIn = isProductInSeason(b) ? 0 : 1;
      if (aIn !== bIn) return aIn - bIn;
      return a.name.localeCompare(b.name);
    })
    .slice(0, 3);

  return (
    <div className="home-page">
      <Hero />

      <section className="section intro-section intro-section-first">
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
              Nestled in the misty hills of Jubbal, Himachal Pradesh, Dwarkadhish Orchards has been
              cultivating premium fruits for over a century. Today, Pankaj and Manjeet Dhanta proudly
              continue the legacy of generations before them.
            </p>
            <p>
              Blessed with cool mountain air, pure spring water, and fertile Himalayan soil, our
              orchards produce fruits renowned for exceptional flavour, crisp texture, and natural
              sweetness.
            </p>
            <Link to="/about" className="btn btn-secondary">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {!loading && products.length > 0 && <CurrentlyInSeason products={products} />}

      {!loading && products.length > 0 && (
        <section className="section calendar-preview-section" id="harvest-calendar">
          <div className="container">
            <h2 className="section-title">Harvest Calendar</h2>
            <p className="section-subtitle">
              See when each variety ripens across the year in our Himalayan orchards.
            </p>
            <HarvestCalendar products={products} compact showLink />
          </div>
        </section>
      )}

      <section className="section featured-section">
        <div className="container">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Hand-picked apples, pears, peaches, and premium rootstocks from Jubbal.
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
