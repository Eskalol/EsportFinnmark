'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var eventCtrlStub = {
  index: 'eventCtrl.index',
  show: 'eventCtrl.show',
  create: 'eventCtrl.create',
  upsert: 'eventCtrl.upsert',
  patch: 'eventCtrl.patch',
  destroy: 'eventCtrl.destroy'
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
var eventIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './event.controller': eventCtrlStub,
  '../../auth/auth.service': authServiceStub
});

describe('Event API Router:', function() {
  it('should return an express router instance', function() {
    expect(eventIndex).to.equal(routerStub);
  });

  describe('GET /api/lan/event', function() {
    it('should route to event.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'eventCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/lan/event/:id', function() {
    it('should route to event.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'eventCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/lan/event', function() {
    it('should verify admin role and route to event.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'authService.hasRole.admin', 'eventCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/lan/event/:id', function() {
    it('should verify admin role and route to event.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'authService.hasRole.admin', 'eventCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/lan/event/:id', function() {
    it('should verify admin role and route to event.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'authService.hasRole.admin', 'eventCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/lan/event/:id', function() {
    it('should verify admin role and route to event.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'authService.hasRole.admin', 'eventCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
