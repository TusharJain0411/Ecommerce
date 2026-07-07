const User = require("../models/user");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
}


const getLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });

    if (password !== user.password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user);
    user.token = token;
    await user.save();
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getVerifyToken = async (req, res) => {
  res.json({ success: true, message: "Token is valid", user: req.user });
};

const Profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const register = async (req, res) => {

  try {

 
    const { name, email, phone, location, password, confirm_password } =
      req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
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

    await User.create({
      name,
      email,
      phone,
      location,
      password,
      confirm_password,
      profileImage: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
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
    await User.findByIdAndUpdate(req.user.id, { token: "" });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, location, password, confirm_password } =
      req.body;

    const updateData = {
      name,
      email,
      phone,
      location,
    };

    // Only update password if the user entered one
    if (password && password.trim() !== "") {
      if (password !== confirm_password) {
        return res.status(400).json({
          success: false,
          message: "Passwords do not match",
        });
      }

      // If you're using bcrypt, hash the password here
      // const hashedPassword = await bcrypt.hash(password, 10);

      updateData.password = password;
      updateData.confirm_password = confirm_password;
      // updateData.password = hashedPassword;
      // updateData.confirm_password = hashedPassword;
    }

    if (req.file) {
      updateData.profileImage = req.file.path;
    }

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
    }).select("-password -confirm_password");

    res.status(200).json({
      success: true,
      message: "Profile Updated",
      user,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};


module.exports = {
  getLogin,
  getVerifyToken,
  Profile,
  register,
  logout,
  updateProfile,
};
