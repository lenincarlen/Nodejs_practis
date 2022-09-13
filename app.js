const express = require('express');
//Models
const { postRouter } = require('./routes/post.routes');
//Routes
const { usersRouter } = require('./routes/users.routes')

const { commentsRouter } = require('./routes/comments.routes')
// Utils
//Dummy data
//* init our Express
const app = express();
//* Enable express app to receive JSON data
app.use(express.json()); //* Middleware
//Define endpoints
app.use('/api/v1/users', usersRouter);//exportado de users.routes
// Posts endpoints
app.use('/api/v1/posts', postRouter);

app.use('/api/v1/comments', commentsRouter)
//Catch non-existing endpoints
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `${req.method} ${res.url} does not exists in our server`,
  });
});

module.exports = { app }