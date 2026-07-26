import { useParams, useNavigate } from "react-router-dom";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import ProductForm from "../../components/ProductForm";
import Loader from "../../components/Loader";

import { getProductById, updateProduct } from "../../services/api";

function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],

    queryFn: async () => {
      // First check product list cache

      const products = queryClient.getQueryData(["products"]);

      const existingProduct = products?.find(
        (item) => String(item.id) === String(id),
      );

      if (existingProduct) {
        return existingProduct;
      }

      // If not in cache call API

      return await getProductById(id);
    },
  });

  // const mutation = useMutation({
  //   mutationFn: (data) => updateProduct(id, data),

  //   onSuccess: (updatedProduct) => {
  //     alert("Product Updated Successfully");

  //     queryClient.setQueryData(["products"], (oldProducts = []) =>
  //       oldProducts.map((item) =>
  //         String(item.id) === String(id)
  //           ? {
  //               ...item,
  //               ...updatedProduct,
  //             }
  //           : item,
  //       ),
  //     );

  //     navigate("/admin/products");
  //   },

  //   onError: (error) => {
  //     console.log(error);

  //     alert("Update Failed");
  //   },
  // });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const products = queryClient.getQueryData(["products"]);

      const existingProduct = products?.find(
        (item) => String(item.id) === String(id),
      );

      // If product exists only in cache
      if (existingProduct) {
        return {
          ...existingProduct,
          ...data,
        };
      }

      // Real DummyJSON products
      return updateProduct(id, data);
    },

    onSuccess: (updatedProduct) => {
      alert("Product Updated Successfully");

      queryClient.setQueryData(["products"], (oldProducts = []) =>
        oldProducts.map((item) =>
          String(item.id) === String(id) ? updatedProduct : item,
        ),
      );

      navigate("/admin/products");
    },

    onError: (error) => {
      console.log(error);

      alert("Update Failed");
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <h1>Edit Product</h1>

      <ProductForm
        initialData={product}
        onSubmit={(data) => mutation.mutate(data)}
        buttonText="Update Product"
      />
    </div>
  );
}

export default EditProduct;
