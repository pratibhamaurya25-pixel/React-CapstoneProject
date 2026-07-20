import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/api";
import Loader from "../components/Loader";

function ProductDetails() {
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>
      <img src={product.image} alt={product.title} width="250" />

      <h2>{product.title}</h2>

      <h3>{product.price}</h3>

      <p><strong>Category:</strong> {product.category}</p>

      <p>
        <strong>Description:</strong>
      </p>

      <p>{product.description}</p>

      <p>
        ⭐ {product.rating.rate} ({product.rating.count} Reviews)
      </p>

      <button>Add To Cart</button>
    </div>
  );
}

export default ProductDetails;