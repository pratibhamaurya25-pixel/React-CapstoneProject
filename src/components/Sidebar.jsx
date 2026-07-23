import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Sidebar.css";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-brand">
        <h2>ShopZone</h2>
        <span className="badge-admin">Admin</span>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">{user?.[0]?.toUpperCase() || "A"}</div>
        <div className="sidebar-user-info">
          <p className="user-label">Logged in as</p>
          <p className="user-email">{user || "Admin"}</p>
        </div>
      </div>

      <nav className="sidebar-menu">
        <NavLink to="/admin" end className="sidebar-link">
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className="sidebar-link">
          Manage Products
        </NavLink>
        <NavLink to="/admin/add-product" className="sidebar-link">
          Add New Product
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="btn-sidebar-logout" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;