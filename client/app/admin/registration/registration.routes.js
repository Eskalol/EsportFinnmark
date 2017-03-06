'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/admin/registration', {
      template: '<registration></registration>'
    });
}
