'use strict';

describe('Directive: adminSidebar', function() {
  // load the directive's module and view
  beforeEach(module('fesApp.adminSidebar'));
  beforeEach(module('app/admin/adminSidebar/adminSidebar.html'));

  var element, scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<admin-sidebar></admin-sidebar>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the adminSidebar directive');
  }));
});
