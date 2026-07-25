
import { useState } from "react";
import "../styles/ProductForm.css";

function ProductForm({ initialData, onSubmit, buttonText = "Save Product" }) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [image, setImage] = useState(initialData?.thumbnail || initialData?.image || "");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, price, category, description, image });
  }

  return (
    <div className="form-card-container">
      <form onSubmit={handleSubmit} className="product-form-card">
        <h2>{buttonText}</h2>

        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Price (₹)</label>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="3"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-form-submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;