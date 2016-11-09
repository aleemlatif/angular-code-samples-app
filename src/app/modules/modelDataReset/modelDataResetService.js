// Service : ModelDataService
(function () {
    'use strict';

    angular.module('AL-app').service('ModelDataService', ModelDataService);

    ModelDataService.$inject = [];

    function ModelDataService() {

        var jsonData = [
            {text: 'Lorem ipsum dolor sit amet', text2: 'consectetur adipiscing elit'},
            {text: ' Nullam eu molestie mi', text2: 'Proin eu congue nisi.'}
        ];

        return {
            getData : _getData
        };

        /**
         * @desc getData
         */
        function _getData() {
            return jsonData;
        }

    }
})();
