import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  const imageUrl =
    product.image ||
    'https://images.unsplash.com/photo-1568702848514-96ef05de0a7d?w=600&q=80';

  const inStock = product.stock > 0;

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card-link">
        <div className="product-card-image">
          <img src={imageUrl} alt={product.name} loading="lazy" />
          <span className="product-category">{product.category}</span>
          {!inStock && <span className="product-badge out-of-stock">Out of Stock</span>}
        </div>
        <div className="product-card-body">
          <h3 className="product-name">{product.name}</h3>

          {product.variety && (
            <p className="product-variety">{product.variety}</p>
          )}

          <p className="product-season">{product.season}</p>

          {product.ratings && (
            <div className="product-ratings">
              <div className="rating-item">
                <span>Sweet</span>
                <img
                  src={`Images/ratings/rating-${product.ratings.sweetness}.png`}
                  alt={`${product.ratings.sweetness / 10} star sweetness rating`}
                />
              </div>

              <div className="rating-item">
                <span>Juicy</span>
                <img
                  src={`Images/ratings/rating-${product.ratings.juiciness}.png`}
                  alt={`${product.ratings.juiciness / 10} star juiciness rating`}
                />
              </div>

              <div className="rating-item">
                <span>Crunch</span>
                <img
                  src={`Images/ratings/rating-${product.ratings.crunch}.png`}
                  alt={`${product.ratings.crunch / 10} star crunch rating`}
                />
              </div>
            </div>
          )}

          <div className="product-card-footer">
            <span className="product-price">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </span>
            <span className="product-size">{product.size}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
