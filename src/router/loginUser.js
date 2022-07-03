const express = require('express');
const router = express.Router();

const loginUserController = require("../controller/loginUser")


router.post('/newuser', loginUserController.createUser);

router.post('/login', loginUserController.loginUser)
router.post('/forgotpassword', loginUserController.forgotPassword)
router.put('/resetpassword', loginUserController.resetPassword)

module.exports = router;