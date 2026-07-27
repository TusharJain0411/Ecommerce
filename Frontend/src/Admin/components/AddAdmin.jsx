import React, { useState } from "react";
import { registerAdmin } from "../../services/adminAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../CSS/addadmin.css";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AddAdmin() {
  const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [loading,setLoading]=useState(false);
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirm_password: "",
    profileImage: null,
    isAdmin: "true",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "profileImage") {
      setAdminData({
        ...adminData,
        profileImage: files[0],
      });
    } else {
      setAdminData({
        ...adminData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();

      Object.keys(adminData).forEach((key) => {
        if (key === "profileImage") {
          formData.append("userprofile", adminData.profileImage);
        } else {
          formData.append(key, adminData[key]);
        }
      });

      await registerAdmin(formData);

      toast.success("Admin Added Successfully");

      navigate("/admin/adminlist");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add admin");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <form className="add-admin" onSubmit={handleSubmit}>
      <h2>Add Admin</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        onChange={handleChange}
      />

      <div className="password-field">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <span
          className="password-icon"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div className="password-field">
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirm_password"
          placeholder="Confirm Password"
          onChange={handleChange}
        />

        <span
          className="password-icon"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>

      <div>
        <label>Profile Image:</label>
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <div className="radio-group">
        <label>Main Admin:</label>
        <label>
          <input
            type="radio"
            name="isAdmin"
            value="true"
            checked={adminData.isAdmin === "true"}
            onChange={handleChange}
          />
          True
        </label>

        <label>
          <input
            type="radio"
            name="isAdmin"
            value="false"
            checked={adminData.isAdmin === "false"}
            onChange={handleChange}
          />
          False
        </label>
      </div>

      <div className="adminBtn  ">
        {loading ? (
          <button  type="submit" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Adding Admin...
          </button>
        ) : (
          <button type="submit">Register Admin</button>
        )}

        <Link to="/admin/adminlist">Back</Link>
      </div>
    </form>
  );
}

export default AddAdmin;
