<index>

  <h3>Welcome Riot User</h3>

  <p>
    How are you ?
    <button_logout></button_logout>
    <a href onclick="{goToTesteRoute}"> &nbsp;&nbsp; Go to 'route' => test-route</a>
  </p>

  <script>
    var self = this;

    goToTesteRoute(e) {
      riot.mount('#container', 'test_route');
      riot.route('/test-route');
    }
  </script>

</index>
