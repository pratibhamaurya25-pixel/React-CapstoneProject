const API_URL = "http://localhost:3001/products";


export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  console.log("PRODUCT DATA:", data);

  return data;
}


export async function getProductById(productId) {
  const response = await fetch(
    `${API_URL}/${productId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return await response.json();
}


export async function createProduct(product) {
  const response = await fetch(
    API_URL,
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


export async function updateProduct(
  productId,
  product
) {
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