require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const PORT = process.env.PORT || 1300;
const connectDB=require("./db/dbConfig");

connectDB();
app.use(express.json());
app.use(cors());


app.use("/project1/auth",require("./routes/usersRoutes"));

app.use("/project1/products", require("./routes/inventoryRoutes"));

app.use("/project1/cart",require("./routes/cartRoutes"));

app.use("/project1/wishlist",require("./routes/wishlistRoutes"));

app.use("/project1/admin",require("./routes/adminRoutes"));

app.use("/project1/admincrud",require("./routes/adminCRUDRoutes"));

app.use("/project1/orders", require("./routes/orderRoute"));

app.use("/project1/payment", require("./routes/paymentRoute"));

app.use("/project1/admin/orders", require("./routes/adminOrderRoutes"));

app.listen(PORT, () => {
  console.log("server is running on http://localhost:1300/project1/auth");
});

