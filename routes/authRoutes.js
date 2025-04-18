const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();


//Auth Routes
router.post("/register" , registerUser); //Register User
router.post("/login" , loginUser); //Login User
router.get("/profile" , protect, getUserProfile); //Get User Profile
router.put("/profile" , protect, updateUserProfile); //Update User Profile


module.exports = router