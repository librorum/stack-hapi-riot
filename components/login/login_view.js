'use strict';

exports.index = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    var opts = {};

    if (request.auth.isAuthenticated) {
      opts.tag = 'index';
      opts.path = '/';
    } else {
      opts.tag = 'login';
      opts.path = '/login';
    }

    opts.isAuthenticated = request.auth.isAuthenticated;

    reply.view('tags/main/main', opts);
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
};
