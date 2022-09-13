const express = require('express')

const { body, validationResult } = require('express-validator')

//Controllers
const {
  getAllUsers,
  createUser,
  updatedUser,
  deleteUser,
  login
} = require('../controllers/users.controller')


//Middlewares
const { userExists } = require('../middlewares/users.middleware')

const { createUserValidators } = require('../middlewares/validators.middlewares')

const usersRouter = express.Router();

usersRouter.get('/', getAllUsers);

usersRouter.post('/', createUserValidators, createUser);

usersRouter.post('/login', login)

usersRouter.patch('/:id', userExists, updatedUser);

usersRouter.delete('/:id', userExists, deleteUser);

module.exports = { usersRouter } 