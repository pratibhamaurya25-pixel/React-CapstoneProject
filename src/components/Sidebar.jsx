import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <aside>
      <h2>Admin Panel</h2>

      <p>Welcome {user?.name}</p>

      <nav>
        <NavLink to="/admin">Dashboard</NavLink>

        <br />

        <NavLink to="/admin/products">
          Products
        </NavLink>

        <br />

        <NavLink to="/admin/add-product">
          Add Product
        </NavLink>

        <br />
        <br />

        <button onClick={logout}>
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;