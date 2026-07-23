import {useState} from "react";

function ProductForm({initialData, onSubmit, buttonText}) {

   const [title, setTitle] = useState(initialData?.title || "");
   const [price, setPrice] = useState(initialData?.Price || "")
   const [category, setCategory] = useState(initialData?.category || "")
   const [description, setDescription] = useState(initialData?.description || "")
   const [image, setImage] = useState(initialData?.image || "")

   function handleSubmit(e) {
    e.preventDefault();

    const product = {
      title,
      price,
      category,
      description,
      image,
    };

    onSubmit(product);
  }

  return (
    <form onSubmit={handleSubmit}>
       <input
       type = "text"
       placeholder="Product Title"
       value={title}
       onChange = {(e)=>setTitle(e.target.value)}
       />

       <br/><br/>

       <input 
       type = "number"
       placeholder="Price"
       value = {price}
       onChange = {(e) => setPrice(e.target.value)}
       />

       <br /><br/>

       <input
       type = "text"
       placeholder="Image URL"
       value = {image}
       onChange = {(e) => setImage(e.target.value)}
       />

       <br/><br/>

       <button type = "submit">{buttonText}</button>
    </form>
  )
}

export default ProductForm