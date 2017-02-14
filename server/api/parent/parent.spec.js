'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

var parentCtrlStub = {
  show: 'parentCtrl.show',
  create: 'parentCtrl.create',
  destroyAdmin: 'parentCtrl.destroyAdmin',
  list: 'parentCtrl.list'
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
var parentIndex = proxyquire('./index', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './parent.controller': parentCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Parent API Router:', () => {
	it('should return an express router instance.', () => {
		expect(parentIndex).to.equal(routerStub);
	});

	describe('GET /api/parent/list', () => {
		it('should be authenticated and route to parent.controller.list', () => {
			expect(routerStub.get
				.withArgs('/list', 'authService.isAuthenticated', 'parentCtrl.list')
				).to.have.been.calledOnce;
		});
	});

	describe('POST /api/parent', () => {
		it('should be authenticated and route to parent.controller.create', () => {
			expect(routerStub.post
				.withArgs('/', 'authService.isAuthenticated', 'parentCtrl.create')
				).to.have.been.calledOnce;
		});
	});

	describe('GET /api/parent/:id', () => {
		it('should be authenticated and route to parent.controller.show', () => {
			expect(routerStub.get
				.withArgs('/:id', 'authService.hasRole.admin', 'parentCtrl.show')
				).to.have.been.calledOnce;
		});
	});

	describe('DELETE /api/parent/:id', () => {
		it('should be authenticated and route to parent.controller.destroyAdmin', () => {
			expect(routerStub.delete
				.withArgs('/:id', 'authService.hasRole.admin', 'parentCtrl.destroyAdmin')
				).to.have.been.calledOnce;
		});
	});


});