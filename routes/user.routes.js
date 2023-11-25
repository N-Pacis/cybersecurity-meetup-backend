import express from 'express'
const router = express.Router()
import { changePassword, checkCode, register, deleteAccount, getUserInformation, login, resetPassword, sendResetCode, updateUserInformation } from '../controllers/user.controller.js'
import authenticate from '../middlewares/auth.middleware.js';
import admin from '../middlewares/admin.middleware.js';
import { validateLogin, validatePasswordReset, validateProfileUpdate, validateUserRegistration } from '../validators/user.validator.js';


router.get("/user/profile", authenticate, getUserInformation)

router.post("/login", validateLogin, login)

router.post("/forgotPassword/sendResetCode", sendResetCode)

router.get("/forgotPassword/checkCode/:userId/:code", checkCode)

router.patch("/resetPassword/:userId", validatePasswordReset, resetPassword)

router.put("/user/profile/update", authenticate, validateProfileUpdate, updateUserInformation)

router.patch("/user/profile/changePassword", authenticate, changePassword)

router.delete("/user/profile/delete", authenticate, deleteAccount)

export default router;