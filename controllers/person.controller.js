const db = require('../models')
const Person = db.persons

// Create and Save a new Person
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.imageURL || !req.body.category || !req.body.info) {
    res.status(400).send({ message: 'Content can not be empty' })
    return
  }

  // Create a Person
  const person = new Person({
    name: req.body.name,
    category: req.body.category,
    imageURL: req.body.imageURL,
    info: req.body.info,
    kill: 0,
    marry: 0,
    kiss: 0
  })

  person
    .save(person)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while creating a person'
      })
    })
}

// Retrieve all Persons from the database
exports.findAll = (req, res) => {
  const category = req.query.category
  const condition = category ? { 'category': category } : {}

  Person.find(condition)
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

// Find a single Person with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  Person.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: 'Not found person with id ' + id })
      else res.send(data)
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: 'Error retrieving person with id = ' + id })
    })
}

// Update a Person by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Data to update can not be empty'
    })
  }

  const id = req.params.id

  Person.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot update person with id = ' + id + '. Maybe person was not found'
        })
      } else res.send({ message: 'Person was updated successfully' })
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating person with id = ' + id
      })
    })
}

// Delete a Person with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Person.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: 'Cannot delete person with id = ' + id + '. Maybe person was not found'
        })
      } else {
        res.send({
          message: 'Person was deleted successfully'
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete person with id = ' + id
      })
    })
}

// Delete all Persons from the database
exports.deleteAll = (req, res) => {
  Person.deleteMany({})
    .then(data => {
      res.send({
        message: data.deletedCount + ' persons were deleted successfully'
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occured while removing all persons'
      })
    })
}
