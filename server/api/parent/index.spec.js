'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var parentCtrlStub = {
  index: 'parentCtrl.index',
  show: 'parentCtrl.show',
  create: 'parentCtrl.create',
  upsert: 'parentCtrl.upsert',
  patch: 'parentCtrl.patch',
  destroy: 'parentCtrl.destroy',
  indexMe: 'parentCtrl.indexMe',
  createMe: 'parentCtrl.createMe'
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
var parentIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './parent.controller': parentCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Parent API Router:', function() {
  it('should return an express router instance', function() {
    expect(parentIndex).to.equal(routerStub);
  });

  describe('GET /api/lan/parent', function() {
    it('should verify admin role and route route to parent.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'authService.hasRole.admin', 'parentCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/lan/parent/:id', function() {
    it('should verify admin role and route to parent.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'authService.hasRole.admin', 'parentCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/lan/parent', function() {
    it('should verify admin role and route to parent.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'authService.hasRole.admin', 'parentCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/lan/parent/:id', function() {
    it('should verify admin role and route to parent.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'authService.hasRole.admin', 'parentCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/lan/parent/:id', function() {
    it('should verify admin role and route to parent.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'authService.hasRole.admin', 'parentCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/lan/parent/:id', function() {
    it('should verify admin role and route to parent.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'parentCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/lan/parent/me', function() {
    it('should be authenticated and route to parent.controller.indexMe', function() {
      expect(routerStub.get
        .withArgs('/me', 'authService.isAuthenticated', 'parentCtrl.indexMe')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/lan/parent/me', function() {
    it('should be authenticated and route to parent.controller.createMe', function() {
      expect(routerStub.post
        .withArgs('/me', 'authService.isAuthenticated', 'parentCtrl.createMe')
        ).to.have.been.calledOnce;
    });
  });
});
