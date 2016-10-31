riot.tag2('button-logout', '<button onclick="{doLogout}">Logout</button>', '', '', function(opts) {
    this.doLogout = function(e) {
      $.ajax({
        url: '/logout',
        method: 'POST',
        success: function (data, status, xhr) {
          riot.mount('#container', 'login');
          riot.route('/login');
        }
      });
    }.bind(this)
});

riot.tag2('index', '<h3>Welcome Riot User</h3> <p> How are you ? <button-logout></button-logout> <a href onclick="{goToTesteRoute}"> &nbsp;&nbsp; Go to \'route\' => test-route</a> </p>', '', '', function(opts) {
    var self = this;

    this.goToTesteRoute = function(e) {
      riot.mount('#container', 'test-route');
      riot.route('/test-route');
    }.bind(this)
});

riot.tag2('login', '<h3>Welcome to the System</h3> <form onsubmit="{doLogin}"> <label for="email">E-mail</label> <input type="text" name="email" id="email"> <label for="password">Password</label> <input type="password" name="password" id="password"> <button>Enter</button> </form> <button onclick="{goToUserRegister}">User register</button> <br><br><br> <span class="label label-default" if="{messageError}">{messageError}</span>', '', '', function(opts) {
    var self = this;
    self.messageError = null;

    this.doLogin = function(e) {
      $.ajax({
        url: '/login',
        method: 'POST',
        data: {
          email: $('#email').val(),
          password: $('#password').val()
        },
        dataType: 'json',
        success: function (data, status, xhr) {
          riot.mount('#container', 'index');
          riot.route('/');
        },
        error: function (data, status, xhr) {
          self.messageError = data.responseJSON.message;
          self.update();
        }
      });
    }.bind(this)

    this.goToUserRegister = function(e) {
      riot.mount('#container', 'user-add');
      riot.route('/user/add');
    }.bind(this)
});

riot.tag2('main', '<div id="container" class="container"> </div>', '', '', function(opts) {
    var self = this;

    riot.route.base('/');

    this.on('updated', function() {
      riot.mount('#container', opts.tag);
      riot.route(opts.path);
    });
});

riot.tag2('test-route', '<p> Route is working </p> <a href onclick="{goToIndex}">Back to Index</a>', '', '', function(opts) {
    var self = this;

    this.goToIndex = function(e) {
      riot.mount('#container', 'index');
      riot.route('/');
    }.bind(this)
});

riot.tag2('user-add', '<h3>User register form</h3> <form> <label for="name">Name:</label> <input type="text" name="name" id="name"> <label for="email">E-mail:</label> <input type="text" name="email" id="email"> <label for="password">Password:</label> <input type="password" name="password" id="password"> <button onclick="{userAdd}">Add</button> </form> <button onclick="{goToLogin}">Back to login</button> <br><br><br> <span class="label label-default" if="{message}">{message}</span>', '', '', function(opts) {
    var self = this;
    self.message = null;

    this.userAdd = function(e) {
      $.ajax({
        url: '/register',
        method: 'POST',
        data: {
          name: $('#name').val(),
          email: $('#email').val(),
          password: $('#password').val()
        },
        dataType: 'json',
        success: function (data, status, xhr) {
          self.message = data.messageSuccess;
          self.update();
        },
        error: function (data, status, xhr) {
          self.message = data.responseJSON.message;
          self.update();
        }
      });
    }.bind(this)

    this.goToLogin = function(e) {
      riot.mount('#container', 'login');
      riot.route('/login');
    }.bind(this)
});
