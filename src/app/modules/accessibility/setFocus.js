(function () {
  'use strict';
  angular.module('AL-app').directive('setFocus', setFocus);

  function setFocus() {
    return {
      restrict: 'EA',
      link: function (scope, element) {
        element.attr("tabIndex", -1).focus();
      }
    };
  }

})();
