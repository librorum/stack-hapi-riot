<login>

  <h3>Welcome to the System</h3>

  <form onsubmit="{doLogin}">
    <label for="email">User</label>
    <input type="text" name="email" id="email">
    <label for="password">Password</label>
    <input type="password" name="password" id="password">
    <button>Enter</button>
  </form>

  <button onclick="{goToUserRegister}">User register</button>

  <span class="label label-default" if="{messageError}">{messageError}</span>

  <script>
    var self = this;
    self.messageError = null;

    doLogin(e) {
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
    }

    goToUserRegister(e) {
      riot.mount('#container', 'user-add');
      riot.route('/user/add');
    }
  </script>

</login>
