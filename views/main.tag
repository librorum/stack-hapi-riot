<main>

  <div id="header-tag"></div>

  <div id="container" class="container"></div>

  <div id="footer-tag"></div>

  <script>
    var self = this;

    riot.route.base('/');

    self.on('updated', function() {
      riot.mount('#container', opts.tag);
      riot.route(opts.path);

      // Mount Navbar and Footer
      if (opts.isAuthenticated) {
        riot.mount('#header-tag', 'header');
        riot.mount('#footer-tag', 'footer');
      }
    });
  </script>

</main>
