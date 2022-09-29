const mongoose = require('mongoose');
const WrongDataError = require('../errors/WrongDataError');
const { REGEX } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        if (!REGEX.test(link)) {
          throw new WrongDataError(`${link} Некорректная ссылка`);
        }
        return true;
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        if (!REGEX.test(link)) {
          throw new WrongDataError(`${link} Некорректная ссылка`);
        }
        return true;
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        if (!REGEX.test(link)) {
          throw new WrongDataError(`${link} Некорректная ссылка`);
        }
        return true;
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
