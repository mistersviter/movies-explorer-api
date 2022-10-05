const { NODE_ENV, PROD_DB_PATH, JWT_SECRET } = process.env;

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'someverysecretkey';
const DB_PATH = NODE_ENV === 'production' ? PROD_DB_PATH : 'mongodb://127.0.0.1/moviesdb';

const SALT_ROUNDS = 10;

const CORS_OPTIONS = {
  origin: [
    'http://localhost:3000',
    'http://movies-exp.nomoredomains.club',
    'https://movies-exp.nomoredomains.club',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};
const LIMITER_OPTIONS = {
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: 'Превышен лиимит запросов',
};

module.exports = {
  SALT_ROUNDS,
  SECRET_KEY,
  DB_PATH,
  CORS_OPTIONS,
  LIMITER_OPTIONS,
};
