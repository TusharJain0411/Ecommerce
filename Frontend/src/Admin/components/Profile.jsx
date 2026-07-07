import React, { useEffect, useState } from "react";
import { getProfile, updateAdmin } from "../../services/adminAuth";
import toast from "react-hot-toast";
import "../CSS/profile.css";

function Profile() {
  const token = localStorage.getItem("adminToken");

  const [adminId, setAdminId] = useState("");

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    isAdmin: false,
    userprofile: null,
  });

  const [preview, setPreview] = useState(null);





  const loadProfile = async () => {
    try {
      const res = await getProfile(token);

      const admin = res.data.admin;

      setAdminId(admin._id);

      setFormData({
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        location: admin.location,
        isAdmin: admin.isAdmin,
        userprofile: null,
      });

      setPreview(admin.profileImage);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "userprofile") {
      setFormData({
        ...formData,
        userprofile: e.target.files[0],
      });

      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("location", formData.location);
      data.append("isAdmin", formData.isAdmin);

      if (formData.userprofile) {
        data.append("userprofile", formData.userprofile);
      }

      await updateAdmin(adminId, data, token);

      toast.success("Profile Updated");

      setEditMode(false);
      const res = await getProfile(token);

     
      loadProfile();
    } catch (err) {
      console.log(err);
      toast.error("Update Failed");
    }
  };

  return (
    <>
      <div className="Profile-head">
        <h2>My Profile</h2>
        <button onClick={() => setEditMode(true)}>Edit Profile</button>
      </div>
      <div className="Adminprofile-container">
        <div className="img-container">
          <img src={preview} alt="" />
        </div>

        <form className="profile-form">
          {formData.isAdmin && (
            <p style={{ color: "#9e99e8" }}>Main Admin</p>
          )}
          {editMode && (
            <input
              type="file"
              name="userprofile"
              accept="image/*"
              onChange={handleChange}
            />
          )}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editMode}
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editMode}
          />

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editMode}
          />

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            disabled={!editMode}
          />
        </form>

        {!editMode ? (
          ""
        ) : (
          <div className="profile-buttons">
            <button onClick={handleUpdate}>Update</button>

            <button
              onClick={() => {
                setEditMode(false);
                loadProfile();
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
