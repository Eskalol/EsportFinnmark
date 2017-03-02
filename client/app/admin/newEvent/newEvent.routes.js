'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/admin/newEvent', {
      template: '<new-event></new-event>',
      controllerAs: 'eventCtrl',
    });
}
