'use strict';

describe('Component: EventInfoComponent', function() {
  // load the controller's module
  beforeEach(module('fesApp.admin.eventInfo'));

  var EventInfoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EventInfoComponent = $componentController('eventInfo', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
