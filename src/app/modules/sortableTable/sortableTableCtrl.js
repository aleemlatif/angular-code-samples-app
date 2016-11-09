// Controller

(function () {
    'use strict';

    angular
        .module('AL-app')
        .controller('SortableTableController', SortableTableController);

    SortableTableController.$inject = ['$scope', 'dataService'];

    function SortableTableController($scope, dataService) {

        var vm = this;
        vm.sortType = 'description';   // set the initial sort type
        vm.sortReverse = true;
        vm.dataLoaded = false;
        vm.searchDesc = '';
        vm.records = [];
        vm.convertAmountsToInt = _convertAmountColToInt;
        vm.loadData = _loadData;
        vm.sortBy = _sortBy;

        function _convertAmountColToInt()  {
            angular.forEach(vm.records, function (rec) {
                rec.amount = parseFloat(rec.amount);
            });
        }

        function _loadData() {
            console.log(vm.records);
            vm.records = dataService.getData();
            vm.convertAmountsToInt();
            vm.dataLoaded = true;
        }

        function _sortBy(sortColumn) {
            vm.sortReverse = (vm.sortType === sortColumn) ? !vm.sortReverse : false;
            vm.sortType = sortColumn;
        }
    }

})();
