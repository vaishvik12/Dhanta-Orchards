import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import InquiryForm from '../components/InquiryForm';
// import api from '../api/client';
import { fallbackProducts } from '../data/fallbackProducts';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showInquiry, setShowInquiry] = useState(false);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const { data } = await api.get(`/products/${id}`);
  //       setProduct(data);
  //     } catch {
  //       const found = fallbackProducts.find((p) => p.id === Number(id));
  //       if (found) {
  //         setProduct(found);
  //       } else {
  //         setError('Product not found.');
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProduct();
  // }, [id]);

  useEffect(() => {
    const found = fallbackProducts.find(
      (p) => p.id === Number(id)
    );

    if (found) {
      setProduct(found);
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
            <p className="detail-price">
              ₹{Number(product.price).toLocaleString('en-IN')}
              {product.category === 'RootStocks' ? ' / plant' : ' / kg'}
            </p>

            <div className="detail-meta">
              <div className="meta-item">
                <span className="meta-label">Season</span>
                <span className="meta-value">{product.season}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Size</span>
                <span className="meta-value">{product.size}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Weight</span>
                <span className="meta-value">{product.weight}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Stock</span>
                <span className={`meta-value ${inStock ? 'in-stock' : 'out-stock'}`}>
                  {inStock ? `${product.stock} kg available` : 'Out of stock'}
                </span>
              </div>
            </div>

            {product.ratings && (
              <div className="taste-profile">
                <h3>Taste Profile</h3>

                <div className="rating-row">
                  <span>Sweetness</span>
                  <img
                    src={`Images/ratings/rating-${product.ratings.sweetness}.png`}
                    alt="Sweetness Rating"
                  />
                </div>

                <div className="rating-row">
                  <span>Juiciness</span>
                  <img
                    src={`Images/ratings/rating-${product.ratings.juiciness}.png`}
                    alt="Juiciness Rating"
                  />
                </div>

                <div className="rating-row">
                  <span>Crunch</span>
                  <img
                    src={`Images/ratings/rating-${product.ratings.crunch}.png`}
                    alt="Crunch Rating"
                  />
                </div>

                <div className="rating-row">
                  <span>Aroma</span>
                  <img
                    src={`Images/ratings/rating-${product.ratings.aroma}.png`}
                    alt="Aroma Rating"
                  />
                </div>
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
              Interested in ordering? Fill out the form and we will get back to you.
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
