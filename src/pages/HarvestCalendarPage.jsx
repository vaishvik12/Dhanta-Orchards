import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import HarvestCalendar from '../components/HarvestCalendar';
import { loadProducts } from '../data/productsSource';
import './HarvestCalendarPage.css';

function HarvestCalendarPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="harvest-calendar-page">
      <Hero
        title="Harvest Calendar"
        subtitle="Plan your orders around our Himalayan harvest seasons. Apples, pears, peaches, and more."
        showCta={false}
        compact
      />

      <section className="section calendar-page-section">
        <div className="container">
          <p className="calendar-intro">
            Each bar shows when a variety is typically harvested in our Jubbal orchards.
            Seasons may shift slightly with weather <br/> contact us for the freshest availability.
          </p>

          {loading ? (
            <p className="loading-state">Loading harvest schedule...</p>
          ) : (
            <HarvestCalendar products={products} compact={false} showLink={false} />
          )}

          <div className="calendar-legend">
            <span className="legend-bar active" />
            <span>Harvest period</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HarvestCalendarPage;
