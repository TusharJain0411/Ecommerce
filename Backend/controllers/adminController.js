const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");

const generateToken = (admin) => {
  return jwt.sign(
    { id: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
}


const getLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (password !== admin.password) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = generateToken(admin);

    admin.token = token;
    await admin.save();

    res.status(200).json({
      success: true,
      token,
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        location: admin.location,
        profileImage: admin.profileImage,
        isAdmin: admin.isAdmin,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getVerifyToken = async (req, res) => {
  res.json({ success: true, message: "Token is valid", admin: req.admin });
};

const Profile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select("-password");
    res.status(200).json({ success: true, admin });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const register = async (req, res) => {

  try {

 
    const {
      name,
      email,
      phone,
      location,
      password,
      confirm_password,
      isAdmin,
    } = req.body;

    const adminExists = await Admin.findOne({ email });

    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }
      
    if (password !== confirm_password) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const imageUrl = req.file ? req.file.path : "";

   await Admin.create({
     name,
     email,
     phone,
     location,
     password,
     confirm_password,
     profileImage: imageUrl,
     isAdmin: isAdmin === "true",
   });

    return res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      image: imageUrl,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const logout = async (req, res) => {
  try {
    await Admin.findByIdAndUpdate(req.admin.id, { token: "" });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password -confirm_password");

    res.status(200).json({
      success: true,
      admins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    await Admin.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const { name, email, phone, location, isAdmin } = req.body;

    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.phone = phone || admin.phone;
    admin.location = location || admin.location;

    if (isAdmin !== undefined) {
      admin.isAdmin = isAdmin === "true";
    }

    if (req.file) {
      admin.profileImage = req.file.path;
    }

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      admin,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


module.exports = { getLogin, getVerifyToken, Profile, register, logout ,getAllAdmins,deleteAdmin,updateAdmin};
