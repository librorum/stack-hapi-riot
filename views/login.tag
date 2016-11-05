<login>

  <h3>Welcome to the System</h3>

  <div class="alert alert-danger" role="alert" show="{messageError}">
    <strong>Error: </strong> {messageError}
  </div>

  <form onsubmit="{doLogin}">
    <div class="form-group">
      <div class="row">
        <div class="col-md-6">
          <label for="email">E-mail</label>
          <input class="form-control" type="text" name="email" id="email">
        </div>
        <div class="col-md-6">
          <label for="password">Password</label>
          <input class="form-control" type="password" name="password" id="password">
        </div>
      </div>
    </div>
    <button class="btn btn-primary">Enter</button>
    <button class="btn btn-info" onclick="{goToUserRegister}">User register</button>
  </form>

  <script>
    var self = this;
    self.messageError = null;

    doLogin(e) {
      $.ajax({
        url: '/login',
        method: 'POST',
        data: {
          email: self.email.value,
          password: self.password.value
        },
        dataType: 'json',
        success: function (data, status, xhr) {
          riot.mount('#container', 'index');
          riot.route('/');

          // Mount Navbar and Footer
          riot.mount(document.getElementById('header-tag'), 'header');
          riot.mount(document.getElementById('footer-tag'), 'footer');
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
