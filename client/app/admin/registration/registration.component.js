'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './registration.routes';

export class RegistrationComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('fesApp.admin.registration', [ngRoute])
  .config(routes)
  .component('registration', {
    template: require('./registration.html'),
    controller: RegistrationComponent,
    controllerAs: 'registrationCtrl'
  })
  .name;
