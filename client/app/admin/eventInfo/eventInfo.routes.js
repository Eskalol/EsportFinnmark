'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/admin/eventInfo/:id', {
      template: '<event-info></event-info>',
      authenticate: 'admin'
    });
}
