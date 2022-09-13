const { User } = require('./user.model')
const { Post } = require('./post.model')
const { Comment } = require('./comment.model')

const initModels = () => {
  // 1 User <----> M post
  User.hasMany(Post, { foreignKey: 'userId' });
  Post.belongsTo(User)


  //1 Post <---> M comment
  Post.hasMany(Comment, { foreignKey: 'postId' })
  Comment.belongsTo(Post)

  //1 User <---> M comments

  User.hasMany(Comment, { foreignKey: 'userId' })
  Comment.belongsTo(User)
}

module.exports = { initModels }