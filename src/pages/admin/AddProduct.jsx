// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
// import ProductForm from "../../components/ProductForm";
// import { createProduct } from "../../services/api";

// function AddProduct() {
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();

//   const mutation = useMutation({
//     mutationFn: createProduct,
//     onSuccess: () => {
//       alert("Product Added Successfully");

//       queryClient.invalidateQueries({
//         queryKey: ["products"],
//       });

//       navigate("/admin/products");
//     },

//     onError: () => {
//       alert("Something went wrong");
//     },

//   });

//   function handleAddProduct(product) {
//     console.log("Product Data: ", product)
//     mutation.mutate(product);
//   }

//   return (
//     <div>
//       <h1>Add Product</h1>

//       <ProductForm
//         initialData={{}}
//         onSubmit={handleAddProduct}
//         buttonText="Add Product"
//       />
//     </div>
//   );
// }

// export default AddProduct;


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
      alert("Product Added Successfully");

      queryClient.setQueryData(["products"], (oldProducts = []) => {
        return [...oldProducts, newProduct];
      });

      navigate("/admin/products");
    },

    onError: (error) => {
      console.error(error);
      alert("Something went wrong");
    },
  });

  function handleAddProduct(product) {
    console.log("Product Data:", product);
    mutation.mutate(product);
  }

  return (
    <div>
      <h1>Add Product</h1>

      <ProductForm
        initialData={{}}
        onSubmit={handleAddProduct}
        buttonText="Add Product"
      />
    </div>
  );
}

export default AddProduct;