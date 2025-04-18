const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();


//Auth Routes
router.post("/register" , registerUser); //Register User
router.post("/login" , loginUser); //Login User
router.get("/profile" , protect, getUserProfile); //Get User Profile
router.put("/profile" , protect, updateUserProfile); //Update User Profile


router.post("/upload-image", upload.single("image"), (req ,res) => {
    if(!req.file){
        return res.status(400).json({message: "No file uploaded"})
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
})

module.exports = router