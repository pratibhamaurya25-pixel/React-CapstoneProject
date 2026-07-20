import {useContext} from "react";
import { CartContext } from "../context/CartContext";

function Cart(){
  const{
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (cart.length === 0){
    return <h2>Your Cart is Empty</h2>
  }

  return(
    <div>
      <h1>Shopping Cart</h1>

      {cart.map((item)=>(
        <div key={item.id}>
          <img src={item.image} alt={item.title} width="100" />
          <h3>{item.title}</h3>
          <p>Price: {item.price}</p>
          <p>Category: {item.category}</p>
          <h4>Quantity: {item.quantity}</h4>

          <button onClick={() => decreaseQuantity(item.id)}>-</button>

          <button onClick={()=> increaseQuantity(item.id)}>+</button>

          <br/><br/>

          <button onClick={() => removeFromCart(item.id)}>Remove</button>
          
        </div>
      ))}

      <hr />

      <h2>Total Price: {totalPrice.toFixed(2)}</h2>

      <button onClick={clearCart}>Clear Cart</button>
    </div>
  )
}

export default Cart;