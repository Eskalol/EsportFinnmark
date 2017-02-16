'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newRegistration;

describe('Registration API:', function() {
  describe('GET /api/lan/registration', function() {
    var registrations;

    beforeEach(function(done) {
      request(app)
        .get('/api/lan/registration')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          registrations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(registrations).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/lan/registration', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/lan/registration')
        .send({
          name: 'New Registration',
          info: 'This is the brand new registration!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRegistration = res.body;
          done();
        });
    });

    it('should respond with the newly created registration', function() {
      expect(newRegistration.name).to.equal('New Registration');
      expect(newRegistration.info).to.equal('This is the brand new registration!!!');
    });
  });

  describe('GET /api/lan/registration/:id', function() {
    var registration;

    beforeEach(function(done) {
      request(app)
        .get(`/api/lan/registration/${newRegistration._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          registration = res.body;
          done();
        });
    });

    afterEach(function() {
      registration = {};
    });

    it('should respond with the requested registration', function() {
      expect(registration.name).to.equal('New Registration');
      expect(registration.info).to.equal('This is the brand new registration!!!');
    });
  });

  describe('PUT /api/lan/registration/:id', function() {
    var updatedRegistration;

    beforeEach(function(done) {
      request(app)
        .put(`/api/lan/registration/${newRegistration._id}`)
        .send({
          name: 'Updated Registration',
          info: 'This is the updated registration!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRegistration = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRegistration = {};
    });

    it('should respond with the updated registration', function() {
      expect(updatedRegistration.name).to.equal('Updated Registration');
      expect(updatedRegistration.info).to.equal('This is the updated registration!!!');
    });

    it('should respond with the updated registration on a subsequent GET', function(done) {
      request(app)
        .get(`/api/lan/registration/${newRegistration._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let registration = res.body;

          expect(registration.name).to.equal('Updated Registration');
          expect(registration.info).to.equal('This is the updated registration!!!');

          done();
        });
    });
  });

  describe('PATCH /api/lan/registration/:id', function() {
    var patchedRegistration;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/lan/registration/${newRegistration._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Registration' },
          { op: 'replace', path: '/info', value: 'This is the patched registration!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRegistration = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRegistration = {};
    });

    it('should respond with the patched registration', function() {
      expect(patchedRegistration.name).to.equal('Patched Registration');
      expect(patchedRegistration.info).to.equal('This is the patched registration!!!');
    });
  });

  describe('DELETE /api/lan/registration/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/lan/registration/${newRegistration._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when registration does not exist', function(done) {
      request(app)
        .delete(`/api/lan/registration/${newRegistration._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
