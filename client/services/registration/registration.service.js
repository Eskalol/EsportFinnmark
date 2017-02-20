'use strict';

export function registrationService($resource) {
  'ngInject';

  return $resource('/api/lan/registration/:id/:controller', {
    id: '@_id'
  }, {
    get: {
      method: 'GET'
    },
    query: {
      method: 'GET',
      params: {
        id: ''
      },
      isArray: true
    }
  });
}

