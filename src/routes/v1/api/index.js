const express = require('express');
const router = new express.Router();
const helloWorldController = require('../../../controller/helloworld');
const userController = require('../../../controller/user');
const s3Controller = require('../../../controller/s3');
const passport = require('passport');

router.get('/', helloWorldController.index);

router.get('/users', userController.index);
router.post('/users', userController.store);
router.delete('/users/:id', userController.destroy);
router.put('/users', userController.update);
router.get('/users/:id', userController.show);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: 'http://localhost:3000/login',
		successRedirect: 'http://localhost:3000',
	})
);

router.get('/getPresignedUrl', s3Controller.getPresignedUrl);

router.get('/getDownloadPresignedUrl', s3Controller.getDownloadPresignedUrl);

module.exports = router;
