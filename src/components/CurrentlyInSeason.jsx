import { Link } from 'react-router-dom';
import {
  formatCurrentMonthYear,
  getProductEmoji,
  getUpcomingHarvests,
  isFruitProduct,
  isProductInSeason,
  MONTH_NAMES,
} from '../utils/seasonUtils';
import './CurrentlyInSeason.css';

function CurrentlyInSeason({ products }) {
  const now = new Date();
  const fruits = products.filter(isFruitProduct);

  const harvesting = fruits.filter((p) => isProductInSeason(p, now));
  const upcoming = getUpcomingHarvests(fruits, now, 2);

  return (
    <section className="section currently-in-season" id="in-season">
      <div className="container">
        <div className="season-header">
          <span className="season-eyebrow">🌱 Fresh from the orchard</span>
          <h2 className="section-title">Currently Harvesting</h2>
          <p className="section-subtitle season-month-label">
            {formatCurrentMonthYear(now)}
          </p>
        </div>

        <div className="season-panel">
          {harvesting.length > 0 ? (
            <ul className="season-list harvesting-list">
              {harvesting.map((product) => (
                <li key={product.id}>
                  <Link to={`/products/${product.id}`} className="season-item">
                    <span className="season-emoji" aria-hidden="true">
                      {getProductEmoji(product)}
                    </span>
                    <span className="season-item-text">
                      <strong>{product.variety || product.name}</strong>
                      <span className="season-availability">Available now</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="season-empty">
              No fruits are currently being harvested in our orchards this month.
            </p>
          )}

          <div className="season-upcoming">
            <h3>Upcoming Harvest</h3>
            {upcoming.length > 0 ? (
              <ul className="season-list upcoming-list">
                {upcoming.map(({ product, startMonth }) => (
                  <li key={product.id}>
                    <Link to={`/products/${product.id}`} className="season-item upcoming">
                      <span className="season-emoji" aria-hidden="true">
                        {getProductEmoji(product)}
                      </span>
                      <span className="season-item-text">
                        <strong>{product.variety || product.name}</strong>
                        <span className="season-availability">
                          {startMonth ? MONTH_NAMES[startMonth - 1] : product.season}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="season-empty subtle">
                Check our harvest calendar for the full seasonal schedule.
              </p>
            )}
          </div>

          <div className="season-actions">
            <Link to="/products" className="btn btn-primary">
              Browse All Products
            </Link>
            <Link to="/harvest-calendar" className="btn btn-secondary">
              Full Harvest Calendar
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CurrentlyInSeason;
