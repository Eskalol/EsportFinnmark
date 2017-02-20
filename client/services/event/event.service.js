'use strict';

export function eventService($resource) {
  'ngInject';

  return $resource('/api/lan/event/:id/:controller', {
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
