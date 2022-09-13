//Models

const { User } = require('../models/user.model')

const userExists = async (req, res, next) => {
  try {
    const { id } = req.params
    // Check if user exists before deletion
    const user = await User.findOne({ where: { id } })

    //If user doesn't existm, send error message
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }


    // req.anyPropName= 'anyValue' esta propiedad puede tener cualquier nombre por ejemplo req.user
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }

}

module.exports = {
  userExists
}