import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../services/api";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";

import { useState, useEffect } from "react";
import SearchBar from "../components/Searchbar";

function Products() {
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );


  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div>

      <SearchBar search={search} setSearch={setSearch} />

      <h1>Products</h1>

      <div>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
