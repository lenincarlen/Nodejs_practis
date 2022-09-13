const { Post } = require('../models/post.model')
const { User } = require('../models/user.model');
const { Comment } = require('../models/comment.model')

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'title', 'content', 'createdAt'],
      include: [{ model: User, attributes: ['id', 'name'] }, { model: Comment },
      {
        model: Comment, attributes: ['id', 'comment', 'createdAt']

      }
      ],

    })

    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    });
  } catch (error) {
    console.log(error)
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body

    const newPost = await Post.create({ title, content, userId })
    res.status(201).json({
      status: 'success',
      data: { newPost }
    });
  } catch (error) {
    console.log(error)
  }
}

const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body

    const { post } = req

    await post.update({ title, content })

    res.status(200).json({
      status: 'success',
      data: { post },
    })

  } catch (error) {
    console.log(error)
  }
}

const deletePost = async (req, res) => {
  try {
    const { post } = req;

    await post.uptdate({ status: 'deleted' })

    res.status(200).json({
      status: 'succes'
    })

  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost
}