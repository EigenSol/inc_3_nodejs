const express = require("express");
const router = express.Router()
const authController = require("../controllers/auth.controller")

router.post("/login",   authController.login )
router.post("/logout",  authController.logout)
router.post("/check",   authController.check )

module.exports = router