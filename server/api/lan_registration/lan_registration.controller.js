/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/lanregistration/list         ->  list
 * GET     /api/lanregistration              ->  index
 * POST    /api/lanregistration              ->  create
 * GET     /api/lanregistration/:id          ->  show
 * DELETE  /api/lanregistration              ->  destroy
 * DELETE  /apu/lanregistration/:id          ->  destroyAdmin
 */

'use strict';

import LanRegistration from './lan_registration.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
      });
    }
  };
}

/**
 * Create a new lan registration for request user
 */
export function create(req, res) {
  return LanRegistration.create(Object.assign({'user': req.user._id}, req.body))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/**
 * Get list of lan_registrations
 * restriction: 'admin'
 */
export function list(req, res) {
  return LanRegistration.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Get a single lan registration for request user
 */
export function index(req, res) {
  var userId = req.user._id;
  return LanRegistration.findOne({
      'user': userId
  }).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Get a single LanRegistration By id
 * restriction: 'admin'
 */
export function show(req, res) {
  return LanRegistration.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Destroy lan registration for request user
 */
export function destroy(req, res) {
  var userId = req.user._id;
  return LanRegistration.findOne({
      'user': userId
  }).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Destroy a registration for admin
 * restriction: 'admin'
 */
export function destroyAdmin(req, res) {
  return LanRegistration.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
