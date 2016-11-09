(function () {
  'use strict';
  angular.module('AL-app').directive('uniqueKeyPress', uniqueKeyPress);

  uniqueKeyPress.$inject = [];

  function uniqueKeyPress() {

    return function (scope, element, attrs) {

      element.bind('keydown keypress', function (e) {
        var code = e.keyCode || e.which;

        if (code == attrs.keycode) {
          scope.$apply(function () {
            scope.$eval(attrs.uniqueKeyPress);
          });
          e.preventDefault();
        }
      });
    };
  }

})();
