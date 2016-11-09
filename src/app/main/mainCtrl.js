(function ()    {
    'use strict';

    angular
        .module('AL-app')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$state', '$stateParams', '$timeout', '$window', '$location', '$anchorScroll'];

    function MainController($scope, $state, $stateParams, $timeout, $window, $location, $anchorScroll){

        var vm = this;

        vm.scrollTo =  _scrollTo;
        vm.openWindow =  _openWindow;
        vm.gotoState =  _gotoState;

        /**
         * @desc move the page focus back one top of the page
         * @param id
         */
        function _scrollTo(id) {
            $timeout(function () {
                $location.hash(id);
                $anchorScroll();
                document.getElementById(id).focus();
            });
        };

        /**
         * @desc opens a new popup window
         */
        function _openWindow(url, windowName, windowFeatures) {
            windowService.openWindow(url, windowName, windowFeatures);
        };

        /**
         * @desc navigates to the parsed 'state'
         */
        function _gotoState(page) {
            $state.go(page);
        };
    }

})();
