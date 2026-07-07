import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/adminlist.css";
import toast from "react-hot-toast";
import {
  getAdminList,
  deleteAdmin,
  updateAdmin,
} from "../../services/adminAuth";
import { useSelector } from "react-redux";

function AdminList() {
  const isMainAdmin = useSelector((state) => state.admin.MainAdmin);

  const [admins, setAdmins] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const [updateData, setUpdateData] = useState({
    _id: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    profileImage: "",
    isAdmin: false,
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await getAdminList(token);
      setAdmins(res.data.admins);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch admins");
    }
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;

    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openUpdate = (admin) => {
    setUpdateData({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      location: admin.location,
      profileImage: admin.profileImage,
      isAdmin: admin.isAdmin,
    });

    setIsUpdate(true);
  };

  const closeUpdate = () => {
    setIsUpdate(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("name", updateData.name);
      formData.append("email", updateData.email);
      formData.append("phone", updateData.phone);
      formData.append("location", updateData.location);
      formData.append("isAdmin", String(updateData.isAdmin));

      if (updateData.profileImage instanceof File) {
        formData.append("userprofile", updateData.profileImage);
      }

      await updateAdmin(updateData._id, formData, token);

      toast.success("Admin Updated");

      await fetchAdmins();

      setIsUpdate(false);
    } catch (error) {
      console.log(error);
      toast.error("Update Failed");
    }
  };

  const confirmDelete = (id) => {
    setSelectedAdmin(id);
    setIsDelete(true);
  };

  const cancelDelete = () => {
    setIsDelete(false);
    setSelectedAdmin(null);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await deleteAdmin(selectedAdmin, token);

      toast.success("Admin Deleted");

      setAdmins((prev) => prev.filter((admin) => admin._id !== selectedAdmin));

      setIsDelete(false);
      setSelectedAdmin(null);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete admin");
    }
  };

  return (
    <div className="admin-list-page">
      {/* Delete Popup */}

      {isDelete && (
        <div className="baground-glass">
          <div className="deletePop-up">
            <p>Are you sure you want to delete this admin?</p>

            <div className="del-btn-class">
              <button onClick={handleDelete}>Delete</button>

              <button onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Update Popup */}

      {isUpdate && (
        <div className="baground-glass">
          <div className="updatePop-up">
            <form onSubmit={handleUpdate}>
              <h2>Update Admin</h2>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={updateData.name}
                onChange={handleUpdateChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={updateData.email}
                onChange={handleUpdateChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={updateData.phone}
                onChange={handleUpdateChange}
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={updateData.location}
                onChange={handleUpdateChange}
              />

              <input
                type="file"
                onChange={(e) =>
                  setUpdateData((prev) => ({
                    ...prev,
                    profileImage: e.target.files[0],
                  }))
                }
              />

              <div className="radio-box">
                <label>Main Admin:</label>

                <label>
                  <input
                    type="radio"
                    checked={updateData.isAdmin === true}
                    onChange={() =>
                      setUpdateData((prev) => ({
                        ...prev,
                        isAdmin: true,
                      }))
                    }
                  />
                  True
                </label>

                <label>
                  <input
                    type="radio"
                    checked={updateData.isAdmin === false}
                    onChange={() =>
                      setUpdateData((prev) => ({
                        ...prev,
                        isAdmin: false,
                      }))
                    }
                  />
                  False
                </label>
              </div>

              <div className="update-btn-class">
                <button type="submit">Update</button>

                <button type="button" onClick={closeUpdate}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}

      <div className="admin-list-header">
        <h2>Admin List</h2>

        {isMainAdmin && (
          <Link to="/admin/addadmin" className="add-admin-btn">
            Add Admin
          </Link>
        )}
      </div>

      {/* Admin Cards */}

      <div className="admin-cards">
        {admins.map((admin) => (
          <div className="admin-card" key={admin._id}>
            {admin.isAdmin && <span className="mainUser">Main Admin</span>}

            <div className="profile-box">
              <img
                src={admin.profileImage || "/default-user.png"}
                alt={admin.name}
                className="admin-img"
              />
            </div>

            <h5>{admin.name}</h5>

            <p>
              <strong>Email:</strong> {admin.email}
            </p>

            <p>
              <strong>Phone:</strong> {admin.phone}
            </p>

            <p>
              <strong>Location:</strong> {admin.location}
            </p>

            {isMainAdmin && (
              <div className="card-actions">
                <button
                  className="delete-btn"
                  onClick={() => confirmDelete(admin._id)}
                >
                  Delete
                </button>

                <button
                  className="update-btn"
                  onClick={() => openUpdate(admin)}
                >
                  Update
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminList;
