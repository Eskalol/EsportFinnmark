'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider.when('/lan', {
    template: require('./lan.html'),

  });
}
