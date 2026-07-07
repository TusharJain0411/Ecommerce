import React, { useEffect, useState } from "react";
import "../CSS/dashboard.css";
import { useNavigate } from "react-router-dom";
import { dashboardAPI } from "../../services/adminCRUD-API";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState({
    productCount: 0,
    stockCount: 0,
    AvailableProducts: 0,
    OutOfStockProducts: 0,
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await dashboardAPI();
        setDashboardData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  const handleShowProduct = () => {
    navigate("/admin/Products");
  };

  const handleAddProduct = () => {
    navigate("/admin/addproduct");
  };

  return (
    <>
      <div className="dashboard">
        <h2 className="dashboard-head">Stock Overview</h2>

        <div className="Stock-detail">
          <div className="stocks">
            <span>{dashboardData.productCount}</span>
            <p>Total Products</p>
          </div>

          <div className="stocks">
            <span>{dashboardData.stockCount}</span>
            <p>Total Stock</p>
          </div>

          <div className="stocks">
            <span>{dashboardData.AvailableProducts}</span>
            <p>Available Stock</p>
          </div>

          <div className="stocks">
            <span>{dashboardData.OutOfStockProducts}</span>
            <p>Out of Stock</p>
          </div>
        </div>

        <h2 className="dashboard-head">Quick Actions</h2>

        <div className="Product-detail">
          <div className="transfer-section" onClick={handleShowProduct}>
             Show Products
          </div>

          <div className="transfer-section" onClick={handleAddProduct}>
             Add New Product
          </div>
        </div>

        <h2 className="dashboard-head">Orders</h2>

        <div
          className="order-Section"
          onClick={() => navigate("/admin/orders")}
        >
          View All Orders →
        </div>
      </div>
    </>
  );
}

export default Dashboard;
