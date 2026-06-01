import { Link } from 'react-router-dom';
import './Hero.css';

function Hero({
  title = 'Himalayan Fruits, Grown with Legacy',
  subtitle = 'Over 100 years of orchard heritage in the misty hills of Jubbal, Himachal Pradesh.',
  showCta = true,
  compact = false,
}) {
  return (
    <section className={`hero ${compact ? 'hero-compact' : ''}`}>
      <div className="hero-overlay" />
      <div className="hero-content container">
        <span className="hero-badge">Est. Over 100 Years · Jubbal, HP</span>
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        {showCta && (
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">
              Explore Our Fruits
            </Link>
            <Link to="/about" className="btn btn-outline-light">
              Our Family Story
            </Link>
          </div>
        )}
      </div>
      <div className="hero-scroll-hint" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

export default Hero;
