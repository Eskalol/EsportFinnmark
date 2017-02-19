'use strict';

/* globals describe, expect, it, before, after, beforeEach, afterEach */

import app from '../..';
import User from './user.model';
import request from 'supertest';

describe('User API:', function() {
  var user;
  var token;
  var adminUser;

  // Clear users before testing
  before(function() {
    return User.remove().then(function() {
      user = new User({
        name: 'Fake User',
        email: 'test@example.com',
        password: 'password'
      });

      return user.save();
    }).then(function() {
      adminUser = new User({
          name: 'Fake Admin User',
          email: 'admin@example.com',
          password: 'password',
          role: 'admin'
        });

      return adminUser.save();
    });
  });

  // Clear users after testing
  after(function() {
    return User.remove();
  });

  describe('GET /api/users/me', function() {

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

    it('should respond with a user profile when authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body._id.toString()).to.equal(adminUser._id.toString());
          done();
        });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .get('/api/users/me')
        .expect(401)
        .end(done);
    });
  });

  describe('PUT /api/users/:id', function() {
    it('should respond with the updated user', function(done) {
      request(app)
        .put(`/api/users/${user._id}`)
        .send({
          role: 'admin'
        })
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          expect(res.body.role).to.equal('admin');
          done();
      });
    });

    it('should not update notAllowed fields', function(done) {
      request(app)
        .put(`/api/users/${user._id}`)
        .send({
          name: 'Cool',
          password: 'gdfgfgdgshsehsretgsgerg',
          salt: 'imbaPass'
        })
        .set('authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          expect(res.body.name).to.equal('Fake User');
          User.findById(user._id).exec()
            .then(usr => {
              expect(usr.password).to.equal(user.password);
              done();
            });
      });
    });

    it('should respond with a 401 when not authenticated', function(done) {
      request(app)
        .put(`/api/users/${user._id}`)
        .send({
          role: 'admin'
        })
        .expect(401)
        .end(done);
    });
  });
});
