const db = require('../models')
const Game = db.games

// Create and Save a new Game
exports.create = (req, res) => {
  // Validate request
  if (!req.body.category || !req.body.kiss || !req.body.marry || !req.body.kill) {
    res.status(400).send({ message: 'Content can not be empty' })
    return
  }

  // Create a Game
  const game = new Game({
    category: req.body.category,
    kiss: req.body.kiss,
    marry: req.body.marry,
    kill: req.body.kill
  })

  game
    .save(game)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while creating a game'
      })
    })
}

// Retrieve all Games from the database
exports.findAll = (req, res) => {
  const category = req.query.category
  let condition = category ? { 'category': category } : {}

  const person = req.query.person
  if (person !== undefined) condition.$or = [ { 'kiss': person }, {'marry': person }, {'kill': person} ]

  console.log(condition)

  Game.find(condition)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while retrieving games'
      })
    })
}

// Find a single Game with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Game.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: 'Not found game with id ' + id })
      else res.send(data)
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: 'Error retrieving game with id = ' + id })
    })
}

// Update a Game by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty'
    })
  }

  const id = req.params.id

  Game.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot update game with id = ' + id + '. Maybe game was not found'
        })
      } else res.send({ message: 'Game was updated successfully' })
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating game with id = ' + id
      })
    })
}

// Delete a Game with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Game.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot delete game with id = ' + id + '. Maybe game was not found'
        })
      } else {
        res.send({
          message: 'Game was deleted successfully'
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete game with id = ' + id
      })
    })
}

// Delete all Games from the database
exports.deleteAll = (req, res) => {
  Game.deleteMany({})
    .then(data => {
      res.send({
        message: data.deletedCount + ' games were deleted successfully'
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while removing all games'
      })
    })
}
