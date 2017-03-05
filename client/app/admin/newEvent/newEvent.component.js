'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './newEvent.routes';

export class NewEventComponent {

  formData = {
    title: '',
    startDatetime: '',
    endDatetime: '',
    startTime: '',
    endTime: '',
    address: '',
    info: '',
    price: '',
    capacity: '',
    registrationDeadlineTime: '',
    registrationDeadline: ''
  };

  datepicker1 = {
    open: false
  };

  datepicker2 = {
    open: false
  };

  datepicker3 = {
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

  constructor(Event, $location) {
    'ngInject';
    this.Event = Event;
    this.$location = $location;
  }

  craftDatetime(date, time) {
    var timeString = time.getHours() + ':' + time.getMinutes() + ':00';

    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Jan is 0, dec is 11
    var day = date.getDate();
    var dateString = '' + year + '-' + month + '-' + day;
    return new Date(dateString + ' ' + timeString);
  }

  open1() {
    this.datepicker1.open = true;
  }

  open2() {
    this.datepicker2.open = true;
  }

  open3() {
    this.datepicker3.open = true;
  }

  submit(form) {
    this.formData.startDatetime = this.craftDatetime(this.formData.startDatetime, this.formData.startTime);
    this.formData.endDatetime = this.craftDatetime(this.formData.endDatetime, this.formData.endTime);
    if(this.formData.registrationDeadline) {
      this.formData.registrationDeadline = this.craftDatetime(this.formData.registrationDeadline, this.formData.registrationDeadlineTime);
    }
    delete this.formData.startTime;
    delete this.formData.endTime;
    delete this.formData.registrationDeadlineTime;
    var event = new this.Event(this.formData);
    event.$save().then(res => {
      this.$location.path(`/admin/eventInfo/${res._id}`);
    }).catch(err => {
      console.log(err);
    });
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
