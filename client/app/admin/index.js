'use strict';

import angular from 'angular';
import routes from './admin.routes';
import AdminController from './admin.controller';
import SidebarComponent from './sidebar/sidebar.component';
import UsersComponent from './users/users.component';
import EventComponent from './event/event.component';

export default angular.module('fesApp.admin', [SidebarComponent, UsersComponent, EventComponent, 'fesApp.auth', 'ngRoute'])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
