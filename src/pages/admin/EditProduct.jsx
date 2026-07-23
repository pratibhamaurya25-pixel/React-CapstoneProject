import {useParams, useNavigate} from "react-router-dom";
import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import ProductForm from "../../components/ProductForm";
import Loader from "../../components/Loader";

import { getProductById, updateProduct } from "../../services/api";

function EditProduct() {
  const {id} = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: product,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  const mutation = useMutation({
    mutationFn: (updateProduct) => updateProduct(id, updateProduct),

    onSuccess: () => {
      alert("Product Updated Successfully");

      qyeryClient.invalidateQueries({
        queryKey: ["products"],
      });

      navigate("/admin/products");
    },

    onError: () => {
      alert("Failed to update product");
    },
  });

  function handleUpdate(productData){
    mutation.mutate(productData);
  }

  if(isLoading){
    return <Loader />
  }

  if(isError){
    return <h2>{error.message}</h2>
  }

  return(
    <div>
      <h1>Edit Product</h1>

      <ProductForm
      initialData={product}
      onSubmit={handleUpdate}
      buttonText="Update Product"
      />
    </div>
  )
}

export default EditProduct; 