const db = require("../models")

exports.create = async (comment) => {
  const response = await db.comments.create(
    { comment: comment }
  )
  return response
}

exports.listAll = async (req, res) => {
  const response = await db.comments.findAll()
  res.send(response)
}
