'use strict';

import {Router} from 'express';
import * as controller from './lan_registration.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.delete('/', auth.isAuthenticated(), controller.destroy);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.get('/list', auth.hasRole('admin'), controller.list);
router.delete('/:id', auth.hasRole('admin', controller.destroyAdmin));
router.post('/', auth.isAuthenticated(), controller.create);

module.exports = router;