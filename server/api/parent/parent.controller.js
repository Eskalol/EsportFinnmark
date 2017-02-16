/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/parent/list         ->  list
 * GET     /api/parent              ->  index
 * POST    /api/parent              ->  create
 * GET     /api/parent/:id          ->  show
 * DELETE  /apu/parent/:id          ->  destroyAdmin
 */

'user strict';

import Parent from './parent.model';
import LanRegistration from '../lan_registration/lan_registration.model';


function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
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
 * Get a list of parents for request user
 */
export function list(req, res) {
  var userId = req.user._id;
  var registration = LanRegistration.findOne({
    user: userId
  });
  return Parent.find({lanregistration: registration._id}).exec()
    .then((handleEntityNotFound(res)))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Get list of Parents where id is lan registration id
 * restriction: admin
 */
export function show(req, res) {
  return Parent.find({
    lanregistration: req.params.id
  }).exec()
  .then(handleEntityNotFound(res))
  .then(respondWithResult(res))
  .catch(handleError(res));
}

/**
 * Create Parent for lan registration request user
 */
export function create(req, res) {
  var userId = req.user._id;
  var registration = LanRegistration.findOne({
    user: userId
  });
  return Parent.create(
    Object.assign({lanregistration: registration._id}, req.body))
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/**
 * Destroy a parent for admin
 * restriction: 'admin'
 */
export function destroyAdmin(req, res) {
  return Parent.findById(req.params.id).exec()
  .then(handleEntityNotFound(res))
  .then(removeEntity(res))
  .catch(handleError(res));
}
