// import { useContext } from "react";
// import { CartContext } from "../context/CartContext";
// import { EmptyState } from "../components/ErrorBoundary";
// import "../styles/Cart.css";

// function Cart() {
//   const {
//     cart,
//     increaseQuantity,
//     decreaseQuantity,
//     removeFromCart,
//     clearCart,
//   } = useContext(CartContext);

//   const totalPrice = cart.reduce((total, item) => {
//     return total + item.price * item.quantity;
//   }, 0);

//   if (cart.length === 0) {
//     return <h2>Your Cart is Empty</h2>;
//   }

//   if (cart.length === 0) {
//     return (
//       <div className="cart-empty-wrapper">
//       <EmptyState
//         icon="🛒"
//         title="Your Cart is Empty"
//         message="Start Shopping to add products."
//       />
//       </div>
//     );
//   }

//   return (
//     <div className="cart-container">
//       <h1>Shopping Cart</h1>
      
//       {/* <div className="cart-list"> */}
//       {cart.map((item) => (
//         <div key={item.id}>
//           <img src={item.image} alt={item.title} width="100" />
//           <h3>{item.title}</h3>
//           <p>Price: {item.price}</p>
//           <p>Category: {item.category}</p>
//           <h4>Quantity: {item.quantity}</h4>

//           <button onClick={() => decreaseQuantity(item.id)}>-</button>

//           <button onClick={() => increaseQuantity(item.id)}>+</button>

//           <br />
//           <br />

//           <button onClick={() => removeFromCart(item.id)}>Remove</button>
//         </div>
//       ))}

//       <hr />

//       <h2>Total Price: {totalPrice.toFixed(2)}</h2>

//       <button onClick={clearCart}>Clear Cart</button>
//     </div>
//     // </div>
//   );
// }

// export default Cart;


import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { EmptyState } from "../components/ErrorBoundary";
import "../styles/Cart.css";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useContext(CartContext);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty-wrapper">
        <EmptyState
          icon="🛒"
          title="Your Cart is Empty"
          message="Start shopping to add products to your cart."
        />
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <div className="cart-list">
        {cart.map((item) => {
          const imageSrc = item.thumbnail || item.image;
          return (
            <div key={item.id} className="cart-item">
              <img src={imageSrc} alt={item.title} className="cart-item-img" />

              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">₹{item.price}</p>
              </div>

              <div className="cart-quantity-controls">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>

              <div className="cart-item-total">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>

              <button
                className="btn-remove"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="cart-summary">
        <h2>Total: ₹{totalPrice.toFixed(2)}</h2>
        <div className="cart-actions">
          <button className="btn-clear" onClick={clearCart}>
            Clear Cart
          </button>
          <button className="btn-checkout">Checkout Now</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;