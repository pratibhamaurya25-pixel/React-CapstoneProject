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

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const confirmOrder = window.confirm(
      `Your total is ₹${totalPrice.toFixed(
        2
      )}.\n\nDo you want to place the order?`
    );

    if (confirmOrder) {
      alert("🎉 Order placed successfully!");

      // Clear cart after successful checkout
      clearCart();
    }
  };

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
              <img
                src={imageSrc}
                alt={item.title}
                className="cart-item-img"
              />

              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">
                  ₹{item.price}
                </p>
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
          <button
            className="btn-clear"
            onClick={clearCart}
          >
            Clear Cart
          </button>

          <button
            className="btn-checkout"
            onClick={handleCheckout}
          >
            Checkout Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;