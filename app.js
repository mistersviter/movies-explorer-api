const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errorLogger, requestLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
require('dotenv').config();
const router = require('./routes');
const {
  CORS_OPTIONS,
  DB_PATH,
  LIMITER_OPTIONS,
} = require('./utils/config');

const limiter = rateLimit(LIMITER_OPTIONS);

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use('*', cors(CORS_OPTIONS));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DB_PATH, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(limiter);
app.use(router);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
