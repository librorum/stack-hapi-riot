<user-add>

  <h3>User register form</h3>

  <div class="alert alert-success" role="alert" show="{messageSuccess}">
    <strong>Ok: </strong> {messageSuccess}
  </div>

  <div class="alert alert-danger" role="alert" show="{messageError}">
    <strong>Error: </strong> {messageError}
  </div>

  <form onsubmit="{userAdd}">
    <div class="form-group">
      <div class="row">
        <div class="col-md-6">
          <label for="name">Name:</label>
          <input class="form-control" type="text" name="name" id="name">
        </div>
        <div class="col-md-6">
          <label for="email">E-mail:</label>
          <input class="form-control" type="text" name="email" id="email">
        </div>
      </div>
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-6">
          <label for="password">Password:</label>
          <input class="form-control" type="password" name="password" id="password">
        </div>
        <div class="col-md-6">
          <label for="password">Repeat Password:</label>
          <input class="form-control" type="password" name="passwordRepeat" id="passwordRepeat">
        </div>
      </div>
    </div>
    <button class="btn btn-success">Add</button>
    <button class="btn btn-info" onclick="{goToLogin}">Back to login</button>
  </form>

  <script>
    var self = this;
    self.messageSuccess = null;
    self.messageError = null;

    userAdd(e) {
      $.ajax({
        url: '/register',
        method: 'POST',
        data: {
          name: $('#name').val(),
          email: $('#email').val(),
          password: $('#password').val(),
          passwordRepeat: $('#passwordRepeat').val()
        },
        dataType: 'json',
        success: function (data, status, xhr) {
          self.messageError = null;
          self.messageSuccess = data.messageSuccess;
          clearFormFields();
          self.update();
        },
        error: function (data, status, xhr) {
          self.messageSuccess = null;
          self.messageError = data.responseJSON.message;
          self.update();
        }
      });
    }

    goToLogin(e) {
      riot.mount('#container', 'login');
      riot.route('/login');
    }

    function clearFormFields() {
      $('#name').val('');
      $('#email').val('');
      $('#password').val('');
      $('#passwordRepeat').val('');
    }
  </script>

</user-add>
