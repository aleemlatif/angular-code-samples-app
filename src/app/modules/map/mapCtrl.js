'use strict';

var AlAppModule = angular.module('AL-app')
    .controller('MapController', ['$state', '$scope', '$stateParams', '$location', '$http', '$resource', '$localStorage', '$sessionStorage', '$anchorScroll', '$timeout', '$window', function ($state, $scope, $stateParams, $location, $http, $resource, $localStorage, $sessionStorage, $anchorScroll, $timeout, $window) {

        var init = function () {
            var latlng = new google.maps.LatLng(57.0442, 9.9116);

            var settings = {
                zoom: 15,
                center: latlng,
                mapTypeControl: true,
                mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
                navigationControl: true,
                navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            var map = new google.maps.Map(document.getElementById("map_canvas"), settings);

            // Company marker starts here.
            var companyImage = new google.maps.MarkerImage('assets/images/map/websols-logo.png',
                new google.maps.Size(100, 50),
                new google.maps.Point(0, 0),
                new google.maps.Point(50, 50)
            );

            var companyShadow = new google.maps.MarkerImage('assets/images/map/opal-logo.png',
                new google.maps.Size(130, 50),
                new google.maps.Point(0, 0),
                new google.maps.Point(65, 50));

            var companyPos = new google.maps.LatLng(57.0442, 9.9116);

            var companyMarker = new google.maps.Marker({
                position: companyPos,
                map: map,
                icon: companyImage,
                shadow: companyShadow,
                title: "WebSols",
                zIndex: 3
            });

            var infoWindow = new google.maps.InfoWindow();
            var company = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading"  class="firstHeading">WebSols Australia</h1>' +
                '<div id="bodyContent">' +
                '<p>Content for company goes here.</p>' +
                '</div>' +
                '</div>';
            google.maps.event.addListener(companyMarker, 'click', function () {
                infoWindow.setContent(company);
                infoWindow.open(map, companyMarker);
            });

            // Train  marker starts here.

            var twitterImage = new google.maps.MarkerImage('assets/images/map/twitter-logo.png',
                new google.maps.Size(50, 50),
                new google.maps.Point(0, 0),
                new google.maps.Point(50, 50)
            );

            var twitterShadow = new google.maps.MarkerImage('assets/images/map/opal-logo.png',
                new google.maps.Size(70, 50),
                new google.maps.Point(0, 0),
                new google.maps.Point(60, 50)
            );

            var twitterPos = new google.maps.LatLng(57.0429, 9.9173);
            var twitterMarker = new google.maps.Marker({
                position: twitterPos,
                map: map,
                icon: twitterImage,
                shadow: twitterShadow,
                title: "Train Station",
                zIndex: 2
            });

            var infoWindow = new google.maps.InfoWindow();
            var twitter = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading"  class="firstHeading">Twitter</h1>' +
                '<div id="bodyContent">' +
                '<p><img src="assets/images/map/twitter-logo.png" style="float:left">Content for twitter goes here.</p>' +
                '</div>' +
                '</div>';
            google.maps.event.addListener(twitterMarker, 'click', function () {
                infoWindow.setContent(twitter);
                infoWindow.open(map, twitterMarker);
            });

            // Parking marker starts here.
            var opalImage = new google.maps.MarkerImage('assets/images/map/opal-logo.png',
                new google.maps.Size(50, 50),
                new google.maps.Point(0, 0),
                new google.maps.Point(50, 50)
            );

            var opalShadow = new google.maps.MarkerImage('assets/images/map/dummy-map.png',
                new google.maps.Size(70, 50),
                new google.maps.Point(0, 0),
                new google.maps.Point(60, 50)
            );

            var opalPos = new google.maps.LatLng(57.0437, 9.9157);

            var opalMarker = new google.maps.Marker({
                position: opalPos,
                map: map,
                icon: opalImage,
                shadow: opalShadow,
                title: "Opal Retailers",
                zIndex: 1
            });

            var infoWindow = new google.maps.InfoWindow();
            var opal = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading"  class="firstHeading">Opal</h1>' +
                '<div id="bodyContent">' +
                '<p><img src="assets/images/map/opal-logo.png" style="float:left">Content for Opal goes here.</p>' +
                '</div>' +
                '</div>';
            google.maps.event.addListener(opalMarker, 'click', function () {
                infoWindow.setContent(opal);
                infoWindow.open(map, opalMarker);
            });
        };

        init();

    }]);

AlAppModule.service('sharedProperties', function () {
    var coordinates = {
        lat: '',
        lng: ''
    };

    return coordinates;
});

AlAppModule.service('searchResponse', function () {
    var searchResponse = {
        name: '',
        description: '',
        location: {}
    };
    return searchResponse;
});
