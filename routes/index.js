const express = require('express');
const router = express.Router();
const commentsController = require('../controller/commentsController')
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const {IamAuthenticator} = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
  authenticator: new IamAuthenticator(
      {apikey: 'SFX2VGgJES6MRzGscCagruob_WDShDNZu3LjpSxE8MEH'}
  ),
  serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/e96c7fbe-5947-4786-9500-83e06c1d1bd1'
});

router.get('/', commentsController.listComments)
router.post('/insertComments', commentsController.insertComments)
router.delete('/deleteComment/:id', commentsController.destroy)

router.get('/listen/:text', async (req, res) => {
  console.log('texto', req.params)
  const synthesizeParams = {
    text: req.params.text,
    accept: 'audio/webm',
    voice: 'pt-BR_IsabelaV3Voice'
  };
  try {
    const { result } = await textToSpeech.synthesize(synthesizeParams).catch((err) => {
      res.status(500).json('Erro para processar o texto.')
    });
    const transcript = result;
    transcript.pipe(res);
    console.log('dentro: ', result, transcript, res)
  } catch (error) {
    res.status(500).json(error);
  }
  
})
module.exports = router;
