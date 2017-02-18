'use strict';
const angular = require('angular');

export class AdminSidebarController {

  isSidebarCollapsed = true;

  constructor($location, Auth) {
    'ngInject';

    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

export default angular.module('fesApp.adminSidebar', [])
  .controller('AdminSidebarController', AdminSidebarController)
  .directive('adminSidebar', function() {
    return {
      template: require('./adminSidebar.html'),
      restrict: 'EA',
      link: function(scope, element, attrs) {}
    };
  })
  .name;
