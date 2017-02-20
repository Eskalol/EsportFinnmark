import angular from 'angular';
import { eventService } from './event.service';

function addInterceptor($httpProvider) {
  'ngInject';

  $httpProvider.interceptors.push('authInterceptor');
}

export default angular.module('fesApp.factory.event', [])
  .factory('Event', eventService)
  .config(['$httpProvider', addInterceptor])
  .name;
