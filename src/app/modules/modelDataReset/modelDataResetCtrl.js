// Controller

(function () {
    'use strict';

    angular
        .module('AL-app')
        .controller('ModelDataResetController', ModelDataResetController);

    ModelDataResetController.$inject = ['$scope', 'ModelDataService'];

    function ModelDataResetController($scope, ModelDataService) {

        var vm = this;
        vm.dataReseted = false;

        vm.data = [{
            text: 'Lorem ipsum dolor sit amet',
            text2: 'consectetur adipiscing elit'
        }, {
            text: ' Nullam eu molestie mi',
            text2: 'Proin eu congue nisi.'
        }];

        vm.origData = angular.copy(vm.data);

        vm.resetData = _resetData;
        vm.loadData = _loadDataFromService;

        function _resetData() {
            vm.dataReseted = true;
            vm.data = angular.copy(vm.origData);
        }

        function _loadDataFromService() {
            vm.dataReseted = true;
            vm.data = ModelDataService.getData();
        }
    }

})();
