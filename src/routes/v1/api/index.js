const express = require('express');
const router = new express.Router();
const helloWorldController = require('../../../controller/helloworld');
const userController = require('../../../controller/user');

router.get('/', helloWorldController.index);

router.get('/users', userController.index);
router.post('/users', userController.store);
router.delete('/users/:id', userController.destroy);
router.put('/users', userController.update);
router.get('/users/:id', userController.show);
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', userController.resetPassword);

module.exports = router;
