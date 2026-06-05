import { useEffect, useState, useMemo } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { loadProducts } from '../data/productsSource';
import { productMatchesCategory } from '../utils/seasonUtils';
import './Products.css';

const FILTERS = [
  { id: 'all', label: 'All Products' },
  { id: 'in-season', label: 'In Season' },
  { id: 'apples', label: 'Apples' },
  { id: 'pears', label: 'Pears' },
  { id: 'peaches', label: 'Peaches' },
  { id: 'rootstocks', label: 'Rootstocks' },
  { id: 'exotic fruits', label: 'Exotic Fruits' },
];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    loadProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    result = result.filter((p) => productMatchesCategory(p, category));

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.variety && p.variety.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'season') {
        const aSeason = a.season || '';
        const bSeason = b.season || '';
        return aSeason.localeCompare(bSeason);
      }
      return a.name.localeCompare(b.name);
    });

    return result;
  }, [products, search, category, sortBy]);

  return (
    <div className="products-page">
      <Hero
        title="Our Products"
        subtitle="Premium apples, pears, peaches and rootstocks from the orchards of Jubbal."
        showCta={false}
        compact
      />

      <section className="section products-section">
        <div className="container">
          <div className="products-toolbar">
            <SearchBar value={search} onChange={setSearch} />
            <div className="products-filters">
              <div className="filter-group">
                <label htmlFor="sort-filter">Sort By</label>
                <select
                  id="sort-filter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name (A–Z)</option>
                  <option value="season">Season</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="category-pills" role="tablist" aria-label="Product filters">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                role="tab"
                aria-selected={category === filter.id}
                className={`category-pill ${category === filter.id ? 'active' : ''}`}
                onClick={() => setCategory(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {category === 'in-season' && (
            <p className="filter-hint">
              Showing fruits and products available during the current harvest month. All products
              remain listed when you choose &quot;All Products&quot;.
            </p>
          )}

          {loading && <p className="loading-state">Loading products...</p>}

          {!loading && filtered.length === 0 && (
            <p className="empty-state">No products match your search.</p>
          )}

          {!loading && filtered.length > 0 && (
            <>
              <p className="results-count">
                Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="products-grid">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Products;
