'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './newEvent.routes';

export class NewEventComponent {

  formData = {
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    address: '',
    info: '',
    price: '',
    capacity: ''
  };

  datepicker1 = {
    open: false
  };

  datepicker2 = {
    open: false
  };

  dateFormat = 'dd.MM.yyyy';

  dateOptions = {
    startingDay: 1
  };

  timeOptions = {
    hstep: 1,
    mstep: 15
  };

  constructor() {
    'ngInject';
    this.message = 'Hello';
  }

  open1() {
    this.datepicker1.open = true;
  }

  open2() {
    this.datepicker2.open = true;
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
