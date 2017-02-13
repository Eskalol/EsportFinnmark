'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('fesApp.login', [])
  .controller('LoginController', LoginController)
  .name;
