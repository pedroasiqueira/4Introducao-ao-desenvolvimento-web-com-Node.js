const express = require('express');
require('express-async-errors'); // não precisa definir uma variável
const teamsRouter = require('./routes/teamsRouter')

const app = express();

app.use(express.json());

app.use('/teams', teamsRouter);


module.exports = app;