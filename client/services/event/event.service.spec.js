'use strict';

describe('Service: event', function() {
  // load the service's module
  beforeEach(module('fesApp.factory.event'));

  // instantiate service
  var event;
  beforeEach(inject(function(_event_) {
    event = _event_;
  }));

  it('should do something', function() {
    expect(!!event).to.be.true;
  });
});
