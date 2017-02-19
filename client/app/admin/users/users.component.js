'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');

import {NgTableParams} from 'ng-table';
import routes from './users.routes';

export class UsersComponent {
  columns = [
      {
        field: 'name',
        title: 'Name',
        sortable: 'name',
        show: true
      },
      {
        field: 'email',
        title: 'Email',
        sortable: 'email',
        show: true
      },
      {
        field: 'role',
        title: 'Role',
        sortable: 'role',
        show: true
      }
    ];

  /*@ngInject*/
  constructor(User) {
    // Use the User $resource to fetch all users
    this.users_collection = User.query();
    this.tableParams = new NgTableParams({}, {
      dataset: this.users_collection
    });
    console.log(this.tableParams);

  }

  delete(user) {
    user.$remove();
    this.users_collection.splice(this.users_collection.indexOf(user), 1);
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
