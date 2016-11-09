(function () {
    'use strict';

    angular.module('AL-app').service('mainService', mainService);

    mainService.$inject = ['$timeout', '$location', '$anchorScroll'];

    function mainService($timeout, $location, $anchorScroll) {

        return {
            monthsArray: _monthsArray,
            boolVal:     _boolVal,
            getObjData:  _getObjData,
            scrollTo:    _scrollTo,

            objs: {
                o1: {
                    id: 1,
                    question: 'Sample question 1',
                    name: 'Q1'
                },
                o2: {
                    id: 2,
                    question: 'Sample question 2',
                    name: 'Q2'
                },
                o3: {
                    id: 3,
                    question: 'Sample question 3',
                    name: 'Q3'
                }
            }
        };

        /**
         * @desc Get a certain Obj from the Data
         * @param obj - obj id
         */
        function _getObjData(obj) {
            var q = this.objs[obj];
            return q && q.id || '';
        };

        /**
         * @desc Populate and return boardingTripsRange array
         */
        function _monthsArray() {
            var monthsArray = [];

            for (var i = 1; i <= 24; i++) {
                monthsArray.push(i);
            }
            return monthsArray;
        };

        /**
         * @desc get true and false based upon the value type
         * @param val - actual value
         */
        function _boolVal(val) {
            if (val == 'undefined' || val == null || val == '' || val == 'false' || val == 'False' || val == 0)
                return false;
            else if (val == true || val == 'true' || val == 'True' || val >= 1)
                return true;
            else
                return 'not identified';
        };

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
    }
})();
