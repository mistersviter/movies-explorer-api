const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { loginValidation, createUserValidation } = require('../middlewares/validation');

const {
  createUser,
  login,
} = require('../controllers/users');

router.post('/signin', loginValidation, login);

router.post('/signup', createUserValidation, createUser);

router.use(auth);
// Защищенные роуты
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Ой, такого пути не существует'));
});

module.exports = router;
