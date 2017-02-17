'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';
import User from '../user/user.model';
import Event from '../event/event.model';

var newRegistration;

describe('Registration API:', function() {
  var token;
  var user;
  var normalUser;
  var event;

  describe('Admin role: ', function() {

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
      }).then(function() {
        normalUser = new User({
          name: 'noob',
          email: 'user@example.com',
          password: 'password'
        });

        return normalUser.save();
      })
      .then(function() {
        return Event.remove().then(function() {
          event = new Event({
            title: "cool event",
            startDatetime: new Date("1990/06/17"),
            endDatetime: new Date("1990/09/17"),
            address: "cool street",
            info: "awesome",
            price: 200,
            capacity: 50
          });

          return event.save();
        });
      });
    });

    // Clear users after testing
    after(function() {
      return User.remove().then(function() {
        Event.remove();
      });
    });

    describe('GET /api/lan/registration', function() {
      var registrations;
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

      it('should respond with JSON array', function(done) {
        request(app)
          .get('/api/lan/registration')
          .set('authorization', `Bearer ${token}`)
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
      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .get('/api/lan/registration')
          .expect(401)
          .end(done);
      });
    });

    describe('POST /api/lan/registration', function() {
      it('should respond with the newly created registration', function(done) {
        request(app)
          .post('/api/lan/registration')
          .send({
            user: normalUser._id,
            event: event._id,
            birthdate: new Date("1990/06/17"),
            phone: "547544",
            address: "cool address",
            stayOver: true,
            returningHome: new Date("2017/06/17")
          })
          .set('authorization', `Bearer ${token}`)
          .expect(201)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if(err) {
              return done(err);
            }
            newRegistration = res.body;
            expect(newRegistration.user).to.equal(`${normalUser._id}`);
            expect(newRegistration.event).to.equal(`${event._id}`);
            expect(newRegistration.birthdate).to.equal("1990-06-16T22:00:00.000Z");
            expect(newRegistration.phone).to.equal("547544");
            expect(newRegistration.address).to.equal("cool address");
            expect(newRegistration.stayOver).to.equal(true);
            expect(newRegistration.returningHome).to.equal("2017-06-16T22:00:00.000Z");
            done();
        });
      });

      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .post('/api/lan/registration')
          .send({
            user: normalUser._id,
            event: event._id,
            birthdate: new Date("1990/06/17"),
            phone: "547544",
            address: "cool address",
            stayOver: true,
            returningHome: new Date("2017/06/17")
          })
          .expect(401)
          .end(done);
      });
    });

    describe('GET /api/lan/registration/:id', function() {
      it('should respond with the requested registration', function(done) {
        request(app)
          .get(`/api/lan/registration/${newRegistration._id}`)
          .set('authorization', `Bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if(err) {
              return done(err);
            }
            expect(res.body.user).to.equal(`${normalUser._id}`);
            expect(newRegistration.event).to.equal(`${event._id}`);
            expect(res.body.birthdate).to.equal("1990-06-16T22:00:00.000Z");
            expect(res.body.phone).to.equal("547544");
            expect(res.body.address).to.equal("cool address");
            expect(res.body.stayOver).to.equal(true);
            expect(res.body.returningHome).to.equal("2017-06-16T22:00:00.000Z");
            done();
        });
      });
      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .get(`/api/lan/registration/${newRegistration._id}`)
          .expect(401)
          .end(done);
      });
    });

    describe('PUT /api/lan/registration/:id', function() {
      it('should respond with the updated registration', function(done) {
        request(app)
          .put(`/api/lan/registration/${newRegistration._id}`)
          .send({
            phone: "123456",
            address: "new",
          })
          .set('authorization', `Bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if(err) {
              return done(err);
            }
            expect(res.body.user).to.equal(`${normalUser._id}`);
            expect(newRegistration.event).to.equal(`${event._id}`);
            expect(res.body.birthdate).to.equal("1990-06-16T22:00:00.000Z");
            expect(res.body.phone).to.equal("123456");
            expect(res.body.address).to.equal("new");
            expect(res.body.stayOver).to.equal(true);
            expect(res.body.returningHome).to.equal("2017-06-16T22:00:00.000Z");
            done();
        });
      });

      it('should respond with the updated registration on a subsequent GET', function(done) {
        request(app)
          .get(`/api/lan/registration/${newRegistration._id}`)
          .set('authorization', `Bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if(err) {
              return done(err);
            }
            expect(res.body.user).to.equal(`${normalUser._id}`);
            expect(newRegistration.event).to.equal(`${event._id}`);
            expect(res.body.birthdate).to.equal("1990-06-16T22:00:00.000Z");
            expect(res.body.phone).to.equal("123456");
            expect(res.body.address).to.equal("new");
            expect(res.body.stayOver).to.equal(true);
            expect(res.body.returningHome).to.equal("2017-06-16T22:00:00.000Z");
            done();
          });
      });
      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .put(`/api/lan/registration/${newRegistration._id}`)
          .send({
            phone: "123456",
            address: "new",
          })
          .expect(401)
          .end(done);
      });
    });

    describe('PATCH /api/lan/registration/:id', function() {
      it('should respond with the patched registration', function(done) {
        request(app)
          .patch(`/api/lan/registration/${newRegistration._id}`)
          .send([
            { op: 'replace', path: '/stayOver', value: false },
            { op: 'replace', path: '/returningHome', value: new Date("2017/08/17") }
          ])
          .set('authorization', `Bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if(err) {
              return done(err);
            }
            expect(res.body.user).to.equal(`${normalUser._id}`);
            expect(newRegistration.event).to.equal(`${event._id}`);
            expect(res.body.birthdate).to.equal("1990-06-16T22:00:00.000Z");
            expect(res.body.phone).to.equal("123456");
            expect(res.body.address).to.equal("new");
            expect(res.body.stayOver).to.equal(false);
            expect(res.body.returningHome).to.equal("2017-08-16T22:00:00.000Z");
            done();
          });
      });

      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .patch(`/api/lan/registration/${newRegistration._id}`)
          .send([
            { op: 'replace', path: '/stayOver', value: false },
            { op: 'replace', path: '/returningHome', value: new Date("2017/08/17") }
          ])
          .expect(401)
          .end(done);
      });
    });

    describe('DELETE /api/lan/registration/:id', function() {
      it('should respond with 204 on successful removal', function(done) {
        request(app)
          .delete(`/api/lan/registration/${newRegistration._id}`)
          .set('authorization', `Bearer ${token}`)
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
          .set('authorization', `Bearer ${token}`)
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

  describe('User role: ', function() {
    token = null;
    user = null;
    event = null;

    // Clear users before testing
    before(function() {
      return User.remove().then(function() {
        user = new User({
          name: 'Fake User',
          email: 'user@example.com',
          password: 'pwlols123',
          role: 'user'
        });

        return user.save();
      })
      .then(function() {
        return Event.remove().then(function() {
          event = new Event({
            title: "cool event",
            startDatetime: new Date("1990/06/17"),
            endDatetime: new Date("1990/09/17"),
            address: "cool street",
            info: "awesome",
            price: 200,
            capacity: 50
          });

          return event.save();
        });
      });
    });

    // Clear users after testing
    after(function() {
      return User.remove();
    });

    describe('POST /api/lan/registration/me', function() {
      before(function(done) {
        request(app)
          .post('/auth/local')
          .send({
            email: 'user@example.com',
            password: 'pwlols123'
          })
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            token = res.body.token;
            done();
          });
      });

      it('should respond with the newly created registration', function(done) {
        request(app)
          .post('/api/lan/registration/me')
          .send({
            event: event._id,
            birthdate: new Date("1992/06/17"),
            phone: "135154",
            address: "wall street",
            stayOver: true,
            returningHome: new Date("2017/12/17")
          })
          .set('authorization', `Bearer ${token}`)
          .expect(201)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if(err) {
              return done(err);
            }
            newRegistration = res.body;
            expect(newRegistration.user).to.equal(`${user._id}`);
            expect(newRegistration.event).to.equal(`${event._id}`);
            expect(newRegistration.birthdate).to.equal("1992-06-16T22:00:00.000Z");
            expect(newRegistration.phone).to.equal("135154");
            expect(newRegistration.address).to.equal("wall street");
            expect(newRegistration.stayOver).to.equal(true);
            expect(newRegistration.returningHome).to.equal("2017-12-16T23:00:00.000Z");
            done();
        });
      });

      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .post('/api/lan/registration/me')
          .send({
            birthdate: new Date("1990/06/17"),
            phone: "547544",
            address: "cool address",
            stayOver: true,
            returningHome: new Date("2017/06/17")
          })
          .expect(401)
          .end(done);
      });
    });

    describe('GET /api/lan/registration/me', function() {
      it('should respond with JSON array', function(done) {
        request(app)
          .get('/api/lan/registration/me')
          .set('authorization', `Bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if(err) {
              return done(err);
            }
            expect(newRegistration.user).to.equal(`${user._id}`);
            expect(newRegistration.event).to.equal(`${event._id}`);
            expect(newRegistration.birthdate).to.equal("1992-06-16T22:00:00.000Z");
            expect(newRegistration.phone).to.equal("135154");
            expect(newRegistration.address).to.equal("wall street");
            expect(newRegistration.stayOver).to.equal(true);
            expect(newRegistration.returningHome).to.equal("2017-12-16T23:00:00.000Z");
            done();
          });
      });
      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .get('/api/lan/registration/me')
          .expect(401)
          .end(done);
      });
    });

    describe('GET /api/lan/registration', function() {
      it('should not have access to admin api as user', function(done) {
        request(app)
          .get('/api/lan/registration')
          .set('authorization', `Bearer ${token}`)
          .expect(403)
          .end(done);
      });
    });

    describe('POST /api/lan/registration', function() {
      it('should not have access to admin api as user', function(done) {
        request(app)
          .post('/api/lan/registration')
          .send({
            user: user._id,
            birthdate: new Date("1990/06/17"),
            phone: "547544",
            address: "cool address",
            stayOver: true,
            returningHome: new Date("2017/06/17")
          })
          .set('authorization', `Bearer ${token}`)
          .expect(403)
          .end(done);
      });
    });

    describe('PUT /api/lan/registration/:id', function() {
      it('should not have access to admin api as user', function(done) {
        request(app)
          .put(`/api/lan/registration/${newRegistration._id}`)
          .send({
            phone: "123456",
            address: "new",
          })
          .set('authorization', `Bearer ${token}`)
          .expect(403)
          .end(done);
      });
    });

    describe('PATCH /api/lan/registration/:id', function() {
      it('should not have access to admin api as user', function(done) {
        request(app)
          .patch(`/api/lan/registration/${newRegistration._id}`)
          .send([
            { op: 'replace', path: '/stayOver', value: false },
            { op: 'replace', path: '/returningHome', value: new Date("2017/08/17") }
          ])
          .set('authorization', `Bearer ${token}`)
          .expect(403)
          .end(done);
      });
    });

    describe('DELETE /api/lan/registration/:id', function() {
      it('should not have access to admin api as user', function(done) {
        request(app)
          .delete(`/api/lan/registration/${newRegistration._id}`)
          .set('authorization', `Bearer ${token}`)
          .expect(403)
          .end(done);
      });
    });
  });
});
