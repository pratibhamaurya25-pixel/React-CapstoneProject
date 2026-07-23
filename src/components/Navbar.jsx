import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import "../styles/Navbar.css"
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
      <h2>Nexus E-Commerce</h2>
      </div>

      <div className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart({cart.length})</NavLink>

      {user ? (
  <>
    <button onClick={logout}>Logout</button>
  </>
) : (
  <NavLink to="/Login">LoginAsAdmin</NavLink>
)}
      </div>
    </nav>
  );
}

export default Navbar;
