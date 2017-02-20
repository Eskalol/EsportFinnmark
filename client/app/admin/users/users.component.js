'use strict';
import angular from 'angular';
import ngRoute from 'angular-route';

import routes from './users.routes';

export class UsersComponent {
  table = {
    sortType: '',
    sortReverse: false,
    search: '',
  };

  userAction = {
    editId: ''
  };

  userRoles = ['user', 'admin'];

  /*@ngInject*/
  constructor($http, User) {
    'ngInject';
    this.$http = $http;
    this.usersList = User.query();

    console.log(this.usersList);
  }

  delete(user) {
    user.$remove();
    this.usersList.splice(this.usersList.indexOf(user), 1);
  }

  updateUserRole(user) {
    this.$http.put(`/api/users/${user._id}`, {
      role: user.role
    });
    this.userAction.editId = '';
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
