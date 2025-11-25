const express = require('express');
const router = express.Router();
const {signupuser,loginuser,logout}=require("../controller/usercontroller")


router.post("/signup",signupuser);
router.post("/login",loginuser);
router.get("/logout",logout);

module.exports = router;