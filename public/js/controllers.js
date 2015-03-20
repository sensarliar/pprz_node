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

	while (i_x>3) {
		var mak_tt={
		    latitude: lat,
		    longitude: lon
		}
		if ( $scope.polylines[0].path.length>30){
			$scope.polylines[0].path.shift();
		}
		$scope.polylines[0].path.push(mak_tt);
	var start_p = new google.maps.LatLng($scope.polylines[0].path[$scope.polylines[0].path.length-2].latitude, $scope.polylines[0].path[$scope.polylines[0].path.length-2].longitude);
	var end_p = new google.maps.LatLng($scope.polylines[0].path[$scope.polylines[0].path.length-1].latitude, $scope.polylines[0].path[$scope.polylines[0].path.length-1].longitude);
	var heading = google.maps.geometry.spherical.computeHeading(start_p,end_p);
	symbolThree.rotation = heading+45;
		i_x=0;
	}
	//var okkk_t = $scope.polylines[0].path.length-1;
	//var okkk_tx = $scope.polylines[0].path[$scope.polylines[0].path.length-1];
	//var okkk_txx = $scope.polylines[0].path[$scope.polylines[0].path.length-2];
/*	var start_p = new google.maps.LatLng($scope.polylines[0].path[$scope.polylines[0].path.length-2].latitude, $scope.polylines[0].path[$scope.polylines[0].path.length-2].longitude);
	var end_p = new google.maps.LatLng($scope.polylines[0].path[$scope.polylines[0].path.length-1].latitude, $scope.polylines[0].path[$scope.polylines[0].path.length-1].longitude);

	var heading = google.maps.geometry.spherical.computeHeading($scope.polylines[0].path[$scope.polylines[0].path.length-2],$scope.polylines[0].path[$scope.polylines[0].path.length-1]);
	var distance = google.maps.geometry.spherical.computeDistanceBetween($scope.polylines[0].path[$scope.polylines[0].path.length-2],$scope.polylines[0].path[$scope.polylines[0].path.length-1]);
	

	var heading = google.maps.geometry.spherical.computeHeading(start_p,end_p);
	symbolThree.rotation = heading+45;*/
/*   var tri=document.getElementById("tri");  
   nx=dx-80;  
   ny=dy+215;  
   tran="translate("+nx+","+ny+")";  
   var TT="translate(80,-215),"+"rotate(180"+" "+521.5+","+214.5+")";  
   B.setAttribute("transform",tran);  
   tri.setAttribute("transform",TT); 
*/ 
	//var tran="translate(80,-215)"; 
   	//symbolThree.setAttribute("transform",tran);  
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

/*  var symbolThree = {
    path: 'M -2,2 2,2 0,-3 z',
    fillColor: 'yellow',
    fillOpacity: 0.8,
    scale: 8,
    strokeColor: 'gold',
    strokeWeight: 4,
    rotation: 60
  };*/

  var symbolThree = {
    path: "M 292.50,172.00q 2.50,0.00 4.00,2.25t 1.50,5.75l0.00,16.00 q0.00,3.50 -1.50,5.75t-4.00,2.25l-64.50,26.00l-26.00,64.50q0.00,2.50 -2.25,4.00t-5.75,1.50l-16.00,0.00 q-3.50,0.00 -5.75-1.50t-2.25-4.00l0.00-57.00 l-142.00-141.50l-50.00,188.00q0.00,6.50 -4.75,11.25t-11.25,4.75l-32.00,0.00 q-7.00,0.00 -11.50-4.75t-4.50-11.25l0.00-302.00 l-90.00-89.50q-12.50-13.00 -28.25-52.25t-6.50-48.75t 48.75,6.25 t 52.00,28.75l 90.00,89.50l 302.00,0.00 q 6.50,0.00 11.25,4.75t 4.75,11.25l0.00,32.00 q0.00,6.50 -4.75,11.25t-11.25,4.75l-188.00,50.00l 142.50,142.00l 56.00,0.00 z",
 //   path: "m 124.13215,203.94801 6.51836,6.19499 z",
   // anchor: (0,0),
    fillColor: 'yellow',
    fillOpacity: 0.8,
    scale: 0.05,
    strokeColor: 'gold',
    strokeWeight: 4,
    rotation: 45,
   // pan: (100,100)
    //offset: (-100,-100)
//    stroke-dasharray: 100
   // transform: "translate(-100,-100)"
  };
