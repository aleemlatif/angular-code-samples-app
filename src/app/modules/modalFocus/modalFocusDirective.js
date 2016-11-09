// Include this directive to get focus on input field within modal window
(function () {
    'use strict';

    angular
        .module('AL-app')
        .directive('setFocus', setFocus);

    setFocus.$inject = ['$timeout', '$parse'];

    function setFocus($timeout, $parse) {

        return {

            link: function (scope, element, attrs) {

                var isModalOpened = $parse(attrs.setFocus);

                scope.$watch(isModalOpened, function (value) {

                    if (value === true) {
                        $timeout(function () {
                            element[0].focus();
                        });
                    }
                });

                element.bind('blur', function () {
                    scope.$apply(isModalOpened.assign(scope, false));
                })

            }
        };
    }

})();
