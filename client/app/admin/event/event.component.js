'use strict';

import angular from 'angular';
import ngRoute from 'angular-route';
// import Event from '../../../services/event/event.module';

import routes from './event.routes';

export class EventComponent {
  table = {

  };

  /*@ngInject*/
  constructor(Event) {
    'ngInject';
    this.eventList = Event.query();
    console.log(this.eventList);
  }
}

export default angular.module('fesApp.admin.event', [ngRoute])
  .config(routes)
  .component('event', {
    template: require('./event.html'),
    controller: EventComponent,
    controllerAs: 'eventCtrl'
  })
  .name;
