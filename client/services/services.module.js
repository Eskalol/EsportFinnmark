import angular from 'angular';
import { eventService } from './event/event.service';

function addInterceptor($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push('authInterceptor');
}

export default angular.module('fesApp.services', [])
  .factory('Event', eventService)
  .config(['$httpProvider', addInterceptor])
  .name;
