// Controller : ModalWinFocusController

(function () {
    'use strict';

    angular
        .module('AL-app')
        .controller('ModalWinFocusController', ModalWinFocusController);

    ModalWinFocusController.$inject = ['$scope', '$modal', '$log'];

    function ModalWinFocusController($scope, $modal, $log) {

        var vm = this;
        vm.isOpen = false;
        vm.open = _open;
        vm.close = _close;
        vm.animationsEnabled = true;

        function _open(size)  {
            vm.isOpen = true;

            var modalInstance = $modal.open({
                animation: vm.animationsEnabled,
                templateUrl: 'modalTemplate.html',
                controller: 'ModalInstanceCtrl',
                size: size
            });
        }

        function _close()  {
            vm.isOpen = false;
            modalInstance.close();
        }
    }

})();

// Controller : ModalInstanceCtrl
(function () {
    'use strict';

    angular
        .module('AL-app')
        .controller('ModalInstanceCtrl', ModalInstanceCtrl);

    ModalInstanceCtrl.$inject = ['$scope', '$modalInstance'];

    function ModalInstanceCtrl($scope, $modalInstance) {

        var vm = this;
        vm.closeWin = _closeWin;
        vm.cancelWin = _cancelWin;

        function _closeWin()  {
            $modalInstance.close();
        }

        function _cancelWin()  {
            $modalInstance.dismiss('cancel');
        }
    }

})();


