<user-add>

  <h3>User register form</h3>

  <form>
    <label for="name">Name:</label>
    <input type="text" name="name" id="name">
    <label for="email">E-mail:</label>
    <input type="text" name="email" id="email">
    <label for="password">Password:</label>
    <input type="password" name="password" id="password">
    <button onclick="{userAdd}">Add</button>
  </form>

  <button onclick="{goToLogin}">Back to login</button>

  <br><br><br>

  <span class="label label-default" if="{message}">{message}</span>

  <script>
    var self = this;
    self.message = null;

    userAdd(e) {
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
    }

    goToLogin(e) {
      riot.mount('#container', 'login');
      riot.route('/login');
    }
  </script>

</user-add>
