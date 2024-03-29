const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/", userController.getUsers);
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/get-userDetails", userController.getUserDetails);


module.exports = router;
