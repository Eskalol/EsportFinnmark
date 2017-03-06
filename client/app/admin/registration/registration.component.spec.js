'use strict';

describe('Component: RegistrationComponent', function() {
  // load the controller's module
  beforeEach(module('fesApp.admin.registration'));

  var RegistrationComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    RegistrationComponent = $componentController('registration', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
