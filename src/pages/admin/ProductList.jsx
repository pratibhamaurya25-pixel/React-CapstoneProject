import { useNavigate } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getProducts,
  deleteProduct,
} from "../../services/api";

import Loader from "../../components/Loader";
import "../../styles/ProductList.css";

function ProductList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: () => {
      alert("Product Deleted Successfully!");

      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },

    onError: (error) => {
      console.error(error);
      alert("Failed to Delete Product");
    },
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <div className="manage-products-page">
      <div className="manage-header">
        <h1>Manage Products</h1>

        <button
          className="btn-add-product"
          onClick={() => navigate("/admin/add-product")}
        >
          + Add Product
        </button>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th className="actions-heading">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.thumbnail || product.image}
                    alt={product.title}
                    className="table-thumb"
                  />
                </td>

                <td className="product-title">{product.title}</td>

                <td className="product-price">
                  ₹ {product.price}
                </td>

                <td className="product-category">
                  {product.category}
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-action edit"
                      onClick={() =>
                        navigate(`/admin/edit-product/${product.id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn-action delete"
                      onClick={() => handleDelete(product.id)}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="empty-table">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;