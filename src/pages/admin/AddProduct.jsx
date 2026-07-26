import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../components/ProductForm";
import { createProduct } from "../../services/api";

function AddProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProduct,

    onSuccess: (newProduct) => {
      alert("Product Added Successfully!");

      queryClient.setQueryData(["products"], (oldProducts = []) => {
        // Remove duplicate product if it already exists
        const filteredProducts = oldProducts.filter(
          (product) => product.id !== newProduct.id
        );

        // Give the product a unique ID for React
        const productWithUniqueId = {
          ...newProduct,
          id: Date.now(),
        };

        return [...filteredProducts, productWithUniqueId];
      });

      navigate("/admin/products");
    },

    onError: (error) => {
      console.error("Add Product Error:", error);
      alert("Something went wrong while adding the product.");
    },
  });

  function handleAddProduct(productData) {
    mutation.mutate(productData);
  }

  return (
    <div>
      <h1>Add Product</h1>

      <ProductForm
        initialData={{}}
        onSubmit={handleAddProduct}
        buttonText={mutation.isPending ? "Adding..." : "Add Product"}
      />
    </div>
  );
}

export default AddProduct;