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

  destroy: async (req, res) => {
    const {id} = req.params;
    const resultado = await Comments.destroy({
      where: {
        id: id
    }
    })
    
    return res.redirect('/');

  }
}


module.exports = commentsController;
