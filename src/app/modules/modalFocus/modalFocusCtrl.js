// Controller : ModalModalFocusController

(function () {
    'use strict';

    angular
        .module('AL-app')
        .controller('ModalFocusController', ModalFocusController);

    ModalFocusController.$inject = ['$scope', '$modal', '$log'];

    function ModalFocusController($scope, $modal, $log) {

        var vm = this;
        vm.isOpen = false;
        vm.openModal = _openModal;
        vm.animationsEnabled = true;

        function _openModal(size)  {
            vm.isOpen = true;

            var modalInstance = $modal.open({
                animation: vm.animationsEnabled,
                templateUrl: 'modalTemplate.html',
                controller: 'ModalInstanceCtrl',
                size: size
            });
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

        $scope.cancelModal = _cancelModal;

        function _cancelModal()  {
            $modalInstance.dismiss('cancel');
        }
    }

})();
