'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

var lan_registrationCtrlStub = {
  index: 'lanRegistrationCtrl.index',
  show: 'lanRegistrationCtrl.show',
  create: 'lanRegistrationCtrl.create',
  destroy: 'lanRegistrationCtrl.destroy',
  destroyAdmin: 'lanRegistrationCtrl.destroyAdmin',
  list: 'lanRegistrationCtrl.list'
}

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return `authService.hasRole.${role}`;
  }
};

// require the index with our stubbed out modules
var lanRegistrationIndex = proxyquire('./index', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './lan_registration.controller': lan_registrationCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('User API Router:', function() {
	it('should return an express router instance', function() {
		expect(lanRegistrationIndex).to.equal(routerStub);
	});
});
