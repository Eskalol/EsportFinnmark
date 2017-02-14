'use strict';

import {Router} from 'express';
import * as controller from './parent.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/list', auth.isAuthenticated(), controller.list);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.delete('/:id', auth.hasRole('admin'), controller.destroyAdmin);

module.exports = router;
