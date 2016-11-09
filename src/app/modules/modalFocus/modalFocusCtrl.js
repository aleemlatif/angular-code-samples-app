// Controller

(function () {
    'use strict';

    angular
        .module('AL-app')
        .controller('ModalFocusController', ModalFocusController);

    ModalFocusController.$inject = ['$scope'];

    function ModalFocusController($scope) {

        var vm = this;
        vm.isOpen = true;
        vm.open = vm._open;
        vm.close = vm._close;

        function _open()  {
            vm.isOpen = true;
        }

        function _close()  {
            vm.isOpen = false;
        }
    }

})();
