const express = require('express');
const { signup, signin, requireSignIn } = require('../../controller/admin/auth');
const { validateSignupRequest, validateSigninRequest, isRequestValidated } = require('../../validators/auth');
const router = express.Router();

router.post('/admin/signup', validateSignupRequest, isRequestValidated, signup);
router.post('/admin/signin', validateSigninRequest, isRequestValidated, signin);


module.exports = router;