'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var registrationCtrlStub = {
  index: 'registrationCtrl.index',
  show: 'registrationCtrl.show',
  create: 'registrationCtrl.create',
  upsert: 'registrationCtrl.upsert',
  patch: 'registrationCtrl.patch',
  destroy: 'registrationCtrl.destroy'
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
  './registration.controller': registrationCtrlStub
});

describe('Registration API Router:', function() {
  it('should return an express router instance', function() {
    expect(registrationIndex).to.equal(routerStub);
  });

  describe('GET /api/lan/registration', function() {
    it('should route to registration.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'registrationCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/lan/registration/:id', function() {
    it('should route to registration.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'registrationCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/lan/registration', function() {
    it('should route to registration.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'registrationCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/lan/registration/:id', function() {
    it('should route to registration.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'registrationCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/lan/registration/:id', function() {
    it('should route to registration.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'registrationCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/lan/registration/:id', function() {
    it('should route to registration.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'registrationCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
