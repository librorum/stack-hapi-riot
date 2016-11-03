<maps>

  <h3>Bem Vindo ao WS Google Maps</h3>

  <form class="form-inline" novalidate>
    <div class="form-group">
      <label for="nome">Nome:</label>
      <input class="form-control" type="text" name="nome" id="nome">
    </div>
    <div class="form-group">
      <label for="email">E-mail:</label>
      <input class="form-control" type="text" name="email" id="email">
    </div>
    <button class="btn btn-primary">Salvar</button>
  </form>

  <br>

  <button class="btn btn-primary" onclick="{getPositionAddress}">Get Position</button>

  <br><br>

  <input id="pac-input" class="controls" type="text" placeholder="Search Box">
  <div id="map"></div>

  <style>
    body,
    html {
      height: 100%;
      margin: 0;
      padding: 0;
    }
    #map {
      height: 500px;
    }
    .controls {
      margin-top: 10px;
      border: 1px solid transparent;
      border-radius: 2px 0 0 2px;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      height: 32px;
      outline: none;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    }
    #pac-input {
      background-color: #fff;
      font-family: Roboto;
      font-size: 15px;
      font-weight: 300;
      margin-left: 12px;
      padding: 0 11px 0 13px;
      text-overflow: ellipsis;
      width: 300px;
    }
    #pac-input:focus {
      border-color: #4d90fe;
    }
    .pac-container {
      font-family: Roboto;
    }
    #type-selector {
      color: #fff;
      background-color: #4d90fe;
      padding: 5px 11px 0;
    }
    #type-selector label {
      font-family: Roboto;
      font-size: 13px;
      font-weight: 300;
    }
  </style>

  <script>
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

      // Create the search box and link it to the UI element.
      var input = document.getElementById('pac-input');
      var searchBox = new google.maps.places.SearchBox(input);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
      });

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve more details for that place.
      searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({map: map, icon: icon, title: place.name, position: place.geometry.location}));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        map.fitBounds(bounds);
      });
    }

    getPositionAddress(e) {
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
    }

    this.on('updated', function() {
      initMap();
    });
  </script>

</maps>
