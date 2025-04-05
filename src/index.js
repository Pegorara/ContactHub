require('express-async-errors');
const express = require('express');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(3000, () => {
  console.log ('Server is running on port 3000');
});

