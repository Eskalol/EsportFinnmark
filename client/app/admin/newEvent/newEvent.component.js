'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './newEvent.routes';

export class NewEventComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('fesApp.admin.newEvent', [ngRoute])
  .config(routes)
  .component('newEvent', {
    template: require('./newEvent.html'),
    controller: NewEventComponent,
    controllerAs: 'newEventCtrl'
  })
  .name;
