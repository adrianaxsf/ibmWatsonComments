const {Comments} = require("../models")

const commentsController = {
  listComments: async (req,res) => {
    const response = await Comments.findAll()
    res.render('index', {comments: response})
  },
  
  insertComments: async (req,res) => {
    const {comment} = req.body
    const response = await Comments.create(
      { comment: comment})
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
