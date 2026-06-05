import { Link } from 'react-router-dom';
import { MONTH_SHORT, parseSeasonMonths } from '../utils/seasonUtils';
import './HarvestCalendar.css';

const DISPLAY_MONTHS = [ 7,8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];

function HarvestCalendar({ products, compact = false, showLink = true }) {
  const calendarProducts = products
    .filter((p) => p.season && parseSeasonMonths(p.season).length > 0)
    .sort((a, b) => {
      const aStart = parseSeasonMonths(a.season)[0] || 0;
      const bStart = parseSeasonMonths(b.season)[0] || 0;
      return aStart - bStart || a.name.localeCompare(b.name);
    });

  const visibleProducts = compact ? calendarProducts.slice(0, 8) : calendarProducts;

  return (
    <div className={`harvest-calendar ${compact ? 'harvest-calendar-compact' : ''}`}>
      <div className="calendar-scroll">
        <table className="calendar-table">
          <thead>
            <tr>
              <th className="calendar-product-col">Variety</th>
              {DISPLAY_MONTHS.map((m) => (
                <th key={m} className="calendar-month-col">
                  {MONTH_SHORT[m - 1]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((product) => {
              const activeMonths = parseSeasonMonths(product.season);
              return (
                <tr key={product.id}>
                  <td className="calendar-product-name">
                    <Link to={`/products/${product.id}`}>
                      {product.variety || product.name}
                    </Link>
                    {!compact && (
                      <span className="calendar-season-text">{product.season}</span>
                    )}
                  </td>
                  {DISPLAY_MONTHS.map((monthNum) => (
                    <td key={monthNum} className="calendar-cell">
                      <span
                        className={`calendar-bar ${
                          activeMonths.includes(monthNum) ? 'active' : ''
                        }`}
                        title={
                          activeMonths.includes(monthNum)
                            ? `Harvest: ${product.season}`
                            : ''
                        }
                      />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {compact && showLink && (
        <div className="calendar-footer">
          <Link to="/harvest-calendar" className="btn btn-secondary">
            View Full Harvest Calendar
          </Link>
        </div>
      )}
    </div>
  );
}

export default HarvestCalendar;
