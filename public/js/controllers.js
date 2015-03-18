'use strict';

/* Controllers */

angular.module('pprzmon.controllers', [])
  .controller('MainController', ['$scope', '$log', '$http', 'socket', 'uiGmapGoogleMapApi', function($scope, $log, $http, socket, GoogleMapApi ) {

    google.maps.visualRefresh = true;

	// on connection to server, ask for ac_id to monitor
	socket.on('connect', function(){
		// call the server-side function 'subscribe' and send one parameter (value of prompt)
		socket.emit('subscribe', prompt("Filter on which aircraft?"));
	});

	var i_x=0;
	// listener, whenever the server emits a message, this updates the messages list
	socket.on('FLIGHT_PARAM', function(data) {
       // var elems = data.split(" ");
       // var lat = parseFloat( elems[ 4 ] );
       // var lon = parseFloat( elems[ 5 ] );

	var myObject = JSON.parse(data);
	var lat = myObject.lat;
	var lon = myObject.long;
	//var msgname = myObject.long;

	console.log( " about ac_id . lat: " + lat + ". lon: " + lon );
	//socket.emit('xxx', prompt("Filter on which aircraft?"+lat));

        $log.log( lat );
        $log.log( lon );

        var sw = $scope.map.bounds.getSouthWest();
        var ne = $scope.map.bounds.getNorthEast();
        if (( lat < sw.lat() ) || ( lat > ne.lat() ) || ( lon < sw.lng() ) || ( lon > ne.lng() ) ) {
            $scope.map.center.latitude = lat;
            $scope.map.center.longitude = lon;
        }

        $scope.uavMarker.coords.latitude = lat;
        $scope.uavMarker.coords.longitude = lon;
	i_x++;
	while (i_x>5) {
		var mak_tt={
		    latitude: lat,
		    longitude: lon
		}
		$scope.polylines[0].path.push(mak_tt);
		i_x=0;
	}
	

	//var ttt=$scope.polylines.path[1].latitude;
	//$scope.polylines.path.push($scope.uavMarker.coords);
	//$scope.polylines.path += $scope.uavMarker.coords;
//$scope.polylines[0].path[0].latitude = lat;
//$scope.polylines[0].path[0].longitude = lon;
	//$scope.polylines[0].path += $scope.uavMarker.coords;
	
	});
//latlon_gm
	socket.on('latlon_gm', function(data) {
       // var elems = data.split(" ");
       // var lat = parseFloat( elems[ 4 ] );
       // var lon = parseFloat( elems[ 5 ] );

	var myObject = JSON.parse(data);
	var lat = myObject.latitude;
	var lon = myObject.longitude;
	var utc_time = myObject.utc_time;
	//var msgname = myObject.long;

	console.log( " about ac_id . lat: " + lat + ". lon: " + lon +"at time:" + utc_time);
	//socket.emit('xxx', prompt("Filter on which aircraft?"+lat));

        $log.log( lat );
        $log.log( lon );

        var sw = $scope.map.bounds.getSouthWest();
        var ne = $scope.map.bounds.getNorthEast();
        if (( lat < sw.lat() ) || ( lat > ne.lat() ) || ( lon < sw.lng() ) || ( lon > ne.lng() ) ) {
            $scope.map.center.latitude = lat;
            $scope.map.center.longitude = lon;
        }

        $scope.uavMarker.coords.latitude = lat;
        $scope.uavMarker.coords.longitude = lon;

	i_x++;
	while (i_x>10) {
		var mak_tt={
		    latitude: lat,
		    longitude: lon
		}
		if ( $scope.polylines[0].path.length>5){
			$scope.polylines[0].path.shift();
		}
		$scope.polylines[0].path.push(mak_tt);
		i_x=0;
	}
	//var path = $scope.polylines.path;
//new google.maps.LatLng(52.511467, 13.447179)

	//path.push($scope.uavMarker.coords);

//	path.push(new google.maps.LatLng(lat, lon));
	//$scope.polylines.path[1].latitude = lat;
	//$scope.polylines.path[1].longitude = lon;
	});

	socket.on('ENGINE_STATUS', function(data) {

	});

	socket.on('AP_STATUS', function(data) {

	});

	socket.on('TELEMETRY_STATUS', function(data) {

	});

  /*          function addMarker() {
                var path = $scope.polylines.path;

                // Because path is an MVCArray, we can simply append a new coordinate
                // and it will automatically appear.

                path.push(neighborhoods[iterator]);
                if (iterator > 0) {
                    markers[iterator - 1].setIcon(icon2);
                }
                neighborhoods[iterator]
                // Add a new marker at the new plotted point on the polyline.
                markers.push(new google.maps.Marker({
                    position : neighborhoods[iterator],
                    title : '#' + path.getLength(),
                    map : map,
                    icon : icon1
                }));
                map.panTo(neighborhoods[iterator]);
                map.setCenter
                iterator++;
            }
*/
    $scope.map = {
        center: {
 //           latitude: -8.062719,
 //           longitude: -34.8711568
           // latitude: 43.4629226,
         //   longitude: 1.2731203

		latitude: 34.2252449667,
		longitude: 108.878158767
        },
        zoom: 18,
        draggable: true,
        lat: 0.0,
        lng: 0.0,
        panning: false,
        markers: [],
        selectedmarker: null,
        bounds: {},
        windowoptions: {
          boxClass: 'custom-info-window'
        },
        lastEvent: null,
        events: {
            tilesloaded: function (map) {
                $scope.$apply();
            },
            bounds_changed: function( map ) {
                $scope.map.bounds = map.getBounds();
                $scope.$apply();
            }
       }
    };

    $scope.uavMarker = {
        id: 0,
        coords: {
//            latitude: 40.1451,
//            longitude: -99.6680
		latitude: 34.2252449667,
		longitude: 108.878158767
        },
        icon: 'icons/airplane.png',
        options: { draggable: false },
        events: {
        }
    };

    $scope.polylines = [{
        id: 1,
        path: [{
           // latitude: 43.4626226,
           // longitude: 1.2732203
		latitude: 34.2252449667,
		longitude: 108.878158767
        }, {
		latitude: 34.2252449667,
		longitude: 108.878258767
        }],
        stroke: {
            color: '#6060FF',
            weight: 3
        },
        editable: true,
        draggable: true,
        geodesic: true,
        visible: true,
        icons: [{
            icon: {
                path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
            },
            offset: '25px',
            repeat: '60px'
        }]
    }];

} ] );

