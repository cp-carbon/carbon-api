const express = require('express');
const router = express.Router()
const {
    signup,
    signin,
    logout
} = require('../controllers/auth_controller.js')

const { me, updateProfile, changePassword} = require("../controllers/profile_controller.js");

router.post("/signup", signup)
router.post("/signin", signin)
router.delete("/logout", logout)
router.get("/me", me)
router.put("/me", updateProfile)
router.patch('/password', changePassword);


module.exports = router;