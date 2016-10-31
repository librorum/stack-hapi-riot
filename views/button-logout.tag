<button-logout>
  <button onclick="{doLogout}">Logout</button>
  <script>
    doLogout(e) {
      $.ajax({
        url: '/logout',
        method: 'POST',
        success: function (data, status, xhr) {
          riot.mount('#container', 'login');
          riot.route('/login');
        }
      });
    }
  </script>
</button-logout>
