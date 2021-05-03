const express = require('express');
const router = express.Router();
const commentsController = require('../controller/commentsController')


router.get('/', commentsController.listComments)
router.post('/insertComments', commentsController.insertComments)


module.exports = router;
