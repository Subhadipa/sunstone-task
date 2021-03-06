const express = require('express');
const router = express.Router();

const loginUserController = require("../controller/loginUser")
const vaidationMiddleware=require('../middleware/validation')
const authenticationMiddleware=require("../middleware/authentication")

router.post('/newuser', vaidationMiddleware.createUserSchema,loginUserController.createUser);

router.post('/login', vaidationMiddleware.loginUserSchema,loginUserController.loginUser)

router.post('/forgotpassword',authenticationMiddleware.tokenCheck, vaidationMiddleware.forgotPasswordSchema,loginUserController.forgotPassword)

router.put('/resetpassword', vaidationMiddleware.resetPasswordSchema,loginUserController.resetPassword)

module.exports = router;