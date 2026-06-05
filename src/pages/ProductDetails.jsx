import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import InquiryForm from '../components/InquiryForm';
import { getProductById } from '../data/productsSource';
import { getSeasonStatus } from '../utils/seasonUtils';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    const found = getProductById(id);

    if (found) {
      setProduct(found);
      setError('');
    } else {
      setError('Product not found.');
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return <p className="loading-state container">Loading product...</p>;
  }

  if (error || !product) {
    return (
      <div className="container error-state">
        <p>{error || 'Product not found.'}</p>
        <Link to="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  
  const imageUrl =
    product.image ||
    'https://images.unsplash.com/photo-1568702848514-96ef05de0a7d?w=800&q=80';

  const inStock = product.stock > 0;
  const isRootStock = (product.category || '')
    .toLowerCase()
    .includes('root');

  const seasonStatus = getSeasonStatus(product);

  return (
    <div className="product-details-page">
      <div className="container">
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-details-grid">
          <div className="product-details-image">
            <img src={imageUrl} alt={product.name} />
            <span className="detail-category">{product.category}</span>
          </div>

          <div className="product-details-info">
            <h1>{product.name}</h1>

            {product.variety && (
              <p className="detail-variety">{product.variety}</p>
            )}

            {/* Pricing */}
            {isRootStock ? (
              <p className="detail-price">
                ₹{Number(product.price).toLocaleString('en-IN')} / plant
              </p>
            ) : (
              product.packaging?.length > 0 && (
                <div className="packaging-options">
                  <h3>Available Packaging & Pricing</h3>

                  {product.packaging.map((pack) => (
                    <div className="package-item" key={pack.name}>
                      <div className="package-info">
                        <strong>{pack.name}</strong>
                        <span>{pack.weight}</span>
                      </div>

                      <span className="package-price">
                        ₹{pack.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              )
            )}

            <div className={`season-status-banner ${seasonStatus.status}`}>
              <span className="season-status-icon" aria-hidden="true">
                {seasonStatus.icon}
              </span>
              <span>{seasonStatus.label}</span>
            </div>

            <div className="detail-meta">
              <div className="meta-item">
                <span className="meta-label">Season</span>
                <span className="meta-value">{product.season}</span>
              </div>

              <div className="meta-item">
                <span className="meta-label">Size</span>
                <span className="meta-value">{product.size}</span>
              </div>

              {/* Show fruit weight only for fruits */}
              {!isRootStock && (
                <div className="meta-item">
                  <span className="meta-label">Fruit Size</span>
                  <span className="meta-value">{product.weight}</span>
                </div>
              )}

              <div className="meta-item">
                <span className="meta-label">Stock</span>
                <span
                  className={`meta-value ${
                    inStock ? 'in-stock' : 'out-stock'
                  }`}
                >
                  {inStock
                    ? isRootStock
                      ? `${product.stock} plants available`
                      : `${product.stock} boxes available`
                    : 'Out of stock'}
                </span>
              </div>
            </div>

            {(product.ratings || product.rootstockRatings) && (
              <div className="taste-profile">
                <h3>
                  {product.ratings
                    ? 'Taste Profile'
                    : 'Rootstock Characteristics'}
                </h3>

                {Object.entries(
                  product.ratings || product.rootstockRatings
                ).map(([key, value]) => (
                  <div className="rating-row" key={key}>
                    <span>
                      {key
                        .replace(/([A-Z])/g, ' $1')
                        .replace(/^./, (str) => str.toUpperCase())}
                    </span>

                    <img
                      src={`Images/ratings/rating-${value}.png`}
                      alt={`${key} Rating`}
                    />
                  </div>
                ))}
              </div>
            )}

            <p className="detail-description">{product.description}</p>



            <button
              type="button"
              className="btn btn-primary inquiry-toggle"
              onClick={() => setShowInquiry(!showInquiry)}
            >
              {showInquiry ? 'Hide Inquiry Form' : 'Send Inquiry'}
            </button>
          </div>
        </div>

        {showInquiry && (
          <div className="inquiry-panel">
            <h2>Product Inquiry</h2>

            <p className="inquiry-panel-sub">
              Interested in ordering? Fill out the form and we will get back to
              you.
            </p>

            <InquiryForm
              productId={product.id}
              productName={product.name}
              productCategory={product.category}
              onSuccess={() => setShowInquiry(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;