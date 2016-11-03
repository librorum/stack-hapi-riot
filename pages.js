'use strict';

exports.login = {
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

    reply.view('main', opts);
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
};

exports.index = {
  handler: function(request, reply) {
    var opts = {
      isAuthenticated: request.auth.isAuthenticated,
      tag: 'index',
      path: '/'
    };

    reply.view('main', opts);
  }
};

exports.testRoute = {
  handler: function(request, reply) {
    var opts = {
      isAuthenticated: request.auth.isAuthenticated,
      tag: 'test-route',
      path: '/test-route'
    };

    reply.view('main', opts);
  }
};

exports.userAdd = {
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

    reply.view('main', opts);
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
};

exports.maps = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    var opts = {};
    opts.isAuthenticated = request.auth.isAuthenticated;
    opts.tag = 'maps';
    opts.path = '/maps';
    reply.view('main', opts);
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
};
