'use strict';

exports.add = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    var opts = {};

    if (request.auth.isAuthenticated) {
      opts.tag = 'index';
      opts.path = '/';
    } else {
      opts.tag = 'user-add';
      opts.path = '/user/add';
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
