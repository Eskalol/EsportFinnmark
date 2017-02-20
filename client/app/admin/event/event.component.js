'use strict';

import angular from 'angular';
import ngRoute from 'angular-route';
// import Event from '../../../services/event/event.module';

import routes from './event.routes';

export class EventComponent {
  table = {
    sortType: '',
    sortReverse: false,
    search: '',
  };

  /*@ngInject*/
  constructor(Event, Modal) {
    'ngInject';
    this.eventsList = Event.query();
    console.log(this.eventsList);
    this.delete = Modal.confirm.delete(event => {
      event.$remove();
      this.eventsList.splice(this.eventsList.indexOf(event), 1);
    });
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
