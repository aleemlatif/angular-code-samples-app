(function () {
    'use strict';

    angular
        .module('AL-app.leafletMap').component('leafletMap', {
            templateUrl: 'app/modules/leafletMap/leafletMapTemplate.html',
            controller: 'leafletMapController',
            controllerAs: 'leafletMapVm',
            bindings: {
                lat: '<',
                lang: '<'
            }


        });

    leafletMapController.$inject = [];

    function leafletMapController() {
        var leafletMapVm = this;

        var ALMap = L.map('AlMapId').setView([leafletMapController.lat, leafletMapController.lang], 13);

        leafletMapVm.$onInit = function () {
            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
                maxZoom: 18,
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.streets'
            }).addTo(ALMap);
        };


        // Now load the methods in sequence
        leafletMapVm.createMarker();
        leafletMapVm.createCircle();
        leafletMapVm.createPolygon();

        leafletMapVm.createMarker = function () {
            L.marker([51.5, -0.09]).addTo(ALMap);
        };

        leafletMapVm.createCircle = function (option) {
            L.circle([51.508, -0.11], {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5,
                radius: 500
            }).addTo(ALMap);
        };

        leafletMapVm.createPolygon = function (option) {
            L.polygon([
                [51.509, -0.08],
                [51.503, -0.06],
                [51.51, -0.047]
            ]).addTo(ALMap);
        };

    }

})();
