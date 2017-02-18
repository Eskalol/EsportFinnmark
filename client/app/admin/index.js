'use strict';

import angular from 'angular';
import routes from './admin.routes';
import AdminController from './admin.controller';
import adminSidebar from './adminSidebar/adminSidebar.directive';

export default angular.module('fesApp.admin', [adminSidebar, 'fesApp.auth', 'ngRoute'])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
