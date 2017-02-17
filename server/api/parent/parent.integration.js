'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';
import User from '../user/user.model';
import Registration from '../registration/registration.model';
import Event from '../event/event.model';

var newParent;

describe('Parent API:', function() {
  var token;
  var user;
  var registration;
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
      })
      .then(function() {
        return Registration.remove().then(function() {
          registration = new Registration({
            user: user._id,
            event: event._id,
            birthdate: new Date("1990/06/17"),
            phone: "12345678",
            address: "asd",
            stayOver: true,
            returningHome: new Date("2017/06/17")
          });

          return registration.save();
        });
      });
    });

    // Clear users after testing
    after(function() {
      return User.remove().then(function() {
        return Registration.remove();
      }).then(function() {
        return Event.remove();
      });
    });

    describe('GET /api/lan/parent', function() {

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
          .get('/api/lan/parent')
          .set('authorization', `Bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.body).to.be.instanceOf(Array);
            done();
          });
      });

      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .get('/api/lan/parent')
          .expect(401)
          .end(done);
      });
    });

    describe('POST /api/lan/parent', function() {
      it('should respond with the newly created parent', function(done) {
        request(app)
          .post('/api/lan/parent')
          .send({
            registration: registration._id,
            name: 'Cool',
            email: "lol@example.com",
            phone: "12345678",
            address: "street cool"
          })
          .set('authorization', `Bearer ${token}`)
          .expect(201)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if(err) {
              return done(err);
            }
            newParent = res.body;
            expect(newParent.registration).to.equal(`${registration._id}`);
            expect(newParent.name).to.equal('Cool');
            expect(newParent.email).to.equal('lol@example.com');
            expect(newParent.phone).to.equal('12345678');
            expect(newParent.address).to.equal('street cool');
            done();
          });
      });

      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .post('/api/lan/parent')
          .send({
            registration: registration._id,
            name: 'Cool',
            email: "lol@example.com",
            phone: "asd",
            address: "abc"
          })
          .expect(401)
          .end(done);
      });
    });

    describe('GET /api/lan/parent/:id', function() {
      it('should respond with the requested parent', function(done) {
        request(app)
          .get(`/api/lan/parent/${newParent._id}`)
          .set('authorization', `Bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if(err) {
              return done(err);
            }
            let parent = res.body;
            expect(parent.registration).to.equal(`${registration._id}`);
            expect(parent.name).to.equal('Cool');
            expect(parent.email).to.equal('lol@example.com');
            expect(parent.phone).to.equal('12345678');
            expect(parent.address).to.equal('street cool');
            done();
          });
      });

      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .get(`/api/lan/parent/${newParent._id}`)
          .expect(401)
          .end(done);
      });
    });

    describe('PUT /api/lan/parent/:id', function() {
      it('should respond with updated on a put', function(done) {
        request(app)
          .put(`/api/lan/parent/${newParent._id}`)
          .send({
            registration: registration._id,
            name: 'Cool',
            email: "lol@example.com",
            phone: "98764312",
            address: "new cool"
          })
          .set('authorization', `Bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if(err) {
              return done(err);
            }
            expect(res.body.phone).to.equal('98764312');
            expect(res.body.address).to.equal('new cool');
            done();
          });
      });

      it('should respond with the updated parent on a subsequent GET', function(done) {
        request(app)
          .get(`/api/lan/parent/${newParent._id}`)
          .set('authorization', `Bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if(err) {
              return done(err);
            }
            let parent = res.body;
            expect(parent.registration).to.equal(`${registration._id}`);
            expect(parent.name).to.equal('Cool');
            expect(parent.email).to.equal('lol@example.com');
            expect(parent.phone).to.equal('98764312');
            expect(parent.address).to.equal('new cool');
            done();
          });
      });
      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .put(`/api/lan/parent/${newParent._id}`)
          .send({
            registration: registration._id,
            name: 'Cool',
            email: "lol@example.com",
            phone: "98764312",
            address: "new cool"
          })
          .expect(401)
          .end(done);
      });
    });

    describe('PATCH /api/lan/parent/:id', function() {
      it('should respond with the patched parent', function(done) {
        request(app)
          .patch(`/api/lan/parent/${newParent._id}`)
          .send([
            { op: 'replace', path: '/name', value: 'Patched name' },
            { op: 'replace', path: '/email', value: 'lol@lol.com' }
          ])
          .set('authorization', `Bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
            if(err) {
              return done(err);
            }
            let patchedParent = res.body;
            expect(patchedParent.name).to.equal('Patched name');
            expect(patchedParent.email).to.equal('lol@lol.com');
            done();
          });
      });

      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .patch(`/api/lan/parent/${newParent._id}`)
          .send([
            { op: 'replace', path: '/name', value: 'Patched name' },
            { op: 'replace', path: '/email', value: 'lol@lol.com' }
          ])
          .expect(401)
          .end(done);
      });
    });

    describe('DELETE /api/lan/parent/:id', function() {
      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .delete(`/api/lan/parent/${newParent._id}`)
          .expect(401)
          .end(done);
      });

      it('should respond with 204 on successful removal', function(done) {
        request(app)
          .delete(`/api/lan/parent/${newParent._id}`)
          .set('authorization', `Bearer ${token}`)
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
    // Clear users before testing
    token = null;

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
      })
      .then(function() {
        return Registration.remove().then(function() {
          registration = new Registration({
            user: user._id,
            event: event._id,
            birthdate: new Date("1990/06/17"),
            phone: "12345678",
            address: "asd",
            stayOver: true,
            returningHome: new Date("2017/06/17")
          });

          return registration.save();
        });
      });
    });

    // Clear users after testing
    after(function() {
      return User.remove().then(function() {
        return Registration.remove();
      }).then(function () {
        return Event.remove();
      });
    });

    describe('POST /api/lan/me', function() {
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

      it('should respond with the newly created parent', function(done) {
        request(app)
          .post('/api/lan/parent/me')
          .send({
            name: 'Imba',
            email: "noob@example.com",
            phone: "4547464",
            address: "sesam street"
          })
          .set('authorization', `Bearer ${token}`)
          .expect(201)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if(err) {
              return done(err);
            }
            newParent = res.body;
            expect(newParent.registration).to.equal(`${registration._id}`);
            expect(newParent.name).to.equal('Imba');
            expect(newParent.email).to.equal('noob@example.com');
            expect(newParent.phone).to.equal('4547464');
            expect(newParent.address).to.equal('sesam street');
            done();
          });
      });

      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .post('/api/lan/parent/me')
          .send({
            name: 'Cool',
            email: "lol@example.com",
            phone: "asd",
            address: "abc"
          })
          .expect(401)
          .end(done);
      });
    });

    describe('GET /api/lan/parent/me', function() {
      it('should respond with JSON array', function(done) {
        request(app)
          .get('/api/lan/parent/me')
          .set('authorization', `Bearer ${token}`)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            expect(res.body).to.be.instanceOf(Array);
            let resParent = res.body[0];
            expect(resParent.name).to.equal('Imba');
            expect(resParent.email).to.equal('noob@example.com');
            expect(resParent.phone).to.equal('4547464');
            expect(resParent.address).to.equal('sesam street');
            done();
          });
      });

      it('should respond with a 401 when not authenticated', function(done) {
        request(app)
          .get('/api/lan/parent/me')
          .expect(401)
          .end(done);
      });
    });

    describe('GET /api/lan/parent', function() {
      it('should not have access to admin api as user', function(done) {
        request(app)
          .get('/api/lan/parent')
          .set('authorization', `Bearer ${token}`)
          .expect(403)
          .end(done);
      });
    });

    describe('POST /api/lan/parent', function() {
      it('should not have access to admin api as user', function(done) {
        request(app)
          .post('/api/lan/parent')
          .send({
            registration: registration._id,
            name: 'Cool',
            email: "lol@example.com",
            phone: "12345678",
            address: "street cool"
          })
          .set('authorization', `Bearer ${token}`)
          .expect(403)
          .end(done);
      });
    });

    describe('GET /api/lan/parent/:id', function() {
      it('should not have access to admin api as user', function(done) {
        request(app)
          .get(`/api/lan/parent/${newParent._id}`)
          .set('authorization', `Bearer ${token}`)
          .expect(403)
          .end(done);
      });
    });

    describe('PUT /api/lan/parent', function() {
      it('should not have access to admin api as user', function(done) {
        request(app)
          .put(`/api/lan/parent/${newParent._id}`)
          .send({
            registration: registration._id,
            name: 'Cool',
            email: "lol@example.com",
            phone: "98764312",
            address: "new cool"
          })
          .set('authorization', `Bearer ${token}`)
          .expect(403)
          .end(done);
      });
    });

    describe('PATCH /api/lan/parent', function() {
      it('should not have access to admin api as user', function(done) {
        request(app)
          .patch(`/api/lan/parent/${newParent._id}`)
          .send([
            { op: 'replace', path: '/name', value: 'Patched name' },
            { op: 'replace', path: '/email', value: 'lol@lol.com' }
          ])
          .set('authorization', `Bearer ${token}`)
          .expect(403)
          .end(done);
      });
    });

    describe('DELETE /api/lan/parent', function() {
      it('should not have access to admin api as user', function(done) {
        request(app)
          .delete(`/api/lan/parent/${newParent._id}`)
          .set('authorization', `Bearer ${token}`)
          .expect(403)
          .end(done);
      });
    });
  });
});
