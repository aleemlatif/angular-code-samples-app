// Controller

(function () {
    'use strict';

    angular
        .module('AL-app')
        .controller('RenderHTMLController', RenderHTMLController);

    RenderHTMLController.$inject = ['$scope', '$sce'];

    function RenderHTMLController($scope, $sce) {

        var vm = this;
        vm.html =  $sce.trustAsHtml('<b>HTML inserted from the Angular Controller</b>');

    }

})();


// usage : <div ng-bind-html="whatever_needs_to_be_sanitized | sanitize"></div>

angular.module('AL-app')
    .filter("sanitize", ['$sce', function ($sce) {
        return function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        }
    }]);
