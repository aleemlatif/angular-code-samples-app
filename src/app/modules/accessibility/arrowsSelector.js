(function () {
  'use strict';
  angular.module('AL-app').directive('arrowsSelector', arrowsSelector);

  arrowsSelector.$inject = [];

  function arrowsSelector() {

    return {

      link: function(scope, element) {
        element.on('keyup', '[focusable]', function(e) {
          var code = e.keyCode || e.which;
          var focusedEle = angular.element('#'+this.id);
          var newFocusedEle = {};

          scope.$apply(function() {

            // if arrow-down key is pressed
            if (code === 40) {
              newFocusedEle = focusedEle.next('[focusable]');

            // if arrow-up key is pressed
            } else if (code === 38) {
              newFocusedEle = focusedEle.prev('[focusable]');
            }
          });

          if (newFocusedEle.length > 0) {
            focusedEle.blur();
            newFocusedEle.focus();
          }

        });
      }
    };
  }

})();
