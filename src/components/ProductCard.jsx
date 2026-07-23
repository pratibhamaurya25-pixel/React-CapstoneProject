import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const imageSrc = product.thumbnail || product.image;

  return (
    <div className="product-card">
      <div className="product-card-img-wrapper">
        <img src={imageSrc} alt={product.title} />
      </div>

      <div className="product-card-body">
        <span className="product-card-category">
          {product.category}
        </span>

        <h3 className="product-card-title">
          {product.title}
        </h3>

        <div className="product-card-footer">
          <p className="product-card-price">
            ₹{product.price}
          </p>

          <div className="product-buttons">
            <button
              className="btn-cart"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <button
              className="btn-view-details"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;