'use strict';

exports.index = {
  handler: function(request, reply) {
    var opts = {
      isAuthenticated: request.auth.isAuthenticated,
      tag: 'test-route',
      path: '/test-route'
    };

    reply.view('tags/main/main', opts);
  }
};
