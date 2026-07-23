const API_URL = "https://dummyjson.com/products";


// Get all products
export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  console.log("PRODUCT DATA:", data);

  return data.products; 
}


// Get single product
export async function getProductById(productId) {
  const response = await fetch(
    `${API_URL}/${productId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return await response.json();
}


// Create product
export async function createProduct(product) {
  const response = await fetch(
    `${API_URL}/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return await response.json();
}


// Delete product
export async function deleteProduct(productId) {
  const response = await fetch(
    `${API_URL}/${productId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return await response.json();
}


// Update product
export async function updateProduct(productId, product) {
  const response = await fetch(
    `${API_URL}/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return await response.json();
}


// Get carts
export async function getCarts() {
  const response = await fetch(
    "https://dummyjson.com/carts"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch carts");
  }

  const data = await response.json();

  return data.carts;
}giv