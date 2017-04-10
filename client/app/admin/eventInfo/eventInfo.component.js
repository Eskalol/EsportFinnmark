'use strict';

import angular from 'angular';
import ngRoute from 'angular-route';

import routes from './eventInfo.routes';

export class EventInfoComponent {
  /*@ngInject*/

  constructor($routeParams, Event) {
    'ngInject';
    console.log($routeParams.id);
    this.event = Event.get({id: $routeParams.id});
    console.log(this.event.registrationDeadline);
  }
}

export default angular.module('fesApp.admin.eventInfo', [ngRoute])
  .config(routes)
  .component('eventInfo', {
    template: require('./eventInfo.html'),
    controller: EventInfoComponent,
    controllerAs: 'eventInfoCtrl'
  })
  .name;
