'use strict';

describe('Service: objectsProxy', function () {

  // load the service's module
  beforeEach(module('urbanAppMobileApp'));

  // instantiate service
  var objectsProxy;
  beforeEach(inject(function (_objectsProxy_) {
    objectsProxy = _objectsProxy_;
  }));

  it('should do something', function () {
    expect(!!objectsProxy).toBe(true);
  });

});
