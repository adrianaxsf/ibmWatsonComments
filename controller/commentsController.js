const {Comments} = require("../models")
const watsonTTS = require("../clients/watson")

const commentsController = {
  listComments: async (req,res) => {
    const response = await Comments.findAll()
    res.render('index', {comments: response})
  },
  
  insertComments: async (req,res) => {
    const {comment} = req.body
    const novoAudio = await watsonTTS(comment)
    const response = await Comments.create(
      { comment: comment })
    res.send(novoAudio)
  },

  listenComment: async (txt) => {
        await axios.get(`./listen/${txt.text}`, { responseType: "blob" }).then(res => {
            var blob = new Blob([res.data], { type: "audio/webm" });
            var url = window.URL.createObjectURL(blob);
            window.audio = new Audio();
            window.audio.src = url;
            window.audio.play();
        })
    }

}


module.exports = commentsController;
