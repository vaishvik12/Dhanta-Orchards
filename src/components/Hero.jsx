import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Hero.css';

function Hero({
  title = 'PREMIUM HIMALAYAN FRUITS',
  subtitle = 'From our Himalayan orchards to your home, premium fruits and rootstocks delivered within 5–7 days, wherever you are in India...',
  showCta = true,
  compact = false,
}) {

  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
   <section className={`hero ${compact ? 'hero-compact' : ''}`}>
  <div
    className="hero-bg"
    style={{
     transform: `translateY(${offsetY * 0.25}px) scale(1.08)`
    }}
  />

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
