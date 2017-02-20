import angular from 'angular';
import { eventService } from './event/event.service';
import { registrationService } from './registration/registration.service';

function addInterceptor($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push('authInterceptor');
}

export default angular.module('fesApp.services', [])
  .factory('Event', eventService)
  .factory('Registration', registrationService)
  .config(['$httpProvider', addInterceptor])
  .name;
