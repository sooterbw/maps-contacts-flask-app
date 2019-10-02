 // This example adds a search box to a map, using the Google Place Autocomplete
      // feature. People can enter geographical searches. The search box will return a
      // pick list containing a mix of places and predicted search terms.

      // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 36.49, lng: -95.40},
          zoom: 8.75
        });
        map.data.loadGeoJson('../static/map-data/filled_full_poly.json');
        map.data.setStyle({
          fillColor: 'blue',
          strokeWeight: 1
        })

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var towers = [
          ["Miami Grain Elevator", 36.870595, -94.872925],
          ["Fairland WT", 36.75028, -94.84807],
          ["Bluejacket WT", 36.80247, -95.07696],
          ["Timber Hill WT", 36.78639, -95.13492],
          ["Afton Coop", 36.69514, -94.96549],
          ["Bernice WT", 36.62805, -94.92531],
          ["Centralia WT", 36.797, -95.35022],
          ["Shanahan Hill WT", 36.71682, -95.21582],
          ["Randall Goss Repeater", 36.67433, -95.18596],
          ["Vinita IPWT", 36.66313, -95.13478],
          ["Kaufman Repeater", 36.62992, -95.09101],
          ["Heartland Tower", 36.56727, -95.02312],
          ["Moorehead Repeater", 36.56564, -94.98062],
          ["Grand Lake RV", 36.5604, -94.97345],
          ["CYC Repeater", 36.53659, -94.96852],
          ["Ketchum BFT Tower", 36.51975, -95.0005],
          ["Robison Repeater", 36.59896, -95.11503],
          ["Hotel Vinita", 36.63689, -95.15605],
          ["Vinita CWT", 36.642176, -95.162464],
          ["Newman Repeater", 36.65629, -95.21012],
          ["Cowboy Junction Repeater", 36.618583, -95.196434],
          ["Enis Ranch", 36.62259, -95.24588],
          ["Bunker Hill WT", 36.68445, -95.34795],
          ["Carselowy Water Tower", 36.540523, -95.112738],
          ["Langley Reasers WT", 36.4835, -95.05712],
          ["Langley CWT", 36.46726, -95.0459],
          ["White Oak - Dooley", 36.614274, -95.269446],
          ["Sam Wynn Repeater", 36.57102, -95.24835],
          ["Big Cabin WT", 36.53855, -95.22153],
          ["Mayes 6 WT", 36.49091, -95.20292],
          ["Spavinaw Water Tower", 36.412714, -95.063568],
          ["Freeman Hill WT", 36.55994, -95.29203],
          ["Kelly Ranch Repeater", 36.62433, -95.31054],
          ["Bowlin Springs Tower", 36.62502, -95.38903],
          ["Madden Cemetary Hilli Tower", 36.698853, -95.498865],
          ["Alluwe Water Tower", 36.609163, -95.486322],
          ["Chelsea Delozier Tower", 36.589634, -95.444899],
          ["Chelsea Hess Repeater", 36.541693, -95.353349],
          ["Whiskey Ridge", 36.467491, -95.335769],
          ["Adair CWT", 36.439125, -95.268138],
          ["Chelsea Hilltop Tower", 36.54181, -95.3977],
          ["Chelsea PD Tower", 36.536751, -95.432595],
          ["Chelsea Tin Can Hill", 36.539403, -95.462561],
          ["CEDA Water Tower", 36.515852, -95.50493],
          ["McSpadden Tower", 36.476526, -95.467495],
          ["East Foyil Tower", 36.43928, -95.442395],
          ["Bushyhead Tower", 36.439565, -95.533901],
          ["RWD #9", 36.321673, -95.546594],
          ["Lone Elm", 36.306407, -95.668856],
          ["Twin Oaks Tower - Coming Soon", 36.165875, -95.653854],
          ["Sothridge Water Tower", 36.265386, -95.627847],
          ["Rogers RWD6 Office Tower - Coming Soon", 36.169962, -95.539934],
          ["Inola Tower - Coming Soon", 36.147562, -95.505911],
          ["Water Plant", 36.266586, -95.704117],
          ["Verdigris Water Tower", 36.240289, -95.691921],
          ["River Port Water Tower", 36.189428, -95.643039],
          ["Ruby Estates", 36.172195, -95.564915],
          ["412 Tower - Coming Soon", 36.165875, -95.653854],
          ["Oak Grove", 36.15674, -95.672218],
          ["Downtown Tulsa", 36.148544, -95.990821]
        ];

        var i, marker, infowindow;
        infowindow = new google.maps.InfoWindow({});

        for(i = 0; i < towers.length; i++) {
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(towers[i][1], towers[i][2]),
            map: map,
            title: towers[i][0]
          });
          google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
              infowindow.setContent(towers[i][0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            }));

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