import React ,{useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutAmin } from "../../services/adminAuth";
import "../CSS/navbar.css";

import { FiMoreVertical } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [loading,setLoading]=useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (token) {
        
        await logoutAmin(token);
      }

      localStorage.removeItem("token");
      navigate("/adminlogin", { replace: true });
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="admin-nav">
      {/* Mobile Header */}
      <div className="mobile-header">
        <h1>Admin</h1>

        <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          ⋮
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="admin-nav-container desktop-menu">
        <div className="navbar-links">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Profile
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/adminlist"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Admin List
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Orders
          </NavLink>
        </div>

        {loading ? (
          <button className="d-flex gap-1 justify-content-center align-items-center" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Logging out...
          </button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className={`mobile-menu ${showMenu ? "open" : ""}`}>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>

        <NavLink to="/admin/profile">Profile</NavLink>

        <NavLink to="/admin/products">Products</NavLink>

        <NavLink to="/admin/adminlist">Admin List</NavLink>

        <NavLink to="/admin/orders">Orders</NavLink>

        {loading ? (
          <button disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Logging out...
          </button>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
