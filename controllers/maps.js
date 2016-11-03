'use strict';

const Boom = require('boom');
const Joi = require('joi');
const User = require('../models/user');
const Bcrypt = require('bcrypt');

exports.saveMaps = {
  auth: false,
  handler: function(request, reply) {
    request.payload.password = Bcrypt.hashSync(request.payload.password, 10);
    request.payload.scope = 'Customer';

    const user = new User(request.payload);
    user.save((err, user) => {
      if (err) {
        return reply(Boom.badData('Server error', err));
      }
      reply({messageSuccess: 'User added with success'});
    });
  },
  validate: {
    payload: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
}
