const express = require("express");
const router = express.Router();
const { signup, signin, logout } = require("../controllers/auth_controller.js");

const {
    me,
    updateProfile,
    changePassword,
} = require("../controllers/profile_controller.js");

const { home } = require("../controllers/home_controller.js");

const { activity } = require("../controllers/activity_controller.js");

const { activities } = require("../controllers/activities_controller.js");

router.post("/signup", signup);
router.post("/signin", signin);
router.delete("/logout", logout);
router.get("/:user_id/home", home);
router.get("/:user_id/activity", activity);
router.get("/:user_id/account", me);
router.put("/:user_id/account", updateProfile);
router.patch("/password", changePassword);
router.post("/:user_id/activities", activities);

module.exports = router;
