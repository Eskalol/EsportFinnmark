'use strict';

describe('Component: NewEventComponent', function() {
  // load the controller's module
  beforeEach(module('fesApp.admin.newEvent'));

  var NewEventComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    NewEventComponent = $componentController('newEvent', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
