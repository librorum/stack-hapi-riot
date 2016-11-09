riot.tag2('button_logout', '<button onclick="{doLogout}">Logout</button>', '', '', function(opts) {
    this.doLogout = function(e) {
      $.ajax({
        url: '/logout',
        method: 'POST',
        success: function (data, status, xhr) {

          var header = riot.mount(document.getElementById('header-tag'));
          var footer = riot.mount(document.getElementById('footer-tag'));
          header[0].unmount(true);
          footer[0].unmount(true);

          riot.mount('#container', 'login');
          riot.route('/login');
        }
      });
    }.bind(this)
});

riot.tag2('footer', '<div class="text-center"> <span>@Copyright Rodolfo do Nascimento Azevedo</span> </div>', '', '', function(opts) {
});

riot.tag2('header', '<yeld></yeld> <nav class="navbar navbar-light bg-faded"> <button class="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"></button> <div class="collapse navbar-toggleable-md" id="navbarResponsive"> <a class="navbar-brand" href="#">Navbar</a> <ul class="nav navbar-nav"> <li class="nav-item active"> <a class="nav-link" href="#">Home <span class="sr-only">(current)</span> </a> </li> <li class="nav-item"> <a class="nav-link" href="#">Link</a> </li> <li class="nav-item"> <a class="nav-link" href="#">Link</a> </li> <li class="nav-item dropdown"> <a class="nav-link dropdown-toggle" href="http://example.com" id="responsiveNavbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</a> <div class="dropdown-menu" aria-labelledby="responsiveNavbarDropdown"> <a class="dropdown-item" href="#">Action</a> <a class="dropdown-item" href="#">Another action</a> <a class="dropdown-item" href="#">Something else here</a> </div> </li> </ul> <form class="form-inline float-lg-right"> <input class="form-control" type="text" placeholder="Search"> <button class="btn btn-outline-success" type="submit">Search</button> </form> </div> </nav>', '', '', function(opts) {
});

riot.tag2('index', '<h3>Welcome Riot User</h3> <p> How are you ? <button_logout></button_logout> <a href onclick="{goToTesteRoute}"> &nbsp;&nbsp; Go to \'route\' => test-route</a> </p>', '', '', function(opts) {
    var self = this;

    this.goToTesteRoute = function(e) {
      riot.mount('#container', 'test_route');
      riot.route('/test-route');
    }.bind(this)
});

riot.tag2('login', '<h3>Welcome to the System</h3> <div class="alert alert-danger" role="alert" show="{messageError}"> <strong>Error: </strong> {messageError} </div> <form onsubmit="{doLogin}"> <div class="form-group"> <div class="row"> <div class="col-md-6"> <label for="email">E-mail</label> <input class="form-control" type="text" name="email" id="email"> </div> <div class="col-md-6"> <label for="password">Password</label> <input class="form-control" type="password" name="password" id="password"> </div> </div> </div> <button class="btn btn-primary">Enter</button> <button class="btn btn-info" onclick="{goToUserRegister}">User register</button> </form>', '', '', function(opts) {
    var self = this;
    self.messageError = null;

    this.doLogin = function(e) {
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

          riot.mount(document.getElementById('header-tag'), 'header');
          riot.mount(document.getElementById('footer-tag'), 'footer');
        },
        error: function (data, status, xhr) {
          self.messageError = data.responseJSON.message;
          self.update();
        }
      });
    }.bind(this)

    this.goToUserRegister = function(e) {
      riot.mount('#container', 'user_add');
      riot.route('/user/add');
    }.bind(this)
});

riot.tag2('main', '<div id="header-tag"></div> <div id="container" class="container"></div> <div id="footer-tag"></div>', '', '', function(opts) {
    var self = this;

    riot.route.base('/');

    self.on('updated', function() {
      riot.mount('#container', opts.tag);
      riot.route(opts.path);

      if (opts.isAuthenticated) {
        riot.mount('#header-tag', 'header');
        riot.mount('#footer-tag', 'footer');
      }
    });
});

