const express = require('express')

//controllers
const {
  getAllPosts,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/post.controller')

//Middlewares
const { postExists } = require('../middlewares/post.middleware')

const { createPostValidators } = require('../middlewares/validators.middlewares')

const postRouter = express.Router();

postRouter.get('/', getAllPosts)

postRouter.post('/', createPostValidators, createPost)

postRouter.patch('./:id', postExists, updatePost)

postRouter.delete('./:id', postExists, deletePost)

module.exports = { postRouter } 