const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
//Models

const { User } = require('../models/user.model')
const { Post } = require('../models/post.model')
const { Comment } = require('../models/comment.model')
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: 'active' },
      include: [
        {
          model: Post,
          include: {
            model: Comment,
            include: { model: User },
          },
        },
        {
          model: Comment
        }
      ],
    })


    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error)
  }
};
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    //Encrypt the password
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    //remove password from response
    newUser.password = undefined;

    //201 -< Success and a resourse has been created
    res.status(201).json({
      status: 'success',
      data: { newUser },
    });

  } catch (error) {
    console.log(error)
  }

}

const updatedUser = async (req, res) => {
  try {
    const { name } = req.body;
    const { user } = req

    //Check if the user exists before update

    // If user doesn't existe, send error message

    // const updatedUser = await User.update({ name }, { where: { id } });

    await user.update({ name }) // de esta manera no tengo tanto codigo escrito, es lo mismo que la linea de arriba

    res.status(200).json({
      status: 'success',
      data: { user }
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const { user } = req

    // Check if user exists before deletion

    //If user doesn't existm, send error message

    //if user exist, remove from the db
    // await user.destroy() ya casi nadie lo usa porque pierden todos los datos

    await user.update({ status: 'deleted' })

    res.status(204).json({ status: 'success' })
  } catch (error) {
    console.log(error)
  }
}

const login = async (req, res) => {
  try {
    // Get email and password from req.body

    const { email, password } = req.body

    //Validate if the user exist with given email

    const user = await User.findOne({

      where: { email, status: 'active' }

    })

    // compare passwords (entered password vs db password)
    // if user doesn't exists or password doesn't match, send error

    if (!user || (await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: 'error',
        message: 'Wring credentials'
      })
    }
    //remove password from response
    user.password = undefined

    //generate JWT (jasonWebToken)
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '5m' })

    res.status(200).json({
      status: 'success',
      data: { user, token },
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getAllUsers,
  createUser,
  updatedUser,
  deleteUser,
  login,
}

