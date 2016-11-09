'use strict';

exports.index = {
  handler: function(request, reply) {
    var opts = {
      isAuthenticated: request.auth.isAuthenticated,
      tag: 'index',
      path: '/'
    };

    reply.view('tags/main/main', opts);
  }
};
