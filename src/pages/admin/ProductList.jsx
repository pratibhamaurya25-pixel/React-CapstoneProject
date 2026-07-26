import { useNavigate } from "react-router-dom";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getProducts, deleteProduct } from "../../services/api";

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

    staleTime: Infinity,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(["products"], (oldProducts = []) =>
        oldProducts.filter(
          (product) => String(product.id) !== String(deletedId),
        ),
      );

      alert("Product Deleted Successfully");
    },

    onError: (error, deletedId) => {
      console.error("Delete Error:", error);

      // DummyJSON gives error sometimes
      // Remove from UI manually

      queryClient.setQueryData(["products"], (oldProducts = []) =>
        oldProducts.filter(
          (product) => String(product.id) !== String(deletedId),
        ),
      );

      alert("Product removed from UI");
    },
  });

  function handleDelete(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (confirmDelete) {
      deleteMutation.mutate(id);
    }
  }

  function handleEdit(id) {
    console.log("Editing Product ID:", id);

    navigate(`/admin/edit-product/${id}`);
  }

  if (isLoading) {
    return <Loader />;
  }

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

              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.thumbnail || product.image}
                      alt={product.title}
                      className="table-thumb"
                    />
                  </td>

                  <td className="product-title">{product.title}</td>

                  <td>$ {product.price}</td>

                  <td>{product.category}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="btn-action edit"
                        onClick={() => {
                          console.log("Edit clicked:", product.id);

                          navigate(`/admin/edit-product/${product.id}`);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn-action delete"
                        onClick={() => handleDelete(product.id)}
                        disabled={deleteMutation.isPending}
                      >
                        {deleteMutation.isPending ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
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
