'use strict';

const Boom = require('boom');
const Joi = require('joi');
const User = require('../user/model');
const Bcrypt = require('bcrypt');

exports.login = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    User.find({email: request.payload.email}, (err, user) => {
      if (err) {
        return reply(Boom.badData('Internal MongoDB error', err));
      }

      if (user.length > 0) {
        if (Bcrypt.compareSync(request.payload.password, user[0].password)) {
          request.cookieAuth.set(user);
          return reply({});
        } else {
          return reply(Boom.unauthorized('Invalid user or password', err));
        }
      } else if (user.length === 0) {
        return reply(Boom.unauthorized('User not found', err));
      }
    });
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
}

exports.logout = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    request.cookieAuth.clear();
    reply.continue();
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
}
