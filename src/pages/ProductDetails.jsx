import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/api";
import Loader from "../components/Loader";
import "../styles/ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) return <Loader />;
  if (isError) return <h2>Error loading product</h2>;

  return (
    <div className="product-details">
      <div className="product-image">
        <img
          src={product.thumbnail || product.image}
          alt={product.title}
        />
      </div>

      <div className="product-info">
        <h1>{product.title}</h1>

        <p className="category">
          <strong>Category:</strong> {product.category}
        </p>

        <p className="price">₹{product.price}</p>

        <p className="rating">
          ⭐ {product.rating} ({product.reviewCount} Reviews)
        </p>

        <p className="stock">
          <strong>Stock:</strong> {product.stock}
        </p>

        <p className="description">
          {product.description}
        </p>

        <button className="buy-btn">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;