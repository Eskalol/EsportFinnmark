/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/lan/registration              ->  index
 * POST    /api/lan/registration              ->  create
 * GET     /api/lan/registration/:id          ->  show
 * PUT     /api/lan/registration/:id          ->  upsert
 * PATCH   /api/lan/registration/:id          ->  patch
 * DELETE  /api/lan/registration/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Registration from './registration.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
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
    res.status(statusCode).send(err);
  };
}

// Gets a list of Registrations
export function index(req, res) {
  return Registration.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Registration from the DB
export function show(req, res) {
  return Registration.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Registration in the DB
export function create(req, res) {
  return Registration.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Registration in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Registration.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Registration in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Registration.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Registration from the DB
export function destroy(req, res) {
  return Registration.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Creates a new Registration in the DB for request user
export function createMe(req, res) {
  return Registration.create(Object.assign({user: req.user._id}, req.body))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Gets a single Registration from the DB for request user
export function indexMe(req, res) {
  return Registration.findOne({user: req.user._id}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}
