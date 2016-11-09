<button-logout>
  <button onclick="{doLogout}">Logout</button>
  <script>
    doLogout(e) {
      $.ajax({
        url: '/logout',
        method: 'POST',
        success: function (data, status, xhr) {
          // Unmount Navbar and Footer
          var header = riot.mount(document.getElementById('header-tag'));
          var footer = riot.mount(document.getElementById('footer-tag'));
          header[0].unmount(true);
          footer[0].unmount(true);

          // Mount login page and change URL
          riot.mount('#container', 'login');
          riot.route('/login');
        }
      });
    }
  </script>
</button-logout>
