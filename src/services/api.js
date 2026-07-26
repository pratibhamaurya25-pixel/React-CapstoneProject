const API_URL = "https://dummyjson.com/products";


// GET ALL PRODUCTS
export async function getProducts() {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data.products;
}



// GET SINGLE PRODUCT
export async function getProductById(id) {

  const response = await fetch(
    `${API_URL}/${id}`
  );


  if (!response.ok) {
    throw new Error("Product not found");
  }


  return response.json();
}



// CREATE PRODUCT
export async function createProduct(product) {

  const response = await fetch(
    `${API_URL}/add`,
    {
      method:"POST",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(product)

    }
  );


  if(!response.ok){

    throw new Error("Failed to create product");

  }


  return response.json();

}




// UPDATE PRODUCT
export async function updateProduct(id, product) {


  const response = await fetch(
    `${API_URL}/${id}`,
    {

      method:"PUT",

      headers:{
        "Content-Type":"application/json"
      },

      body:JSON.stringify(product)

    }
  );


  if(!response.ok){

    throw new Error(
      "Failed to update product"
    );

  }


  return response.json();

}





// DELETE PRODUCT
export async function deleteProduct(id) {


  const response = await fetch(
    `${API_URL}/${id}`,
    {

      method:"DELETE"

    }
  );


  if(!response.ok){

    throw new Error(
      "Failed to delete product"
    );

  }


  return response.json();

}