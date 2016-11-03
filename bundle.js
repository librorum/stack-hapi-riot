riot.tag2('button-logout', '<button onclick="{doLogout}">Logout</button>', '', '', function(opts) {
    this.doLogout = function(e) {
      $.ajax({
        url: '/logout',
        method: 'POST',
        success: function (data, status, xhr) {
          riot.mount('#container', 'login');
          riot.route('/login');
        }
      });
    }.bind(this)
});

riot.tag2('index', '<h3>Welcome Riot User</h3> <p> How are you ? <button-logout></button-logout> <a href onclick="{goToTesteRoute}"> &nbsp;&nbsp; Go to \'route\' => test-route</a> </p>', '', '', function(opts) {
    var self = this;

    this.goToTesteRoute = function(e) {
      riot.mount('#container', 'test-route');
      riot.route('/test-route');
    }.bind(this)
});

riot.tag2('login', '<h3>Welcome to the System</h3> <form onsubmit="{doLogin}"> <label for="email">E-mail</label> <input type="text" name="email" id="email"> <label for="password">Password</label> <input type="password" name="password" id="password"> <button>Enter</button> </form> <button onclick="{goToUserRegister}">User register</button> <br><br><br> <span class="label label-default" if="{messageError}">{messageError}</span>', '', '', function(opts) {
    var self = this;
    self.messageError = null;

    this.doLogin = function(e) {
      $.ajax({
        url: '/login',
        method: 'POST',
        data: {
          email: $('#email').val(),
          password: $('#password').val()
        },
        dataType: 'json',
        success: function (data, status, xhr) {
          riot.mount('#container', 'index');
          riot.route('/');
        },
        error: function (data, status, xhr) {
          self.messageError = data.responseJSON.message;
          self.update();
        }
      });
    }.bind(this)

    this.goToUserRegister = function(e) {
      riot.mount('#container', 'user-add');
      riot.route('/user/add');
    }.bind(this)
});

riot.tag2('main', '<div id="container" class="container"> </div>', '', '', function(opts) {
    var self = this;

    riot.route.base('/');

    this.on('updated', function() {
      riot.mount('#container', opts.tag);
      riot.route(opts.path);
    });
});

riot.tag2('maps', '<h3>Bem Vindo ao WS Google Maps</h3> <form class="form-inline" novalidate> <div class="form-group"> <label for="nome">Nome:</label> <input class="form-control" type="text" name="nome" id="nome"> </div> <div class="form-group"> <label for="email">E-mail:</label> <input class="form-control" type="text" name="email" id="email"> </div> <button class="btn btn-primary">Salvar</button> </form> <br> <button class="btn btn-primary" onclick="{getPositionAddress}">Get Position</button> <br><br> <input id="pac-input" class="controls" type="text" placeholder="Search Box"> <div id="map"></div>', 'body, html { height: 100%; margin: 0; padding: 0; } #map { height: 500px; } .controls { margin-top: 10px; border: 1px solid transparent; border-radius: 2px 0 0 2px; box-sizing: border-box; -moz-box-sizing: border-box; height: 32px; outline: none; box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3); } #pac-input { background-color: #fff; font-family: Roboto; font-size: 15px; font-weight: 300; margin-left: 12px; padding: 0 11px 0 13px; text-overflow: ellipsis; width: 300px; } #pac-input:focus { border-color: #4d90fe; } .pac-container { font-family: Roboto; } #type-selector { color: #fff; background-color: #4d90fe; padding: 5px 11px 0; } #type-selector label { font-family: Roboto; font-size: 13px; font-weight: 300; }', '', function(opts) {
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

riot.tag2('test-route', '<p> Route is working </p> <a href onclick="{goToIndex}">Back to Index</a>', '', '', function(opts) {
    var self = this;

    this.goToIndex = function(e) {
      riot.mount('#container', 'index');
      riot.route('/');
    }.bind(this)
});

riot.tag2('user-add', '<h3>User register form</h3> <form> <label for="name">Name:</label> <input type="text" name="name" id="name"> <label for="email">E-mail:</label> <input type="text" name="email" id="email"> <label for="password">Password:</label> <input type="password" name="password" id="password"> <button onclick="{userAdd}">Add</button> </form> <button onclick="{goToLogin}">Back to login</button> <br><br><br> <span class="label label-default" if="{message}">{message}</span>', '', '', function(opts) {
    var self = this;
    self.message = null;

    this.userAdd = function(e) {
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
    }.bind(this)

    this.goToLogin = function(e) {
      riot.mount('#container', 'login');
      riot.route('/login');
    }.bind(this)
});
