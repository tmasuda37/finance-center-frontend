function service(transportService) {
  'ngInject';

  const service = {};

  service.create = function (data) {
    return transportService.send('POST', 'place/create', data)
  };

  service.defaultList = function () {
    return transportService.send('GET', 'place/list');
  };

  return service;
}

export default {
  name: 'placeService',
  fn: service
};
