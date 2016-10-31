<main>

  <div id="container" class="container">
  </div>

  <script>
    var self = this;

    riot.route.base('/');

    this.on('updated', function() {
      riot.mount('#container', opts.tag);
      riot.route(opts.path);
    });
  </script>

</main>
