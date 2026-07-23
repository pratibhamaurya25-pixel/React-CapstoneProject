import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import { getProducts, deleteProduct} from "../../services/api";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";

function ProductList() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      alert("Product Deleted Successfully");

      qyeryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: () => {
      alert("Failed to Delete Product");
    }
  })

  function handleDelete(id){
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete){
      deleteMutation.mutate(id);
    }
  }

  if (isLoading){
    return <Loader />
  }

  if (isError){
    return <h2>{error.message}</h2>;
  }

  return(
    <div>
      <h1>Manage Products</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.title} width="60" />
              </td>

              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>

              <td>
                <Link to={`/admin/edit-product/${product.id}`}>Edit</Link>
                {"|"}
                <button onClick={()=> handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductList;