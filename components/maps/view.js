'use strict';

exports.index = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    var opts = {};
    opts.isAuthenticated = request.auth.isAuthenticated;
    opts.tag = 'maps';
    opts.path = '/maps';
    reply.view('tags/main/main', opts);
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
};
