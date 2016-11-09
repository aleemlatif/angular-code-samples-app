describe('directive: setFocus', function () {
  var $compile, scope, elem;

  beforeEach(module('AL-app'));
  beforeEach(function () {


    inject(function ($injector, _$rootScope_) {
      $compile = $injector.get('$compile');
      scope = _$rootScope_.$new();
    });
  });

  describe('setting the focus', function () {
    beforeEach(function () {
      elem = angular.element('<div set-focus></div>');
      spyOn($.fn, 'focus');
      $compile(elem)(scope);
      scope.$apply();
    });

    it('should set the tabIndex', function() {
      expect(elem.attr('tabindex')).toBe('-1');
    });

    it('should set the focus', function() {
      expect($.fn.focus).toHaveBeenCalled();
    });
  });

});