/*
"M 515.50,384.00q 2.50,0.00 4.00,2.25t 1.50,5.75l0.00,16.00 q0.00,3.50 -1.50,5.75t-4.00,2.25l-64.50,26.00l-26.00,64.50q0.00,2.50 -2.25,4.00t-5.75,1.50l-16.00,0.00 q-3.50,0.00 -5.75-1.50t-2.25-4.00l0.00-57.00 l-142.00-141.50l-50.00,188.00q0.00,6.50 -4.75,11.25t-11.25,4.75l-32.00,0.00 q-7.00,0.00 -11.50-4.75t-4.50-11.25l0.00-302.00 l-90.00-89.50q-12.50-13.00 -28.25-52.25t-6.50-48.75t 48.75,6.25 t 52.00,28.75l 90.00,89.50l 302.00,0.00 q 6.50,0.00 11.25,4.75t 4.75,11.25l0.00,32.00 q0.00,6.50 -4.75,11.25t-11.25,4.75l-188.00,50.00l 142.50,142.00l 56.00,0.00 z" 

d="M 157.98695,184.38488 L 173.37483,168.20017 C 182.38616,159.18884 197.56012,162.31477 197.56012,162.31477 L 242.58958,168.47612 L 265.39575,146.16045 C 277.41087,134.35989 288.26269,152.4142 283.54247,158.63631 L 271.83305,172.24635 L 320.32641,181.22794 L 336.78707,162.03882 C 354.38063,141.01237 367.47041,159.95529 359.53185,171.11218 L 348.89521,184.56906 L 421.75804,194.07153 C 484.40828,133.78139 509.98537,108.77262 526.46939,123.63021 C 543.05967,138.5836 513.71315,168.38877 456.64135,227.17701 L 467.00204,302.24678 L 482.26714,289.52597 C 491.27847,282.01653 507.27901,294.06392 490.75822,309.72648 L 469.76089,329.52825 L 478.61969,378.66527 L 491.73923,368.58052 C 503.32523,359.35463 517.39476,371.55518 501.7322,388.29052 L 480.88803,409.28786 C 480.02981,409.93153 487.69305,452.38631 487.69305,452.38631 C 492.41327,473.19821 480.67347,480.80195 480.67347,480.80195 L 466.35838,493.27782 L 411.97962,339.67439 C 407.47395,326.15738 396.0546,311.47862 376.97351,313.22076 C 366.8894,314.29354 341.41552,331.49026 337.98263,335.56682 L 279.00579,392.27531 C 277.5039,393.34809 288.07915,465.99635 288.07915,465.99635 C 288.07915,468.14191 269.38054,492.66454 269.38054,492.66454 L 232.01433,426.14725 L 213.56128,434.7301 L 224.35108,417.93211 L 157.06733,379.9526 L 182.29502,361.49956 C 194.31014,364.28878 257.3034,371.36975 258.59073,370.72608 C 258.59073,370.72608 309.88762,319.85344 312.81633,316.77643 C 329.76623,298.96831 335.46935,292.31456 338.04402,283.51778 C 340.6208,274.71377 336.23117,261.81195 309.62838,245.4769 C 272.93937,222.94855 157.98695,184.38488 157.98695,184.38488 z"

"m 124.13215,203.94801 c 6.51836,-40.19499 7.83356,-86.39235 7.83356,-86.39235 L 228.366,168.95619 224.19242,150.71629 132.4769,73.129497 C 129.62092,20.872171 123.10255,5.2338531 123.10255,5.2338531 120.47217,-0.25491786 114.2394,0.00188014 114.2394,0.00188014 h -0.0552 -0.0552 c 0,0 -6.23517,-0.256798 -8.86315,5.23197296 0,0 -6.518368,15.6383179 -9.374353,67.8956439 L 4.1735775,150.71869 -4.749632e-7,168.95619 96.400294,117.55566 c 0,0 1.315193,46.19736 7.833556,86.39235 0,0 -28.759046,26.13106 -28.216649,27.95985 v 7.31756 c 0,0 1.286394,1.3176 5.74797,0.516 l 25.043869,-8.60635 c 0,0 4.74717,-1.056 7.37516,-0.7704 2.63039,-0.2856 7.37516,0.7704 7.37516,0.7704 l 25.04387,8.60635 c 4.45918,0.8016 5.74797,-0.516 5.74797,-0.516 v -7.31516 c 0.54,-1.83119 -28.21905,-27.96225 -28.21905,-27.96225 z"
 /* var symbolThree = {
 //   path: 'M -2,2 2,2 0,-3 z',
    path: 'icons/airplane.png',
    rotation: 60
  };*/

  var goldStar = {
    path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
    fillColor: 'yellow',
    fillOpacity: 0.8,
    scale: 1,
    strokeColor: 'gold',
    strokeWeight: 14
  };

    $scope.uavMarker = {
        id: 0,
        coords: {
//            latitude: 40.1451,
//            longitude: -99.6680
		latitude: 34.2252449667,
		longitude: 108.878158767
        },
 /*       icons:{
	path: 'icons/airplane.png',
	rotation: 90
	},
        icon: {
        path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
scale: 2,
rotation: angleDegrees           }  
*/
//	icon: 'icons/airplane.png',
/*        icon: {
        path: symbolThree,
	scale: 5,
	rotation: 60           }  ,*/
	icon: symbolThree,
        options: { draggable: true },
	//rotation: 60,
        events: {
        }
    };

    $scope.polylines = [{
        id: 1,
        path: [{
		latitude: 34.2252449667,
		longitude: 108.878158767}],
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

