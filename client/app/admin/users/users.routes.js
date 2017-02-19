'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/admin/users', {
      template: '<users></users>',
      authenticate: 'admin'
    });
}
