require('express-async-errors');
const express = require('express');
const routes = require('./routes');
const AppError = require('./helpers/AppError');

const app = express();

app.use(express.json());
app.use(routes);
app.use((err, req, res, _next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: "Internal Server Error" });
});

app.listen(3000, () => {
  console.log ('Server is running on port 3000');
});

