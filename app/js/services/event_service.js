function service(transportService) {
  'ngInject';

  const service = {};

  service.create = function (data) {
    return transportService.send('POST', 'event/create', data)
  };

  service.defaultList = function () {
    return transportService.send('GET', 'event/list');
  };

  return service;
}

export default {
  name: 'eventService',
  fn: service
};
