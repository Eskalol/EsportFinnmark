'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/admin/event', {
      template: '<event></event>',
      controllerAs: 'eventCtrl',
      authenticate: 'admin'
    });
}
