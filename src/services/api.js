const BASE_URL = "https://fakestoreapi.com";

export async function getProducts() {
   const res = await fetch(`${BASE_URL}/products`);

   if(!res.ok){
      throw new Error("Failed to fetch products");
   }

   return res.json();
}

export async function getProductById(id){
    const res = await fetch(`${BASE_URL}/products/${id}`);

    if(!res.ok){
       throw new Error("Failed to fetch product");
    }

    return res.json();
}

export async function addProduct(product){
   const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
   });

   if (!res.ok){
      throw new Error("Failed to add product");
   }
   return res.json()
}

export async function updateProduct(id,product){
   const res = await fetch(`${BASE_URL}/${id}`,{
      method: "PUT",
      headers: {
         "content-Type": "application/json",
      },
      body: JSON.stringify(product),
   });

   if (!res.ok){
      throw new Error("Failed to update product")
   }
   return res.json()
}

export async function deleteProduct(id){
   const res  = await fetch(`${BASE_URL}/${id}`,{
      method: "DELETE",
   })

   if (!res.ok){
      throw new Error("Failed to Delete product")
   }

   return res.json();
}

