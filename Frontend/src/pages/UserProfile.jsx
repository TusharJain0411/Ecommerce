import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProfile, logoutUser, updateProfile } from "../services/authAPI";
import { logout } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../CSS/profile.css";
import profile_img from "../assets/accountImg.png";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading,setLogoutLoading]=useState(false);
  const[saveLoading,setSaveLoading]=useState(false);
  const [showPopUp,setShowPopUp]=useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirm_password: "",
    profileImage: null,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile(token);

      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (err) {
      toast.error("Unable to fetch profile");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
     setLogoutLoading(true);
      await logoutUser(token);

      dispatch(logout());

      toast.success("Logged out");

      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
    finally{
    setLogoutLoading(false);
    }
  };

  

const handleBack=()=>{
  navigate("/home")
}

const handleUpdate = async () => {
  try {
    setSaveLoading(true);
    const formData = new FormData();

    formData.append("name", editData.name);
    formData.append("email", editData.email);
    formData.append("phone", editData.phone);
    formData.append("location", editData.location);
    formData.append("password", editData.password);
    formData.append("confirm_password", editData.confirm_password);
    
    if (editData.password.trim() !== "") {
      formData.append("password", editData.password);
      formData.append("confirm_password", editData.confirm_password);
    }

    if (editData.profileImage) {
      formData.append("userprofile", editData.profileImage);
    }

    const res = await updateProfile(token, formData);

    if (res.data.success) {
      setUser(res.data.user);
      setShowPopUp(false);
      toast.success("Profile Updated");
    }
    
  } catch (err) {
    toast.error("Update Failed");
  }
  finally{
    setSaveLoading(false);
  }
};

const handleEdit = () => {
  setEditData({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    location: user.location || "",
    password: "",
    confirm_password:"",
    profileImage: null,
  });

  setShowPopUp(true);
};

if (loading) {
  return (
    <div
      className="d-flex justify-content-center align-items-center position-absolute top-50"
      style={{ left: "45%" }}
    >
      <button
        class="btn bg-transparent p-1 m-0"
        type="button"
        disabled
        style={{ color: "#7c3aed" }}
      >
        <span
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
      <button
        class="btn bg-transparent p-1 m-0"
        type="button"
        disabled
        style={{ color: "#7c3aed" }}
      >
        <span
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
      <button
        class="btn bg-transparent p-1 m-0"
        type="button"
        disabled
        style={{ color: "#7c3aed" }}
      >
        <span
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
        ></span>
      </button>
    </div>
  );
}

  return (
    <>
      {showPopUp && (
        <div className="Baground-glass">
          <div className="update-profile">
            <div className="input-fileds">
              <div>
                <label htmlFor="">Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      profileImage: e.target.files[0],
                    })
                  }
                />
              </div>
              <div>
                <label htmlFor="">Name:</label>
                <input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Phone:</label>
                <input
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData({ ...editData, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Location:</label>
                <input
                  value={editData.location}
                  onChange={(e) =>
                    setEditData({ ...editData, location: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Password:</label>
                <input
                  type="password"
                  value={editData.password}
                  onChange={(e) =>
                    setEditData({ ...editData, password: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Confirm Password:</label>
                <input
                  type="password"
                  value={editData.confirm_password}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      confirm_password: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="save-cancel-btn">
              {saveLoading ? (
                <button className="save-btn" disabled>
                  <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Saving...
                </button>
              ) : (
                <button className="save-btn" onClick={handleUpdate}>
                  Save
                </button>
              )}

              <button
                className="cancel-btn"
                onClick={() => setShowPopUp(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-image">
            <img
              src={user.profileImage ? user.profileImage : profile_img}
              alt="Profile"
            />
          </div>

          <div className="profile-info">
            <div className="userprofile-head">
              <h2>{user.name}</h2>
              <button onClick={handleEdit}>Edit</button>
            </div>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Phone:</strong> {user.phone}
            </p>

            <p>
              <strong>Location:</strong> {user.location}
            </p>
            <div className="userProfile-btn">
              {logoutLoading ? (
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

              <button onClick={handleBack}>Back</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
