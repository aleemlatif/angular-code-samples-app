describe('Directive: uniqueKeyPress', function () {
  var element, scope, validKeyCodes = {enter: 13};

  beforeEach(module('AL-app'));

  beforeEach(inject(function ($injector) {
    var $rootScope = $injector.get('$rootScope');

    scope = $rootScope.$new();
    scope.mockFunction = function () {
    };
  }));

  // Compile the directive into HTML
  function compileDirective(html) {
    element = angular.element(html);
    inject(function ($compile) {
      element = $compile(element)(scope);
    });
    scope.$apply();
  }

  it('it should call the mock function on pressing enter', function () {
    var eMock = angular.element.Event('keypress');

    compileDirective('<button type="button" keycode="13" unique-key-press="mockFunction()">');
    spyOn(scope, 'mockFunction');
    eMock.which = validKeyCodes.enter;
    eMock.keyCode = validKeyCodes.enter;
    element.trigger(eMock);
    expect(scope.mockFunction).toHaveBeenCalled();
  });

  it('it should not call the mock function on pressing a key other than the key specified through directive-attribute', function () {
    var eMock = angular.element.Event('keypress');

    compileDirective('<button type="button" keycode="27" unique-key-press="mockFunction()">');
    spyOn(scope, 'mockFunction');
    eMock.which = validKeyCodes.enter;
    eMock.keyCode = validKeyCodes.enter;
    element.trigger(eMock);
    expect(scope.mockFunction).not.toHaveBeenCalled();
  });

});