riot.tag2('maps', '<h3>Welcome to WS Google Maps</h3> <form class="form-inline" novalidate> <div class="form-group"> <label for="nome">Nome:</label> <input class="form-control" type="text" name="nome" id="nome"> </div> <div class="form-group"> <label for="email">E-mail:</label> <input class="form-control" type="text" name="email" id="email"> </div> <button class="btn btn-primary">Salvar</button> </form> <br> <button class="btn btn-primary" onclick="{getPositionAddress}">Get Position</button> <br><br> <input id="pac-input" class="controls" type="text" placeholder="Search Box"> <div id="map"></div>', 'body, html { height: 100%; margin: 0; padding: 0; } #map { height: 500px; } .controls { margin-top: 10px; border: 1px solid transparent; border-radius: 2px 0 0 2px; box-sizing: border-box; -moz-box-sizing: border-box; height: 32px; outline: none; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); } #pac-input { background-color: #fff; font-family: Roboto; font-size: 15px; font-weight: 300; margin-left: 12px; padding: 0 11px 0 13px; text-overflow: ellipsis; width: 300px; } #pac-input:focus { border-color: #4d90fe; } .pac-container { font-family: Roboto; } #type-selector { color: #fff; background-color: #4d90fe; padding: 5px 11px 0; } #type-selector label { font-family: Roboto; font-size: 13px; font-weight: 300; }', '', function(opts) {
    var self = this;
    var map = null;
    self.user = {};

    function initMap() {
      var map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: -33.8688,
          lng: 151.2195
        },
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
      });

      var markers = [];

      searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        markers.forEach(function (marker) {
          marker.setMap(null);
        });
        markers = [];

        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          markers.push(new google.maps.Marker({map: map, icon: icon, title: place.name, position: place.geometry.location}));

          if (place.geometry.viewport) {

            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }

    this.getPositionAddress = function(e) {
      e.preventUpdate = true;
      var address = document.getElementById('pac-input').value;
      if (!address || address.trim().length == 0) {
        return;
      }
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        "address": address
      }, function (results) {
        console.log(results[0].geometry.location.lat());
      });
    }.bind(this)

    this.on('updated', function() {
      initMap();
    });
});

riot.tag2('test_route', '<p> Route is working </p> <a href onclick="{goToIndex}">Back to Index</a>', '', '', function(opts) {
    var self = this;

    this.goToIndex = function(e) {
      riot.mount('#container', 'index');
      riot.route('/');
    }.bind(this)
});

riot.tag2('user_add', '<h3>User register form</h3> <div class="alert alert-success" role="alert" show="{messageSuccess}"> <strong>Ok: </strong> {messageSuccess} </div> <div class="alert alert-danger" role="alert" show="{messageError}"> <strong>Error: </strong> {messageError} </div> <form onsubmit="{userAdd}"> <div class="form-group"> <div class="row"> <div class="col-md-6"> <label for="name">Name:</label> <input class="form-control" type="text" name="name" id="name"> </div> <div class="col-md-6"> <label for="email">E-mail:</label> <input class="form-control" type="text" name="email" id="email"> </div> </div> </div> <div class="form-group"> <div class="row"> <div class="col-md-6"> <label for="password">Password:</label> <input class="form-control" type="password" name="password" id="password"> </div> <div class="col-md-6"> <label for="password">Repeat Password:</label> <input class="form-control" type="password" name="passwordRepeat" id="passwordRepeat"> </div> </div> </div> <button class="btn btn-success">Add</button> <button class="btn btn-info" onclick="{goToLogin}">Back to login</button> </form>', '', '', function(opts) {
    var self = this;
    self.messageSuccess = null;
    self.messageError = null;

    this.userAdd = function(e) {
      $.ajax({
        url: '/register',
        method: 'POST',
        data: {
          name: self.name.value,
          email: self.email.value,
          password: self.password.value,
          passwordRepeat: self.passwordRepeat.value
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
    }.bind(this)

    this.goToLogin = function(e) {
      riot.mount('#container', 'login');
      riot.route('/login');
    }.bind(this)

    function clearFormFields() {
      self.name.value = '';
      self.email.value = '';
      self.password.value = '';
      self.passwordRepeat.value = '';
    }
});
