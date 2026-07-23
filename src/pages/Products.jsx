import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import "../styles/Products.css";

function Products() {
  const [search, setSearch] = useState("");

  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) return <Loader />;
  if (isError) return <h2 className="error-msg">Something went wrong</h2>;

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Products</h1>

        {/* Search Input */}
        <input
          type="text"
          placeholder="🔍 Search Products..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="products-grid">
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Remove this if you haven't implemented pagination */}
      {/* 
      <div className="pagination">
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>&gt;</button>
      </div>
      */}
    </div>
  );
}

export default Products;