'use strict';

import angular from 'angular';

export class sidebarComponent {
  menu = [
    {
      title: 'Dashboard',
      link: '/',
      icon: 'fa fa-dashboard fa-fw',
      multi: false,
    },
    {
      title: 'Users',
      link: '/users',
      icon: 'fa fa-users fa-fw',
      multi: false,
    },
    {
      title: 'Event',
      link: '/event',
      icon: 'fa fa-gamepad fa-fw',
      multi: true,
      isOpen: false,
      sub: [
        {
          title: 'Registration',
          link: '/event/registration',
          icon: 'fa fa-address-card-o',
        }
      ]
    }
  ]

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

export default angular.module('fesApp.sidebar', [])
  .component('sidebar', {
    template: require('./sidebar.html'),
    controller: sidebarComponent
  })
  .name;
