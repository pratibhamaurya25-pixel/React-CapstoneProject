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


      queryClient.setQueryData(
        ["products"],
        (oldProducts = []) => {

          return [
            ...oldProducts,
            newProduct
          ];

        }
      );


      navigate("/admin/products");

    },


    onError: (error) => {

      console.error(
        "Add Product Error:",
        error
      );

      alert("Failed to add product");

    }

  });



  function handleAddProduct(productData){

    mutation.mutate(productData);

  }



  return (

    <div>

      <h1>Add Product</h1>


      <ProductForm

        initialData={{}}

        onSubmit={handleAddProduct}

        buttonText={
          mutation.isPending
            ? "Adding..."
            : "Add Product"
        }

      />


    </div>

  );

}


export default AddProduct;