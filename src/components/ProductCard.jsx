import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const {addToCart} = useContext(CartContext);
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.title}
        width="150"
      />

      <h3>{product.title}</h3>

      <p>₹ {product.price}</p>

      <p>{product.category}</p>

      <Link to={`/products/${product.id}`}>View Details</Link>

      <br />
      <br />

      <button onClick={() => addToCart(product)}>Add To Cart</button>

    </div>
  );
}

export default ProductCard;