'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';
import User from '../user/user.model';

var newEvent;

describe('Event API:', function() {
  var token;
  var user;

  // Clear users before testing
  before(function() {
    return User.remove().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'admin@example.com',
        password: 'password',
        role: 'admin'
      });

      return user.save();
    });
  });

  // Clear users after testing
  after(function() {
    return User.remove();
  });

  describe('GET /api/lan/event', function() {
    it('should respond with JSON array', function(done) {
      request(app)
        .get('/api/lan/event')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          expect(res.body).to.be.instanceOf(Array);
          done();
        });
    });
  });

  describe('POST /api/lan/event', function() {
    before(function(done) {
      request(app)
        .post('/auth/local')
        .send({
          email: 'admin@example.com',
          password: 'password'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should respond with the newly created event', function(done) {
      request(app)
        .post('/api/lan/event')
        .send({
          title: "cool event",
          startDatetime: new Date("1990-06-16T22:00:00.000Z"),
          endDatetime: new Date("1990-09-16T22:00:00.000Z"),
          address: "cool street",
          info: "awesome",
          price: 200,
          capacity: 50
        })
        .set('authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEvent = res.body;
          expect(newEvent.title).to.equal("cool event");
          expect(newEvent.startDatetime).to.equal("1990-06-16T22:00:00.000Z");
          expect(newEvent.endDatetime).to.equal("1990-09-16T22:00:00.000Z");
          expect(newEvent.address).to.equal("cool street");
          expect(newEvent.info).to.equal("awesome");
          expect(newEvent.price).to.equal(200);
          expect(newEvent.capacity).to.equal(50);
          done();
      });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .post('/api/lan/event')
        .send({
          title: "cool event",
          startDatetime: new Date("1990/06/17"),
          endDatetime: new Date("1990/09/17"),
          address: "cool street",
          info: "awesome",
          price: 200,
          capacity: 50
        })
        .expect(401)
        .end(done);
    });
  });

  describe('GET /api/lan/event/:id', function() {
    it('should respond with the requested event', function(done) {
      request(app)
        .get(`/api/lan/event/${newEvent._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let event = res.body;
          expect(event.title).to.equal("cool event");
          expect(event.startDatetime).to.equal("1990-06-16T22:00:00.000Z");
          expect(event.endDatetime).to.equal("1990-09-16T22:00:00.000Z");
          expect(event.address).to.equal("cool street");
          expect(event.info).to.equal("awesome");
          expect(event.price).to.equal(200);
          expect(event.capacity).to.equal(50);
          done();
      });
    });
  });

  describe('PUT /api/lan/event/:id', function() {
    it('should respond with the updated event', function(done) {
      request(app)
        .put(`/api/lan/event/${newEvent._id}`)
        .send({
          title: 'Updated Event',
          info: 'This is the updated event!!!'
        })
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          expect(res.body.title).to.equal("Updated Event");
          expect(res.body.startDatetime).to.equal("1990-06-16T22:00:00.000Z");
          expect(res.body.endDatetime).to.equal("1990-09-16T22:00:00.000Z");
          expect(res.body.address).to.equal("cool street");
          expect(res.body.info).to.equal("This is the updated event!!!");
          expect(res.body.price).to.equal(200);
          expect(res.body.capacity).to.equal(50);
          done();
        });
    });

    it('should respond with the updated event on a subsequent GET', function(done) {
      request(app)
        .get(`/api/lan/event/${newEvent._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let event = res.body;
          expect(event.title).to.equal("Updated Event");
          expect(event.startDatetime).to.equal("1990-06-16T22:00:00.000Z");
          expect(event.endDatetime).to.equal("1990-09-16T22:00:00.000Z");
          expect(event.address).to.equal("cool street");
          expect(event.info).to.equal("This is the updated event!!!");
          expect(event.price).to.equal(200);
          expect(event.capacity).to.equal(50);
          done();
      });
    });
    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .put(`/api/lan/event/${newEvent._id}`)
        .send({
          title: 'Updated Event',
          info: 'This is the updated event!!!'
        })
        .expect(401)
        .end(done);
    });
  });

  describe('PATCH /api/lan/event/:id', function() {
    it('should respond with the patched event', function(done) {
      request(app)
        .patch(`/api/lan/event/${newEvent._id}`)
        .send([
          { op: 'replace', path: '/title', value: 'Patched Event' },
          { op: 'replace', path: '/info', value: 'This is the patched event!!!' },
          { op: 'replace', path: '/capacity', value: 100}
        ])
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          let event = res.body;
          expect(event.title).to.equal("Patched Event");
          expect(event.startDatetime).to.equal("1990-06-16T22:00:00.000Z");
          expect(event.endDatetime).to.equal("1990-09-16T22:00:00.000Z");
          expect(event.address).to.equal("cool street");
          expect(event.info).to.equal("This is the patched event!!!");
          expect(event.price).to.equal(200);
          expect(event.capacity).to.equal(100);
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .patch(`/api/lan/event/${newEvent._id}`)
        .send([
          { op: 'replace', path: '/title', value: 'Patched Event' },
          { op: 'replace', path: '/info', value: 'This is the patched event!!!' },
          { op: 'replace', path: '/capacity', value: 100}
        ])
        .expect(401)
        .end(done);
    });
  });

  describe('DELETE /api/lan/event/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/lan/event/${newEvent._id}`)
        .expect(204)
        .set('authorization', `Bearer ${token}`)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when event does not exist', function(done) {
      request(app)
        .delete(`/api/lan/event/${newEvent._id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .delete(`/api/lan/event/${newEvent._id}`)
        .expect(401)
        .end(done);
    });
  });
});
