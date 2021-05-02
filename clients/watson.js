const fs = require('fs');
const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const {IamAuthenticator} = require('ibm-watson/auth');

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator(
        {apikey: 'TU8_Lq4MACI_LspJS0Qr63qpmfa20a6h8-9JjyMlICp-'}
    ),
    serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/64b89757-7a' +
            '7f-4d83-9469-67198a4c7bde'
});

module.exports = async (text, id) => {
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