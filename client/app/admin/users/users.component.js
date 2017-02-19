'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');

import routes from './users.routes';

export class UsersComponent {
  table = {
    sortType: '',
    sortReverse: false,
    search: '',
  }

  /*@ngInject*/
  constructor(User) {
    this.users = User.query();

  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

export default angular.module('fesApp.admin.users', [ngRoute])
  .config(routes)
  .component('users', {
    template: require('./users.html'),
    controller: UsersComponent,
    controllerAs: 'usersCtrl'
  })
  .name;
