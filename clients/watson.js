const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const {IamAuthenticator} = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator(
        {apikey: 'SFX2VGgJES6MRzGscCagruob_WDShDNZu3LjpSxE8MEH'}
    ),
    serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/e96c7fbe-5947-4786-9500-83e06c1d1bd1'
});

module.exports = async (text,id) => {
    const synthesizeParams = {
        text: text,
        accept: 'audio/wav',
        voice: 'pt-BR_IsabelaV3Voice'
    };
    textToSpeech
        .synthesize(synthesizeParams)
        .then(response => {
            return textToSpeech.repairWavHeaderStream(response.result);
        })
        .then(buffer => {
            const url = '/audio.wav'
            return fs.writeFileSync(`./public/${id}.wav`, buffer);
        })
        .catch(err => {
            console.log('error:', err);
        });


}