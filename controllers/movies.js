const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const WrongDataError = require('../errors/WrongDataError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const data = { ...req.body };
  const owner = req.user._id;
  Movie.create({ ...data, owner })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new WrongDataError('Переданы некорректные данные при сохранении фильма'));
      }
      return next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм c указанным ID не найден');
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Нельзя удалять чужие фильмы');
      }
      return Movie.findByIdAndDelete(movieId)
        .then(() => res.send({ message: 'Фильм удален' }));
    })
    .catch(next);
};
