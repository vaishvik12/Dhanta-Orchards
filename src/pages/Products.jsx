import { useEffect, useState, useMemo } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import api from '../api/client';
import { fallbackProducts } from '../data/fallbackProducts';
import './Products.css';

const CATEGORIES = ['All', 'Apples', 'Pears', 'Peaches','Rootstocks','Exotic Fruits'];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch {
        setProducts(fallbackProducts);
        setError('');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

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
                <label htmlFor="category-filter">Category</label>
                <select
                  id="category-filter"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label htmlFor="sort-filter">Sort By</label>
                <select
                  id="sort-filter"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name (A–Z)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="category-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-pill ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading && <p className="loading-state">Loading products...</p>}
          {error && <p className="error-state">{error}</p>}

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
