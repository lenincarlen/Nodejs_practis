const express = require('express');

// Controllers
const {
  getAllComments,
  createComment,
  updateComment,
  deleteComment,
} = require('../controllers/comments.controller');

// Middlewares
const { commentExists } = require('../middlewares/comments.middlewares');

const commentsRouter = express.Router();

commentsRouter.get('/', getAllComments);

commentsRouter.post('/', createComment);

commentsRouter.patch('/:id', commentExists, updateComment);

commentsRouter.delete('/:id', commentExists, deleteComment);

module.exports = { commentsRouter }; 