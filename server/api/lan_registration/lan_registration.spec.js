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

describe('Lan registration API Router:', () => {
	it('should return an express router instance', () => {
		expect(lanRegistrationIndex).to.equal(routerStub);
	});

  describe('GET /api/lanregistration', () => {
    it('should be authenticated and route to lanregistration.controller.index', () => {
      expect(routerStub.get
        .withArgs('/', 'authService.isAuthenticated', 'lanRegistrationCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/lanregistration', () => {
    it('should be authenticated and route to lanregistration.controller.create', () => {
      expect(routerStub.post
        .withArgs('/', 'authService.isAuthenticated', 'lanRegistrationCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/lanregistration', () => {
    it('should be authenticated and route to lanregistration.controller.destroy', () => {
      expect(routerStub.delete
        .withArgs('/', 'authService.isAuthenticated', 'lanRegistrationCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/lanregistration/:id', () => {
    it('should verify admin role and route to to lanregistration.controller.destroyAdmin', () => {
      expect(routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'lanRegistrationCtrl.destroyAdmin')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/lanregistration/:id', () => {
    it('should verify admin role and route to to lanregistration.controller.show', () => {
      expect(routerStub.get
        .withArgs('/:id', 'authService.hasRole.admin', 'lanRegistrationCtrl.show')
        ).to.have.been.calledOnce;
    });
  });
  describe('GET /api/lanregistration/list', () => {
    it('should verify admin role and route to to lanregistration.controller.list', () => {
      expect(routerStub.get
        .withArgs('/list', 'authService.hasRole.admin', 'lanRegistrationCtrl.list')
        ).to.have.been.calledOnce;
    });
  });
});
