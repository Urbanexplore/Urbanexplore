'use strict';

describe('Controller: EtapeCtrl', function () {

  // load the controller's module
  beforeEach(module('urbanAppMobileApp'));

  var EtapeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EtapeCtrl = $controller('EtapeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
