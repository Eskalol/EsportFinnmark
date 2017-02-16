'use strict';

const angular = require('angular');
const ngRoute = require('angular-route');


import routing from './lan.routes';

export class LanComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('fesApp.lan', [ngRoute])
  .config(routing)
  .component('lan', {
    template: require('./lan.html'),
    controller: LanComponent,
    controllerAs: 'lanCtrl'
  })
  .name;
