<test_route>

  <p>
    Route is working
  </p>

  <a href onclick="{goToIndex}">Back to Index</a>

  <script>
    var self = this;

    goToIndex(e) {
      riot.mount('#container', 'index');
      riot.route('/');
    }
  </script>

</test_route>
