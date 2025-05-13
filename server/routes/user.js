const express = require("express");
const register = require("../controllers/register");
const login = require('../controllers/login')
const forgetPassword = require('../controllers/forgetPassword')
const router = express.Router();
const verifyOtp = require('../controllers/verifyOtp')
const getOtpTime = require('../controllers/getOtpTime')
const updatePassword = require('../controllers/passwordUpdate')
const getAccess = require('../controllers/getAccess')


router.post('/register',register)
router.post('/login',login)
router.post("/forget/password", forgetPassword);
router.post('/otp/verify',verifyOtp)
router.post('/otp/time',getOtpTime)
router.post('/password/update',updatePassword)
router.post('/get/access',getAccess)

module.exports=router;