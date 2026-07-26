import React from "react";

function AdminSkeleton() {
  return (
    <div className="admin-card">
      <div className="skeleton sk-badge"></div>

      <div className="profile-box">
        <div className="skeleton sk-avatar"></div>
      </div>

      <div className="skeleton sk-name"></div>

      <div className="skeleton sk-line"></div>
      <div className="skeleton sk-line"></div>
      <div className="skeleton sk-line"></div>

      <div className="card-actions">
        <div className="skeleton sk-btn"></div>
        <div className="skeleton sk-btn"></div>
      </div>
    </div>
  );
}

export default AdminSkeleton;
