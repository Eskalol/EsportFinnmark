'use strict';

describe('Component: EventComponent', function() {
  // load the controller's module
  beforeEach(module('fesApp.admin.event'));

  var EventComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EventComponent = $componentController('event', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
