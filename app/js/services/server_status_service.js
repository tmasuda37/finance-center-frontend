function service(transportService) {
  'ngInject';

  const service = {};

  service.wakeUp = function () {
    return transportService.send('GET', 'status/wake-up')
  };

  return service;
}

export default {
  name: 'serverStatusService',
  fn: service
};
