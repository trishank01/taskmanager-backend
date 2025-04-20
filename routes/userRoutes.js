const express = require("express");
const {adminOnly , protect} = require("../middleware/authMiddleware");
const { getUsers, deleteUser, getUserById } = require("../controllers/userController");


const router = express.Router()


// User Management Routes

router.get("/" , protect , adminOnly , getUsers); // Get all users(admin only)
router.get("/:id" , protect , getUserById);



module.exports = router;