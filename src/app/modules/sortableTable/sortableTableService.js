// Service : dataService
(function () {
    'use strict';

    angular.module('AL-app').service('dataService', dataService);

    dataService.$inject = [];

    function dataService() {

        var jsonData = [
            {description: 'debit card spend', amount: '10'},
            {description: 'Movies', amount: '10'},
            {description: 'Burger King', amount: '5'},
            {description: 'Pay Michael Debit', amount: '2'},
            {description: 'Debit card coffee', amount: '19'},
            {description: 'DEBIT card tea', amount: '21'}
        ];

        return {
            getData : _getData
        };

        /**
         * @desc getData
         */
        function _getData() {
            return jsonData;
        };

    }
})();
