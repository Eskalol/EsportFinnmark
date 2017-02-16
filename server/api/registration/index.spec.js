'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var registrationCtrlStub = {
  index: 'registrationCtrl.index',
  show: 'registrationCtrl.show',
  create: 'registrationCtrl.create',
  upsert: 'registrationCtrl.upsert',
  patch: 'registrationCtrl.patch',
  destroy: 'registrationCtrl.destroy',
  indexMe: 'registrationCtrl.indexMe',
  createMe: 'registrationCtrl.createMe'
};

var authServiceStub = {
  isAuthenticated() {
    return 'authService.isAuthenticated';
  },
  hasRole(role) {
    return `authService.hasRole.${role}`;
  }
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var registrationIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './registration.controller': registrationCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Registration API Router:', function() {
  it('should return an express router instance', function() {
    expect(registrationIndex).to.equal(routerStub);
  });

  describe('GET /api/lan/registration', function() {
    it('should verify admin role and route route to registration.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'authService.hasRole.admin', 'registrationCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/lan/registration/:id', function() {
    it('should verify admin role and route route to registration.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'authService.hasRole.admin', 'registrationCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/lan/registration', function() {
    it('should verify admin role and route route to registration.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'authService.hasRole.admin', 'registrationCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/lan/registration/:id', function() {
    it('should verify admin role and route route to registration.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'authService.hasRole.admin', 'registrationCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/lan/registration/:id', function() {
    it('should verify admin role and route route to registration.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'authService.hasRole.admin', 'registrationCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/lan/registration/:id', function() {
    it('should verify admin role and route route to registration.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'registrationCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/lan/registration/me', function() {
    it('should be authenticated and route to registration.controller.indexMe', function() {
      expect(routerStub.get
        .withArgs('/me', 'authService.isAuthenticated', 'registrationCtrl.indexMe')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/lan/registration/me', function() {
    it('should be authenticated and route to registration.controller.createMe', function() {
      expect(routerStub.post
        .withArgs('/me', 'authService.isAuthenticated', 'registrationCtrl.createMe')
        ).to.have.been.calledOnce;
    });
  });
});
