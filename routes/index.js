const express = require('express');
const router = express.Router();
const commentsController = require('../controller/commentsController')
const watsonTTS = require("../clients/watson")

router.post('/enviarComentario', async (req, res) => {
    const {comment} = req.body
    const response = await commentsController.create(comment)
    const novoAudio = await watsonTTS(comment, response.id)

    res.send(novoAudio)
})

/* GET home page. */
router.get('/listarComentarios', commentsController.listAll)

module.exports = router;
