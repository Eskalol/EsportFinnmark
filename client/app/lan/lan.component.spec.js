'use strict';

describe('Component: LanComponent', function() {
  // load the controller's module
  beforeEach(module('fesApp.lan'));

  var LanComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LanComponent = $componentController('lan', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
