'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newParent;

describe('Parent API:', function() {
  describe('GET /api/lan/parent', function() {
    var parents;

    beforeEach(function(done) {
      request(app)
        .get('/api/lan/parent')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          parents = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(parents).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/lan/parent', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/lan/parent')
        .send({
          name: 'New Parent',
          info: 'This is the brand new parent!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newParent = res.body;
          done();
        });
    });

    it('should respond with the newly created parent', function() {
      expect(newParent.name).to.equal('New Parent');
      expect(newParent.info).to.equal('This is the brand new parent!!!');
    });
  });

  describe('GET /api/lan/parent/:id', function() {
    var parent;

    beforeEach(function(done) {
      request(app)
        .get(`/api/lan/parent/${newParent._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          parent = res.body;
          done();
        });
    });

    afterEach(function() {
      parent = {};
    });

    it('should respond with the requested parent', function() {
      expect(parent.name).to.equal('New Parent');
      expect(parent.info).to.equal('This is the brand new parent!!!');
    });
  });

  describe('PUT /api/lan/parent/:id', function() {
    var updatedParent;

    beforeEach(function(done) {
      request(app)
        .put(`/api/lan/parent/${newParent._id}`)
        .send({
          name: 'Updated Parent',
          info: 'This is the updated parent!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedParent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedParent = {};
    });

    it('should respond with the updated parent', function() {
      expect(updatedParent.name).to.equal('Updated Parent');
      expect(updatedParent.info).to.equal('This is the updated parent!!!');
    });

    it('should respond with the updated parent on a subsequent GET', function(done) {
      request(app)
        .get(`/api/lan/parent/${newParent._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let parent = res.body;

          expect(parent.name).to.equal('Updated Parent');
          expect(parent.info).to.equal('This is the updated parent!!!');

          done();
        });
    });
  });

  describe('PATCH /api/lan/parent/:id', function() {
    var patchedParent;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/lan/parent/${newParent._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Parent' },
          { op: 'replace', path: '/info', value: 'This is the patched parent!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedParent = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedParent = {};
    });

    it('should respond with the patched parent', function() {
      expect(patchedParent.name).to.equal('Patched Parent');
      expect(patchedParent.info).to.equal('This is the patched parent!!!');
    });
  });

  describe('DELETE /api/lan/parent/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/lan/parent/${newParent._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when parent does not exist', function(done) {
      request(app)
        .delete(`/api/lan/parent/${newParent._id}`)
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
